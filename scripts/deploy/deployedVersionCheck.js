import * as packageInfo from '../../package.json';
import { fetchJsonRetry } from './fetchJsonRetry.js';
const version = packageInfo.version;

export async function deployedVersionCheck(remote) {
    if (!remote.versionUrl) {
        console.warn(`"${remote.name}" has no configuration for deploy check - please add there versionUrl key. `);
        return;
    }

    try {
        const about = await fetchJsonRetry(remote.versionUrl);
        //console.log(about);
        const deployedVersion = about.version || about.data.version;

        if (deployedVersion !== version) {
            throw new Error(`Versions are not matching deployed=${deployedVersion}, expected=${version}.`);
        }

        console.info(`"${remote.name}" was successfully deployed and checked in version "${deployedVersion}".`);
    } catch (error) {
        throw new Error(`There is some problem with deploy, please check ${remote.versionUrl} . ${error.message}`);
    }
}

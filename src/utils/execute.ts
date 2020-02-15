import { exec } from 'child_process';

export function execute(command: string, args: string[], verbose = false): Promise<string> {
    return new Promise((resolve, reject) => {
        const cmd = `${command} ${args.join(' ')}`;
        if (verbose) {
            console.log(`\x1b[36m`);
            console.log(cmd);
            console.log(`\x1b[0m`);
        }
        const process = exec(cmd, (error, stdout, stderr) => {
            process.kill();
            return error
                ? reject(`Error:\n${error.message}\n${error.stack}\nstderr:\n${stderr}\nstdout:\n${stdout}`)
                : resolve(stdout);
        });
    });
}

import { exec } from 'child_process';

export function execute(command: string, ...args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        const process = exec(
            `${command} ${args.join(' ')}`,
            (error, stdout, stderr) => {
                process.kill();
                return error
                    ? reject(
                          `Error:\n${error.message}\n${
                              error.stack
                          }\nstderr:\n${stderr}\nstdout:\n${stdout}`,
                      )
                    : resolve(stdout);
            },
        );
    });
}

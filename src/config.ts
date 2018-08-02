const env = process.env;

export const REPOSITORY_URL: string = env.REPOSITORY_URL || '';
export const REPOSITORY_DIRECTORY: string = env.REPOSITORY_DIRECTORY || '';
export const REPOSITORY_USERNAME: string = env.REPOSITORY_USERNAME || '';
export const REPOSITORY_TOKEN: string = env.REPOSITORY_TOKEN || '';
export const HTTP_PORT: number = getHttpPort();

function getHttpPort(): number {
    const port = env.HTTP_PORT;
    if (port != null) {
        return parseInt(port, 10);
    }
    return 8080;
}

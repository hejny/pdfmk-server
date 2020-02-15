export function compatiblePath(path: string): string {
    return path.split('\\').join('/');
}

export function extensionToContentType(extension: 'pdf' | 'png' | 'jpeg'): string {
    switch (extension) {
        case 'pdf':
            return 'application/pdf';
        case 'png':
            return 'image/png';
        case 'jpeg':
            return 'image/jpeg';
    }
}

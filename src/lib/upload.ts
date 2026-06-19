export function convertDriveLinkToDirect(link: string): string | null {
    if (!link) return null;

    const driveMatch =
        link.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
        link.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (driveMatch && driveMatch[1]) {
        const fileId = driveMatch[1];
        // Sử dụng endpoint này để ép Google Drive trả về ảnh preview dạng JPEG/PNG, bypass được file .HEIC
        // =w1000 quy định chiều rộng tối đa của ảnh trả về là 1000px để tối ưu tốc độ load
        return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    }

    return link;
}

export function base64ToDataUrl(string) {
    return `data:image/avif;base64,${string}`;
}
export function dataUrlToBase64(string) {
    return string.slice(23);
}
//# sourceMappingURL=base64.js.map
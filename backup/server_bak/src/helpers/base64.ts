export function base64ToDataUrl(string: string): string {
  return `data:image/avif;base64,${ string }`;
}

export function dataUrlToBase64(string: string): string {
  return string.slice(23);
}

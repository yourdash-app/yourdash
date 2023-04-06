export function base64DataUrl(string: string): string {
  return `data:image/avif;base64,${string}`;
}

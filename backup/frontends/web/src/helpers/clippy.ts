import clsx from "clsx";

export default function clippy(...input: any[]): string {
  return clsx(...input)
    .replaceAll(`\n`, ``)
    .split(" ")
    .filter((str) => str !== "")
    .join(" ");
}

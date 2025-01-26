import instance from "./main.js";

export default async function timeTaken(name: string, measure: () => Promise<void> | void) {
  instance.log.info("timer", `Task: ${name} started.`);
  const timeThen = Date.now();
  await measure();
  const timeNow = Date.now();
  instance.log.info("timer", `Task: ${name} took ${timeNow - timeThen}µs.`);
}

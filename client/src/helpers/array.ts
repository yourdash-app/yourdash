export function chunk(array: any[], multipleOf: number): any[][] {
  let output = [];
  for (let i = 0; i < array.length; i += multipleOf) {
    output.push(array.slice(i, i + multipleOf));
  }
  return output;
}

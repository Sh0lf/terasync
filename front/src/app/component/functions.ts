export function makeRandom(lengthOfCode: number): string {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890&%abcdefghijklmnopqrstuvwxyz";
  let text = "";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

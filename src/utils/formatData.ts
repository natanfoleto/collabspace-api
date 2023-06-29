export function TelephoneFormat(number: string): string {
  return number
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll(" ", "")
    .replaceAll("-", "");
}

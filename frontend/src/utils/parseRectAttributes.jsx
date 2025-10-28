export default function parseRectAttributes(attrString) {
  const attributes = {};
  const regex = /(\w+)="([^"]+)"/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    attributes[match[1]] =
      match[1] === "x" ||
      match[1] === "y" ||
      match[1] === "width" ||
      match[1] === "height"
        ? parseFloat(match[2])
        : match[2];
  }
  return attributes;
}
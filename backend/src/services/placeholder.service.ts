export function generatePlaceholder(
  width: number,
  height: number,
  altText: string
): string {
  const safeWidth = Math.min(width, 1200);
  const safeHeight = Math.min(height, 600);
  const safeText = altText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}">`,
    `  <rect fill="#e5e7eb" width="100%" height="100%" rx="8"/>`,
    `  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" fill="#6b7280" font-family="system-ui, sans-serif" font-size="14">${safeText}</text>`,
    `</svg>`,
  ].join("\n");
}
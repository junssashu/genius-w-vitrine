const SVG_TEMPLATE = (from: string, to: string) =>
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 20' preserveAspectRatio='none'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='16' height='20' fill='url(%23g)'/></svg>`;

const toBase64 = (s: string): string => {
  if (typeof window === "undefined") return Buffer.from(s).toString("base64");
  return window.btoa(s);
};

export const blurDataURLForPalette = (from: string, to: string): string => {
  const raw = SVG_TEMPLATE(from, to).replace(/%23/g, "#");
  return `data:image/svg+xml;base64,${toBase64(raw)}`;
};

export const solidBlurDataURL = (color: string): string =>
  blurDataURLForPalette(color, color);

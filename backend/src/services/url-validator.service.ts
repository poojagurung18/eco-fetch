const ALLOWED_HOSTS = [
  "images.unsplash.com",
  "images.pexels.com",
  "via.placeholder.com",
  "i.imgur.com",
  "picsum.photos",
];

const BLOCKED_PREFIXES = [
  "127.",
  "10.",
  "192.168.",
  "172.16.",
  "172.17.",
  "172.18.",
  "172.19.",
  "172.20.",
  "172.21.",
  "172.22.",
  "172.23.",
  "172.24.",
  "172.25.",
  "172.26.",
  "172.27.",
  "172.28.",
  "172.29.",
  "172.30.",
  "172.31.",
  "0.",
  "localhost",
];

export function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    const hostname = url.hostname.toLowerCase();

    if (BLOCKED_PREFIXES.some((p) => hostname.startsWith(p) || hostname === p)) {
      return false;
    }

    return ALLOWED_HOSTS.some(
      (h) => hostname === h || hostname.endsWith(`.${h}`)
    );
  } catch {
    return false;
  }
}
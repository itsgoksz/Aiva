/**
 * Subdomain and cross-domain routing utilities for Namma Universe & Aiva.
 */

export function isAivaSubdomain(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();

  // Production subdomain
  if (hostname === 'aiva.nammauniverse.in') {
    return true;
  }

  // Any preview, staging, or dev subdomain starting with aiva (e.g., aiva.localhost, aiva-preview.vercel.app)
  if (hostname.startsWith('aiva.') || hostname.startsWith('aiva-')) {
    return true;
  }

  // Local testing convenience: ?subdomain=aiva on localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('subdomain') === 'aiva') {
      return true;
    }
  }

  return false;
}

export function getUniverseUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (typeof window === 'undefined') return cleanPath;

  // If currently browsing the aiva subdomain, point back to root universe domain
  if (isAivaSubdomain()) {
    return `https://www.nammauniverse.in${cleanPath}`;
  }

  return cleanPath;
}


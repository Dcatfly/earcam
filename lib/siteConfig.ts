const explicitBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const deploymentDomain = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

const resolvedBaseUrl = (explicitBaseUrl || productionDomain || deploymentDomain || 'http://localhost:3000')
  .replace(/\/$/, '');

export const siteConfig = {
  baseUrl: resolvedBaseUrl,
  absolutePath: (path: string) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${resolvedBaseUrl}${normalizedPath}`;
  },
};

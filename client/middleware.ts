import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(ar|en)/:path*',
    // Enable a redirect to a matching locale when others are not specified (e.g. /pathnames -> /en/pathnames)
    '/((?!_next|_vercel|.*\..*).*)'
  ]
};

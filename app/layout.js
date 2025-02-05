import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div>{children}</div>
        <CookieConsent />
        <SpeedInsights />
      </body>
    </html>
  );
}

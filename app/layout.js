import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account" content="ca-pub-8712767354684493" />
      </head>
      <body>
        <div>{children}</div>
        <CookieConsent />
      </body>
    </html>
  );
}

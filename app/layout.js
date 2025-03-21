import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8712767354684493"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <div>{children}</div>
        <CookieConsent />
        <SpeedInsights />
      </body>
    </html>
  );
}

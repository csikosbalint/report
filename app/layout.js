import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import Script from "next/script";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8712767354684493"
        crossOrigin="anonymous"
      />
      <body>
        <div>{children}</div>
        <CookieConsent />
        <SpeedInsights />
      </body>
    </html>
  );
}

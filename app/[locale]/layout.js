import "./globals.css";
import { useMessages, useTimeZone } from "next-intl";
import { Manrope, Merriweather } from "next/font/google";

import { RootLayoutWrapper } from "components";
import { CookiesProvider } from "next-client-cookies/server";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Calibr | Generative AI Powered LMS, Learning Experience Platform",
  description:
    "Calibr offers unified Learning Experience Platform (LXP), Learning Management System (LMS) and a Generative AI powered course authoring platform. Book a Demo.",
};

export default function RootLayout({ children, params: { locale } }) {
  const timezone = useTimeZone();
  const messages = useMessages();

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${merriweather.variable} font-sans`}
    >
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00B36D" />
      </head>
      <body>
        <CookiesProvider>
          <RootLayoutWrapper
            locale={locale}
            messages={messages}
            timezone={timezone}
          >
            {children}
          </RootLayoutWrapper>
        </CookiesProvider>
      </body>
    </html>
  );
}

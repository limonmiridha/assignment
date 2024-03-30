"use client";
import { RecoilRoot } from "recoil";
import { NextIntlClientProvider } from "next-intl";

const RootLayoutWrapper = ({ children, locale, messages, timezone }) => {
  return (
    <div>
      <RecoilRoot>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone={timezone}
        >
          {children}
        </NextIntlClientProvider>
      </RecoilRoot>
    </div>
  );
};

export default RootLayoutWrapper;

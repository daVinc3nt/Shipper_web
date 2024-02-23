import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import { Libraries, LoadScript, LoadScriptProps } from "@react-google-maps/api";
import { Spinner } from "@material-tailwind/react";


const googleMapsLibraries: Libraries = ["places"];

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const messages = {
    vi,
    en,
  };
  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <LoadScript
          language={locale}
          region="VN"
          libraries={googleMapsLibraries}
          googleMapsApiKey={"AIzaSyDQ0pDRDKSyAO4lm10ttEXa2_uoZmWQzHc"}
        >
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </LoadScript>
      </IntlProvider>
    </>
  );
}

export default MyApp;

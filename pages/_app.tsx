import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import { Libraries, LoadScript, LoadScriptProps } from "@react-google-maps/api";
import { Spinner } from "@material-tailwind/react";
import {useState, useEffect} from "react"
import { StaffsOperation } from "@/TDLib/tdlogistics";
import Cookies from "js-cookie";
import { UserContext } from "@/context/InfoContext/UserContext";

const staff = new StaffsOperation
const googleMapsLibraries: Libraries = ["places"];

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [info, setInfo] = useState(null);
  const router = useRouter();
  const [value, setValue] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      if (res)
      {
        if (res.data?.role !== "AGENCY_SHIPPER")
          {
            Cookies.remove("connect.sid")
          }
        setInfo(res.data);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((prevValue) => !prevValue);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   console.log("cái này dùng để check xem còn cookie không");
  //   if (!Cookies.get("connect.sid")) {
  //     if (router.pathname != "/log" && router.pathname != "/") {
  //       router.push("/log");
  //     }
  //   }
  // }, [value]);

  useEffect(() => {
    console.log(info);
  }, [info]);
  const messages = {
    vi,
    en,
  };
  return (
    <>
    <UserContext.Provider value={{info, setInfo}}>
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
    </UserContext.Provider>
    </>
  );
}

export default MyApp;

import { useContext, useState } from "react";
import {useRouter } from "next/navigation";
import OTPField from "../OtpField";
import { StaffsAuthenticate, StaffsOperation } from "@/TDLib/tdlogistics";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { UserContext } from "@/context/InfoContext/UserContext";
const MobileLog = () => {
  interface FormValues {
    name?: string;
    pass?: string;
  }
  interface ErrorValues {
    nameEr: string;
    passEr: string;
  }
  
  const router = useRouter();
  const initialValues: FormValues = {  name: "", pass: ""};
  const initialValues2: ErrorValues = { nameEr: "", passEr: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  const [showOtp, setshowOtp] = useState(false);
  const [shake, setshake] = useState(false);
  const {info,setInfo} = useContext(UserContext);

  const buttonstyle = classNames(
    "mt-14 py-3 px-4  w-[calc(95%)] rounded-full text-white font-bold uppercase text-xs text-center block focus:outline-none cursor-pointer sm:mt-10 sm:text-sm transition duration-150",
    {
      ["bg-indigo-200 animate-shake"]: shake,
      ["bg-indigo-600"]: !shake,
    }
  );
  const handlePass = async (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, pass: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 2);
  };

  const handleName = async (change: string) => {
    const value = change
    const updatedFormValues = { ...formValues, name: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 1);
  };

  const signIn = async () =>{
    const {name, pass} = formValues;
    const {nameEr, passEr} = formErrors;
    handleName(name);
    console.log(nameEr)
    handlePass(pass);
    console.log(passEr)
    if (nameEr || passEr) {setshake(true); return}
      await adAuth();
  } 
  const adAuth = async () =>
  {
    const {name, pass} = formValues;
    if (!name || !pass)
      return null;
    const staffsAuthenticate = new StaffsAuthenticate();
    const staffsOperation= new StaffsOperation();
    await staffsAuthenticate.login(name, pass)
    .then(result => console.log(result))
    .catch(error => console.log(error))
    const res = await staffsOperation.getAuthenticatedStaffInfo();
    setInfo(res.data);
    router.push("/dashboard")
  }
  const validate = (values: FormValues, type: number)=> {
    var errors: string = "";
    // const NameRegex =/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/i;
    // const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/i;
    // const PhoneRegex = /^\d+$/;
    if (type == 1)
    {
      if ( !values.name) {
        formErrors.nameEr = "Thiếu tên mất rồi.";
      }
      else formErrors.nameEr ="";
    }

    if (type == 2)
    {
        if (!values.pass) {
        formErrors.passEr = "Thiếu password nè";
        }
        else formErrors.passEr ="";
    }
    if (!formErrors.nameEr && !formErrors.passEr)
    {;setshake(false);}
  };

  return (
    <div className="fixed z-50 inset-0 bg-whiteRedGradient w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-[calc(70%)]">
              <a href="/log" className="flex mb-6 text-4xl text-white font-bold">
                  TDLogistics  
              </a>
              <div className="w-full justify-center bg-white rounded-xl h-104 shadow flex items-center">
                <div>
                  <div className="selection:bg-indigo-500 selection:text-white">
                    <div className="flex justify-center items-center">
                      <div className="p-6 flex-1">
                        <div className="mx-auto overflow-hidden">
                          <div className="text-center">
                            <h1 className="text-4xl font-bold text-indigo-900">
                              XIN CHÀO!
                            </h1>
                            <form className="mt-10" action="" method="POST">
                              <div className="mt-10 relative">
                              <input
                                id="email"
                                name="email"
                                type="text"
                                className="peer h-10 w-full bg-white border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                                placeholder="john@doe.com"
                                onChange={(e) => handleName(e.target.value)} 
                              />
                              <label
                                htmlFor="email"
                                className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                              >
                                <FormattedMessage id="signin.username"/>
                              </label>
                              <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.nameEr}</p>
                              </div>
                              <div className="mt-10 sm:mt-10 relative">
                                <input
                                  type="tel"
                                  className=" peer h-10 w-full border-b-2 bg-white border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                                  placeholder="Số điện thoại"
                                  onChange={(e) => handlePass(e.target.value)}
                                />
                                <label
                                  htmlFor="password"
                                  className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                   <FormattedMessage id="signin.password"/>
                                </label>
                                <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.passEr}</p>
                              </div>
                            </form>

                            <button
                                onClick={signIn}
                                className={buttonstyle}
                              >
                                Xác thực SMS
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
    </div>
  );
};

export default MobileLog;
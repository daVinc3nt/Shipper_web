import { useState, useEffect } from "react";
import OTPField from "../OtpField/OtpField";
import { OTP, User } from "./fetching";
import classNames from "classnames";
import LoginLangSelector from "@/components/LangSelector/LoginLangSelector"
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";


const SignupForm = () => {
  interface FormValues {
    name: string;
    email: string;
    phoneNumber: string;
  }
  interface ErrorValues {
    nameEr: string;
    emailEr: string;
    phoneNumberEr: string;
  }
  let user, otpCode;
  const initialValues: FormValues = { name: "", email: "", phoneNumber: "" };
  const initialValues2: ErrorValues = { nameEr: "", emailEr: "", phoneNumberEr: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setformErrors] = useState<ErrorValues>(initialValues2);
  const [shake, setshake] = useState(false);
  const buttonstyle = classNames(
    "mt-7 py-3 px-4 w-[calc(95%)] rounded-full text-white font-bold uppercase text-xs text-center block w-calc(100%) focus:outline-none cursor-pointer sm:mt-10 sm:text-sm transition duration-150",
    {
      ["bg-indigo-200 animate-shake"]: shake,
      ["bg-indigo-600"]: !shake,
    }
  );
  const [showOtp, setshowOtp] = useState(false);
  const handleName = async (change: string) => {
    const value = change
    const updatedFormValues = { ...formValues, name: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 1);
    console.log(formErrors);
  };
  const handleEmail = async (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, email: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 2);
  };
  const handleNum = (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, phoneNumber: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 3);
  };
  const validate = (values: FormValues, type: number)=> {
    var errors: string = "";
    const NameRegex =/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/i;
    const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/i;
    const PhoneRegex = /^\d+$/;
    if (type == 1 && !values.name) {
      formErrors.nameEr = "Thiếu tên mất rồi.";
    }
    else if(!NameRegex.test(values.name.toLowerCase())) {
      formErrors.nameEr = "Mình ghi đầy đủ họ tên bạn nhé!";
    }
    else formErrors.nameEr ="";
    if (type == 2)
    {
        if (!values.email) {
        formErrors.emailEr = "Thêm email nữa nghen!";
      } else if (!EmailRegex.test(values.email)) {
        formErrors.emailEr = "Email không hợp lệ.";
      }
        else formErrors.emailEr ="";
    }
    if (type ==3 )
    {
      if (!values.phoneNumber) {
      formErrors.phoneNumberEr = "Nhập số điện thoại vào nè!";
    } else if (!PhoneRegex.test(values.phoneNumber)) {
      formErrors.phoneNumberEr= "Số này không hợp lệ rồi!";
    } else if (values.phoneNumber.length < 10) {
      formErrors.phoneNumberEr = "Hình như bạn nhập thiếu số nào rồi!";
    } else if (values.phoneNumber.length > 10) {
      formErrors.phoneNumberEr = "Bạn mình ơi, dư số nào rồi!";
    }
      else formErrors.phoneNumberEr ="";
    }
    if (!formErrors.phoneNumberEr && !formErrors.emailEr && !formErrors.nameEr)
    {setshake(false);}
  };
  const SignUp = () =>{
    const {name, email, phoneNumber} = formValues;
    handleName(name);
    handleEmail(email);
    handleNum(phoneNumber);
    const {nameEr, emailEr, phoneNumberEr} = formErrors;
    if ( nameEr !== "" || emailEr !== "" || phoneNumberEr !== "") {setshake(true);return;}
    else {
    setshowOtp(!showOtp);
    Auth();
    }
  }
  const Auth =() => {
    const {name, email, phoneNumber} = formValues;
    if (!name ||!email || !phoneNumber)
      return null;
    otpCode = new OTP(phoneNumber,email);
    user = new User(name, phoneNumber, email);
    // Send OTP
    otpCode.sendOTP()
    .then(message => console.log(message))
    .catch(error => console.log(error));
  }
  return (
    <div>
    <div className="pl-6">
          <LoginLangSelector/>
    </div>
    { !showOtp ? (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-4 sm:p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="text-center flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">
                <FormattedMessage id="signinpage.createaccount" />
              </h1>
              <form className="mt-5 w-5/6" action="" method="POST">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Name"
                    onChange={(e) =>handleName(e.target.value)} 
                  />
                  <label
                    htmlFor="name"
                    className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    <FormattedMessage id="signinpage.name" />
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.nameEr}</p>
                </div>
                <div className="mt-8 sm:mt-10 relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                    onChange={(e) => handleEmail(e.target.value)} 
                  />
                  <label
                    htmlFor="email"
                    className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.emailEr}</p>
                </div>
                <div className="mt-8 sm:mt-10 relative">
                  <input
                    type="tel"
                    className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Số điện thoại"
                    onChange={(e) => handleNum(e.target.value)} 
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    <FormattedMessage id="signinpage.phoneNumber" />
                  </label>
                  <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p>
                </div>
              </form>
              <button
                    onClick={SignUp}
                    className={buttonstyle}
                  >
                    <FormattedMessage id="signinpage.verify" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>) : (
      <div> 
      <div className="flex justify-center items-center">
       <div className="p-4 sm:p-8 flex-1">
         <div className="mx-auto overflow-hidden">
           <div className="text-center flex flex-col items-center">
             <h1 className="text-lg sm:text-5xl font-bold text-indigo-900">
                <FormattedMessage id="sms.wait" />
             </h1>

             <form className="mt-5 sm:mt-12 w-5/6" action="" method="POST">
               <OTPField 
               showOtp={showOtp}
               setshowOtp={setshowOtp}
               user = {user}
               otp = {otpCode}
              />
             </form>
           </div>
         </div>
       </div>
     </div>
   </div>
    )}
    </div>
  );
};

export default SignupForm;
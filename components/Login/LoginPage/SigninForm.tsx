import { useState, useEffect } from "react";
import {useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import OTPField from "../OtpField";
import { StaffsAuthenticate } from "@/TDLib/tdlogistics";
import CustomDropdown from "@/components/Common/dropdown";
import { OTP, User } from "./fetching";
import classNames from "classnames";
import LoginLangSelector from "@/components/LangSelector/LoginLangSelector"
import { FormattedMessage, useIntl, IntlShape, } from "react-intl";
const SigninForm = () => {
  const welcome = <FormattedMessage id="signup.welcome.message" />
  interface FormValues {
    email?: string;
    phoneNumber?: string;
    otp?: string;
    // optional
    role?: string;
    name?: string;
    pass?: string;
  }
  interface ErrorValues {
    emailEr: string;
    phoneNumberEr: string;
    nameEr: string;
  }
  let user, otpCode;
  const initialValues: FormValues = {  email: "", phoneNumber: "", otp: "", name:"", pass:""};
  const initialValues2: ErrorValues = { emailEr: "", phoneNumberEr: "" , nameEr: ""};
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<ErrorValues>(initialValues2);
  const [role, setRole]=useState("");
  const [showOtp, setshowOtp] = useState(false);
  const [shake, setshake] = useState(false);
  const router =useRouter();

  const buttonstyle = classNames(
    "mt-7 py-3 px-4  w-[calc(95%)] rounded-full text-white font-bold uppercase text-xs text-center block focus:outline-none cursor-pointer active:scale-110 sm:mt-10 sm:text-sm transition duration-150",
    {
      ["bg-indigo-200 animate-shake"]: shake,
      ["bg-indigo-600"]: !shake,
    }
  );
  const buttonstyle2 = classNames(
    "mt-7 py-3 px-4  w-[calc(95%)] rounded-full text-white font-bold uppercase text-xs text-center block focus:outline-none cursor-pointer active:scale-110 sm:mt-10 sm:text-sm transition duration-150 bg-indigo-600",
  );



  
  const handleEmail = async (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, email: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 2);
  };





  const handlePass = async (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, pass: value };
    setFormValues(updatedFormValues);
  };





  const handleNum = (change: string) => {
    const value = change;
    const updatedFormValues = { ...formValues, phoneNumber: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 3);
  };






  const handleName = async (change: string) => {
    const value = change
    const updatedFormValues = { ...formValues, name: value };
    setFormValues(updatedFormValues);
    validate(updatedFormValues, 1);
  };





  const signIn = async () =>{
    const {email, phoneNumber} = formValues;
    handleEmail(email);
    handleNum(phoneNumber);
    const {emailEr, phoneNumberEr} = formErrors;
    if (role !== "Admin"){
      if ( emailEr !== "" || phoneNumberEr !== "") {setshake(true);return;}
      else {
      setshowOtp(!showOtp);
      await staffAuth();
      }
    }
    else {
      await adAuth()
    }
  } 
  const adAuth = async () =>
  {
    const staffsAuthenticate = new StaffsAuthenticate();
    staffsAuthenticate.login(formValues.name, formValues.pass)
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }





  const staffAuth =() => {
    const {email, phoneNumber} = formValues;
    if (!email || !phoneNumber)
      return null;
    otpCode = new OTP(phoneNumber,email);
    // Send OTP
    console.log(otpCode);
    otpCode.sendOTP()
    .then(message => console.log(message))
    .catch(error => console.log(error));
  }







  const validate = (values: FormValues, type: number)=> {
    var errors: string = "";
    const NameRegex =/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/i;
    const EmailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/i;
    const PhoneRegex = /^\d+$/;
    if (role === "Admin")
    {
      if (type == 1 && !values.name) {
      formErrors.nameEr = "Thiếu tên mất rồi.";
    }
    else if(!NameRegex.test(values.name.toLowerCase())) {
      formErrors.nameEr = "Mình ghi đầy đủ họ tên bạn nhé!";
    }}
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
    if (!formErrors.phoneNumberEr && !formErrors.emailEr)
    {setshake(false);}
  };

  return (
    <div>
    <div className="pl-8">
      <LoginLangSelector/>
    </div>
    {
      !role ? 
      (<div className="selection:bg-indigo-500 selection:text-white">
        <div className="flex justify-center items-center">
          <div className="p-6 sm:p-8 flex-1">
            <div className="mx-auto overflow-hidden">
              <div className="text-center">
                <h1 className="text-2xl sm:text-5xl font-bold text-indigo-900 mb-10">
                  <FormattedMessage id="signup.whatRole" />
                </h1>
                <CustomDropdown
                  label="Chọn"
                  options={["Admin", "Staff"]}
                  selectedOption={formValues.role ? formValues.role :""}
                  onSelectOption={value =>{setRole(value)}}
                />
              </div>
            </div>
          </div>
        </div>
      </div> 
      ):(
        role === "Admin" ? 
        (
          <div className="selection:bg-indigo-500 selection:text-white">
            <div className="flex justify-center items-center">
              <div className="p-6 sm:p-8 flex-1">
                <div className="mx-auto">
                  <div className="text-center">
                    <h1 className="text-2xl sm:text-5xl font-bold text-indigo-900">
                      <FormattedMessage id="signup.welcomeboss.message" />
                    </h1>
                    <form className="mt-5 sm:mt-12" action="" method="POST">
                      <div className="mt-5 sm:mt-10 relative">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className="peer h-10 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                        placeholder="john@doe.com"
                        onChange={(e) => handleName(e.target.value)} 
                      />
                      <label
                        htmlFor="email"
                        className=" absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        <FormattedMessage id="signup.username"/>
                      </label>
                      {/* <p className="text-red-500 fixed mt-1 text-xxs sm:text-sm">{formErrors.emailEr}</p> */}
                      </div>
                      <div className="mt-5 sm:mt-10 relative">
                        <input
                          type="tel"
                          className=" peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                          placeholder="Số điện thoại"
                          onChange={(e) => handlePass(e.target.value)} 
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          <FormattedMessage id="signup.password"/>
                        </label>
                        {/* <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p> */}
                      </div>
                    </form>
                    <div className="flex gap-4">
                    <button
                          onClick={e => setRole("")}
                          className={buttonstyle2}
                        >
                          <FormattedMessage id="sms.getback" />
                      </button>
                      <button
                          onClick={signIn}
                          className={buttonstyle}
                        >
                          <FormattedMessage id="signup.verify" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ):(
          !showOtp ? (
          <div className="selection:bg-indigo-500 selection:text-white">
            <div className="flex justify-center items-center">
              <div className="p-6 sm:p-8 flex-1">
                <div className="mx-auto overflow-hidden">
                  <div className="text-center">
                    <h1 className="text-2xl sm:text-5xl font-bold text-indigo-900">
                      <FormattedMessage id="signup.welcome.message" />
                    </h1>
                    <form className="mt-5 sm:mt-12" action="" method="POST">
                      <div className="mt-5 sm:mt-10 relative">
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
                      <div className="mt-5 sm:mt-10 relative">
                        <input
                          type="tel"
                          className=" peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                          placeholder="Số điện thoại"
                          onChange={(e) => handleNum(e.target.value)} 
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-xs sm:text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          <FormattedMessage id="signup.phonenumber"/>
                        </label>
                        <p className="text-red-500 fixed mt-2 text-xxs sm:text-sm">{formErrors.phoneNumberEr}</p>
                      </div>
                    </form>
                    <div className="flex gap-4">
                    <button
                          onClick={e => setRole("")}
                          className={buttonstyle2}
                        >
                          <FormattedMessage id="sms.getback" />
                      </button>
                      <button
                          onClick={signIn}
                          className={buttonstyle}
                        >
                          <FormattedMessage id="signup.verify" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            ):(
              <div className="flex justify-center items-center">
              <div className="p-4 sm:p-8 flex-1 mx-auto overflow-hidden text-center flex flex-col items-center"> 
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
          // <div> 
          //    <div className="flex justify-center items-center">
          //     <div className="p-6 sm:p-8 flex-1">
          //       <div className="mx-auto overflow-hidden">
          //         <div className="text-center">
          //           <h1 className="text-xl sm:text-5xl font-bold text-indigo-900">
          //             <FormattedMessage id="sms.wait" />
          //           </h1>
          //           <form className="mt-5 sm:mt-12" action="" method="POST">
          //             <OTPField 
          //             showOtp={showOtp}
          //             setshowOtp={setshowOtp}
          //             user = {user}
          //             otp = {otpCode}
          //          />
          //           </form>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          )
        )
      )
    }
    </div>
  );
};

export default SigninForm;

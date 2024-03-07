import { UsersAuthenticate , StaffsAuthenticate, UsersOperation } from "./tdlogistics";

const phoneNumber = "0981430418";
const email = "minh.luxuanhcmut.edu.vn";
const otp = "8647";

const usersAuthenticate = new UsersAuthenticate();
usersAuthenticate.verifyOTP(phoneNumber, email, otp)
.then(result => console.log(result))
.catch(error => console.log(error));

const staffsAuthenticate = new StaffsAuthenticate();
const username = "ntdung@tdlogistics";
const password = "NTDung@tdlogistics2k24";


staffsAuthenticate.login(username, password)
.then(result => console.log(result))
.catch(error => console.log(error));

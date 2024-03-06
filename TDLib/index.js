"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tdlogistics_1 = require("./tdlogistics");
var phoneNumber = "0981430418";
var email = "minh.luxuanhcmut.edu.vn";
var otp = "8647";
var usersAuthenticate = new tdlogistics_1.UsersAuthenticate();
usersAuthenticate.verifyOTP(phoneNumber, email, otp)
    .then(function (result) { return console.log(result); })
    .catch(function (error) { return console.log(error); });
var staffsAuthenticate = new tdlogistics_1.StaffsAuthenticate();
var username = "ntdung@tdlogistics";
var password = "NTDung@tdlogistics2k24";
staffsAuthenticate.login(username, password)
    .then(function (result) { return console.log(result); })
    .catch(function (error) { return console.log(error); });

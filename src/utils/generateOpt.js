// Generate OTP
let  generateOTP = () => Math.floor(100000 + Math.random() * 900000);

export default generateOTP;
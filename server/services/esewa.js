const CryptoJS = require('crypto-js');


exports.createSignature = (message) => {
    const secret = process.env.ESEWA_SECRET;

    
    const hash = CryptoJS.HmacSHA256(message, secret);

    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    return hashInBase64;
}

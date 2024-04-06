const nodemailer = require('nodemailer');

exports.sendMail = async(gmail)=>{
  const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: {
        name:"GoBuy",
        address:process.env.MAIL
    },
    to: gmail,
    subject: "User Registration",
    // text: "user register successfully",
    html:` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Content</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                padding: 20px;
            }
            .button {
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Our Website!</h1>
        <p>Thank you for registering with us.</p>
 
    </body>
    </html>
  `, 
  }


  const sendGmail = async(transporter, mailOptions)=>{
    try{
         await transporter.sendMail(mailOptions);
         console.log('Email is send successfully');
    }
    catch(error){
         console.log("not send email");
    }
  }
   return sendGmail(transporter, mailOptions);
}
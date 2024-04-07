const nodemailer = require('nodemailer');

exports.orderStatus = async(data)=>{
    const gmail = data.email;
    console.log(gmail);
    const status = data.status;
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
    subject: "Order Status",
    // text: "user register successfully",
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Status</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                color: #333;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
                color: #007bff;
                margin-bottom: 20px;
            }
            .message {
                margin-bottom: 20px;
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
        <div class="container">
            <h1>Order Status Update</h1>
    
            <div class="message">
                <p>Your order has been <strong>${status}</strong> and is on its way to you.</p>
            </div>
        </div>
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
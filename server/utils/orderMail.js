const nodemailer = require('nodemailer');

exports.orderMail = async (file) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS,
        },
    });

    const original_data = file.data;
    const gmail = file.selectedAddress.email;

    // Generate HTML for orders
    const orderHTML = original_data.map(order => `
        <div class="order">
            <div class="order-header">
                <h2>Order #${order.product.id}</h2>
            </div>
            <div class="order-details">
                <p>Product: ${order.product.title}</p>
                <p>Price: $${order.product.price}</p>
                <p>Quantity: ${order.quantity}</p>
                <p>Image: ${order.product.thumbnail}</p>
            </div>
        </div>
    `).join('');

    const mailOptions = {
        from: {
            name: "GoBuy",
            address: process.env.MAIL
        },
        to: gmail,
        subject: "Order Confirmation",
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Multiple Orders Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                        color: #333;
                    }
                    .order {
                        margin-bottom: 30px;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .order-header {
                        margin-bottom: 10px;
                    }
                    .order-details {
                        margin-bottom: 20px;
                    }
                    .address {
                        margin-top: 20px;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    h1 {
                        color: #007bff;
                    }
                    h2 {
                        color: #555;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <h1>Orders Confirmation</h1>
                
                <!-- Orders Section -->
                ${orderHTML}
                
                <!-- Shipping Address Section -->
                <div class="address">
                    <h2>Shipping Address</h2>
                    <p>Name: ${file.selectedAddress.fullname}</p>
                    <p>Street: ${file.selectedAddress.street}</p>
                    <p>Details: ${file.selectedAddress.province}-${file.selectedAddress.city}-${file.selectedAddress.zipcode}</p>
                    <p>Country: ${file.selectedAddress.country}</p>
                    <p>TotalPrice: ${file.totalPrice}</p>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error("Failed to send email:", error);
    }
};

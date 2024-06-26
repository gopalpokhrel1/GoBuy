const axios = require("axios");

exports.callKhalti = async (formData, req, res) => {
  try {
  

    const headers = {
      Authorization: `key ${process.env.KHALTI_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      formData,
      {
        headers,
      }
    );
    
    res.json(response.data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message });
  }
};

exports.handleKhaltiCallback = async (req, res, next) => {
  try {
    const { txnId, pidx, amount, purchase_order_id, transaction_id, message } =
      req.query;
 
      // res.redirect(`https://test-pay.khalti.com/wallet?pidx=${pidx}`);

    // if (message) {
    //   return res
    //     .status(400)
    //     .json({ error: message || "Error Processing Khalti" });
    // }
        
    const headers = {
      Authorization: `key ${process.env.KHALTI_KEY}`,
      "Content-Type": "application/json",
    };

   

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );
    if (response.data.status !== "Completed") {
      return res.status(400).json({ error: "Payment not completed" });
    }
    res.redirect(`https://gobuy.netlify.app/order-success/${transaction_id}`);
  
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err?.message || "Error Processing Khalti" });
  }
};

const { User } = require("../models/UserModel");
const bcrypt = require('bcrypt');

const { generate_jwt } = require("../utils/generateJwt");

exports.createUser = async (req, res) => {
    const salt_round = process.env.SALT_ROUND;

    try {
        const { email, password, address, role } = req.body;
        const existing_user = await User.findOne({ email: email });

        if (existing_user) {
            return res.status(400).json({ message: "Email already used" })
        }

        const hash_pass = await bcrypt.hash(password, +salt_round);

        const user = await new User({
            email: email,
            password: hash_pass,
            address: address,
            role:role
        })

        await user.save();

        res.status(201).json({ message: "User created successfully" });
    }

    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
 
    try {

        if (!(email && password)) {
            res.status(400).json({ message: "Enter the email and password" });
        }

        const data = await User.findOne({ email: email });

       if(data){
        if (data.email == email) {
            const compare_pass = await bcrypt.compare(password, data.password);

            if (compare_pass) {
                const token = await generate_jwt(data);
              

              data.password= undefined;
              data.token = token;

               return res.status(200).json(data);
            }
            else {
             return res.status(400).json({message:"Invalid password"});
            }
        }
        }
        else {
           return res.status(400).json({ message: "wrong credentails" })
        }

    }

    catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }


}
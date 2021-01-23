const {
    create,
    getUserByUserEmail,
    getUsers,
    updateUser
  } = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: "Database connection errror"
              });
            }
            return res.status(200).json({
              success: 1,
              data: results
            });
          });
    },
    login: (req , res) =>{
      const body = req.body;
      console.log("call loging method");
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
          });
        }else {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
      });
    },
    updateUsers: (req , res) =>{

    }
};
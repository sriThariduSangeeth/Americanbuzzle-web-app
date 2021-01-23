const {
    create,
    allPosts,
    updatePost
  } = require("./newspost.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {

    createNewPost: (req , res) =>{
        const body = req.body;
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
    getAllPost: (req , res)=>{
        const body = req.body;
        allPosts(body, (err, results) => {
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
    getAllPostByDate: (req , res)=>{

    }
};
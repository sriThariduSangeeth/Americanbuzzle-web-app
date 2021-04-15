const fs = require('fs');
const {
    create,
    allPosts,
    testPost,
    updatePost,
    getCategory,
    getPostCategoryId,
} = require("./newspost.service");


module.exports = {

    createNewPost: (req, res) => {
        const img = req.files.postImg[0];
        const body = JSON.parse(req.body.newpost);
        console.log(body);
        create(img, body, (err, results) => {
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
    getAllPost: (req, res) => {
        allPosts((err, results) => {
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
    getAllPostByDate: (req, res) => {
        testPost(body, (err, results) => {
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
    getTestPost: (req, res) => {
        const file = fs.readFileSync(req.file.path);
        testPost(file, (err, results) => {
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
    getAllCategory: (req, res) => {
        getCategory((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    getPostByCategoryId: (req, res) => {
        getPostCategoryId((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
};
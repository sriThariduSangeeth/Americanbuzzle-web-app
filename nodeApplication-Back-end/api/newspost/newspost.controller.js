const fs = require('fs');
const {
    create,
    allPosts,
    testPost,
    updatePost,
    getCategory,
    getPostCategoryId,
} = require("./newspost.service");

const winston = require('winston');
const winstonConfig = require('../../config/winston-config');
let defaultLogger = winstonConfig.defaultLogger;

function getAllPost(req, res) {
    defaultLogger.info('getting all post informationss...');
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
}

function createNewPost(req, res) {
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
}

function getAllPostByDate(req, res) {
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
}

function getAllCategory(req, res) {
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
}

function getPostByCategoryId(req, res) {
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
}

module.exports = {
    getAllPost,
    createNewPost,
    getAllPostByDate,
    getAllCategory,
    getPostByCategoryId,
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
};
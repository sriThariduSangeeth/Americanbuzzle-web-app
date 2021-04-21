const {
    create,
    getUserByUserEmail,
    getUsers,
    updateUser
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const winston = require('winston');
const winstonConfig = require('../../config/winston-config');
let defaultLogger = winstonConfig.defaultLogger;

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        defaultLogger.info('Create New User...');
        create(body, (err, results) => {
            if (err) {
                defaultLogger.error(err.body);
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
    login: (req, res) => {
        const body = req.body;
        defaultLogger.info(req.body.userName + " Trying to Login.")
        getUserByUserEmail(body.userName, (err, results) => {
            if (err) {
                console.log(err);
                defaultLogger.error(err.body);
            }
            if (!results) {
                return res.status(402).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.userPassword, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "3h"
                });
                return res.status(200).json({
                    token: jsontoken,
                    user: results.uname,
                    userEmail: results.email

                });
            } else {
                return res.status(401).json({
                    data: "Invalid email or password"
                });
            }
        });
    },
    updateUsers: (req, res) => {

    }
};
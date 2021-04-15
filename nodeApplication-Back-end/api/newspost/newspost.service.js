const pool = require("../../config/dbconfig");

module.exports = {
    create: (img, data, callBack) => {
        pool.query(
            `insert into postobj(titel, discriptions, startdate, enddate,img, imgname, posturl) 
                      values(?,?,?,?,?,?,?)`, [
                data.titel,
                data.discriptions,
                data.startdate,
                data.enddate,
                img.path,
                img.filename,
                data.posturl,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    allPosts: callBack => {
        pool.query(
            `select * from postobj`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    testPost: (data, callBack) => {

        console.log(data);
        var results = "hello";

        return callBack(null, results);
    },
    getCategory: callBack => {
        pool.query(
            `select * from category`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPostCategoryId: (data, callBack) => {
        pool.query(
            `select * from category`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
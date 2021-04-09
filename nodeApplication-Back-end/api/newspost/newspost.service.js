const pool = require("../../config/dbconfig");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into postobj(titel, discriptions, startdate, enddate, imgname, imgurl) 
                      values(?,?,?,?,?,?)`, [
                data.titel,
                data.discriptions,
                data.startdate,
                data.enddate,
                data.imgname,
                data.imgurl
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
    testPost: callBack => {

        var results = "hello";

        return callBack(null, results);
    }
}
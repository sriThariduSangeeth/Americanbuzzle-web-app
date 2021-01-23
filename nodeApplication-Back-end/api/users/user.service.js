const pool = require("../../config/dbconfig");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users(uname, email, password) 
                      values(?,?,?)`,
            [
              data.uname,
              data.email,
              data.password
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },
    getUserByUserEmail:(email, callBack) =>{
      pool.query(
        `select * from users where email = ?`,
        [email],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    }
}
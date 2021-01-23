const e = require("express");

class User{
    constructor(id,uname ,email, password){
        this.id = id;
        this.email = email;
        this.uname = uname;
        this.password = password;
    }
}
module.exports = User;
const e = require("express");

class PostObj{
    constructor(id,titel, discriptions, startdate, enddate, imgname, imgurl){
        this.id = id;
        this.titel = titel;
        this.discriptions = discriptions;
        this.startdate = startdate;
        this.enddate = enddate;
        this.imgname = imgname;
        this.imgurl = imgurl;
    }
}
module.exports = PostObj;
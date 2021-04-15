import { shareReplay } from "rxjs/operators";

export class Post {

    public titel: string;
    public discriptions: String;
    public category: number;
    public startdate: string;
    public enddate: string;
    public imgname: string;
    public posturl: string;

    constructor(titel: string, discriptions: string, category: number, startdate: string, enddate: string, imgname: string, posturl: string) {
        this.titel = titel;
        this.discriptions = discriptions;
        this.category = category;
        this.startdate = startdate;
        this.enddate = enddate;
        this.imgname = imgname;
        this.posturl = posturl;
    }

}
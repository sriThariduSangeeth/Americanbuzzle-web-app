import { shareReplay } from "rxjs/operators";

export class Post {

    public titel: string;
    public discriptions: String;
    public catid: number;
    public category: string;
    public startdate: string;
    public enddate: string;
    public imgname: string;
    public img: string;
    public posturl: string;

    constructor(titel: string, discriptions: string, catid: number, category: string, startdate: string, enddate: string, imgname: string, img: string, posturl: string) {
        this.titel = titel;
        this.discriptions = discriptions;
        this.catid = catid;
        this.category = category;
        this.startdate = startdate;
        this.enddate = enddate;
        this.imgname = imgname;
        this.img = img;
        this.posturl = posturl;
    }

}
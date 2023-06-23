import {Moment} from "moment";

export interface Announcement {
    id:string;
    syndicateUserId:string;
    title:string;
    graphicPath:string;
    redirectUrl:string;
    startDate:Moment;
    endDate:Moment;
    status:number;
}

export interface AnnouncementCreate {
    syndicateUserId:string;
    title:string;
    graphicPath:string;
    redirectUrl:string;
    startDate:Moment;
    endDate:Moment;
    status:number;
}

export interface AnnouncementUpdate {
    id:string;
    syndicateUserId:string;
    title:string;
    graphicPath:string;
    redirectUrl:string;
    startDate:Moment;
    endDate:Moment;
    status:number;
}

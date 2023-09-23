import {Moment} from "moment";

export interface Announcement {
    id:string;
    syndicateUserId:string;
    title:string;
    graphicPath:string;
    redirectUrl:string;
    startDate:Moment;
    startDateString:string;
    endDate:Moment;
    endDateString:string;
    status:number;
    description:string;
    utcOffset:string;
    
}

export interface AnnouncementCreate {
    syndicateUserId:string;
    title:string;
    graphicPath:string;
    redirectUrl:string;
    startDate:Moment;
    endDate:Moment;
    status:number;
    description:string;
    utcOffset:string;
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
    description:string;
    utcOffset:string;
}

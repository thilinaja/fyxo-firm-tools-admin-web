import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { Announcement } from '../module/announcement';
import { BaseResponseModel } from '../basemodels/baseresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  public GetAllAnnouncement(): Observable<Announcement[]> {
    return this.http
      .get<Announcement[]>(
        environment.api + '/Announcements',
        {
          params:{
            code: environment.apiCode,
            sid: environment.siu
          }
        }
      )
      .pipe(
        take(1),
        map((value) => {
          return value;
        })
      );
  }

  public CreateAnnouncement(obj: any){
    return this.http
      .post<BaseResponseModel<Announcement>>(
        environment.api + '/AnnouncementsCreate/' + '?code=' + environment.apiCode +
        '&sid=' + environment.siu,
        obj
      )
      .pipe(
        take(1),
        map((value) => {
          return true;
        })
      );
  }

  public UpdateAnnouncement(obj: any){
    return this.http
      .post<BaseResponseModel<Announcement>>(
        environment.api + '/AnnouncementsUpdate/' +
        '?code=' + environment.apiCode +
        '&sid=' + environment.siu,
        obj
      )
      .pipe(
        take(1),
        map((value) => {
          return true;
        })
      );
  }

  public DeleteAnnouncement(announcementId: string){
    return this.http
      .post<BaseResponseModel<Announcement>>(
        environment.api + '/AnnouncementsDelete/' + 
        '?code=' + environment.apiCode +
      '&sid=' + environment.siu +
      '&aid=' + announcementId,
        null
      )
      .pipe(
        take(1),
        map((value) => {
          return true;
        })
      );
  }

  public postProjectFile(formData:any){

    //const formData = new FormData();
    //formData.append('file', file);
    var uploadedId = '';

    return this.http
      .post(
        environment.api + '/File',
        formData
      )
      .pipe(
        take(1),
        map((value) => {
          return value;
        })
      );

  }

  public getAnnouncement(id:string):Observable<Announcement>{
    return this.http
      .get<Announcement>(
        environment.api + '/AnnouncementsDetails',
        {
          params:{
            code: environment.apiCode,
            sid: environment.siu,
            aid: id
          }
        }
      )
      .pipe(
        take(1),
        map((value) => {
          return value;
        })
      );
  }

  public Pause(id:string):Observable<boolean>{
    return this.http
      .post<boolean>(environment.api + '/AnnouncementsSetStatus/'+
      '?code=' + environment.apiCode +
      '&sid=' + environment.siu +
      '&aid=' + id +
      '&status=3',
      null
       )
      .pipe(
        take(1),
        map((value) => {
          return value;
        })
      );
  }

  public Play(id:string):Observable<boolean>{
    return this.http
      .post<boolean>(environment.api + '/AnnouncementsSetStatus/'+
      '?code=' + environment.apiCode +
      '&sid=' + environment.siu +
      '&aid=' + id +
      '&status=1',
      null
      )
      .pipe(
        take(1),
        map((value) => {
          return value;
        })
      );
  }
}

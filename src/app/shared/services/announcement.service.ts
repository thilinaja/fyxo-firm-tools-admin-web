import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
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
      .get<BaseResponseModel<Announcement[]>>(environment.base_url + '/Announcement/get/' + environment.siu)
      .pipe(
        take(1),
        map((value) => {
          return value.data;
        })
      );
  }

  public CreateAnnouncement(obj: any){
    return this.http
      .post<BaseResponseModel<Announcement>>(
        environment.base_url + '/Announcement/create/' + environment.siu,
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
        environment.base_url + '/Announcement/update/' + environment.siu,
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
        environment.base_url + '/Announcement/delete/' + environment.siu + '/' + announcementId,
        null
      )
      .pipe(
        take(1),
        map((value) => {
          return true;
        })
      );
  }

  public postProjectFile(formData:any):boolean{

    //const formData = new FormData();
    //formData.append('file', file);

    this.http.post(environment.base_url + '/File', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress){

        }
         
        else if (event.type === HttpEventType.Response) {
         
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });

    return true;
  }

  public getAnnouncement(id:string):Observable<Announcement>{
    return this.http
      .get<BaseResponseModel<Announcement>>(environment.base_url + '/Announcement/get/' + environment.siu + '/' + id)
      .pipe(
        take(1),
        map((value) => {
          return value.data;
        })
      );
  }
}

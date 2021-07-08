import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import { _throw } from 'rxjs/observable/throw';

import { ApplicationConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constants = ApplicationConstants;
  constructor(private http: HttpClient) { }

  uploadFile(file) {


    console.log("uploadFile Service >>>",file)

    const fd = new FormData()
    fd.append('image',file)

    var jsonObj:any = {}
    jsonObj.fileSource = file.fileSource
    jsonObj.storyid = file.storyid


    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.UPLOAD_PHOTO_URL;
    let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");  
  
      return this.http.post<any>(_url, JSON.stringify(jsonObj), {headers:headers})
      .pipe(
        // retry(2), 
        catchError(this.handleError) 
        ).finally(() => {
          //this.spinner.emit(false);	
          });
    }

    deleteFile(reqJson) :Observable<any>{

      let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.DELETE_PHOTO_BY_ID_URL;
      let headers = new HttpHeaders();
        headers = headers.set("Content-Type", "application/json");  
    
        return this.http.post<any>(_url,reqJson,{headers:headers})
        .pipe(
          retry(2), 
          catchError(this.handleError) 
          ).finally(() => {
            //this.spinner.emit(false);	
            });

    }

    handleError(error: HttpErrorResponse) {
      return throwError(error.message || "Server Error")
    }
}

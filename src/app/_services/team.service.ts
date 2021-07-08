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
export class TeamService {

  constants = ApplicationConstants;
  constructor(private http: HttpClient) { }

  getTeamList() :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_TEAM_LIST;
    //this.spinner.emit(true);
    console.log(" STORY URL >>>>"+_url)
     return this.http.get<any>(_url)
     .pipe(
      retry(3), 
      catchError(this.handleError) 
    ).finally(() => {
     //this.spinner.emit(false);	
     });
    }

  getTeamById(reqJson) :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.FETCH_TEAM_DETAILS;

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

    addTeam(reqJson) :Observable<any> {

        let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.ADD_TEAM_DETAILS;
    
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
  

    updateTeam(reqJson) :Observable<any> {

      let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.UPDATE_TEAM_DETAILS;
  
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


  removeTeam(reqJson) :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.REMOVE_TEAM;

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

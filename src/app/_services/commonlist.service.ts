import { Injectable ,Output , EventEmitter,Inject} from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApplicationConstants } from '../app.constants';
import { CommonList } from '../_model/common';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import { _throw } from 'rxjs/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class CommonlistService {

  
  constants = ApplicationConstants;
  constructor(private http: HttpClient) { }

  getDepartmentList() :Observable<CommonList[]> {

    let _url = this.constants.GET_DEPARTMENT_LIST;
    return this.http.get<CommonList[]>(_url)
    .pipe(
     retry(3), 
     catchError(this.handleError) 
   );
   }

   getDistrictList() :Observable<CommonList[]> {

    let _url = this.constants.GET_DISTRICT_LIST;
    return this.http.get<CommonList[]>(_url)
    .pipe(
     retry(3), 
     catchError(this.handleError) 
   );
   }

   handleError(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
}

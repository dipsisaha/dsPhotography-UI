import { Injectable ,Output , EventEmitter,Inject} from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApplicationConstants } from '../app.constants';
import { DesignationList } from '../_model/designation';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import { _throw } from 'rxjs/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  @Output() public spinner:EventEmitter<boolean>=null;

  constants = ApplicationConstants;
  
  constructor(private http: HttpClient) { }
  
  getDesignationList() :Observable<DesignationList[]> {

    let _url = this.constants.GET_DESIGNATION_LIST;
    return this.http.get<DesignationList[]>(_url)
    .pipe(
     retry(3), 
     catchError(this.handleError) 
   );
   }


   addDesignation(reqJson): Observable<any> {
    this.spinner.emit(true);
    let _url = "/"+this.constants.ADD_DESIGNATION;

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");       
  
    return this.http.post(_url,reqJson,{headers:headers})
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

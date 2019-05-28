import { Injectable,Output , EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EmployeeList } from '../_model/employee';
import { ApplicationConstants } from '../app.constants';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import { _throw } from 'rxjs/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  @Output() public spinner:EventEmitter<boolean>=null;

  constants = ApplicationConstants;
  constructor(private http: HttpClient) { }

  getEmployeeList() :Observable<EmployeeList[]> {

   let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_EMPOLYEE_LIST;
   //this.spinner.emit(true);
   console.log("EMPLOYEE LIST >>>>"+_url)
    return this.http.get<EmployeeList[]>(_url)
    .pipe(
     retry(3), 
     catchError(this.handleError) 
   ).finally(() => {
    //this.spinner.emit(false);	
    });
   }

   addEmployee(reqJson): Observable<any> {
    //this.spinner.emit(true);
    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.ADD_EMPLOYEE;
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");    
console.log(" with in addEmployee service")
console.log(reqJson)
    return this.http.post<any>(_url,reqJson,{headers:headers})
      .pipe(
    retry(2), 
    catchError(this.handleError) 
   ).finally(() => {
    // this.spinner.emit(false);	
     });
 } 

 addEmployeeDetails(reqJson): Observable<any> {

  let empId = sessionStorage.getItem("empId") 
  //this.spinner.emit(true);
  let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.ADD_EMPLOYEE_DETAILS+"/"+empId;
  let headers = new HttpHeaders();
  headers = headers.set("Content-Type", "application/json");       

  return this.http.put<EmployeeList[]>(_url,reqJson,{headers:headers})
    .pipe(
  retry(2), 
  catchError(this.handleError) 
 ).finally(() => {
  // this.spinner.emit(false);	
   });
} 


fetchEmployeeDetails(reqJson): Observable<any> {
  //this.spinner.emit(true);
  let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.FETCH_EMPLOYEE_DETAILS;
  let headers = new HttpHeaders();
  headers = headers.set("Content-Type", "application/json");    
  return this.http.post<any>(_url,reqJson,{headers:headers})
    .pipe(
  retry(2), 
  catchError(this.handleError) 
 ).finally(() => {
  // this.spinner.emit(false);	
   });
} 

   handleError(error: HttpErrorResponse) {
     return throwError(error.message || "Server Error")
   }
}

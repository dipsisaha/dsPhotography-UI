import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { ProjectService } from '../_services/project.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constants = ApplicationConstants;

  public listdata=[];
  public errorMsg;

  order: string = 'empID';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;

  pagination={"itemsPerPage":15 , "currentPage":1}

  constructor(private _projService:ProjectService,private router: Router) { }

  ngOnInit() {
    // this._projService.getEmployeeList()
    //                .subscribe(data =>this.listdata   = data,
    //                           error =>this.errorMsg  = error ); 

    // console.log("EMployee List>>>>>>>>>>>")
    // console.log(this.listdata)
  }
  navigateToAddProject(){  	
      this.router.navigate(["/"+this.constants.ORG_USER+"/addProject"]);
  }

  setOrder(value: string,type:string,reverse) {
    
    if(typeof this.reverse[value] == 'undefined'){
    	this.orderType = type;    	
    	this.order = value;
    	this.reverseOrder = true;
    	this.reverse[value] = true;
    	return true
    }
   
   	this.orderType = type;   	
    this.reverse[value] = !this.reverse[value];
    this.reverseOrder = this.reverse[value];
   
    this.order = value;
   
  }

}

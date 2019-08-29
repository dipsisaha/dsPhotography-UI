import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { CmsService } from '../_services/cms.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-cms-list',
  templateUrl: './cms-list.component.html',
  styleUrls: ['./cms-list.component.css']
})
export class CmsListComponent implements OnInit {

  constants = ApplicationConstants;

  public listdata=[];
  public errorMsg;

  order: string = 'empID';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;

  pagination={"itemsPerPage":15 , "currentPage":1}


  constructor(private _cmsService:CmsService,private router: Router) { }

  ngOnInit() {

    this._cmsService.getCmsList()
                    .subscribe(data =>{
                      console.log(data)
                                this.listdata   = data.msg
                                },
                               error =>this.errorMsg  = error );
  }

  openDetails(type){
    this.router.navigate(["/"+this.constants.ORG_USER+"/cms/"+type]);
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

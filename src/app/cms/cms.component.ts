import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { CmsService } from '../_services/cms.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

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

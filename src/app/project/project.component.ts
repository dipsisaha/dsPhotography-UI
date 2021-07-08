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
    this._projService.getProjectList()
                   .subscribe(data =>this.listdata   = data.msg,
                              error =>this.errorMsg  = error ); 

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

  editStory(id){
    this.router.navigate(["/"+this.constants.ORG_USER+"/editProject/"+id]);
  }

  deleteStory(id){

    let requestJson = {};
    requestJson['id'] =   id  

    this._projService.removeProject(requestJson)
                         .subscribe(data =>{
                                       if(data.success){
                                         alert("Story deleted successfully")
                                        window.location.reload();
                                       }

                                  
                                    },
                                    error =>this.errorMsg  = error );
  }

  addPhoto(id) {
    this.router.navigate(["/"+this.constants.ORG_USER+"/addPhoto/"+id]);
  }

}

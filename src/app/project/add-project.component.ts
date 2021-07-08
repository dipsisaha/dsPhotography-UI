import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,RouterStateSnapshot,ActivatedRoute } from '@angular/router';

import { ApplicationConstants } from '../app.constants';

import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constants = ApplicationConstants;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  //mycontent: string;
  log: string = '';
  mycontent = {};
  model={}
  public errorMsg;
  @ViewChild("myckeditor") ckeditor: any;

  currentURL='';

  constructor(private router: Router,private _projectService:ProjectService,private route: ActivatedRoute) {
    //this.mycontent = `<p>My html content</p>`;
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'div',
      forcePasteAsPlainText: true
    };

    this.currentURL = window.location.pathname; 

    if (this.currentURL != "/"+this.constants.ORG_USER+"/addProject") {

      let requestJson = {};

      requestJson['id'] = this.route.snapshot.params.projectId;

      this._projectService.getProjectById(requestJson)
      .subscribe(data =>{
                     this.model   = data.msg[0];
                     this.model["id"] = data.msg[0]["_id"]
                     this.mycontent = this.model['description'];
               
                 },
                 error =>this.errorMsg  = error );

    }


  }

  submit(){

    let requestJson = {};

    requestJson['title'] = this.model['title'];
    requestJson['description'] = this.mycontent;
    requestJson['id'] = this.model['id'];

   
    console.log(requestJson)

    if(!this.model['id']) {

      this._projectService.addProject(requestJson)
    .subscribe(res =>{
               console.log(res)
               if(res.success) {
                 //alert(res.msg)
                 //alert("CMS details updated sucessfully")
                 this.router.navigate(["/"+this.constants.ORG_USER+"/project"]);
               } else {
                alert("Project Details can't be added")
               }
               },
               error =>this.errorMsg  = error ); 
    } else {

      this._projectService.updateProject(requestJson)
      .subscribe(res =>{
                 console.log(res)
                 if(res.n == 1) {
                   //alert(res.msg)
                   //alert("CMS details updated sucessfully")
                   this.router.navigate(["/"+this.constants.ORG_USER+"/project"]);
                 } else {
                  alert("Project Details can't be updated")
                 }
                 },
                 error =>this.errorMsg  = error ); 

    }

    
    
  }

  backToProjectList(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/project"]);
  }
}

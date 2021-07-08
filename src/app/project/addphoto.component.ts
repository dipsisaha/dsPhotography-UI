import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot ,ActivatedRoute} from '@angular/router';
import { UploadService } from '../_services/upload.service';
import {HttpClient} from '@angular/common/http'
import { ProjectService } from '../_services/project.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { ApplicationConstants } from '../app.constants';


@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.css']
})
export class AddphotoComponent implements OnInit {

  constants = ApplicationConstants;

  config:any = null;

  images = [];
  public listdata=[];

  myForm = new FormGroup({

    storyid: new FormControl('', [Validators.required]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });

  model={}
  public errorMsg;
  constructor(private router: Router,private route: ActivatedRoute,private _http:HttpClient,private _uploadService:UploadService,private _projectService:ProjectService) { }

  get f(){

    return this.myForm.controls;

  }

   

  ngOnInit() {

    let requestJson = {};

    requestJson['id'] = this.route.snapshot.params.projectId;

    this._projectService.getProjectById(requestJson)
    .subscribe(data =>{
                   this.model   = data.msg[0];
                   this.model["id"] = data.msg[0]["_id"]
                   this.myForm.patchValue({
                    storyid: data.msg[0]["_id"]
                   })
             
               },
               error =>this.errorMsg  = error );

    this._projectService.getPhotoByStoryId(requestJson)
    .subscribe(data =>{
                    console.log("data",data)
                    this.listdata = data.msg

  },
  error =>this.errorMsg  = error );
  //   this.config = {
  //     preview:true,
  //     type:'base64',
  //     upload:{
  //         url:'http://localhost:8080/api/1.0/upload-file',
  //         method:'POST',
  //         body: {
             
  //         },
  //         headers: {
  //             "Content-Type": "application/json"
  //         }
  //     }
  // }
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {

        var filesAmount = event.target.files.length;

        for (let i = 0; i < filesAmount; i++) {

                var reader = new FileReader();

                reader.onload = (event:any) => {

               //   console.log(event.target.result);

                   this.images.push(event.target.result); 

                   this.myForm.patchValue({

                      fileSource: this.images

                   });

                }

                reader.readAsDataURL(event.target.files[i]);

        }

    }

  }

  submit(){



    console.log(this.myForm.value);

    this._uploadService.uploadFile(this.myForm.value)
    .subscribe(data =>{
             console.log(data) 
             if(data.success) {
              alert("Upload Successfully")   
              window.location.reload();
             } 
             
               },
               error =>this.errorMsg  = error );


  }

  backToProjectList() {
    this.router.navigate(["/"+this.constants.ORG_USER+"/project"]);
  }

  deleteImg(imgId){
    let requestJson = {};
    requestJson["id"] = imgId

    if(confirm("Are you sure to delete ?")) {
      this._uploadService.deleteFile(requestJson)
      .subscribe(data=>{
        if(data.success) {
          alert("Deleted Successfully")   
          window.location.reload();
        } else {
          alert("Not able to Delete")   
        }
      })
    }
   
  }

}

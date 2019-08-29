import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { CmsService } from '../_services/cms.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

  constants = ApplicationConstants;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  //mycontent: string;
  log: string = '';
  mycontent = {};
  model={}
  cmsType
  public errorMsg;

  @ViewChild("myckeditor") ckeditor: any;
  constructor(private _cmsService:CmsService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let requestJson = {};

    this.cmsType = this.activatedRoute.snapshot.paramMap.get('cmsType');

    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'div',
      forcePasteAsPlainText: true
    };

    requestJson['cmsType'] =   this.cmsType  

    this._cmsService.getCMSByType(requestJson)
                         .subscribe(data =>{
                                        this.model   = data.msg[0];
                                        this.mycontent = this.model['description'];
                                  
                                    },
                                    error =>this.errorMsg  = error );
  }

  backToCMSList() {
    this.router.navigate(["/"+this.constants.ORG_USER+"/cmsList"]);
  }

  submit(){

    let requestJson = {};

    requestJson['cmsType'] = this.model['cms_type'];
    requestJson['description'] = this.mycontent;
   
    console.log(requestJson)

    this._cmsService.updateCMSByType(requestJson)
    .subscribe(res =>{
               console.log(res)
               if(res.n == 1) {
                 //alert(res.msg)
                 //alert("CMS details updated sucessfully")
                 this.router.navigate(["/"+this.constants.ORG_USER+"/cmsList"]);
               } else {
                alert("CMS Details can't be updated")
               }
               },
               error =>this.errorMsg  = error ); 
  }

  
  

}

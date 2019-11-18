import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';

import { ApplicationConstants } from '../app.constants';

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
  @ViewChild("myckeditor") ckeditor: any;

  constructor(private router: Router) {
    //this.mycontent = `<p>My html content</p>`;
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'div',
      forcePasteAsPlainText: true
    };
  }

  submit(){
    
  }

  backToProjectList(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/project"]);
  }
}

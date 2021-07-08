import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,RouterStateSnapshot,ActivatedRoute } from '@angular/router';

import { ApplicationConstants } from '../app.constants';
@Component({
  selector: 'app-addteam',
  templateUrl: './addteam.component.html',
  styleUrls: ['./addteam.component.css']
})
export class AddteamComponent implements OnInit {

  constants = ApplicationConstants;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  //mycontent: string;
  log: string = '';
  mycontent = {};
  model={}
  public errorMsg;
  @ViewChild("myckeditor") ckeditor: any;

  constructor() { }

  ngOnInit() {
  }

}

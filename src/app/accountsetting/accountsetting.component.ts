import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from "../_services/data.service";
import { DashboardService } from '../_services/dashboard.service';
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrls: ['./accountsetting.component.css']
})
export class AccountsettingComponent implements OnInit {

  public admin_id; 
  model = {};
  contsant = ApplicationConstants

  public errorMsg;
  constructor(public router: Router,private activatedRoute: ActivatedRoute,private data: DataService,private dashboardService: DashboardService) {
  }

  ngOnInit() {

    let requestJson = {};

    this.admin_id = sessionStorage.getItem('admin_id')

    requestJson['id'] =   this.admin_id  

    this.dashboardService.getAdminDetails(requestJson)
                         .subscribe(data =>{
                                        this.model   = data.value
                                      
                                    },
                                    error =>this.errorMsg  = error );
     
  }

  submit() {
    let requestJson = {};

    requestJson['password'] = this.model['password'];
    requestJson['userName'] = this.model['userName'];
    requestJson['id'] = sessionStorage.getItem('admin_id');

    this.dashboardService.updateAdminDetails(requestJson)
    .subscribe(res =>{
               console.log(res)
               if(res.success) {
                 //alert(res.msg)
                 alert("Account details updated sucessfully")
                 this.router.navigate(["/"+this.contsant.ORG_USER+"/accountSetting"]);
               }
               },
               error =>this.errorMsg  = error ); 

  }

}

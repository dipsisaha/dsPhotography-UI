import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { ApplicationConstants } from '../app.constants';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constants = ApplicationConstants;

  public listdata=[];
  public errorMsg;

  order: string = 'empID';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;

  pagination={"itemsPerPage":15 , "currentPage":1}


  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToAddProject(){  	
    this.router.navigate(["/"+this.constants.ORG_USER+"/addTeam"]);
}

}

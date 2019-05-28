import { Component, OnInit,AfterViewInit } from '@angular/core';
import {ExcelService} from '../_services/excel.service';
import {IMyDrpOptions} from 'mydaterangepicker';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from "../_services/data.service";
import { SidePanelService } from '../sidepanel/sidepanel.service'
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  constants= ApplicationConstants;
  public orgName;
  public listdata=[];
  public kpidata={};
  public originallistdata=[];
  public wholerecord=[];
  public errorMsg;
  public wareHouseType="IFC";
  public externalProcessStep ="";

  private model;
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'mmm dd yyyy',
    
  };
  
  userDetails ;
  
  order: string = 'poCreationDate';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;
  
  constructor(private excelService:ExcelService,public router: Router,private activatedRoute: ActivatedRoute,private data: DataService,private sidepanelService: SidePanelService) {
  }

  ngOnInit() {
	
    this.reverse['poCreationDate'] = true;
    this.userDetails = JSON.parse(sessionStorage.getItem('user_details'));
    
    this.orgName = this.userDetails.orgName;
    let currentDate = new Date();   
    let priorDate = new Date(new Date().setDate(new Date().getDate() - 30) );
    let bdate,edate; 
    
    if(!sessionStorage.getItem("daterange")) {

      bdate = (priorDate.getMonth()+1)+'/'+priorDate.getDate()+'/'+priorDate.getFullYear();
      edate = (currentDate.getMonth()+1)+'/'+currentDate.getDate()+'/'+currentDate.getFullYear();
    
      let daterange ={
        "bdate" : bdate,
        "edate" : edate
      }
   
      sessionStorage.setItem("daterange",JSON.stringify(daterange));
	  this.model = { beginDate: {year: priorDate.getFullYear(), month: priorDate.getMonth()+1, day: priorDate.getDate()},
   				   endDate: {year: currentDate.getFullYear(), month: currentDate.getMonth()+1, day: currentDate.getDate()}
      };
               
    }else {
      let daterange = JSON.parse(sessionStorage.getItem("daterange"));
      bdate = daterange.bdate;
      edate = daterange.edate;
      
      let bdateArray = (bdate).split("/");
      let edateArray = (edate).split("/");

      this.model = { beginDate: {year: bdateArray[2], month: bdateArray[0], day: bdateArray[1]},
      				 endDate: {year: edateArray[2], month: edateArray[0], day: edateArray[1]}
      };
    }
                   
    let beginDate = this.model.beginDate.year + '-' + this.model.beginDate.month + '-' + this.model.beginDate.day;
    let endDate = this.model.endDate.year + '-' + this.model.endDate.month + '-' + this.model.endDate.day;  	
   
    this.myDateRangePickerOptions = {
                dateFormat: 'mmm dd yyyy',
                //disableSince:{year: currentDate.getFullYear(), month: currentDate.getMonth()+1, day: currentDate.getDate()}            
    }; 
     
    this.searchDiscrepancies(null,null);
     
  }
  
  ngAfterViewInit(){
  	//register simulate click on date text box
    let dateTextBox : HTMLElement = Array.from(document.getElementsByClassName("selection"))[0]  as HTMLElement;
    dateTextBox.addEventListener('click',()=>{console.log("calling simulate");this.simulatebtnclick()}); 
  }
  
  exportAsXLSX(){
  	let tempList = [];
  	if(this.listdata){
  		this.listdata.forEach((item: any) => {
  			let tempItem = {};
  			tempItem['poCreationDate']=item['poCreationDate'];
  			tempItem['keyRecDate']=JSON.stringify(item['keyRecDate']);
  			tempItem['poNumber']=item['poNumber'];
  			tempItem['asnShipmentId']=item['asnShipmentId'];
  			tempItem['asnNumber']=item['asnNumber'];
  			tempItem['rdcId']=JSON.stringify(item['rdcId']);
  			tempItem['status']=JSON.stringify(item['status']);
  			tempItem['processStep']=item['processStep'];
  			tempList.push(tempItem);
  		});
  	}
    this.excelService.exportAsExcelFile(tempList,'Discrepancies');
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

   onDateRangeChanged(event){
	   let beginDate="";
	   let endDate="";
	
	   if(event.beginJsDate && event.endJsDate){	
	     beginDate = this.getFormattedDate(event.beginDate);
	     endDate = this.getFormattedDate(event.endDate);
	     
	     let daterange ={ "bdate" : beginDate,"edate" : endDate}      
	 
	     sessionStorage.setItem("daterange",JSON.stringify(daterange));
	   }
	   this.searchDiscrepancies(beginDate,endDate);  
  }
  
  getDate(dateStr){
  	let dateString = dateStr;
    let dateParts = dateString.split("-");
  
	let dateObject = new Date(parseInt(dateParts[0]), parseInt(dateParts[1])-1, parseInt(dateParts[2]) +1);
	dateObject.setHours(0, 0, 0, 0);
	return dateObject;
  }
  
  toggleWarehouse(type){	
  	this.wareHouseType = type;
  	this.searchDiscrepancies(null,null);
  }
  
  searchDiscrepancies(bDate,eDate){
  	 let beginDate='';
	 let endDate='';
  	 if(this.model){			
		if(this.model.beginDate && this.model.endDate){
	  		beginDate = this.getFormattedDate(this.model.beginDate);
	        endDate = this.getFormattedDate(this.model.endDate); 	
	  	}
	 }
	 
	 if(bDate && eDate){
	 	beginDate=bDate;
	    endDate=eDate;
	 }
	
  }
  
  showPOdetails(poNumber){
  	this.router.navigate(['/'+this.orgName+'/podetails/',poNumber]);  	
  	this.data.changePanel("-1");    
	this.sidepanelService.showSidePanel(true,this.orgName,"-1","");
  }
  
  
  simulatebtnclick(){  
  	let datepickerbtn : HTMLElement = Array.from(document.getElementsByClassName("btnpicker"))[0]  as HTMLElement;
  	if(datepickerbtn){
  		datepickerbtn.click();
  	} 	
  }
  
  getFormattedDate(date){
  	return date.month + '/' + date.day + '/' + date.year;
  }
}

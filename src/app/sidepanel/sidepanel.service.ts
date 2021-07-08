import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ApplicationSettings } from '../app.config'
import { Router } from '@angular/router';
import { SidePanelData } from '../_model/sidepanel-data.model';
import { OrgConfig } from './sidepanel-org-config.model';
import { ApplicationConstants } from '../app.constants'

@Injectable()
export class SidePanelService {
      private _config: OrgConfig[] = [            
            {
                "panelId": ApplicationConstants.ORG_USER,
                "menuList": [
      			 	{"id":ApplicationConstants.DASHBOARD_PANEL_ID,"description":"Dashboard","link":"/"+ApplicationConstants.ORG_USER+"/dashboard/","icon":""},
                        {"id":ApplicationConstants.PROJECT_PANEL_ID,"description":"Manage Project","link":"/"+ApplicationConstants.ORG_USER+"/project/","icon":""},
                        {"id":ApplicationConstants.CMS_PANEL_ID,"description":"Manage CMS","link":"/"+ApplicationConstants.ORG_USER+"/cmsList/","icon":""},
                        {"id":ApplicationConstants.TEAM_PANEL_ID,"description":"Manage Team","link":"/"+ApplicationConstants.ORG_USER+"/team/","icon":""},
                  ] //provide menu items, each element in mennuList would be a menu item
            },
            // {
            //       "panelId": ApplicationConstants.ORG_USER,
            //       "roleId": ApplicationConstants.LOGIN_AS_EMPLOYEE,
            //       "menuList": [
            //                      {"id":ApplicationConstants.DASHBOARD_PANEL_ID,"description":"Dashboard","link":"/"+ApplicationConstants.ORG_USER+"/dashboard/","icon":""},
            //               {"id":ApplicationConstants.EMPLOYEE_DETAILS_PANEL_ID,"description":"Manage Personal Info","link":"/"+ApplicationConstants.ORG_USER+"/addEmployeeDetails/","icon":""}
            //               // {"id":ApplicationConstants.PO_PANEL_ID,"description":"Purchase Orders","link":"/"+ApplicationConstants.ORG_USER+"/purchaseorder/","icon":""}
            //         ] //provide menu items, each element in mennuList would be a menu item
            //   }
            
      ];
      private _showSidePanel: BehaviorSubject<SidePanelData> = new BehaviorSubject<SidePanelData>(null);
      public showSidePanelEmitter: Observable<SidePanelData> = this._showSidePanel.asObservable();

      constructor(private http: Http) { }


      showSidePanel(ifShow: boolean,orgId:string, panelId: string,stateUrl:string) {
            this._showSidePanel.next(new SidePanelData(ifShow,orgId, panelId,stateUrl));
      }
      
      loadConfig(): OrgConfig[] {
            return this._config;
      }
      
}

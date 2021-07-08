import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {TabModule} from 'angular-tabs-component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { CeilPipe } from 'angular-pipes';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CKEditorModule } from 'ng2-ckeditor';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component'
import { SidePanelComponent } from './sidepanel/sidepanel.component'
import { DashboardComponent } from './dashboard/dashboard.component';


import { NavbarService } from './navbar/navbar.service'
import { SidePanelService } from './sidepanel/sidepanel.service'
import { CommonService } from './_services/common.service';
import { TitleService } from './_services/title.service';
import { AuthenticationService } from './_services/authentication.service';
import { ExcelService } from './_services/excel.service';
import { DataService } from "./_services/data.service";

import { SpinnerComponent } from './_helper/spinner.component';

import { SortPipe } from './_pipe/sort.pipe';
import { DateFormatPipe } from './_pipe/dateformat.pipe';

import { TokenInterceptor} from './_interceptor/tokeninterceptor.interceptor';

import { NavigationGuard} from './_guard/navigation.guard';
import { ProjectComponent } from './project/project.component';
import { AddProjectComponent } from './project/add-project.component';
import { CmsComponent } from './cms/cms.component';
import { CmsListComponent } from './cms/cms-list.component';
import { AddphotoComponent } from './project/addphoto.component';
import { AccountsettingComponent } from './accountsetting/accountsetting.component';
import { AccountsettingDirective } from './accountsetting/accountsetting.directive';
import { TeamComponent } from './team/team.component';
import { AddteamComponent } from './team/addteam.component';
//import {MultiUploaderModule}  from '@binssoft/multi-uploader';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SpinnerComponent,
    SortPipe,
    DashboardComponent,
    SidePanelComponent,
    DateFormatPipe,
    CeilPipe,
    ProjectComponent,
    AddProjectComponent,
    CmsComponent,
    CmsListComponent,
    AddphotoComponent,
    AccountsettingComponent,
    AccountsettingDirective,
    TeamComponent,
    AddteamComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule ,
    RouterModule.forRoot(AppRoutes,{onSameUrlNavigation: 'reload'}),
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    MyDateRangePickerModule,
    MyDatePickerModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TabModule,
    NgSelectModule ,
    NgIdleKeepaliveModule.forRoot(),
    PerfectScrollbarModule,
    CKEditorModule
    //MultiUploaderModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}, 		
  	NavbarService,CommonService,TitleService,AuthenticationService,SidePanelService,ExcelService,DataService,NavigationGuard
  	],
  bootstrap: [AppComponent]
})

export class AppModule { 
	constructor(titleService: TitleService) {
    titleService.init();
  }
}

import { Routes } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProjectComponent } from './project/project.component'
import { AddProjectComponent } from './project/add-project.component';
import { CmsComponent } from './cms/cms.component'
import { CmsListComponent } from './cms/cms-list.component'
import { ApplicationConstants } from './app.constants'
import { NavigationGuard} from './_guard/navigation.guard' 

export const AppRoutes:Routes = [
    { path :'',component : LoginComponent,data:{org:ApplicationConstants.ORG_USER,title: "DS Login"}},
    { path : 'login/DS',component :LoginComponent,data:{org:ApplicationConstants.ORG_USER,title: "DS Login"}}, 
    { path : ApplicationConstants.ORG_USER+'/dashboard',component :DashboardComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/project',component :ProjectComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/addProject',component :AddProjectComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/cms',component :CmsComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/cmsList',component :CmsListComponent,canActivate:[NavigationGuard]},

    { path : '**',component : LoginComponent,data:{org:ApplicationConstants.ORG_USER,title: "DS Login"}},
];
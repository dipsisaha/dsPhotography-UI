export class ApplicationConstants {
    // public static ORG_BOSCH="BOSCH";
    public static ORG_USER="DS";
    public static ROLE_ASSOCIATE="ASSOCIATE";
    public static DASHBOARD_PANEL_ID = '1';
    public static PROJECT_PANEL_ID = '2';
    public static CMS_PANEL_ID = '3'
    public static DATE_FORMAT = 'yyyy-MM-dd';
    public static TIME_FORMAT = 'HH:mm';
    public static TIME_ZONE = 'EST';
    
    public static LOGIN_AS_EMPLOYEE= 'Employee';

    //public static API_PREFIX_SATCOM = 'api';
    //public static API_PREFIX_BOSCH = 'boschapi';
    
    public static WAREHOUSE_TYPE_IFC = 'IFC';
    public static WAREHOUSE_TYPE_NONIFC = 'Non-IFC';

    public static API_PREFIX = 'api';
    public static UPDATE_ADMIN_DETAILS = 'updateAdminDetails';
    public static GET_ADMIN_DETAILS = 'getAdminDetails';
    public static GET_CMS_LIST = 'getAllCms';
    public static FETCH_CMS_DETAILS = 'getCmsByType';
    public static UPDATE_CMS_DETAILS = 'updateCms';
    public static API_LOGIN = 'login';
    
    
    public static USER_IDLE_BEGIN_TIME = 600; //system will wait for specified sec before mrking user as idle (10min)
    public static USER_IDLE_WAIT_TIME = 300;//system will wait for specified sec after user is marked idle and before timeout is done (10 + 5 = 15 mins)
    
    public static TOKEN_REFERSH_TIMESPAN = 1800000; //1 hours - 3600000, 55 mins - 3300000
    
	
}
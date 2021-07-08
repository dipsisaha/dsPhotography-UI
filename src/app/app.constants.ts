export class ApplicationConstants {
    // public static ORG_BOSCH="BOSCH";
    public static ORG_USER="DS";
    public static ROLE_ASSOCIATE="ASSOCIATE";
    public static DASHBOARD_PANEL_ID = '1';
    public static PROJECT_PANEL_ID = '2';
    public static CMS_PANEL_ID = '3'
    public static TEAM_PANEL_ID = '4'
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
    public static GET_PROJECT_LIST = 'getAllStory';
    public static FETCH_PROJECT_DETAILS = 'getStoryById';
    public static ADD_PROJECT_DETAILS = 'insertStoryDetails';
    public static UPDATE_PROJECT_DETAILS = 'updateStory';
    public static REMOVE_PROJECT = 'removeStoryById';
    public static API_LOGIN = 'login';
    public static UPLOAD_PHOTO_URL = 'insertPhotos';
    public static DELETE_PHOTO_BY_ID_URL = 'removePhotoById';
    public static GET_PHOTO_BY_STORY_ID_URL = 'getPhotoByStoryId';
    public static GET_TEAM_LIST = 'getAllTeam';
    public static FETCH_TEAM_DETAILS = 'getTeamById';
    public static ADD_TEAM_DETAILS = 'insertTeam';
    public static UPDATE_TEAM_DETAILS = 'updateTeam';
    public static REMOVE_TEAM = 'removeTeamById';

    
    
    public static USER_IDLE_BEGIN_TIME = 600; //system will wait for specified sec before mrking user as idle (10min)
    public static USER_IDLE_WAIT_TIME = 300;//system will wait for specified sec after user is marked idle and before timeout is done (10 + 5 = 15 mins)
    
    public static TOKEN_REFERSH_TIMESPAN = 1800000; //1 hours - 3600000, 55 mins - 3300000
    
	
}
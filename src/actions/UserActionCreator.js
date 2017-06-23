import AppConst from "AppConst";
import AppDispatcher from "AppDispatcher";
import SurveyAPI from "../SurveyAPI";

let UserActionCreator = {
    
   requestUserLogin(){
        SurveyAPI.reqLogin();
   },

   requestUserLogout(){
      SurveyAPI.reqLogout();
   }
}

export default UserActionCreator;

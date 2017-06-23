
import {ReduceStore} from "flux/utils";
import AppDispatcher from "../AppDispatcher";
import update from "react-addons-update";
import AppConst from "../AppConst";

class UserStore extends ReduceStore {

    getInitialState(){
        console.log( "데이터 초기화");
        return  {isLogin:false, uid:"", email:"" };
    }

    reduce( state, action ){
        switch( action.type ){
            case AppConst.REGIST_USER_INFO:
                state = update( this.getState(),{
                    uid:{$set:action.data.uid},
                    email:{$set:action.data.email},
                    isLogin:{$set:true}
                });
            break;
            case AppConst.UNREGIST_USER_INFO:
                state = update( this.getState(),{
                    uid:{$set:""},
                    email:{$set:""},
                    isLogin:{$set:false}
                });
            break;
        }
        return state;
    }

}

export default new UserStore( AppDispatcher );

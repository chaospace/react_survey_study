import {ReduceStore} from "flux/utils";
import update from "react-addons-update";
import AppConst from "AppConst";
import AppDispatcher from "../AppDispatcher";

class ResultStore extends ReduceStore {

    getInitialState(){
        return { data : "" };
    }

    reduce( state, action ){
        switch( action.type ){
            case AppConst.SURVEY_APPLY:
            break;

            case AppConst.SURVEY_APPLY_SUCCESS:
                return update( this.getState(), {
                    data:{ $set : action.data }
                });
            break;
        }
        return state;
    }


}


export default new ResultStore(AppDispatcher);

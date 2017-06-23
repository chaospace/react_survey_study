import {ReduceStore} from "flux/utils";
import AppDispatcher from "../AppDispatcher";
import AppConst from "../AppConst";
import update from "react-addons-update";

let defaultDraft = () => {
    return {
        createDate:Date.now(),
        name:'',
        uid:'',
        elements:[
            {
            type:"radiogroup",
            name:"",
            isRequired:true,
            choices:[
                {value:1, text:""},
                {value:2, text:""},
                {value:3, text:""},
                {value:4, text:""}
                ]
            }
        ]
    }
};

class DraftStore extends ReduceStore {

    getInitialState(){
        return {};
    }

    reduce( state, action ){
        switch( action.type ){
            case AppConst.CREATE_DRAFT:
                if( action.data.survey ){
                    return update( this.getState(), {
                        $set:action.data.survey
                    });
                } else {
                    return update( this.getState(), {
                        $set:defaultDraft()
                    });
                }
            break;
            case AppConst.UPDATE_DRAFT:
                if( action.data.field == "name"){
                    return update( this.getState(),{
                        name:{$set:action.data.value},
                        elements:{
                            [0]:{
                                name:{$set:action.data.value}
                            }
                        }
                    });
                } else {
                    var idx = parseInt(action.data.field.substr(-1));
                    return update( this.getState(),{
                        elements:{
                            [0]:{
                                choices:{
                                    [idx]:{
                                        text:{$set:action.data.value}
                                    }
                                }

                            }
                        }
                    });
                }
            break;
        }
        return state;
    }

}

export default new DraftStore(AppDispatcher);

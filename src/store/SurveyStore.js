import {ReduceStore} from "flux/utils";
import AppDispatcher from "../AppDispatcher";
import update from "react-addons-update";
import AppConst from "../AppConst";

/*설문조사 스토어 */
class SurveyStore extends ReduceStore {

	getSurveyByKey( key ) {
		return this._state.datas.find( (vo) => ( vo.key == key ) );
	}

	getSurveyIndex( key ){
		return this._state.datas.findIndex( (vo) => ( vo.key == key ) );
	}

	getInitialState(){

		return {
			datas: [],		// 설문 리스트
			selectSurvey:null,
		}
	}

	reduce( state, action ){
		switch( action.type ){
			case AppConst.FETCH_SURVEY:

			break;
			case AppConst.FETCH_SURVEY_ERROR:
				
			break;

			case AppConst.FETCH_SURVEY_SUCCESS:
				return update( this.getState(), { datas:{$set:action.data}});
			break;

			case AppConst.CREATE_SURVEY_SUCCESS:
				return update( this.getState(), {
					datas:{$push:[action.data] }
				});
			break;

			case AppConst.CREATE_SURVEY_ERROR:
				alert( action.data );
			break;
			case AppConst.UPDATE_SURVEY_SUCCESS:
				var idx = this.getSurveyIndex( action.data.key );
				state = update( this.getState() ,{
					datas:{
						[idx]:{$set:action.data}
					}
				})
			break;


			case AppConst.DELETE_SURVEY_SUCCESS:
				var idx = this.getSurveyIndex( action.data );
				return update( this.getState(),{
					datas:{$splice:[[idx, 1]]}
				});
			break;

			case AppConst.DELETE_SURVEY_ERROR:

			break;
		}
		return state;
	}

}


export default new SurveyStore( AppDispatcher );

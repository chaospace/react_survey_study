import AppDispatcher from "AppDispatcher";
import AppConst from "AppConst";
import SurveyAPI from "../SurveyAPI";


let SurveyActionCreator ={

    createDraft: function( survey ){
        AppDispatcher.dispatch({
            type:AppConst.CREATE_DRAFT,
            data: {survey}
        });
    },

    updateDraft: function( field, value ){
        AppDispatcher.dispatch({
            type:AppConst.UPDATE_DRAFT,
            data:{field, value}
        });
    },

    addSurvey( survey ) {
        AppDispatcher.dispatchAsync( SurveyAPI.addSurvey( survey ),{
            request :AppConst.CREATE_SURVEY,
            success :AppConst.CREATE_SURVEY_SUCCESS,
            failure :AppConst.CREATE_SURVEY_ERROR
        }, survey );
    },

    updateSurvey( survey ) {
        AppDispatcher.dispatchAsync( SurveyAPI.updateSurvey( survey ),{
            request :AppConst.UPDATE_SURVEY,
            success :AppConst.UPDATE_SURVEY_SUCCESS,
            failure :AppConst.UPDATE_SURVEY_ERROR
        }, survey );
    },

    deleteSurvey( key ) {
        AppDispatcher.dispatchAsync( SurveyAPI.deleteSurvey( key ),{
            request :AppConst.DELETE_SURVEY,
            success :AppConst.DELETE_SURVEY_SUCCESS,
            failure :AppConst.DELETE_SURVEY_ERROR
        }, key );
    },

    fetchSurveys(){
        AppDispatcher.dispatchAsync( SurveyAPI.fetchSurveys(),{
            request :AppConst.FETCH_SURVEY,
            success :AppConst.FETCH_SURVEY_SUCCESS,
            failure :AppConst.FETCH_SURVEY_ERROR
        });
    },

    applySurvey( survey, answer ){
        let key = survey.key;
        AppDispatcher.dispatchAsync( SurveyAPI.applySurvey( survey, answer ), {
            request : AppConst.SURVEY_APPLY,
            success : AppConst.SURVEY_APPLY_SUCCESS,
            failure : AppConst.SURVEY_APPLY_ERROR
        }, {key} );
    },

    getResultsSurvey( key ){
        AppDispatcher.dispatchAsync( SurveyAPI.getResultsSurvey( key ),{
            request : AppConst.SURVEY_RESULT,
            success : AppConst.SURVEY_RESULT_SUCCESS,
            failure : AppConst.SURVEY_RESULT_ERROR,
        } );
    }

}



export default SurveyActionCreator;

/*통신담당*/
import * as firebase from "firebase";
import AppDispatcher from "AppDispatcher";
import AppConst from "AppConst";
import {database, auth} from "database";

let SurveyAPI = {
    // 유저 인증 체크
    fetchUser(){
        auth.onAuthStateChanged( (user) => {
            if( user ){
                AppDispatcher.dispatch({
                   type: AppConst.REGIST_USER_INFO,
                   data:{uid:user.uid, email:user.email}
               });

            } else {
                AppDispatcher.dispatch({
                   type: AppConst.UNREGIST_USER_INFO
               });
            }
        });
    },
    fetchSurveys(){
        return database.ref("/surveys").once('value').then((snapshot) =>{
            let items = [];
            snapshot.forEach((childsnapshot)=>{
                var item = JSON.parse(childsnapshot.val());
                item['key'] = childsnapshot.getKey();
                items.push( item );
            });
            return items;
        });
    },

    requestLogin(){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        auth.signInWithPopup(provider);
    },

    requestLogout(){
         auth.signOut();
    },

    addSurvey( survey ) {
        let surveyRef = database.ref("/surveys");
        let ref = surveyRef.push();
        let key = ref.key;

        return new Promise(function(resolve, reject) {
            ref.set( JSON.stringify( survey ), (error) =>{
                if( error ){
                    reject(error);
                } else {
                    survey.key = key;
                    resolve(survey);
                }
            });
        });

    },

    updateSurvey( survey ){
        let updateRef = database.ref("/surveys/" + survey.key );
        return new Promise(function(resolve, reject) {
            updateRef.set( JSON.stringify(survey), (error) =>{
                if(error){
                    reject( error );
                } else {
                    resolve( survey );
                }
            });
        });

    },

    deleteSurvey( key ){
        let deleteInfo = {};
        deleteInfo["/surveys/" + key ] = null;
        deleteInfo["/results/" + key ] = null;
        return new Promise(function(resolve, reject) {
            database.ref().update( deleteInfo , (error) =>{
                if( !error ){
                    resolve(key);
                } else {
                    reject(key);
                }
            });
        });

    },

    applyTransactionUpdate( current_count ){
        return (current_count || 0) + 1;
    },

    getResultsSurvey( survey, callback ){
        let ref  = database.ref("/results/" + survey.key );
        let choices = survey.elements[0].choices;
        ref.once("value").then((snapshot) => {
            let data = snapshot.val();
            var msg = "";
            for(var key in data) {
                for( var i=0; i<choices.length;i++){
                    if( choices[i].text == key ) {
                        msg += "<p>"+ choices[i].text +"을 선택한 인원" + data[key].count +"명</p>";
                        break;
                    }
                }
            }
            callback( msg );
        });
    },

    // 설문 참여 완료 처리
    applySurvey( survey, answer ){
        let voteRef     = database.ref("/results/" + survey.key + "/" + answer.text +"/count" );
        return new Promise(function(resolve, reject) {
            voteRef.transaction( SurveyAPI.applyTransactionUpdate ,
            (error, committed, snapshot )=>{
                if( error ){
                    reject( error );
                    return;
                } else if( !committed ){
                    reject( committed );
                    return;
                }
                SurveyAPI.getResultsSurvey( survey , resolve )
            });
        });
    }

}


export default SurveyAPI;

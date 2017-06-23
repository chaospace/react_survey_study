import * as firebase from "firebase";

describe( "auth-firebse", ()=>{

    it( "firebase 초기화", () =>{
        var config = {
          apiKey: "AIzaSyAyPFAZInMyPgIpaGrFhqfiZJ_iQkSjKBs",
          authDomain: "cpsurveytest.firebaseapp.com",
          databaseURL: "https://cpsurveytest.firebaseio.com",
          projectId: "cpsurveytest",
          storageBucket: "",
          messagingSenderId: "461303632771"
        };

        firebase.initializeApp(config);
        let database = firebase.database();
        database.ref("/surveys").once('value', (snapshot) => {
            console.log( "snapshot", snapshot.val() );
        });

    });

});

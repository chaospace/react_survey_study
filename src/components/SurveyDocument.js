import React,{Component} from "react";
import PropTypes from "prop-types";
import SurveyScreen from "./SurveyScreen";
import SurveyActionCreator from "actions/SurveyActionCreator";
import {database} from "database";

class SurveyDocument extends Component {

    handleSurveyComplete( results ){
        //console.log( this.props.surveyData.key, results );
        let answerIdx = parseInt(Object.values(results))-1;
        let answerInfo = this.props.surveyData.elements[0].choices[answerIdx];
        SurveyActionCreator.applySurvey( this.props.surveyData, answerInfo );

        let key =  this.props.surveyData.key;
        this.props.history.push("/results/" + key );

    }

    render(){
        return(
            <div className="page-body container-fluid">
                <div className="page-header">
                    <h1>설문 참여</h1>
                </div>
                <SurveyScreen surveyData = {this.props.surveyData} handleSurveyComplete={this.handleSurveyComplete.bind(this)} />
            </div>
        );
    }

}


SurveyDocument.PropTypes ={
    surveyData:PropTypes.object.isRequire
}

export default SurveyDocument;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as Survey from "survey-react";
import { database } from "database";

class SurveyScreen extends Component {
	constructor(){super();}
	componentDidMount(){
		Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
		Survey.Survey.cssType = "bootstrap";
	}

	handleComplete( results ){
		this.props.handleSurveyComplete( results.data );
	}

	generateSurveyModel(){
		let model = new Survey.Model({"pages":[this.props.surveyData]});
		if( this.props.handleSurveyComplete ){
			model.onComplete.add(  this.handleComplete.bind(this, model ) );
			model.completedHtml = "<h4>설문에 참여해 주셔서 감사합니다.</h4>";
		}
		return model;
	}


	render(){
		let survey = "";
		if( this.props.surveyData ){
			let model = this.generateSurveyModel();
			if( this.props.designMode ){
				model.mode = "display";
				model.showNavigationButtons = false;
			}
			survey = <Survey.Survey model={model} />
		}
		return(
			<div id="surveyElement">
				{survey}
			</div>
		);
	}

}

SurveyScreen.PropTypes = {
	surveyData			: PropTypes.object.isRequire,
	designMode			: PropTypes.bool,
	handleSurveyComplete:PropTypes.func
}

export default SurveyScreen;

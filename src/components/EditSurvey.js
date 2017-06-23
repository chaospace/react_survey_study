import React, {Component} from "react";
import PropTypes from "prop-types";
import SurveyForm from "./SurveyForm";
import DraftStore from "store/DraftStore";
import SurveyStore from "store/SurveyStore";

import SurveyScreen from "./SurveyScreen";
import {Container} from "flux/utils";
import SurveyActionCreator from "actions/SurveyActionCreator";
import BottomControl from "./BottomControl";

class EditSurvey extends Component {

    constructor(){ super(); }

    componentDidMount(){
        if( this.state.draft == null ){
            SurveyActionCreator.createDraft( SurveyStore.getSurveyByKey(this.props.match.params.key) );    
        }
    }

    componentWillUnmount(){
        this.state.draft = null;
    }

    handleSubmit( event ){
        event.preventDefault();
        SurveyActionCreator.updateSurvey( this.state.draft );
        this.props.history.push("/");
    }

    handleChange( field, value ){
        SurveyActionCreator.updateDraft( field, value );
    }

    handleListButton(){
        this.props.history.push("/");
    }

    render(){
        return(
            <div className="page-body container-fluid">
                <div className="page-header">
                    <h1>설문 수정</h1>
                </div>

                <SurveyForm buttonLabel="수정완료"
                    draftSurvey ={this.state.draft}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleChange={this.handleChange.bind(this)}/>

                <SurveyScreen designMode = {true} surveyData = {this.state.draft} />
                <BottomControl label={"리스트로"} handler={this.handleListButton.bind(this)}/>
            </div>
        );
    }
}

/*


*/
EditSurvey.getStores = () => ([DraftStore]);
EditSurvey.calculateState = (prevState) => ({
    draft: DraftStore.getState()
});


export default Container.create( EditSurvey );

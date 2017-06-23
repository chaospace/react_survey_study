import React, {Component} from "react";
import PropTypes from "prop-types";
import SurveyForm from "./SurveyForm";
import DraftStore from "store/DraftStore";
import UserStore from "store/UserStore";
import SurveyScreen from "./SurveyScreen";
import {Container} from "flux/utils";
import SurveyActionCreator from "actions/SurveyActionCreator";
import BottomControl from "./BottomControl";

class NewSurvey extends Component {

    constructor(){ super(); }

    componentDidMount(){
        SurveyActionCreator.createDraft();
    }

    componentWillUnmount(){
        this.state.draft = null;
        this.state.user = null;
    }

    handleSubmit( event ){
        event.preventDefault();
        this.state.draft.uid = this.state.user.uid;
        SurveyActionCreator.addSurvey( this.state.draft );
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
                    <h1>설문 생성</h1>
                </div>

                <SurveyForm buttonLabel="생성"
                    draftSurvey={this.state.draft}
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

NewSurvey.getStores = () => ([DraftStore, UserStore]);
NewSurvey.calculateState = (prevState) => ({
    draft: DraftStore.getState(),
    user : UserStore.getState()
});


export default Container.create( NewSurvey );

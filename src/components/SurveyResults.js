import React, {Component} from "react";
import PropTypes from "prop-types";
import {Container} from "flux/utils";
import ResultStore from "store/ResultStore";
import SurveyActionCreator from "SurveyAPI";
import BottomControl from "./BottomControl";

class SurveyResults extends Component {

    componentDidMount(){}
    componentWillUnmount(){ this.state.results.data = ""; }

    handleListButton(){
        this.props.history.push("/");
    }

    render(){
        return(
            <div className="page-body container-fluid">
                <div className="page-header">
                    <h1>설문 참여 결과</h1>
                </div>
                <div dangerouslySetInnerHTML={ {__html: this.state.results.data} }>
                </div>
                <BottomControl label={"리스트로"} handler={this.handleListButton.bind(this)}/>
            </div>
        );
    }

}

SurveyResults.getStores = () => ([ResultStore]);
SurveyResults.calculateState = (prevState) => ({
    results: ResultStore.getState()
});
export default Container.create( SurveyResults );

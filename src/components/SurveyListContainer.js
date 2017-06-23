import React, {Component} from "react";
import PropTypes from "prop-types";
import SurveyStore from "store/SurveyStore";
import SurveyListItemRenderer from "./renderer/SurveyListItemRenderer";
import SurveyActionCreator from "actions/SurveyActionCreator";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";


class SurveyListContainer extends Component {

    constructor(){
        super();
    }

    handleEditSurvey( key ){
        this.props.history.push("/edit/"+ key );
    }

    handleDeleteSurvey( key ){
        if( confirm("선택한 설문을 삭제 하시겠습니까?") == true ){
            SurveyActionCreator.deleteSurvey( key );
        }
    }

    render(){
        let lists =""

        if( this.props.dataProvider ){
            lists =  this.props.dataProvider.map( (vo, index ) => {
                return ( <SurveyListItemRenderer
                            key={index}
                            data={vo}
                            hasEditButton={ this.props.user.uid === vo.uid && this.props.user.isLogin }
                            handleEditSurvey={this.handleEditSurvey.bind(this)}
                            handleDeleteSurvey={this.handleDeleteSurvey.bind(this)} /> );
            });
        }

        return (
            <div className="container-fluid">
                <div className="page-header">
                    <h1>설문 리스트</h1>
                </div>
                <ul className="survey-list-group">
                    {lists}
                </ul>
            </div>
        );
    };

}


SurveyListContainer.PropTypes ={
    dataProvider:PropTypes.array.isRequire,
    user: PropTypes.object.isRequire
}


export default SurveyListContainer;

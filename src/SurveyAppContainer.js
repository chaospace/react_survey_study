import React, {Component} from "react";
import PropTypes from "prop-types";
import * as firebase from "firebase";
import {Container} from "flux/utils";
import SurveyStore from "store/SurveyStore";
import UserStore from "store/UserStore";

import SurveyScreen from "components/SurveyScreen";
import NewSurvey from "components/NewSurvey";
import EditSurvey from "components/EditSurvey";
import HeaderNav from "components/HeaderNav";
import SurveyDocument from "components/SurveyDocument";
import SurveyResults from "components/SurveyResults";
import SurveyListContainer from "components/SurveyListContainer";
import SurveyActionCreator from "actions/SurveyActionCreator";

import AppDispatcher from "./AppDispatcher";
import AppConst from "./AppConst";
import SurveyAPI from "./SurveyAPI";

import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import { auth } from "database";

class SurveyAppContainer extends Component {

    componentDidMount(){
        SurveyAPI.fetchUser();
        SurveyActionCreator.fetchSurveys();
    }

    onClickLoginButton( event ){
        event.preventDefault();
        var user = auth.currentUser;
        if( user == null ){
            SurveyAPI.requestLogin();
        } else {
            SurveyAPI.requestLogout();
        }
    }

    onClickCreateSurveyButton( event ){
        event.preventDefault();
    }

    render() {
        return(
            <Router>
            <div>
                <HeaderNav user={this.state.user} handleUserLogin={ this.onClickLoginButton } />
                <Switch>
                    <PropsRoute exact path="/"
                        component={SurveyListContainer}
                        user = {this.state.user }
                        dataProvider={this.state.surveys.datas} />
                    <PropsRoute path="/new" component={NewSurvey} />
                    <PropsRoute path="/edit/:key" component={EditSurvey} />
                    <Route path ="/survey/:key" render={({match})=>(
                        <PropsRoute component={SurveyDocument}
                                    surveyData = { this.state.surveys.datas.find( survey => survey.key === match.params.key ) } />
                    )}/>

                    <PropsRoute path="/results/:key"
                        component={SurveyResults} />
                    <Redirect to="/" />
                </Switch>

            </div>
        </Router> );
    }
}


const renderMergeProp = ( component, ...rest ) => {
    const finalProps = Object.assign({}, ...rest );
    return ( React.createElement(component, finalProps) );
}

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render = { routeProps => {
            return renderMergeProp( component, routeProps, rest );
        }}/>
    )
}

SurveyAppContainer.getStores = () => ([SurveyStore, UserStore]);
SurveyAppContainer.calculateState = (prevState) => ({
    surveys: SurveyStore.getState(),
    user: UserStore.getState()
});

export default Container.create( SurveyAppContainer );

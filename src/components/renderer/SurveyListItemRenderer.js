import React,{Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class SurveyListItemRender extends Component {
    constructor(){
        super();
    }

    handleEditSurvey( event ){
        event.preventDefault();
        this.props.handleEditSurvey( this.props.data.key );
    }

    handleDeleteSurvey( event ){
        event.preventDefault();
        this.props.handleDeleteSurvey( this.props.data.key );
        //
    }

    render(){
        let editButtons = "";

        if( this.props.hasEditButton ){
            editButtons = (
                <div className="side-content">
                <button className="btn btn-sm btn-primary" onClick={this.handleEditSurvey.bind(this)}>수정</button>
                <button className="btn btn-sm btn-danger" onClick={this.handleDeleteSurvey.bind(this)}>삭제</button>
                </div>
            );
        }

        if( this.props.data.name != "" ){
            return(
                <li className="survey-list-item">
                    <div className="content">
                        <Link to={`/survey/${this.props.data.key}`} >
                            <h4 className="list-heading">{this.props.data.name}</h4>
                            <p className="list-text">{new Date(this.props.data.createDate).toDateString()}</p>
                        </Link>
                    </div>
                    {editButtons}
                </li>
            );
        }
        return null;
    }
}


SurveyListItemRender.PropTypes= {
    data:PropTypes.object.isRequire,
    hasEditButton:PropTypes.bool.isRequire,
    handleDeleteSurvey:PropTypes.func,
    handleEditSurvey:PropTypes.func
}

export default SurveyListItemRender;

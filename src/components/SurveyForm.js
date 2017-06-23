import React, {Component} from "react";
import PropTypes from "prop-types";

class SurveyForm extends Component {

    handleChange( field, event ){
        //event.preventDefault();
        var field = event.target.name;
        switch( field ){
            case "ipt_title":
                field = "name";
            break;
        }
        this.props.handleChange( field, event.target.value );
    }



    render(){
        let draftSurvey = this.props.draftSurvey;
        let title = "";
        let answers = "";
        if( draftSurvey.elements ){
            title = draftSurvey.elements[0].name;
            title = <div className="input-group input-title">
                <span className="input-group-addon">타이틀</span>
                <input
                 type="text"
                 name="ipt_title"
                 className="form-control"
                 required={true}
                 placeholder="주제를 적어주세요"
                 value={title}
                 onChange={this.handleChange.bind(this, "" )}/>
            </div>
            answers = draftSurvey.elements[0].choices.map(( vo, idx ) => {
                return (
                    <div key={idx} className="input-group input-answer">
                        <span className="input-group-addon">응답 {idx+1}</span>
                        <input type="text"
                               className="form-control"
                               name = {"choices_"+idx}
                               required={true}
                               placeholder="설문 응답을 넣어주세요"
                               value={vo.text}
                               onChange={this.handleChange.bind( this, "" ) }/>
                    </div>
                )
            } );
        }
        return(
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="survey-edit-list">
                        {title}
                        {answers}
                    </div>
                    <button type="submit"
                            className="btn btn-primary">
                            {this.props.buttonLabel}</button>
                </form>
            </div>
        );
    }

}

SurveyForm.PropTypes ={
    draftSurvey : PropTypes.object,
    buttonLabel : PropTypes.string.isRequire,
    handleSubmit: PropTypes.func.isRequire
}



export default SurveyForm;

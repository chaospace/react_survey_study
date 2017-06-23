//jest.dontMock("components/SurveyListContainer");
import React, {Component} from "react";
import {mount, shallow} from "enzyme";
import PropTypes from "prop-types";
import SurveyStore from "store/SurveyStore";
import EditSurvey from "components/EditSurvey";
import SurveyForm from "components/SurveyForm";

import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";


describe( "EditSurvey", () => {

    let state;
    let props;
    let mountedComponent;
    let onChange = jest.fn();

    const component = () => {
        if(!mountedComponent){
            mountedComponent = mount(
                <EditSurvey {...props} />,
                {
                    context: {
                      router: {
                        history: {
                          push: ()=>{},
                          replace: ()=>{},
                          createHref: ()=>{},
                        },
                        match:{
                            params:{}
                        }
                      }
                    },
                    childContextTypes: {
                      router: PropTypes.object.isRequired,
                    }
                  }
            );
        }
        return mountedComponent;
    }

    beforeEach( () => {
        state={
            draft:{
                    createDate:Date.now(),
                    name:'가장 좋아하는 영화는',
                    uid:'',
                    key:'1505',
                    elements:[
                        {
                        type:"radiogroup",
                        name:"가장 좋아하는 영화는",
                        isRequired:true,
                        choices:[
                            {value:1, text:"스타워즈"},
                            {value:2, text:"니모"},
                            {value:3, text:"터미네이터"},
                            {value:4, text:"미녀와야수"}
                            ]
                        }
                    ]
                }
        };
        props = {
            match:{
                params:{
                    key:"1505"
                }
            },
            handleSubmit:onChange
        };
        mountedComponent = undefined;
    });



    it( "기본 돔 구성 및 데이터 설정 테스트", () => {
        let container = component();
        container.setState( state );
        expect( container.find("h1").text() ).toBe("설문 수정");
        expect( container.state().draft.name ).toBe(state.draft.name);

    });


    it( "SurveyForm 테스트" , () => {

        let surveyForm = shallow(
            <SurveyForm draftSurvey ={state.draft} buttonLabel={"변경완료"}
             handleChange={onChange} />
        )
        surveyForm.find("input[name='ipt_title']").simulate('change',{
            target:{name:"ipt_title", value:state.draft.name}
        });

        expect( surveyForm.find("button[type='submit']").text() ).toBe("변경완료");
        expect( onChange ).toBeCalledWith("name", state.draft.name );
    });





});

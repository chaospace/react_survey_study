//jest.dontMock("components/SurveyListContainer");
import React, {Component} from "react";
import {mount} from "enzyme";
import PropTypes from "prop-types";
import SurveyStore from "store/SurveyStore";
import SurveyListContainer from "components/SurveyListContainer";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";

describe( "SurveyListContainer", () => {

    let props;
    let mountedListContainer;

    const listContainer = () => {
        if(!mountedListContainer){
            mountedListContainer = mount(
                <SurveyListContainer {...props} />,
                {
                    context: {
                      router: {
                        history: {
                          push: ()=>{},
                          replace: ()=>{},
                          createHref: ()=>{},
                        }
                      }
                    },
                    childContextTypes: {
                      router: PropTypes.object.isRequired,
                    }
                  }
            );
        }
        return mountedListContainer;
    }

    beforeEach( () => {
        props = {
            user:undefined,
            dataProvider:undefined
        };
        mountedListContainer = undefined;
    });


    it( "리스트 기본 돔 구성 테스트", () => {
        let container = listContainer().find('div');
        expect( container.length ).toBeGreaterThan( 0 );
        expect( container.find("h1").text() ).toBe("설문 리스트");
    } );


    describe( "리스트 데이터가 있을 경우", () =>{
        beforeEach( () => {
            props={
                dataProvider:[
                    {
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
                ],
                user:{
                    uid:'',
                    isLogin:false
                }
            }
        });

        it( "dataprovider props 테스트", () => {
            let container = listContainer();
            let renderer = container.find("li");
            expect(renderer.length).toBe(1);
            expect(renderer.find(".list-heading").text()).toEqual(props.dataProvider[0].name);
            expect(renderer.find(".list-text").text()).toEqual(new Date(props.dataProvider[0].createDate).toDateString());
        });

    });


    describe( "로그인 사용자 리스트 데이터가 있을 경우", () =>{
        beforeEach( () => {
            props={
                dataProvider:[
                    {
                        createDate:Date.now(),
                        name:'가장 좋아하는 영화는',
                        uid:'1234',
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
                ],
                user:{
                    uid:'1234',
                    isLogin:true
                }
            }
        });

        it( "로그인시 편집 버튼 보이기", () => {
            let container = listContainer();
            let renderer = container.find(".side-content");
            console.log( renderer.find("button").first().text() );
            expect(renderer.children().length).toBe(2);
            expect( renderer.find("button").first().text() ).toEqual( "수정");
            expect( renderer.find("button").last().text() ).toEqual( "삭제");
        });

    });


});

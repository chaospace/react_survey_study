**구현 진행사항**
2017.06.23
- 설문 리스트 표현  
- 로그인(g메일 인증)한 사용자 설문 생성, 편집, 삭제 기능  
- 설문은 라디오그룹을 이용한 간단한 4지 선단형  
- 설문 참여 후 현재까지 투표한 사람들에 대한 결과 표시  

**개선사항**  
- 설문 생성 시 설문 기간에 따른 처리
- 현재는 인증을 g메일만 제공 / 다양한 인증방식 제공필요  
- surveyjs 내부 제약에 따른 표현의 한계  

**프론트 환경**  

기본 언어는 react에 bootstrap을 선택  

**설문 내용 표현에는 surveyjs를 사용**  

간단한 지문형식을 표현하는 것을 만들까 했지만 surveyjs를 보고  
다양한 패키지로 제공되는 아주 잘 만들어진 라이브러리 생각이 들어 이용하기로 결정.
꽤 커다란 라이브러리인 만큼 진행하며 surveyjs의 기본 틀이 번거롭게도 했음.

```javascript

    npm install --save survey-react

```

**React테스트를 위한 jest와 enzyme설정**  

babel을 사용하고 있는 관계로 babel-jest를 설치  

초반 테스트 코드들은 중간에 데이터 구성을 firebase로 변경하며 상당부분 지워버림.  
데이터 연동 부분을 테스트 하는 것은 탁월하나 프론트UI를 구성하는 부분에서는  
아직 지원이 부족하게 느껴지는 것도 사실.  
테스트 코드는 처음부터 작성하는 것보다는 어느 정도 틀이 갖춰진 후  
잡아가는 것이 좋다는 생각이 듬.  

```javascript

    npm install --save-dev jest babel-jest react-test-renderer
    npm install --save-dev enzyme

```

**Firebase를 이용한 데이터 연동**  

로컬 데이터를 이용하려 했지만 기능 구현을 하다보니 애매모호한 것들이 많아져서  
데이터는 firebase를 이용해 관리하기로 결정.
firebase가 promise를 이용한 callback구조가 react store와 연동 부분에서는  
서버 api를 호출할 때 보다는 살짝 매끄럽지 않은 기분이 있음.

```javascript

    npm install --save firebase

```

**Router를 이용한 구성**  

페이지 이동없는 app를 위한 react지만 router를 이용하면 조금더
구조적인 관리가 되기에 router를 적용함.  
router v4 가 나온 것을 모르고 있어서 배우면서 적용

```javascript

    npm install --save react-router-dom

```

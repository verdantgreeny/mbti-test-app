#  INF∞ : MBTI 성격 유형 테스트

#### 배포된 링크 : [배포링크](https://mbti-test-app-xi.vercel.app/)

### 💬 프로젝트 소개
**INF∞**는 단순한 테스트 기능을 구현하는 것을 넘어, 회원가입/로그인, 프로필 관리, 테스트 결과 저장 및 공유 기능까지 제공하는 웹 애플리케이션입니다.
이 프로젝트를 통해 JWT 인증, REST API 통신, 상태 관리(React Query, Zustand), 반응형 디자인, 그리고 소셜 공유 기능 등 실제 개발에서 자주 사용되는 기술들을 종합적으로 경험할 수 있습니다.

<hr>

### 🎯 프로젝트 목표
- 안전한 인증 및 권한 관리
JWT를 이용하여 사용자의 로그인 상태를 유지하고, 데이터를 안전하게 보호합니다.

- 효율적인 비동기 데이터 관리
Axios와 TanStack Query(React Query)를 활용해 서버와의 통신 및 데이터 캐싱을 최적화합니다.

- 로컬 API 서버 구축
json-server를 활용하여 로컬 환경에서 API 서버를 구성, 실제 환경과 유사한 개발 환경을 제공합니다.

- 테스트 결과 공유 기능 구현
사용자가 자신의 MBTI 테스트 결과를 클립보드 복사 및 SNS 공유 기능을 통해 손쉽게 공유할 수 있습니다.

- 반응형 웹 구현
모바일, 태블릿, 데스크탑 등 다양한 기기에서 최적의 사용자 경험(UX)을 제공합니다.

<hr>

 ### **⏳ 작업 기간**: 2025. 02. 20 ~ 2025. 02. 25

<hr>

 ### ⚙️ 기술 스택
 
 - React (Vite)
 - TanStack Query (React Query) 
 - Zustand
 - Tailwind CSS
 - Axios
 - json-server

<hr>

### ✅ 구현한 기능

1. 기본 UI 및 레이아웃

- Tailwind CSS를 통한 스타일링 및 반응형 디자인 구현
- 모바일, 태블릿, 데스크탑에서 일관된 UI 제공

2. 인증 및 회원 관리

- 회원가입 및 로그인 기능 구현
- JWT 인증을 통한 로그인 유지
- Zustand를 활용한 전역 상태 관리

3. MBTI 테스트

- 사용자가 MBTI 테스트를 진행하고, 자신의 성격 유형을 확인
- TanStack Query(React Query)를 활용한 비동기 데이터 관리

4. 테스트 결과 저장 및 관리

- 테스트 결과를 json-server에 저장
- 결과 페이지에서 모든 유저의 테스트 결과를 확인
- 본인이 작성한 결과는 삭제, 공개/비공개 전환, 공유 기능 제공
- 비공개 처리된 결과는 결과 페이지에서 숨겨지지만 DB에는 남음

5. 공유 기능

- 결과를 SNS로 공유할 수 있는 기능 구현

6. 반응형 웹

- Tailwind CSS의 responsive utilities를 활용하여 다양한 화면 크기에서 최적화된 UI 제공

<hr>

### ⚙ 프로젝트 화면 및 구조

**1. 🚀 프로젝트 화면**

**1-1. Home**
![](https://velog.velcdn.com/images/verdantgreeny/post/2c010426-4433-4f68-b49e-08deddec1361/image.gif)



**1-2. 로그인 및 회원가입 페이지**
![](https://velog.velcdn.com/images/verdantgreeny/post/2f33477b-dc81-4d00-a861-db10649a80f3/image.png)
![](https://velog.velcdn.com/images/verdantgreeny/post/912f801d-2e03-46c4-9526-e29328ecd4a9/image.png)


**1-3. 테스트 페이지**
![](https://velog.velcdn.com/images/verdantgreeny/post/8d25700a-209c-4e6b-bc91-caebeac363ed/image.gif)


**1-4. 테스트 결과 페이지**
![](https://velog.velcdn.com/images/verdantgreeny/post/329f41b2-f37f-4d04-9da9-f343d7befa8d/image.gif)

**1-5. 프로필 페이지**
![](https://velog.velcdn.com/images/verdantgreeny/post/430d16f4-49a5-47df-9086-bd30b2a6e22e/image.gif)

**1-6. 반응형**
<br/>
![](https://velog.velcdn.com/images/verdantgreeny/post/b83232ce-0a74-4c18-b89f-c22496dd3f47/image.gif)

<hr>

**2. 구조** <br />
## 📁 프로젝트 구조
```markdown
📦src
 ┣ 📂api
 ┃ ┣ 📜auth.js
 ┃ ┗ 📜testResults.js
 ┣ 📂components
 ┃ ┣ 📜AuthForm.jsx
 ┃ ┣ 📜Button.jsx
 ┃ ┣ 📜Header.jsx
 ┃ ┣ 📜TestForm.jsx
 ┃ ┗ 📜TestResultCard.jsx
 ┣ 📂constants
 ┃ ┣ 📜queryKey.js
 ┃ ┗ 📜routes.js
 ┣ 📂data
 ┃ ┗ 📜questions.js
 ┣ 📂hooks
 ┃ ┣ 📜useKakaoShare.js
 ┃ ┣ 📜useTestResults.js
 ┃ ┗ 📜useUserActions.js
 ┣ 📂pages
 ┃ ┣ 📜Home.jsx
 ┃ ┣ 📜Login.jsx
 ┃ ┣ 📜Profile.jsx
 ┃ ┣ 📜Signup.jsx
 ┃ ┣ 📜TestPage.jsx
 ┃ ┗ 📜TestResultPage.jsx
 ┣ 📂shared
 ┃ ┣ 📜Layout.jsx
 ┃ ┣ 📜ProtectedRoutes.jsx
 ┃ ┗ 📜Router.jsx
 ┣ 📂utils
 ┃ ┗ 📜mbtiCalculator.js
 ┣ 📂zustand
 ┃ ┗ 📜bearsStore.js
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜main.jsx

```

<br />

## 🚀 트러블 슈팅
#### 1. [알림창 두 번 뜨는 문제 해결하기: useEffect와 StrictMode의 동작 이해하기](https://velog.io/@verdantgreeny/알림창-두-번-뜨는-문제-해결하기-useEffect와-StrictMode의-동작-이해하기)

#### 2. [글리치 json-server 배포 시 200 응답에도 빈 데이터가 반환되는 문제 해결](https://velog.io/@verdantgreeny/글리치-json-server-배포-시-200-응답에도-빈-데이터가-반환되는-문제-해결) 

#### 3. [Zustand에서 새로고침 시 user 데이터가 사라지는 문제 해결하기](https://velog.io/@verdantgreeny/Zustand에서-새로고침-시-user-데이터가-사라지는-문제-해결하기)

<hr>

#### KPT 회고 : ~~[KPT회고링크]()~~
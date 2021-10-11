# 루트 추천 토이프로젝트의 프론트 모듈 입니다.
- 내 실험체와 상대 실험체를 선택 하는 기능을 구현 했습니다.
- 3개의 컴포넌트로 구성 되어 있습니다.  
(선택된 실험체를 보여주는 컴포넌트, 선택하는 기능이 있는 컴포넌트, 루트를 그리는 컴포넌트)

next.config.js에 다음과 같은 내용이 추가되야 합니다.

module.exports = {  
  reactStrictMode: true,  
  env: {  
    host: '${backendhost}',  
  },  
}

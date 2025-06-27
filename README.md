# kit-script(Script Kit Scripts for macOS)
[Script Kit](https://www.scriptkit.com) 용 JavaScript

## 소개

> Script Kit은 macOS에서 강력한 자동화 및 유틸리티 스크립트를 GUI로 실행할 수 있게 도와주는 도구입니다.  
> 이 저장소에는 아래와 같은 편리한 기능들을 수행하는 스크립트들이 포함되어 있습니다.

## 스크립트 목록

### `bookmarks.js`
- **기능:** 크롬 브라우저의 북마크를 검색합니다.
- **활용 예시:** 특정 사이트를 빠르게 찾고 열기

### `historys.js`
- **기능:** 크롬의 방문 이력을 검색합니다.
- **활용 예시:** 최근 방문한 페이지를 빠르게 찾아 재접속

### `jira.js`
- **기능:** Jira 이슈번호로 이슈 페이지를 쉽게 접속
- **활용 예시:** Script kti GUI 메뉴에서 jira CPG-10 입력

### `wifi.js`
- **기능:** 현재 접속된 Wi-Fi의 SSID 및 외부 IP 주소를 확인합니다.
- **활용 예시:** 네트워크 문제 진단 및 연결 상태 확인


## 사용 환경

- 운영체제: **macOS**
- 실행 도구: Script Kit

### Script Kit 설치 방법

#### 방법 1: 공식 홈페이지 이용
[scriptkit.com](https://scriptkit.com) 에서 직접 다운로드 받아 설치

#### 방법 2: Homebrew 이용
```bash
brew install script-kit
```

### Script Kit 에 JavaScript 적용 방법
macOS 기준 `~/.kenv/scripts` 경로에 JavaScript 파일 생성 혹은 복사

### 주의사항
* JavaScript 내의 파일 경로는 macOS 기준으로 작성되었습니다.
* Windows 혹은 Chrome 이 아닌 다른 앱으로의 연동의 경우 코드 수정이 필요합니다.

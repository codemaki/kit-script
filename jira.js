// Name: jira
// Keyword: jira
// Description: Jira 이슈 바로 열기 (Chrome)

// Jira 베이스 URL을 변수로 분리
const JIRA_BASE_URL = "https://jira.skbroadband.com/browse"
//const JIRA_BASE_URL = "https://gonmmh.atlassian.net/browse"

let raw = await arg("Jira 이슈 키 입력 (예: BTVO-12345 또는 jira BTVO-12345)")

const match = raw.toUpperCase().match(/([A-Z]+)-(\d+)/)

if (!match) {
  await notify("형식이 올바르지 않습니다")
  exit()
}

const issueKey = `${match[1]}-${match[2]}`
const url = `${JIRA_BASE_URL}/${issueKey}`

// Chrome으로 열기
await exec(`open -a "Google Chrome" "${url}"`)

// Default Web browser 로 열기
// await exec(`open "${url}"`)
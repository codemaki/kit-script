// Name: bm bookmark

import { promises as fs } from "fs"
import { homedir } from "os"
import { join } from "path"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

// 북마크 파일 경로
const bookmarkPath = join(
  homedir(),
  "Library/Application Support/Google/Chrome/Default/Bookmarks"
)

// 북마크 JSON 파싱
const data = await fs.readFile(bookmarkPath, "utf-8")
const json = JSON.parse(data)

function extractBookmarks(node, result = []) {
  for (let item of node.children || []) {
    if (item.type === "url") {
      result.push({
        name: item.name,
        url: item.url,
      })
    } else if (item.children) {
      extractBookmarks(item, result)
    }
  }
  return result
}

const bookmarks = [
  ...extractBookmarks(json.roots.bookmark_bar),
  ...extractBookmarks(json.roots.other),
  ...(json.roots.synced ? extractBookmarks(json.roots.synced) : []),
]

// 입력한 모든 단어를 북마크 이름에 포함하는지 확인
function matchesAllWords(name, input) {
  const words = input.toLowerCase().split(/\s+/).filter(Boolean)
  const lowerName = name.toLowerCase()
  return words.every(word => lowerName.includes(word))
}

// 실시간 검색 수동 확정
const selectedUrl = await arg({
  placeholder: "북마크 검색 (단어 포함 검색, 엔터로 확정)",
  strict: true,
  choices: async (input) => {
    const filtered = bookmarks
      .filter(b => matchesAllWords(b.name, input))
      .map(b => ({
        name: `${b.name} — ${b.url}`,
        value: b.url,
        preview: `🌐 ${b.name}<br>🔗 ${b.url}`,
      }))

    return filtered.length > 0
      ? filtered
      : [{ name: "결과 없음", value: "__NO__" }]
  },
})

if (selectedUrl === "__NO__") {
  exit()
}

// Chrome으로 열기
await execAsync(`open -a "Google Chrome" "${selectedUrl}"`)
exit()
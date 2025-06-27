// Name: history

import { homedir } from "os"
import { join } from "path"
import { promisify } from "util"
import { exec as execCb } from "child_process"
const exec = promisify(execCb)

const original = join(homedir(), "Library/Application Support/Google/Chrome/Default/History")
const copy = "/tmp/history-copy.db"
await exec(`cp "${original}" "${copy}"`)

const getResults = async (input) => {
  const trimmed = input?.trim() || ""
  const words = trimmed
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.replace(/'/g, "''"))

  let whereClause = ""
  if (words.length >= 1) {
    const conditions = words.map(
      (word) =>
        `(url LIKE '%${word}%' OR title LIKE '%${word}%')`
    )
    whereClause = "WHERE " + conditions.join(" AND ")
  }

  const query = `
    SELECT url, title
    FROM urls
    ${whereClause}
    ORDER BY last_visit_time DESC
    LIMIT 100;
  `

  try {
    const { stdout } = await exec(`sqlite3 "${copy}" "${query}"`)
    return stdout
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const [url, ...titleParts] = line.split("|")
        const title = titleParts.join("|")
        return {
          name: `${title || "(no title)"} — ${url}`,
          value: url,
        }
      })
  } catch (err) {
    return [{ name: "[ERROR]", description: err.message, value: "" }]
  }
}

const selected = await arg(
  "크롬 방문기록 (여러 단어 조합 가능)",
  async (input) => await getResults(input)
)

if (selected) {
  await exec(`open -a "Google Chrome" "${selected}"`)
}
exit()
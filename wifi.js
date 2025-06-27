import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

let { stdout: ssid } = await execAsync(`bash -c "system_profiler SPAirPortDataType | awk '/Current Network Information:/ { getline; print substr(\\$0, 13); exit }'"`)
let { stdout: ip } = await execAsync(`curl -s ifconfig.me`)

await div(`
<b>Wi-Fi SSID:</b> ${ssid.trim() || "알 수 없음"}<br>
<b>외부 IP:</b> ${ip.trim() || "알 수 없음"}
`)
exit()
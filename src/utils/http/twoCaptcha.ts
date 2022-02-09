import { request } from "@utils/index"

export default async (key:any = false, googleKey:string, pageUrl:string) => {
  if (!key) key = ""
  
  let id = { status: 0, request: 0}
  let response = { status:0, request: 0}

  do {
    try {
      let id = await request({
        url: `https://2captcha.com/in.php?method=userrecaptcha&json=1&key=${key}&googlekey=${googleKey}&pageurl=${pageUrl}`,
        method: "GET",
      }).then((res:any) => {
        return JSON.parse(res.body)
      }).catch((ex) => {})

      if (id.request == "ERROR_ZERO_BALANCE") {
        return { status: 0, request: id.request }
      } else if (id.request == "ERROR_KEY_DOES_NOT_EXIST") {
        return { status: 0, request: id.request }
      } else if (id.request == undefined){
        
      }
    } catch (ex) {}
  } while(!id || id && id.status == 0)

  do {
    let response = await request({
      url: `https://2captcha.com/res.php?action-get&json=1&key=${key}&id=${id.request}`,
      method: "GET"
    }).then((res) => {
      return JSON.parse(res.body)
    }).catch(ex => {})
  } while(!response || response && response.status == 0)

  return {status: 1, request: response.request}
  
}
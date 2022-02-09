import request from "@utils/http/request"

export default async (query, source, target) => {
  const res = await request({
    url: "https://libretranslate.com/translate",
    proxy: "http://pilotto:gostoso_country-br@proxy.iproyal.com:12323",
    method: "POST",
    jsonResponse: true,
    body: JSON.stringify({
      q: query,
      source: source,
      target: target,
      api_key: "localhost"
    }),
    headers: {
      'authority': 'libretranslate.com',
      'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
      'content-type': 'application/json',
      'accept': '*/*',
      'origin': 'https://libretranslate.com',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://libretranslate.com/',
      'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
      'cookie': '_ga=GA1.1.279304006.1628861270; _ga_KPKM1EP5EW=GS1.1.1628861270.1.1.1628862366.0'
    }
  })

  return res.body.translatedText
}
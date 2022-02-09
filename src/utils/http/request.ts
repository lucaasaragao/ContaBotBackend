import request from "request"
import { sleep } from "@utils/index"

export default async (options: any) => {
	options.attemps = options.attemps || 20
	for (var i = 0; i < options.attemps; i++) {
		if (options.sleep) await sleep(options.sleep)
		const proxy = typeof options.proxy == "function" ? options.proxy() : options.proxy
		var payload: any = await new Promise(resolve =>
			request({ ...options, proxy: proxy }, (error, response, body) =>
				resolve({ error: error, response: response, body: body })
			)
		)
		if (options.hasOwnProperty("attempFunc") ? options.attempFunc.call(payload) : payload.error == null) break
	}
	payload.body = options.jsonResponse ? JSON.parse(payload.body) : payload.body
	return payload
}
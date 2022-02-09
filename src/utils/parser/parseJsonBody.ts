export default (request, client, next) => {
  const data:any = []
  request.on("data", chunk => data.push(chunk))
  request.on("end", () => {
    try {
      request.body = JSON.parse(data) || {}
    } catch(error) {
      request.body = {}
    }
    next()
  })
}
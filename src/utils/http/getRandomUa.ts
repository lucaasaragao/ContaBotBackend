import randomUserAgent from "random-useragent"

export default (filter) => {
  return randomUserAgent.getRandom(ua => {
      return ua.browserName === `${filter}`
  })
}
const aesjs = require("aes-js")

export default class {
  private key: any[]
  private agent: any
  private utils: any

  constructor() {
    this.key = [ 56, 59, 91, 68, 75, 67, 35, 49, 71, 60, 14, 93, 34, 87, 55, 32, 64, 45, 64, 92, 49, 72,  15, 43, 93, 84, 19, 69, 39, 45, 34, 86 ]
    this.utils = aesjs.utils
    this.agent = aesjs.ModeOfOperation.ctr
  }

  encrypt(payload:any) {
    let aesCtr = new this.agent(this.key, new aesjs.Counter(5))
    payload = this.utils.utf8.toBytes(payload)
    const encryptedBytes = aesCtr.encrypt(payload)
    return this.utils.hex.fromBytes(encryptedBytes)
  }

  async decrypt (payload:any) {
    payload = this.utils.hex.toBytes(payload)
    let aesCtr = new this.agent(this.key, new aesjs.Counter(5))
    let decryptedBytes = aesCtr.decrypt(payload)
    return this.utils.utf8.fromBytes(decryptedBytes)
  }
}
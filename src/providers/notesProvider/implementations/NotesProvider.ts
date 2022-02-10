import { injectable } from "tsyringe"

import { INotesProvider } from "../INotesProvider"
import puppeteer from "puppeteer-extra"
import fs from "fs"
import { path } from "app-root-path"

@injectable()
class NotesProvider implements INotesProvider {
  private puppeteer: any
  constructor() {
    this.puppeteer = puppeteer
  }

  async get({ username, password }): Promise<Boolean | String> {
    try {
      username = String(username).trim()
      password = String(password).trim()

      const browser = await this.puppeteer.launch({ headless: false, defaultViewport: null, args: [ '--no-sandbox' ]})
      const page = await browser.newPage()
  
      await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './downloads' })
      await page.goto('https://sispmjp.joaopessoa.pb.gov.br:8080/sispmjp/login.jsf', { waitUntil: 'networkidle2' })
      await page.$eval('input[name=j_username]', (el:any, value:any) => el.value = value, username)
      await page.$eval('input[name=j_password]', (el:any, value:any) => el.value = value, password)
      await page.$eval('button#commandButton_entrar', (form:any) => form.click())
  
      await page.waitForTimeout(1000)
          
      const buttons = await page.$$('button')
      if (buttons.length >= 1) {
        for (let i = 0; i < buttons.length; i++) {
          if (i == 1) {
            await buttons[i].click()
          }
        }
      } else {
        return false
      }
  
      await page.waitForTimeout(1000)
      await page.goto('https://sispmjp.joaopessoa.pb.gov.br:8080/sispmjp/paginas/ds/DS_ConsultarNFSePrestador.jsf', { waitUntil: "networkidle2" })
      await page.waitForTimeout(1000)
  
      await page.$eval('input[name="form:dtComp_input"]', (el:any) => el.value = "01/12/2021")
      await page.$eval('input[name="form:compFim_input"]', (el:any) => el.value = "31/12/2021")
      await page.$eval('button[name="form:j_idt60"]', (form:any) => form.click())
  
      await page.waitForTimeout(2000)
      await page.$eval('button[name="commandButton_exportar"]', (form:any) => form.click())
      await page.waitForTimeout(1000)
  
      let text:any = fs.readFileSync(path + "/downloads/NFSe.xml", { encoding: "utf-8" })    
      fs.unlinkSync(path + "/downloads/NFSe.xml")
  
      await browser.close()
  
      return text
  
    } catch (error) {
      return false
    }
  }
}

export { NotesProvider }
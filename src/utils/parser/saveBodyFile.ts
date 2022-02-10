const { IncomingForm } = require("formidable")

export default async (req) => {
  return new Promise((resolve) => {
      const form = new IncomingForm()
      form.parse(req, async function (err, fields, files) {
          resolve({ file: files.file.filepath, fileName: files.file.originalFilename })
      })
  })
}
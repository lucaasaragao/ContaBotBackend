import XLSX from "xlsx"

export default async (path) => {
  let workbook = XLSX.readFile(path)
  let sheetNameList = workbook.SheetNames
  const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])

  return json
}
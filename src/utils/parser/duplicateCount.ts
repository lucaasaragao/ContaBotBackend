export default (string:string, subString:string, allowOverlapping:boolean) => {
  string += ""
  subString += ""
  if (subString.length <= 0) return (string.length + 1)

  let n:number, pos:number = 0
  let step = allowOverlapping ? 1 : subString.length

  while (1) {
    pos = string.indexOf(subString, pos)
    if (pos >= 0) {
      ++n
      pos += step
    } else break
  } 
  return n
}
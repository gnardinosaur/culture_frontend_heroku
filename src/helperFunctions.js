export function parseSearchDates(dateString){
  let dateArr = dateString.split("-");
  dateArr = dateArr.map(el => el.trim())
  let B = RegExp(/B/);
  let A = RegExp(/A/);
  let dateBegin;
  let dateEnd;
  
  dateArr.forEach((el, index) => {
    if (B.exec(el)){
      if (index === 0) {
        dateBegin = "-" + el.replace(/\D/g, "")
      } else {
        dateEnd = "-" + el.replace(/\D/g, "")
      }
    } else if (A.exec(el)){
      if (index === 0){
        dateBegin = el.replace(/\D/g, "")
      } else {
        dateEnd = el.replace(/\D/g, "")
      }
    } else if (el === "Present") {
      if (index === 0){
        dateBegin = new Date().getFullYear()
      } else {
        dateEnd = new Date().getFullYear()
      }
    } else if (el !== "Present" && index === 0) {
      dateBegin = "-" + el.replace(/\D/g, "")
    } else {
      dateEnd = el.replace(/\D/g, "")
    }
  })

  return [dateBegin, dateEnd]

};

export function getRandomInclusive(min, max){
  return Math.floor(Math.random() * (max - min + 1 )) + min
}
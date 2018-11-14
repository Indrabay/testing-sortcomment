var axios = require("axios")
var readLine = require("readline-sync")

async function showData() {
  console.log(`Pilih data untuk ditampilkan: 
  1. Data terurut dari id (A-Z)
  2. Data terurut dari id (Z-A)
  3. Data terurut dari nama (A-Z)
  4. Data terurut dari nama (Z-A)
  5. Data terurut dari email (A-Z)
  6. Data terurut dari email (Z-A)
  7. Pencarian`)
  let userInput = readLine.question("Masukkan pilihan: ")
  let dataJSON = await axios.get("http://jsonplaceholder.typicode.com/comments")
    .then(response => response.data)
  let limit = 10
  let formattedData = formatByMenuChoosen(userInput, dataJSON)
  if (formattedData.isExit === false && formattedData.isWrong === false) {
    let listCommentData = formattedData.data
    console.log(listCommentData.slice(0, limit))
    if (listCommentData.length > 10) {
      moreData(limit, listCommentData)
    }
  } else if (formattedData.isExit === true) {
    return
  } else {
    console.log("Pilihan tersebut tidak tersedia")
  }
  commentSort.showData()
}

function formatByMenuChoosen(userInput, dataJSON) {
  let returnedData = {};
  returnedData.isExit = false
  returnedData.isWrong = false
  if (Number(userInput) === 1) {
    returnedData.data = sortData(dataJSON, "id", "asc")
  } else if (Number(userInput) === 2) {
    returnedData.data = sortData(dataJSON, "id", "desc")
  } else if (Number(userInput) === 3) {
    returnedData.data = sortData(dataJSON, "name", "asc")
  } else if (Number(userInput) === 4) {
    returnedData.data = sortData(dataJSON, "name", "desc")
  } else if (Number(userInput) === 5) {
    returnedData.data = sortData(dataJSON, "email", "asc")
  } else if (Number(userInput) === 6) {
    returnedData.data = sortData(dataJSON, "email", "desc")
  } else if (Number(userInput) === 7) {
    returnedData.data = askSearch(dataJSON)
  } else if (userInput.toUpperCase() === "EXIT") {
    returnedData.isExit = true
  } else {
    returnedData.isWrong = true
  }

  return returnedData
}

function moreData(limit, data) {
  while (askNext() === true) {
    tempLimit = limit
    limit += 10
    console.log(data.slice(tempLimit, limit))
  }
}

function askSearch(dataJSON) {
  let askKeyword = readLine.question("Masukkan kata kunci: ")
  return dataJSON.filter(elm => elm.body.toLowerCase().includes(askKeyword.toLowerCase()))
}

function askNext() {
  let askInputNext = readLine.question("Halaman selanjutnya? (y/n) ")
  return askInputNext === "y" ? true : false
}

function sortData(data, attribute, sortType) {
  data.sort(function (a,b) {
    var attributeA = sortType === "desc" ? b[attribute] : a[attribute]
    var attributeB = sortType === "desc" ? a[attribute] : b[attribute]

    if (attributeA < attributeB) {
      return -1
    }

    if (attributeA > attributeB) {
      return 1
    }

    return 0
  })
  return data
}

let commentSort = { showData, askSearch, moreData, formatByMenuChoosen }

module.exports = commentSort
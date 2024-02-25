let rows = 100
let cols = 26

let addressColContainer = document.querySelector('.address-col-cont')
let addressRowContainer = document.querySelector('.address-row-cont')
let cellsContainer = document.querySelector('.cells-cont')

for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement('div')
  addressCol.innerText = i + 1
  addressCol.classList.add('address-col')
  addressColContainer.appendChild(addressCol)
}

for (let i = 0; i < cols; i++) {
  let addressRow = document.createElement('div')
  addressRow.classList.add('address-row')
  let text = String.fromCharCode(65 + i) // This is used to convert number to character it starts from 65
  addressRow.innerText = text
  addressRowContainer.appendChild(addressRow)
}

for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement('div')
  rowCont.classList.add('row-cont')
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    rowCont.appendChild(cell)
  }
  cellsContainer.appendChild(rowCont)
}

let rows = 100
let cols = 26

let addressColContainer = document.querySelector('.address-col-cont')
let addressRowContainer = document.querySelector('.address-row-cont')
let cellsContainer = document.querySelector('.cells-cont')
let addressBar = document.querySelector('.address-bar')

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
    cell.setAttribute('contenteditable', true)

    //Attributes for cell and storage identification
    cell.setAttribute('rid', i)
    cell.setAttribute('cid', j)
    cell.setAttribute('spellcheck', false)

    cell.classList.add('cell')
    rowCont.appendChild(cell)

    displayCellAddress(cell, i, j)
    navCellColor(cell, i, j)
  }
  cellsContainer.appendChild(rowCont)
}

function displayCellAddress(cell, i, j) {
  cell.addEventListener('click', () => {
    let rowID = i + 1
    let colID = String.fromCharCode(65 + j)
    addressBar.value = `${colID}${rowID}`
  })
}

//navCellColor Starts
let addressRows = document.querySelectorAll('.address-row')
let addressCols = document.querySelectorAll('.address-col')

let selectedCell = null

function navCellColor(cell, i, j) {
  cell.addEventListener('click', () => {
    if (selectedCell !== null) {
      addressRows[selectedCell.row].style.backgroundColor = ''
      addressCols[selectedCell.col].style.backgroundColor = ''
    }

    // Apply background color only to the clicked cell
    addressRows[j].style.backgroundColor = 'rgb(76 175 80 / 20%)'
    addressCols[i].style.backgroundColor = 'rgb(76 175 80 / 20%)'

    //Update Selected Cell so that it can clear the background next time
    selectedCell = {
      row: j,
      col: i,
    }
  })
}
//navCellColor Ends

//By default click on first cell
let firstCell = document.querySelector('.cell')
firstCell.focus()
firstCell.click()

//Setting Scroll to go 2rem on each particular scroll
const scrollElement = document.querySelector('.grid-cont')

scrollElement.addEventListener('wheel', (event) => {
  event.preventDefault()
  const scrollDirection = event.deltaY > 0 ? 1 : -1 // 1 for down, -1 for up

  const scrollAmountX = 5 * 16 // 5rem in pixels (assuming 1rem = 16px)
  const scrollAmountY = 2 * 16 // 2rem in pixels (assuming 1rem = 16px)

  if (event.shiftKey) {
    scrollElement.scrollLeft += scrollAmountX * scrollDirection
  } else {
    scrollElement.scrollTop += scrollAmountY * scrollDirection
  }
})

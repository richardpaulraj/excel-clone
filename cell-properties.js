//Storage
let sheetDB = []

for (let i = 0; i < rows; i++) {
  let sheetRow = []
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: 'left',
      fontFamily: 'monospace',
      fontSize: '16',
      fontColor: '#000000',
      backgroundColor: '#000000', //Just for indication purpose
    }
    sheetRow.push(cellProp)
  }
  sheetDB.push(sheetRow)
}

//Selector for cell properties
let bold = document.querySelector('.bold')
let italic = document.querySelector('.italic')
let underline = document.querySelector('.underline')
let fontSize = document.querySelector('.font-size-prop')
let fontFamily = document.querySelector('.font-family-prop')
let fontColor = document.querySelector('.font-color-prop')
let backgroundColor = document.querySelector('.background-color-prop')
let alignment = document.querySelectorAll('.alignment')
let leftAlign = alignment[0]
let centerAlign = alignment[1]
let rightAlign = alignment[2]

//Application of Two Way Binding

//Attach property listners

//Bold
bold.addEventListener('click', (e) => {
  let [cell, cellProp] = activeCell()

  //Modification
  cellProp.bold = !cellProp.bold //Data Change
  cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal' //UI Change
  cellProp.bold
    ? bold.classList.add('activeIcon')
    : bold.classList.remove('activeIcon') //UI Change
})

//Italic
italic.addEventListener('click', (e) => {
  let [cell, cellProp] = activeCell()

  //Modification
  cellProp.italic = !cellProp.italic //Data Change
  cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal' //UI Change
  cellProp.italic
    ? italic.classList.add('activeIcon')
    : italic.classList.remove('activeIcon') //UI Change
})

//Underline
underline.addEventListener('click', (e) => {
  let [cell, cellProp] = activeCell()

  //Modification
  cellProp.underline = !cellProp.underline //Data Change
  cell.style.textDecoration = cellProp.underline ? 'underline' : 'none' //UI Change
  cellProp.underline
    ? underline.classList.add('activeIcon')
    : underline.classList.remove('activeIcon') //UI Change
})

//Font Size
fontSize.addEventListener('change', (e) => {
  let [cell, cellProp] = activeCell()
  //Modification
  cellProp.fontSize = fontSize.value //Data Change
  cell.style.fontSize = cellProp.fontSize + 'px'
  fontSize.value = cellProp.fontSize
})

//Font Family
fontFamily.addEventListener('change', (e) => {
  let [cell, cellProp] = activeCell()
  //Modification
  cellProp.fontFamily = fontFamily.value //Data Change
  cell.style.fontFamily = cellProp.fontFamily
  fontFamily.value = cellProp.fontFamily
})

//Font Color
fontColor.addEventListener('change', () => {
  let [cell, cellProp] = activeCell()
  cellProp.fontColor = fontColor.value
  cell.style.color = cellProp.fontColor
  fontColor.value = cellProp.fontColor
})

//Background Color
backgroundColor.addEventListener('change', () => {
  let [cell, cellProp] = activeCell()
  cellProp.backgroundColor = backgroundColor.value
  cell.style.backgroundColor = cellProp.backgroundColor
  backgroundColor.value = cellProp.backgroundColor
})

//Alignment
alignment.forEach((alignElem) => {
  alignElem.addEventListener('click', (e) => {
    let [cell, cellProp] = activeCell()
    let alignValue = e.target.classList[0]
    cellProp.alignment = alignValue // DB Updated
    cell.style.textAlign = cellProp.alignment //UI Change - 1)

    //UI Change - 2)
    if (cellProp.alignment === 'left') {
      leftAlign.classList.add('activeIcon')
      centerAlign.classList.remove('activeIcon')
      rightAlign.classList.remove('activeIcon')
    } else if (cellProp.alignment === 'center') {
      leftAlign.classList.remove('activeIcon')
      centerAlign.classList.add('activeIcon')
      rightAlign.classList.remove('activeIcon')
    } else if (cellProp.alignment === 'right') {
      leftAlign.classList.remove('activeIcon')
      centerAlign.classList.remove('activeIcon')
      rightAlign.classList.add('activeIcon')
    }
  })
})

let allCells = document.querySelectorAll('.cell')
for (let i = 0; i < allCells.length; i++) {
  addListnerToAttachCellProperties(allCells[i])
}

function addListnerToAttachCellProperties(cell) {
  cell.addEventListener('click', (e) => {
    let [cell, cellProp] = activeCell()
    //Apply Cell Properties
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal' // Bold
    cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal' // Italic
    cell.style.textDecoration = cellProp.underline ? 'underline' : 'none' // Underline
    cell.style.fontSize = cellProp.fontSize + 'px' // FontSize
    cell.style.fontFamily = cellProp.fontFamily // FontFamily
    cell.style.color = cellProp.fontColor // FontColor
    cell.style.backgroundColor =
      cellProp.backgroundColor === '#000000'
        ? 'transparent'
        : cellProp.backgroundColor // BackgroundColor
    cell.style.textAlign = cellProp.alignment // Alignment

    if (cellProp.alignment === 'left') {
      leftAlign.classList.add('activeIcon')
      centerAlign.classList.remove('activeIcon')
      rightAlign.classList.remove('activeIcon')
    } else if (cellProp.alignment === 'center') {
      leftAlign.classList.remove('activeIcon')
      centerAlign.classList.add('activeIcon')
      rightAlign.classList.remove('activeIcon')
    } else if (cellProp.alignment === 'right') {
      leftAlign.classList.remove('activeIcon')
      centerAlign.classList.remove('activeIcon')
      rightAlign.classList.add('activeIcon')
    }

    //Apply UI Properties
    cellProp.bold
      ? bold.classList.add('activeIcon')
      : bold.classList.remove('activeIcon') // Bold

    cellProp.italic
      ? italic.classList.add('activeIcon')
      : italic.classList.remove('activeIcon') //UI Change

    cellProp.underline
      ? underline.classList.add('activeIcon')
      : underline.classList.remove('activeIcon') //UI Change

    fontSize.value = cellProp.fontSize
    fontFamily.value = cellProp.fontFamily
    fontColor.value = cellProp.fontColor
    backgroundColor.value = cellProp.backgroundColor

    if (cellProp.alignment === 'left') {
      leftAlign.classList.add('activeIcon')
      centerAlign.classList.remove('activeIcon')
      rightAlign.classList.remove('activeIcon')
    } else if (cellProp.alignment === 'center') {
      leftAlign.classList.remove('activeIcon')
      centerAlign.classList.add('activeIcon')
      rightAlign.classList.remove('activeIcon')
    } else if (cellProp.alignment === 'right') {
      leftAlign.classList.remove('activeIcon')
      centerAlign.classList.remove('activeIcon')
      rightAlign.classList.add('activeIcon')
    }
  })
}

function activeCell() {
  let [rid, cid] = decodeRIDCID()
  let cell = document.querySelector(`.cell[rid = "${rid}"][cid = "${cid}"]`) //UI changes is done in the cells
  let cellProp = sheetDB[rid][cid] // DB changes are done in the cellProp

  return [cell, cellProp]
}

function decodeRIDCID() {
  let value = addressBar.value //addressBar is already defined in the grid.js file
  let cid = value[0].charCodeAt(0) - 65
  let rid = value[1] - 1 // -1 because of the 0 indexing values
  return [rid, cid]
}

/*

There are 2 types of Formula Expression
1 - Normal Expression (10 + 5 *2)
2 - Dependencey Expression ( A1 * A2 )

*/

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`)

    //This Blur Event  works first compared to Click Event
    cell.addEventListener('blur', (e) => {
      let address = addressBar.value
      let [activeCell, cellProp] = getCellAndCellProp(address)
      let enteredData = activeCell.innerText

      if (enteredData === cellProp.value) return

      cellProp.value = enteredData

      //If modifies remove P-C relationship, formula empty, update childrens with new hardcoded (modified) value
      removeChildFromParent(cellProp.formula)
      cellProp.formula = ''
      updateChildrenCells(address)
    })
  }
}

let formulaBar = document.querySelector('.formula-bar')

formulaBar.addEventListener('keydown', (e) => {
  let inputFormula = formulaBar.value

  if (e.key === 'Enter' && inputFormula) {
    let address = addressBar.value
    let [cell, cellProp] = getCellAndCellProp(address)

    if (inputFormula !== cellProp.formula) {
      removeChildFromParent(cellProp.formula)
    }

    let evaluatedValue = evaluateFormula(inputFormula) // here the inputed value will be somthing like '2 + 5 + 6' or even A1 + A2 and the eval calculates it

    //to update UI and cellProp in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula, address)

    addChildToParent(inputFormula)

    updateChildrenCells(address)
  }
})

function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress)
  let children = parentCellProp.children

  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i]
    let [childCell, childCellProp] = getCellAndCellProp(childAddress)
    let childFormula = childCellProp.formula
    let evaluatedValue = evaluateFormula(childFormula)

    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress)
    updateChildrenCells(childAddress)
  }
}

function addChildToParent(formula) {
  let childAddress = addressBar.value
  let encodedFormula = formula.split(' ')
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0)
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]) // eg. C1 + B2 , it will add in C1 and in B1 the children as the current Selected element actually who wants the answer
      parentCellProp.children.push(childAddress) //Child Address means the current address is child and formula one is the parent address
    }
  }
}
function removeChildFromParent(formula) {
  let childAddress = addressBar.value
  let encodedFormula = formula.split(' ')
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0)
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i])
      let idx = parentCellProp.children.indexOf(childAddress)
      parentCellProp.children.splice(idx, 1)
    }
  }
}

function evaluateFormula(formula) {
  //here to identify weather the function is an Encoded one or dependency one thats y we are using ASCII to evaluate
  let encodedFormula = formula.split(' ') //Because user inputs the formula in a space seperated manner. Here we would get 3 values
  //eg. 'A1' '+' 'A2' we only wanted A1 and A2 so we will filter it out using ASCII value from 65 to 90 below
  for (let i = 0; i < encodedFormula.length; i++) {
    /*
    Here first we have to check weather the each value is an dependency value like 'A2' or normal value like '15'
    Ascii value of A is 65 and Ascii value of Z is 90 ----> so we have to check weather each of the value's Ascii value lies inbetween 65 - 90 if yes then it is a Dependency value 
    */
    let asciiValue = encodedFormula[i].charCodeAt(0) // If there is A1 the we only want the A's value // Here charCodeAt actually converts the the Ascii value.  Eg: let val = 'A' ;  val.charCodeAt(0) ===> 65 ;

    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]) // Here we will be passing A1 and next time A2 just to extract its inner Value
      encodedFormula[i] = cellProp.value //Here we would add those value in their respective place eg(A1 = 5 , A2 = 1  so 5 + 1) and below this the eval functions evalutes this equation
    }
  }

  let decodedFormula = encodedFormula.join(' ') //Because eval takes in as a string format
  return eval(decodedFormula) //The eval() function evaluates JavaScript code represented as a string and returns its completion value. The source is parsed as a script.

  // *** For eval to work the formaula should be seperated by space *** //
  //This doesn't works eval("2+2");
  //This works eval("2 + 2");
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
  let [cell, cellProp] = getCellAndCellProp(address)

  //DB Update
  cellProp.value = evaluatedValue
  cellProp.formula = formula

  //UI Update
  cell.innerText = cellProp.value
}

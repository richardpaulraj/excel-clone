let graphComponentMatrix = []

for (let i = 0; i < rows; i++) {
  let row = []
  for (let j = 0; j < cols; j++) {
    //Why array -> More then 1 children relation(dependency)
    row.push([])
  }

  graphComponentMatrix.push(row)
}

//True --> cyclic , False --> not cyclic
function isGraphCyclic(graphComponentMatrix) {
  //Dependency -> visited, dfsVisited (2D Array)
  let visited = []
  let dfsVisited = []

  for (let i = 0; i < rows; i++) {
    let visitedRow = []
    let dfsVisitedRow = []
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false)
      dfsVisitedRow.push(false)
    }
    visited.push(visitedRow)
    dfsVisited.push(dfsVisitedRow)
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if(visited[i][j] === false){
        let response = dfsCycleDtection(graphComponentMatrix, i, j, visited, dfsVisited) 
        if(response === true)return true //Found cycle
      }
    }
  }
  return false
}

//Start --> visited(True) dfsVisited (True)
//End -->dfsVisited(false)
//If visited[i][j] === true   -> Already explored path so go back no use no use to explaore again
//Cycle detection condition --> if(visited[i][j] === true && dfsVisited[i][j] === true) => Cyclic
//Return True/False
//True --> cyclic , False --> not cyclic

function dfsCycleDtection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
  visited[srcr][srcc] = true
  dfsVisited[srcr][srcc] = true

  // A1 ->[[0,1], [1,5], [9,6], .....]
  for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
    let [crid, ccid] = graphComponentMatrix[srcr][srcc][children]

    if(visited[crid][ccid] === false){
      let response = dfsCycleDtection(graphComponentMatrix, crid, ccid, visited, dfsVisited)
      if(response === true){
        return true // Cyclic. Found cycle so return immediatelty, no needed to explore more path
      } 
    }
    else if(visited[crid][ccid] === true && dfsVisited[crid][ccid] === true){
      return true //Cyclic 
    }
    
  }
  dfsVisited[srcr][srcc] = false

  return false //Not found any cycle
}

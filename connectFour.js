let positionsList = [
  "F_Yellow",
  "G_Red",
  "D_Yellow",
  "C_Red",
  "A_Yellow",
  "A_Red",
  "E_Yellow",
  "D_Red",
  "D_Yellow",
  "F_Red",
  "B_Yellow",
  "E_Red",
  "C_Yellow",
  "D_Red",
  "F_Yellow",
  "D_Red",
  "D_Yellow",
  "F_Red",
  "G_Yellow",
  "C_Red",
  "F_Yellow",
  "E_Red",
  "A_Yellow",
  "A_Red",
  "C_Yellow",
  "B_Red",
  "E_Yellow",
  "C_Red",
  "E_Yellow",
  "G_Red",
  "A_Yellow",
  "A_Red",
  "G_Yellow",
  "C_Red",
  "B_Yellow",
  "E_Red",
  "F_Yellow",
  "G_Red",
  "G_Yellow",
  "B_Red",
  "B_Yellow",
  "B_Red",
]; //red

function whoIsWinner(piecesPositionList) {
  //return "Red", "Yellow" or "Draw"

  //variables
  const objColTable = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
  };
  const objRowTable = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  const objCrossTable = {
    A3D6: [],
    A2E6: [],
    A1F6: [],
    B1G6: [],
    C1G5: [],
    D1G4: [],
  };
  const colNames = Object.keys(objColTable);
  const crossCellNames = Object.keys(objCrossTable);

  //Column object

  for (let i = 0; i < piecesPositionList.length; i++) {
    objColTable[piecesPositionList[i].substring(0, 1)].push(
      piecesPositionList[i].substring(2)
    );
  }

  //Row object
  for (let i = 0; i < 7; i++) {
    const selectedColsElements = objColTable[colNames[i]];
    for (let t = 1; t < selectedColsElements.length; t++) {
      objRowTable[t].push(selectedColsElements[t - 1]);
    }
  }

  //Cross object

  for (let i = 0; i < 6; i++) {
    const selectedCross = crossCellNames[i]; //a3d6
    //TODO: buradan devam et
    const startColInd = colNames.indexOf(selectedCross.substring(0, 1)); //0->a
    const startRowInd = Number(selectedCross.substring(1, 2)); //3
    const endColInd = colNames.indexOf(selectedCross.substring(2, 3)); //3->d
    const endRowInd = Number(selectedCross.substring(3, 4)); //6
    for (let i = startColInd, t = startRowInd; i <= endColInd; i++, t++) {
      objCrossTable[selectedCross].push(objColTable[colNames[i]][t - 1]);
    }
  }
  console.log(objCrossTable);

  console.log(objColTable);
  console.log(objRowTable);
  //check all objects
  const is4Connected = (arr) => {
    for (let i = 0; i < arr.length - 3; i++) {
      if (
        arr[i] === "Yellow" &&
        arr[i + 1] === "Yellow" &&
        arr[i + 2] === "Yellow" &&
        arr[i + 3] === "Yellow"
      ) {
        return "Yellow";
      } else if (
        arr[i] === "Red" &&
        arr[i + 1] === "Red" &&
        arr[i + 2] === "Red" &&
        arr[i + 3] === "Red"
      ) {
        return "Red";
      }
    }
  };

  const allInOneArr = (arrays) => {
    let result = [];
    for (let i = 0; i < arrays.length; i++) {
      result.push(arrays[i]);
    }
    return result;
  };
  let allTables = [];

  allTables.push(...allInOneArr(Object.values(objColTable)));
  allTables.push(...allInOneArr(Object.values(objRowTable)));
  allTables.push(...allInOneArr(Object.values(objCrossTable)));
  // allInOneArr(Object.values(objColTable)),
  // allInOneArr(Object.values(objRowTable)),
  // allInOneArr(Object.values(objCrossTable))
  //);
  let winner = "";
  for (let i = 0; i < allTables.length; i++) {
    winner = is4Connected(allTables[i]);
    if (winner != undefined) {
      break;
    }
  }
  if (winner === undefined) {
    return "Draw";
  } else {
    return winner;
  }
}
console.log(whoIsWinner(positionsList));

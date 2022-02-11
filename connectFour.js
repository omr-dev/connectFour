function whoIsWinner(piecesPositionList) {
  //return "Red", "Yellow" or "Draw"

  //variables
  const objTable = {
    A: {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
    },
    B: {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
    },
    C: {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
    },
    D: {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
    },
    E: {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
    },
    F: {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
    },
    G: {
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
    },
  };

  const addNewMove = (move) => {
    const colOfMove = move.substring(0, 1);
    const colorOfMove = move.substring(2);
    const rowOfMove = selectRow(colOfMove);
    objTable[colOfMove][rowOfMove] = colorOfMove;
  };

  const selectRow = (colOfMove) => {
    for (let i = 1; i < 7; i++) {
      if (!objTable[colOfMove][i]) return i;
    }
  };
  const createCrossObj = () => {
    const colNames = Object.keys(objTable);
    const objCrossTable = {
      A3D6: [],
      A2E6: [],
      A1F6: [],
      B1G6: [],
      C1G5: [],
      D1G4: [],
      A4D1: [],
      A5E1: [],
      A6F1: [],
      B6G1: [],
      C6G2: [],
      D6G3: [],
    };
    const crossCellNames = Object.keys(objCrossTable);
    for (let i = 0; i < crossCellNames.length; i++) {
      const selectedCross = crossCellNames[i];
      const startColInd = colNames.indexOf(selectedCross.substring(0, 1));
      const startRowInd = Number(selectedCross.substring(1, 2));
      const endColInd = colNames.indexOf(selectedCross.substring(2, 3));
      const endRowInd = Number(selectedCross.substring(3, 4));
      if (endRowInd > startRowInd) {
        for (
          let colInd = startColInd, rowInd = startRowInd;
          colInd <= endColInd;
          colInd++, rowInd++
        ) {
          objCrossTable[selectedCross].push(objTable[colNames[colInd]][rowInd]);
        }
      } else {
        for (
          let colInd = startColInd, rowInd = startRowInd;
          rowInd >= endRowInd;
          colInd++, rowInd--
        ) {
          objCrossTable[selectedCross].push(objTable[colNames[colInd]][rowInd]);
        }
      }
    }

    return objCrossTable;
  };
  const is4Connected = () => {
    const colNames = Object.keys(objTable);

    //check columns
    for (let i = 0; i < 7; i++) {
      let curCol = colNames[i];
      for (let row = 1; row < 4; row++) {
        if (
          objTable[curCol][row] === "Yellow" &&
          objTable[curCol][row + 1] === "Yellow" &&
          objTable[curCol][row + 2] === "Yellow" &&
          objTable[curCol][row + 3] === "Yellow"
        ) {
          return "Yellow";
        }
        if (
          objTable[curCol][row] === "Red" &&
          objTable[curCol][row + 1] === "Red" &&
          objTable[curCol][row + 2] === "Red" &&
          objTable[curCol][row + 3] === "Red"
        ) {
          return "Red";
        }
      }
    }
    //check rows
    for (let curRow = 1; curRow < 7; curRow++) {
      for (let col = 0; col < 4; col++) {
        if (
          objTable[colNames[col]][curRow] === "Yellow" &&
          objTable[colNames[col + 1]][curRow] === "Yellow" &&
          objTable[colNames[col + 2]][curRow] === "Yellow" &&
          objTable[colNames[col + 3]][curRow] === "Yellow"
        ) {
          return "Yellow";
        }
        if (
          objTable[colNames[col]][curRow] === "Red" &&
          objTable[colNames[col + 1]][curRow] === "Red" &&
          objTable[colNames[col + 2]][curRow] === "Red" &&
          objTable[colNames[col + 3]][curRow] === "Red"
        ) {
          return "Red";
        }
      }
    }

    //check cross
    let newCrossObj = createCrossObj();
    const crossColNames = Object.keys(newCrossObj);

    for (let i = 0; i < crossColNames.length; i++) {
      const selectedArray = newCrossObj[crossColNames[i]];
      for (let t = 0; t < selectedArray.length - 3; t++) {
        if (
          selectedArray[t] === "Yellow" &&
          selectedArray[t + 1] === "Yellow" &&
          selectedArray[t + 2] === "Yellow" &&
          selectedArray[t + 3] === "Yellow"
        ) {
          return "Yellow";
        }
        if (
          selectedArray[t] === "Red" &&
          selectedArray[t + 1] === "Red" &&
          selectedArray[t + 2] === "Red" &&
          selectedArray[t + 3] === "Red"
        ) {
          return "Red";
        }
      }
    }
  };

  //Main process
  for (let i = 0; i < piecesPositionList.length; i++) {
    const piece = piecesPositionList[i];
    addNewMove(piece);
    if (is4Connected()) {
      return is4Connected();
    }
    if (i == piecesPositionList.length - 1) {
      return "Draw";
    }
  }
}

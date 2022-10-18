//amount payable

const tableListRimborso = [];
const tableListRimborsoFiltered = [];
let primaryKey = 0;
let tr;
let sum = 0;
let sumImporto = 0;
let columnSort = "date";
const tbody = document.getElementById("inputTable");


function newRow() {
    document.getElementById("inputMonth").disabled = true;
    const row = {"date" : "", "type" : "", "importo" : 0, "ricevuta" : "", "stato" : "", "dovuto" : 0, "primaryKey" : primaryKey++};
    addRowObject(row);
    filterEvent == 0 ?  addRowToTable() : filterTable();
    console.table([tableListRimborso]);
    return false;
}

function filterTable() {
    filterArray();
    resetTable();
    writeCreateTable(tableListRimborsoFiltered);
}

function addRowObject(row) {
    arrayGetValue(row);
    tableListRimborso.push(row);
    sortByColumn(columnSort, tableListRimborso);
}

function arrayGetValue(row) {
    row.type = document.getElementById("inputType").value;
    row.date = document.getElementById("inputDate").value;
    row.importo = document.getElementById("inputImporto").value;
    row.ricevuta = document.getElementById("inputRicevuta").checked ?  "Sì" : "No"
    row.stato = approvazione(regoleApprovazione(row));
    row.dovuto  = Number(gestisciImportiDovuti(row));
}

function addRowToTable() {
    createRowCell();
    setRowsAttribute();
    writeTable(tableListRimborso);
}

function createRowCell() {
    tr = tbody.insertRow(-1);
    for (i = 0; i < 7; i++) {
        tr.insertCell(i);
    }
}

function setRowsAttribute() {  
    for (let i = 0; i < 6; i++) {
        tr.cells[i].setAttribute("onclick", "activateChangeStatusEvent(this)");
    }
}

function writeTable(tableListRimborso) {
    tableListRimborso.map(function (row, i) {
        writeRowCells(tbody.rows[i], row)
    });  
    calculateSumAmount(tableListRimborso);
    progressBar();
    document.getElementById("inputTotale").innerHTML = sum;
}

function writeRowCells(tr, row) { 
    tr.cells[0].innerHTML = translateDay(row.date);
    tr.cells[1].innerHTML = row.type;
    tr.cells[2].innerHTML = row.importo;
    tr.cells[3].innerHTML = row.ricevuta;
    tr.cells[4].innerHTML = row.stato;
    tr.cells[5].innerHTML = row.dovuto;
    tr.cells[6].innerHTML = '<button class="deleteRow" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>';
}

function writeCreateTable(tableListRimborso) {
    tableListRimborso.map(function (row, i) {
        createRowCell();
        writeRowCells(tbody.rows[i], row);
        setRowsAttribute();
        primaryKey++;
    });
    calculateSumAmount(tableListRimborso);
    progressBar();
    document.getElementById("inputTotale").innerHTML = sum;
}

function progressBar() {
    document.getElementById("divProgressBar").style.display = "inline";
    end = document.getElementById("progressEnd")
    actual = document.getElementById("progressActual")
    barInside = document.getElementById("progressBarInside")
    bar = document.getElementById("progressBar")
    let tableIsEmpty = sumImporto == 0;
    if (!tableIsEmpty) {
        end.innerHTML = sumImporto + '€';
        barInside.innerHTML = sum + ' € / ' + sumImporto + ' €';
        percentual = (sum/sumImporto) * 100;
        barInside.style.width = percentual + '%'
    } 
    if (tableIsEmpty) {
       document.getElementById("divProgressBar").style.display = "none";
    }
}



// https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
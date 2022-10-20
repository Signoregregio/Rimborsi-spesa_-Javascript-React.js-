let tableIsBig = false;
const columnType = ["date", "type", "importo", "ricevuta", "stato", "dovuto"]
let filterEvent = 0;
let asc = true;
let rememberTh;

function deleteTheadArrow(th){
    let thArrow = document.getElementsByClassName("thArrow")
    for(const elem of thArrow){
        elem.innerHTML = '';
    }
}

function changeSortByColumn(th) {
    if(tableListRimborso != []){
        deleteTheadArrow(th);
    }
    columnSortNew = th.getAttribute("id");
    changeButtonDisable();
    if(columnSort != columnSortNew) {
        asc = true;
        th.childNodes[1].innerHTML = ' &#9651;'
    } else {
        if(asc){
            asc = false;
            th.childNodes[1].innerHTML = ' &#9661;'
        } else { 
            asc = true;
            th.childNodes[1].innerHTML = ' &#9651;'
        }
    }

    columnSort = columnSortNew;
    sortByColumn(columnSort, tableListRimborso);
    writeTable(tableListRimborso);
}

function sortByColumn (columnSort, tableListRimborso) {
    console.log("%c SORTING BY ","background-color:yellow;color:blue;font-size:16px;")
    console.log(columnSort)
    let sortedArray;
    if (columnSort  == "date") {
        sortedArray = tableListRimborso.sort(function(a, b) {
        let aa = a.date.split('-').join();
        let bb = b.date.split('-').join();
        if(asc){
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        } else {
            return aa < bb ? (aa > bb ? 1 : 0) : -1;
        }
        });
    }
    if (columnSort  == "type") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(asc){
                return (a.type).localeCompare(b.type);
            } else {
                return (b.type).localeCompare(a.type);
            }
        }) 
    }
    if (columnSort  == "importo") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(asc){
                return Number(a.importo) - Number(b.importo)
            } else {
                return Number(b.importo) - Number(a.importo)
            }
        });
    }
    if (columnSort  == "ricevuta") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(asc){
                return (a.ricevuta).localeCompare(b.ricevuta);
            } else {
                return (b.ricevuta).localeCompare(a.ricevuta);
            }
        }) 
    }
    if (columnSort  == "stato") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(asc){
                return (a.stato).localeCompare(b.stato);
            } else {
                return (b.stato).localeCompare(a.stato);
            }
        }) 
    } 
    if (columnSort  == "dovuto") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(asc){
                return Number(a.dovuto) - Number(b.dovuto)
            } else {
                return Number(b.dovuto) - Number(a.dovuto)
            }
    });
    }
}

function filterArray() {
    document.getElementById("inputFilter").disabled = false;
    let filterInput = document.getElementById("inputFilter").value;
    let filterType = document.getElementById("inputTypeFilter").value
    tableListRimborsoFiltered = tableListRimborso;
    
    filterInput == "" ? filterEvent = 0 : filterEvent = 1;
    if (filterEvent == 1) {
        if (filterType  == "date") {
            tableListRimborsoFiltered = tableListRimborso.filter(row => row.date.split('-')[2] == filterInput);
        }
        if (filterType  == "type") {
            tableListRimborsoFiltered = tableListRimborso.filter(row => row.type.toLowerCase().indexOf(filterInput.toLowerCase()) > -1);
        }
        if (filterType  == "importo") {
            tableListRimborsoFiltered = tableListRimborso.filter(row => row.importo >= Number(filterInput));
        }
        if (filterType  == "ricevuta") {
            tableListRimborsoFiltered = tableListRimborso.filter(row => row.ricevuta.toLowerCase().indexOf(filterInput.toLowerCase()) > -1);
        }
        if (filterType  == "stato") {
            tableListRimborsoFiltered = tableListRimborso.filter(row => row.stato.toLowerCase().indexOf(filterInput.toLowerCase()) > -1);
        }
        if (filterType  == "dovuto") {
            tableListRimborsoFiltered = tableListRimborso.filter( row => row.dovuto >= Number(filterInput));
        }
    }
    console.log(tableListRimborsoFiltered);
}

function resetTable() {
    while (tbody.hasChildNodes()) {
        tbody.deleteRow(0);
    }
    document.getElementById("divProgressBar").style.display = 'none';
}

function activateChangeStatusEvent(cell) {
    tr = cell.parentNode;
    let rowIndex = tr.rowIndex - 1;
    filterEvent == 0 ? formGetValue(tableListRimborso[rowIndex]) : formGetValue(tableListRimborsoFiltered[rowIndex]);
    document.getElementById("buttonChange").setAttribute("value", rowIndex);
    changeButtonActivate();
    if (tableIsBig)
        changeSizeTable();
}

function formGetValue(row) {
    document.getElementById("inputType").value = row.type ;
    document.getElementById("inputDate").value = row.date;
    document.getElementById("inputImporto").value = row.importo;
    const ricevutaForm = document.getElementById("inputRicevuta"); 
    row.ricevuta == "Sì" ? ricevutaForm.checked = true : ricevutaForm.checked = false;
}

function changeButtonActivate() {
    document.getElementById("buttonChange").disabled = false;
    document.getElementById("buttonSend").disabled = true;
}

function changeButtonDisable() {
document.getElementById("buttonChange").disabled = true;
document.getElementById("buttonSend").disabled = false;
}

function changeRowButton() {
let rowIndex = document.getElementById("buttonChange").getAttribute("Value");
if (filterEvent) {
    rowIndex = tableListRimborso.findIndex(row => row.primaryKey === tableListRimborsoFiltered[rowIndex].primaryKey);
}
arrayGetValue(tableListRimborso[rowIndex]);
sortByColumn(columnSort, tableListRimborso);
filterEvent ? filterTable() : writeTable(tableListRimborso)
changeButtonDisable();
}

function resetAll() {
resetMonth();
tableListRimborso = [];
calculateSumAmount(tableListRimborso);
progressBar();
resetTable();
document.getElementById("inputTotale").innerHTML = sum;
document.getElementById("inputFilter").disabled = true;
document.getElementById("inputFilter").value = '';
changeButtonDisable();
}

function resetMonth() {
    document.getElementById("inputMonth").disabled = false;
    document.getElementById("inputDate").disabled = true;
}

function deleteRow(button) {
    let tr = button.parentNode.parentNode;
    let rowIndex = tr.rowIndex - 1;
    primaryKey = filterEvent ? tableListRimborsoFiltered[rowIndex].primaryKey : tableListRimborso[rowIndex].primaryKey;
    tableListRimborso = tableListRimborso.filter(row => row.primaryKey != primaryKey);
    resetTable();
    filterEvent ? filterTable() : writeCreateTable(tableListRimborso);
    changeButtonDisable();
}

function changeSizeTable() {
    if (tableIsBig) {
        document.getElementById("rightSide").style.width = null;
        document.getElementById("leftSide").style.display = null;
        document.getElementById("buttonSubmitAll").style.display = 'none';
        document.getElementById("buttonSizeTable").style.width = null;
        document.getElementById("buttonLoad").style.width = null;
        tableIsBig = false;
    } else {
        document.getElementById("rightSide").style.width = '100%';
        document.getElementById("leftSide").style.display = 'none';
        document.getElementById("buttonSubmitAll").style.display = 'inline';
        document.getElementById("buttonSizeTable").style.width = '7rem';
        document.getElementById("buttonLoad").style.width = '7rem';
        tableIsBig = true;
    }
}

function calculateSumAmount(tableListRimborso) {  
    sum = tableListRimborso.reduce((accumulator, current) =>  
        accumulator + current.dovuto, 0);
    sumImporto = tableListRimborso.reduce((accumulator, current) =>  
        accumulator + Number(current.importo), 0);
    sum = sum.toFixed(2);
    sumImporto = sumImporto.toFixed(2);
}
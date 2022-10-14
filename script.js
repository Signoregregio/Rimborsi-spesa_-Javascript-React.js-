// filtro 
// quando cambio riga, posso evitare di bloccare il tasto calcola?
// l'id tr serve?

let tableRimborso = [];
let tableRimborsoFiltered = [];
let primaryKey = 0;
let role;
let tr;
let date = new Date;
let tableIsBig = false;
let sum = 0;
let sumImporto = 0;
let columnType = ["date", "type", "importo", "ricevuta", "stato", "dovuto"]
let columnSort = "date";
let tbody = document.getElementById("inputTable");
let filterEvent = 0;
let idArray = [];

//load onload
let maxTaxi = Number(sessionStorage.getItem("maxTaxi"));
let maxVitto = Number(sessionStorage.getItem("maxVitto"));
let maxHotel = Number(sessionStorage.getItem("maxHotel"));
let maxTreno = Number(sessionStorage.getItem("maxTreno"));
let userId = sessionStorage.getItem("userId");
console.log( maxTaxi, maxVitto, maxHotel, maxTreno, userId);


function newRow() {
    document.getElementById("inputMonth").disabled = true;
    let row = {"date" : "", "type" : "", "importo" : 0, "ricevuta" : "", "stato" : "", "dovuto" : 0, "primaryKey" : primaryKey++};
    addRowObject(row);
    filterEvent == 0 ?  addRowValue() : filterTable();
    console.log(tableRimborso);
    return false;
}

function filterTable(){
    filterArray();
    resetTable();
    writeCreateTable(tableRimborsoFiltered);
}

function addRowObject(row) {
    arrayGetValue(row);
    tableRimborso.push(row);
    sortByColumn(columnSort, tableRimborso);
}

function arrayGetValue(row) {
    row.type = document.getElementById("inputType").value;
    row.date = document.getElementById("inputDate").value;
    row.importo = document.getElementById("inputImporto").value;
    row.ricevuta = document.getElementById("inputRicevuta").checked ?  "Sì" : "No"
    row.stato = approvazione(regoleApprovazione(row));
    row.dovuto  = Number(gestisciImportiDovuti(row));
}

function sortByColumn (columnSort, tableRimborso) {
    console.log("%c sort by","background-color:yellow;color:blue;")
    console.log(columnSort)
    let sortedAsc;
    if (columnSort  == "date") {
        sortedAsc = tableRimborso.sort(function(a, b) {
        let aa = a.date.split('-').join();
        let bb = b.date.split('-').join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });
    }
    
    if (columnSort  == "type") {
        sortedAsc = tableRimborso.sort((a, b) =>
             ('' + a.type).localeCompare(b.type)) 
    }

    if (columnSort  == "importo") {
        sortedAsc = tableRimborso.sort((a, b) =>
             Number(a.importo) - Number(b.importo)
        );
    }
    if (columnSort  == "ricevuta") {
        sortedAsc = tableRimborso.sort((a, b)  =>
            ('' + a.ricevuta).localeCompare(b.ricevuta)
        )
    }
    if (columnSort  == "stato") {
        sortedAsc = tableRimborso.sort((a, b)   =>
            ('' + a.stato).localeCompare(b.stato)
        )
    }
    
    if (columnSort  == "dovuto") {
        sortedAsc = tableRimborso.sort((a, b) =>
            Number(a.dovuto) - Number(b.dovuto)
        );
    }
}


function addRowValue() {
    createRowCell();
    setRowsAttribute();
    writeTable(tableRimborso);
}

function createRowCell() {
    tr = tbody.insertRow(-1);
    for (i = 0; i < 7; i++) {
        tr.insertCell(i);
    }
}

function setRowsAttribute() {  
    tr.setAttribute("id", primaryKey);
    for (let i = 0; i < 6; i++) {
        tr.cells[i].setAttribute("onclick", "activateChangeStatusEvent(this)");
    }
}

function writeTable(tableRimborso) {
    tableRimborso.map(function (row, i) {
        writeCell(tbody.rows[i], row)});  
    calcolaSommaDovuto(tableRimborso);
    progressBar();
    document.getElementById("inputTotale").innerHTML = sum;
}

function writeCell(tr, row) { 
    tr.cells[0].innerHTML = translateDay(row.date);
    tr.cells[1].innerHTML = row.type;
    tr.cells[2].innerHTML = row.importo;
    tr.cells[3].innerHTML = row.ricevuta;
    tr.cells[4].innerHTML = row.stato;
    tr.cells[5].innerHTML = row.dovuto;
    tr.cells[6].innerHTML = '<button class="deleteRow" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>';
}
// 2022-07-28
function translateDay(date) {
    let giorniSettimana = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
    let day = date.slice(8,10);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let dateSelected = new Date(year, month - 1, day); 
    let nameDay = giorniSettimana[dateSelected.getDay()];
    year = date.slice(2,4);
    return nameDay + " " + day + "/" + month + "/" + year;
}

function calcolaSommaDovuto(tableRimborso) {  
    sum = tableRimborso.reduce((accumulator, current) =>  
        accumulator + current.dovuto, 0);
    sumImporto = tableRimborso.reduce((accumulator, current) =>  
        accumulator + Number(current.importo), 0);
    sum = sum.toFixed(2);
    sumImporto = sumImporto.toFixed(2);
}


function filterArray() {
    document.getElementById("inputFilter").disabled = false;
    let value = document.getElementById("inputFilter").value;
    let filterType = document.getElementById("inputTypeFilter").value
    tableRimborsoFiltered = tableRimborso;
    
    value == "" ? filterEvent = 0 : filterEvent = 1;
    if (filterEvent == 1) {
        if (filterType  == "date") {
            tableRimborsoFiltered = tableRimborso.filter(row => row.date.split('-')[2] == value);
        }
        if (filterType  == "type") {
            tableRimborsoFiltered = tableRimborso.filter(row => row.type.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
        if (filterType  == "importo") {
            tableRimborsoFiltered = tableRimborso.filter(row => row.importo >= Number(value));
        }
        if (filterType  == "ricevuta") {
            tableRimborsoFiltered = tableRimborso.filter(row => row.ricevuta.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
        if (filterType  == "stato") {
            tableRimborsoFiltered = tableRimborso.filter(row => row.stato.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
        if (filterType  == "dovuto") {
            tableRimborsoFiltered = tableRimborso.filter( row => row.dovuto >= Number(value));
        }
    }

    console.log(tableRimborsoFiltered);
}


function resetTable() {
    while (tbody.hasChildNodes()) {
        tbody.deleteRow(0);
    }
    document.getElementById("divProgressBar").style.display = "none";
}

function writeCreateTable(tableRimborso) {
    tableRimborso.map(function (row, i) {
        createRowCell();
        writeCell(tbody.rows[i], row);
        setRowsAttribute();
        primaryKey++;
    });
    calcolaSommaDovuto(tableRimborso);
    progressBar();
    document.getElementById("inputTotale").innerHTML = sum;
}

function progressBar() {
    document.getElementById("divProgressBar").style.display = "inline";
    end = document.getElementById("progressEnd")
    actual = document.getElementById("progressActual")
    barInside = document.getElementById("progressBarInside")
    bar = document.getElementById("progressBar")
    tableIsEmpty = sumImporto == 0;
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


function approvazione(status) {
    if (status == -1)
        return "Non approvata"

    // if (status == 0)
    //     return "In attesa di approvazione"

    if (status == 1)
        return "Approvata"
}

function regoleApprovazione(row) {
    if (row.ricevuta == "No" && row.importo > 10 )
        return -1;
    else
        return 1;
}


function gestisciImportiDovuti(row) {
    if (row.stato == "Non approvata" || row.stato == "In attesa di approvazione")
        return 0;

    if (row.type == "Taxi" && row.importo > maxTaxi)
        return maxTaxi;
    
    if (row.type == "Vitto" && row.importo > maxVitto)
        return maxVitto;
    
    if (row.type == "Hotel" && row.importo > maxHotel)
        return maxHotel;
        
    if (row.type == "Treno" && row.importo > maxTreno)
        return maxTreno;
    
    return row.importo;    
}

// Funzione che mi riporta nella form i dati cliccando su una riga della tabella.
function activateChangeStatusEvent(cell) {
    tr = cell.parentNode;
    let index = tr.rowIndex - 1;
    filterEvent == 0 ? formGetValue(tableRimborso[index]) : formGetValue(tableRimborsoFiltered[index]);
    document.getElementById("buttonChange").setAttribute("Value", index);
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
    let index = document.getElementById("buttonChange").getAttribute("Value");
    if (filterEvent) {
        index = tableRimborso.findIndex(row => row.primaryKey === tableRimborsoFiltered[index].primaryKey);
    }
    arrayGetValue(tableRimborso[index]);
    sortByColumn(columnSort, tableRimborso);
    filterEvent ? filterTable() : writeTable(tableRimborso)
    changeButtonDisable();
}


function resetAll() {
    resetMonth();
    tableRimborso = [];
    calcolaSommaDovuto(tableRimborso);
    progressBar();
    resetTable();
    document.getElementById("inputTotale").innerHTML = sum;
    document.getElementById("inputFilter").disabled = true;
    document.getElementById("inputFilter").value = "";
    changeButtonDisable();
}

function resetMonth() {
    document.getElementById("inputMonth").disabled = false;
    document.getElementById("inputDate").disabled = true;
}


function deleteRow(button) {
    let tr = button.parentNode.parentNode;
    let index = tr.rowIndex - 1;
    primaryKey = filterEvent ? tableRimborsoFiltered[index].primaryKey : tableRimborso[index].primaryKey;
    tableRimborso = tableRimborso.filter(row => row.primaryKey != primaryKey);
    resetTable();
    filterEvent ? filterTable() : writeCreateTable(tableRimborso);
    changeButtonDisable();
}


function changeSizeTable() {
    if (tableIsBig) {
        document.getElementById("rightSide").style.width = null;
        document.getElementById("leftSide").style.display = null;
        document.getElementById("buttonSubmitAll").style.display = "none";
        document.getElementById("buttonSizeTable").style.width = null;
        document.getElementById("buttonLoad").style.width = null;
        tableIsBig = false;
    } else {
        document.getElementById("rightSide").style.width = "100%";
        document.getElementById("leftSide").style.display = "none";
        document.getElementById("buttonSubmitAll").style.display = "inline";
        document.getElementById("buttonSizeTable").style.width = "7rem";
        document.getElementById("buttonLoad").style.width = "7rem";
        tableIsBig = true;
    }
}

function changeSortByColumn(th) {
    columnSort = th.getAttribute("id");
    changeButtonDisable();
    sortByColumn(columnSort, tableRimborso);
    writeTable(tableRimborso);
}


function maxMonth() {
    let inputMonthYear = date.toISOString().split('T')[0]
    let maxMonth = inputMonthYear.match("[0-9]{4}[-][0-9]{2}");
    document.getElementById("inputMonth").setAttribute("max", maxMonth);
}

function setRangeDays () {
    document.getElementById("inputDate").disabled = false;
    let monthInput = document.getElementById("inputMonth").value.slice(5,7);
    let yearInput = document.getElementById("inputMonth").value.slice(0,4);
    let daysInMonth = new Date(yearInput, monthInput, 0).getDate();
    let minDate = yearInput + "-" + monthInput + "-" + "01";
    let maxDate = getMaxDate(yearInput, monthInput, daysInMonth);
    document.getElementById("inputDate").setAttribute("min", minDate);
    document.getElementById("inputDate").setAttribute("max", maxDate);
}

function getMaxDate(yearInput, monthInput, daysInMonth) {
    let dateToday = ("0" + date.getDate()).slice(-2);
    let dateEndMonth = new Date(yearInput, monthInput - 1, daysInMonth);
    let myMonthSelected = date < dateEndMonth;
    // controllo sul mese. La data non puo essere superiore ad oggi
    if (myMonthSelected)
        return yearInput + "-" + monthInput + "-" + dateToday;
    else
        return yearInput + "-" + monthInput + "-" + daysInMonth;
}


function mockLinkSpesa(userId) {
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/user/" + userId + "/spesa";
}
function mockLinkUser(userId) {
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/user/" + userId;
}
function mockLink() {
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/"
}

// Session storage di chi è loggato
async function login() {
    await getRole();
    await storageRimborsoMax();
    location.replace("rimborsi.html")
}

async function getRole() {
    console.log("%c ___ ","background-color:orange;");
    userId = document.getElementById("inputId").value;
    sessionStorage.setItem("userId", userId);
    await fetch(mockLinkUser(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {role = data.role; console.log(role)})
    .catch(error => console.log(error));
}

async function storageRimborsoMax() {
    await fetch(mockLink() + "rimborsoMax")
    .then(response => response.json())
    .then(data => {
        for (const key in data) {
            if (data[key].ruolo == role) {
                sessionStorage.setItem("maxTaxi", data[key].taxi)
                sessionStorage.setItem("maxVitto", data[key].vitto)
                sessionStorage.setItem("maxHotel", data[key].hotel)
                sessionStorage.setItem("maxTreno", data[key].treno)
            }
        }})
    .catch(error => console.log(error));
}


async function getTable() {
    disableForm();
    console.log("%c ___ ","background-color:red;")
    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => jsonToArray(data))
    .catch(error => console.log(error));

    console.log(tableRimborso)
    sortByColumn(columnSort, tableRimborso);
    resetTable();
    writeCreateTable(tableRimborso);
    undisableForm();
}

function disableForm() {
    var form = document.getElementById("formUser");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;
    }
}

function undisableForm() {
    var form = document.getElementById("formUser");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = false;
    }
}

function jsonToArray(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    tableRimborso = [];
    for (const key in obj) {
        const value = obj[key];
        for (const prop in value) {
            if (prop == "id" || prop == "userId") {
                continue;
            }
            let tableDate = value[prop].date.match("[0-9]{4}[-][0-9]{2}");
            if (yearMonth == tableDate) {
                value[prop].primaryKey = primaryKey;
                tableRimborso.push(value[prop]);
                primaryKey++;
            }
        }
    }
}

  
async function SubmitMonthMock() {
    disableForm();
    console.log("%c ___ ","background-color:brown;")
    idArray = await getIdByMonthMock();
    await deleteMockByUserId(idArray)
    idArray = [];
    postTable();
    undisableForm();
}

async function getIdByMonthMock() {
    console.log("%c ___ ","background-color:red;")

    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => idMonthSelected(data))
    .catch(error => console.log(error));
    console.log(idArray)
    return idArray;
}

async function idMonthSelected(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    console.log(yearMonth)
    for (const key in obj) {
        const value = obj[key];
        if (value.userId == userId) {
            for (const prop in value) {
                let tableDate = value[prop].date.match("[0-9]{4}[-][0-9]{2}");
                if (tableDate == yearMonth) {
                    idArray.push(value.id);
                }
                break;
            }
        }
        continue;
    }
}

async function deleteMockByUserId(idArray) {
    for (const element of idArray) {
        await fetch(mockLinkSpesa(userId) + "/" + element, {
        method: "DELETE",
        headers: {
                'Content-type': 'application/json'
            }
      })
    .then(response => { return response.json()})
    .then(data => console.log(data) );
    }
}

function postTable() {
    console.log("%c ___ ","background-color:white;")
    fetch(mockLinkSpesa(userId),{
        method: "POST",
        body: JSON.stringify(tableRimborso),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => { console.log(data);})
    .catch(error => console.log(error));
}
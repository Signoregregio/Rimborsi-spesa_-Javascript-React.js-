//css print e responsivo
// filtro 
// css print media query e responsive
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
let columnType = ["date", "type", "importo", "ricevuta", "stato", "dovuto"]
let columnSort = "date";
let tbody = document.getElementById("inputTable");
let filterEvent = 0;
let idArray = [];

let maxTaxi = Number(sessionStorage.getItem("maxTaxi"));
let maxVitto = Number(sessionStorage.getItem("maxVitto"));
let maxHotel = Number(sessionStorage.getItem("maxHotel"));
let maxTreno = Number(sessionStorage.getItem("maxTreno"));
let userId = sessionStorage.getItem("userId");
console.log( maxTaxi, maxVitto, maxHotel, maxTreno, userId);

// Traduce in stringa l'approvazione del rimborso
function approvazione(status){
    if(status == -1)
        return "Non approvata"

    // if(status == 0)
    //     return "In attesa di approvazione"

    if(status == 1)
        return "Approvata"
}


//Tutte le regole per cui un rimborso deve essere accettato o meno
function regoleApprovazione(row){
    if(row.ricevuta == "No" && row.importo > 10 )
        return -1;
    else
        return 1;
}


// Gestisce gli importi dovuti
function gestisciImportiDovuti(row){
    let maxTaxi = Number(sessionStorage.getItem("maxTaxi"));
    let maxVitto = Number(sessionStorage.getItem("maxVitto"));
    let maxHotel = Number(sessionStorage.getItem("maxHotel"));
    let maxTreno = Number(sessionStorage.getItem("maxTreno"));
    
    if(row.stato == "Non approvata")
        return 0;
        
    if(row.stato == "In attesa di approvazione")
        return 0;

    if(row.type == "Taxi" && row.importo > maxTaxi)
        return maxTaxi;
    
    if(row.type == "Vitto" && row.importo > maxVitto)
        return maxVitto;
    
    if(row.type == "Hotel" && row.importo > maxHotel)
        return maxHotel;
        
    if(row.type == "Treno" && row.importo > maxTreno)
        return maxTreno;
    
    return row.importo;    
}


function calcolaSommaDovuto(tableRimborso){  
    sum = tableRimborso.reduce((accumulator, current) => 
        accumulator + current.dovuto, 0);
    sum = sum.toFixed(2);
    return sum;
}

// Funzione che mi riporta nella form i dati cliccando su una riga della tabella.
function activateChangeStatusEvent(cell) {
    tr = cell.parentNode;
    let index = tr.rowIndex - 1;
    filterEvent == 0 ? formGetValue(tableRimborso[index]) : formGetValue(tableRimborsoFiltered[index]);
    document.getElementById("buttonChange").setAttribute("Value", index);
    changeButtonActivate();
    if(tableIsBig)
        changeSizeTable();
}


function changeButtonActivate(){
        document.getElementById("buttonChange").disabled = false;
        document.getElementById("buttonSend").disabled = true;
}

function changeButtonDisable(){
    document.getElementById("buttonChange").disabled = true;
    document.getElementById("buttonSend").disabled = false;
}

// questa scrive e modifica
// quando sono in status event devo disabilitare il sorting, senno il valore che ho messo nel bottone cambia riga diventa sbagliato
function changeRowButton(){
    index = document.getElementById("buttonChange").getAttribute("Value");
    if(filterEvent){
        index = tableRimborso.findIndex(row => row.primaryKey === tableRimborsoFiltered[index].primaryKey);
    }
    arrayGetValue(tableRimborso[index]);

    if(filterEvent){
        filterTable();
    }
    if(filterEvent == 0){
        sortByColumn(columnSort, tableRimborso);
        writeTable(tableRimborso);
    }
    changeButtonDisable();
}


function setRowsAttribute(){  
    tr.setAttribute("id", primaryKey);
    for(let i = 0; i < 6; i++){
        tr.cells[i].setAttribute("onclick", "activateChangeStatusEvent(this)");
    }
}


function writeCell(tr, row){ 
    tr.cells[0].innerHTML = translateDay(row.date);
    tr.cells[1].innerHTML = row.type;
    tr.cells[2].innerHTML = row.importo;
    tr.cells[3].innerHTML = row.ricevuta;
    tr.cells[4].innerHTML = row.stato;
    tr.cells[5].innerHTML = row.dovuto;
    tr.cells[6].innerHTML = '<button class="deleteRow" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button>';
}


function createRowCell(){
    tr = tbody.insertRow(-1);
    for(i = 0; i < 7; i++){
        tr.insertCell(i);
    }
}


function formGetValue(row){
    document.getElementById("inputType").value = row.type ;
    document.getElementById("inputDate").value = row.date;
    document.getElementById("inputImporto").value = row.importo;
    const ricevutaForm = document.getElementById("inputRicevuta"); 
    row.ricevuta == "Sì" ? ricevutaForm.checked = true : ricevutaForm.checked = false;
}


function arrayGetValue(row){
    row.type = document.getElementById("inputType").value;
    row.date = document.getElementById("inputDate").value;
    row.importo = document.getElementById("inputImporto").value;
    row.ricevuta = document.getElementById("inputRicevuta").checked ?  "Sì" : "No"
    row.stato = approvazione(regoleApprovazione(row));
    row.dovuto  = Number(gestisciImportiDovuti(row));
}


function addNewRow(){
    let index;
    document.getElementById("inputMonth").disabled = true;
    let row = {"date" : "", "type" : "", "importo" : 0, "ricevuta" : "", "stato" : "", "dovuto" : 0, "primaryKey" : primaryKey};
    addRowObject(row);
    filterEvent == 0 ?  addRowValue() : filterTable();
    console.log(tableRimborso);
    primaryKey++;
    console.log(typeof tableRimborso)
    return false;
}

// Aggiunge righe alla tabella html e attribuisce valori
// Posso cambiare writeTable con una semplice writeCell?
function addRowValue(){
    createRowCell();
    setRowsAttribute();
    writeTable(tableRimborso);
}

function addRowObject(row){
    arrayGetValue(row);
    tableRimborso.push(row);
    sortByColumn(columnSort, tableRimborso);
}


// Funzione che mi setta il max nel mese che posso scegliere
// ONLOAD EVENT PAGE RIMBORSI.HTML
function maxMonth(){
    let inputMonthYear = date.toISOString().split('T')[0]
    let maxMonth = inputMonthYear.match("[0-9]{4}[-][0-9]{2}");
    document.getElementById("inputMonth").setAttribute("max", maxMonth);
}

// calculateRangeDay()
function setRangeDays (){
    document.getElementById("inputDate").disabled = false;
    let monthInput = document.getElementById("inputMonth").value.slice(5,7);
    let yearInput = document.getElementById("inputMonth").value.slice(0,4);
    let daysInMonth = new Date(yearInput, monthInput, 0).getDate();
    let minDate = yearInput + "-" + monthInput + "-" + "01";
    let maxDate = getMaxDate(yearInput, monthInput, daysInMonth);
    document.getElementById("inputDate").setAttribute("min", minDate);
    document.getElementById("inputDate").setAttribute("max", maxDate);
}


function getMaxDate(yearInput, monthInput, daysInMonth){
    let dateToday = ("0" + date.getDate()).slice(-2);
    let dateEndMonth = new Date(yearInput, monthInput - 1, daysInMonth);
    let myMonthSelected = date < dateEndMonth;
    // controllo sul mese. La data non puo essere superiore ad oggi
    if(myMonthSelected)
    return yearInput + "-" + monthInput + "-" + dateToday;
    else
    return yearInput + "-" + monthInput + "-" + daysInMonth;
}


function resetMonth(){
    document.getElementById("inputMonth").disabled = false;
    document.getElementById("inputDate").disabled = true;
}


// 2022-07-28
function translateDay(date){
    let giorniSettimana = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
    let day = date.slice(8,10);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let dateSelected = new Date(year, month - 1, day); 
    let nameDay = giorniSettimana[dateSelected.getDay()];
    year = date.slice(2,4);
    return nameDay + " " + day + "/" + month + "/" + year;
}

// reset table come funzione da sola? resetAll?
// resettare anche lo status di cambio riga
function resetTable(){
    while(tbody.hasChildNodes()){
        tbody.deleteRow(0);
    }
}

function resetAll(){
    resetMonth();
    tableRimborso = [];
    resetTable();
    calcolaSommaDovuto(tableRimborso);
    document.getElementById("inputTotale").innerHTML = sum;
    document.getElementById("inputFilter").disabled = true;
    changeButtonDisable();
}


function deleteRow(button){
    let tr = button.parentNode.parentNode;
    let index = tr.rowIndex - 1;
    primaryKey = filterEvent ? tableRimborsoFiltered[index].primaryKey : tableRimborso[index].primaryKey;
    tableRimborso = tableRimborso.filter(row => row.primaryKey != primaryKey);
    resetTable();
    filterEvent ? filterTable() : writeCreateTable(tableRimborso);
    changeButtonDisable();
}


function changeSizeTable(){
    if(tableIsBig){
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


function changeSortByColumn(th){
    columnSort = th.getAttribute("id");
    changeButtonDisable();
    sortByColumn(columnSort, tableRimborso);
    writeTable(tableRimborso);
}

function sortByColumn (columnSort, tableRimborso){
    console.log("%c sort by","background-color:yellow;color:blue;")
    console.log(columnSort)
    let sortedAsc;
    if(columnSort  == "date"){
        sortedAsc = tableRimborso.sort(function(a, b){
        let aa = a.date.split('-').join();
        let bb = b.date.split('-').join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });
    }
    
    if(columnSort  == "type"){
        sortedAsc = tableRimborso.sort((a, b) =>
             ('' + a.type).localeCompare(b.type)) 
    }

    if(columnSort  == "importo"){
        sortedAsc = tableRimborso.sort( (a, b) =>
             Number(a.importo) - Number(b.importo)
        );
    }
    if(columnSort  == "ricevuta"){
        sortedAsc = tableRimborso.sort( (a, b)  =>
            ('' + a.ricevuta).localeCompare(b.ricevuta)
        )
    }
    if(columnSort  == "stato"){
        sortedAsc = tableRimborso.sort( (a, b)   =>
            ('' + a.stato).localeCompare(b.stato)
        )
    }
    
    if(columnSort  == "dovuto"){
        sortedAsc = tableRimborso.sort( (a, b) =>
            Number(a.dovuto) - Number(b.dovuto)
        );
    }
}

function writeTable(tableRimborso){
    tableRimborso.map(function (row, i) {
        writeCell(tbody.rows[i], row)});  
    calcolaSommaDovuto(tableRimborso);
    document.getElementById("inputTotale").innerHTML = sum;
}

//addRowObject()
function writeCreateTable(tableRimborso){
    tableRimborso.map(function (row, i) {
        createRowCell();
        writeCell(tbody.rows[i], row);
        setRowsAttribute();
        primaryKey++;
    });
    calcolaSommaDovuto(tableRimborso);
    document.getElementById("inputTotale").innerHTML = sum;
}

// In teoria se non metto nulla e !filterEvent dovrebbe entrare e prendere tutto l'array
function filterTable(){
    document.getElementById("inputFilter").disabled = false;
    console.log("%c DENTRO AL filterTable() !","background-color:purple")
    let value = document.getElementById("inputFilter").value;
    let filterType = document.getElementById("inputTypeFilter").value
    value == "" ? filterEvent = 0 : filterEvent = 1;
    tableRimborsoFiltered = tableRimborso;
    console.log(filterEvent == 1);
    if(filterEvent == 1){
        if(filterType  == "date"){
            tableRimborsoFiltered = tableRimborso.filter(row => row.date.split('-')[2] == value);
        }
        if(filterType  == "type"){
            tableRimborsoFiltered = tableRimborso.filter(row => row.type.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
        if(filterType  == "importo"){
            tableRimborsoFiltered = tableRimborso.filter(row => row.importo >= Number(value));
        }
        if(filterType  == "ricevuta"){
            tableRimborsoFiltered = tableRimborso.filter(row => row.ricevuta.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
        if(filterType  == "stato"){
            tableRimborsoFiltered = tableRimborso.filter(row => row.stato.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
        if(filterType  == "dovuto"){
            tableRimborsoFiltered = tableRimborso.filter( row => row.dovuto >= Number(value));
        }
    }

    console.log(tableRimborsoFiltered);
    resetTable();
    sortByColumn(columnSort, tableRimborsoFiltered);
    writeCreateTable(tableRimborsoFiltered);
}


function mockLinkSpesa(userId){
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/user/" + userId + "/spesa";
}
function mockLinkUser(userId){
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/user/" + userId;
}
function mockLink(){
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/"
}

// Session storage di chi è loggato
async function login(){
    await getRole();
    await fetch(mockLink() + "rimborsoMax")
    .then(response => response.json())
    .then(data => {storageRimborsoMax(data)})
    .catch(error => console.log(error));
    location.replace("rimborsi.html")
    
}


async function getRole(){
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


function storageRimborsoMax(data){
    console.log(data)
    for (const key in data) {
        if(data[key].ruolo == role){
            sessionStorage.setItem("maxTaxi", data[key].taxi)
            sessionStorage.setItem("maxVitto", data[key].vitto)
            sessionStorage.setItem("maxHotel", data[key].hotel)
            sessionStorage.setItem("maxTreno", data[key].treno)
        }
    }
}


function getTable(){
    console.log("%c ___ ","background-color:red;")
    fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => jsonToTable(data))
    .catch(error => console.log(error));
}


// TEST PER SETTARE I RUOLI AGLI ID. INUTILE ADESSO
// function patchRoleId(){
//     console.log("%c ___ ","background-color:orange;")
//     userId = document.getElementById("inputId").value
//     role = document.getElementById("inputRole").value
//     fetch(mockLinkUser(userId),{
//         method: "PUT",
//         headers: {"Content-type": "application/json; charset=UTF-8"},
//         body: JSON.stringify(
//             {
//                 "role": role
//             }
//             )
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }


function jsonToTable(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    tableRimborso = [];
    for (const key in obj) {
        const value = obj[key];
        for(const prop in value){
            if (prop == "id" || prop == "userId"){
                continue;
            }
            let tableDate = value[prop].date.match("[0-9]{4}[-][0-9]{2}");
            if(yearMonth == tableDate){
                value[prop].primaryKey = primaryKey;
                tableRimborso.push(value[prop]);
                primaryKey++;
            }
        }
    }
    console.log(tableRimborso)
    sortByColumn(columnSort, tableRimborso);
    resetTable();
    writeCreateTable(tableRimborso);
}

  
async function SubmitMonthMock(){
    idArray = await getIdMock();
    console.log("%c ___ ","background-color:brown;")
    await deleteMockByUserId(idArray)
    idArray = [];
    postTable();
}

async function deleteMockByUserId(idArray){
    for(const element of idArray){
        await fetch(mockLinkSpesa(userId) + "/" + element, {
        method: "DELETE",
        headers: {
                'Content-type': 'application/json'
            }
      })
    .then(response => { return response.json()})
    .then(data => console.log(data) 
    );
    };
}


function findIdMonthMock(obj){
    let yearMonth = document.getElementById("inputMonth").value
    console.log(yearMonth)
    for (const key in obj) {
        const value = obj[key];
        if(value.userId == userId){
            for (const prop in value) {
                let tableDate = value[prop].date.match("[0-9]{4}[-][0-9]{2}");
                if(tableDate == yearMonth){
                    idArray.push(value.id);
                }
                break;
            }
        }
        continue;
    }
}


async function getIdMock(){
    console.log("%c ___ ","background-color:red;")
    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => findIdMonthMock(data))
    .catch(error => console.log(error));
    console.log(idArray)
    return idArray;
}

function postTable(){
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
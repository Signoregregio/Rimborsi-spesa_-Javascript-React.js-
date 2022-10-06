
// filtro 

let tableRimborso = [];
let primaryKey = 0;
let role;
let tr;
let date = new Date;
let tableIsBig = false;
let sum = 0;
columnType = ["thDate", "thType", "thImporto", "thRicevuta", "thStato", "thDovuto"]
let columnIndexSort = 0;




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


function calcolaSommaDovuto(){  
    sum = tableRimborso.reduce((accumulator, current) => 
        accumulator + current.dovuto, 0);
    sum = sum.toFixed(2);
    return sum;
}

// Funzione che mi riporta nella form i dati cliccando su una riga della tabella.
function activateChangeStatusEvent(cell) {
    tr = cell.parentNode;
    let id = tr.getAttribute("id");
    console.log(tableRimborso)
    let index = tableRimborso.reduce((accumulator, current, i) =>
            current.primaryKey == id ? accumulator + i : accumulator + 0, 0);
    console.log(index);
    formGetValue(tableRimborso[index]);

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
function changeRowButton(){
    let index = document.getElementById("buttonChange").getAttribute("Value");
    arrayGetValue(tableRimborso[index]);
    cellWrite(tr, tableRimborso[index]);
    calcolaSommaDovuto();
    document.getElementById("inputTotale").innerHTML = sum;
    changeButtonDisable();
}


function setRowsAttribute(){  
    tr.setAttribute("id", primaryKey);
    for(let i = 0; i < 6; i++){
        tr.cells[i].setAttribute("onclick", "activateChangeStatusEvent(this)");
    }
}


function cellWrite(tr, row){ 
    tr.cells[0].innerHTML = translateDay(row.date);
    tr.cells[1].innerHTML = row.type;
    tr.cells[2].innerHTML = row.importo;
    tr.cells[3].innerHTML = row.ricevuta;
    tr.cells[4].innerHTML = row.stato;
    tr.cells[5].innerHTML = row.dovuto;
    tr.cells[6].innerHTML = '<button class="deleteRow" onclick="deleteRow(this)">X</button>';
}


function createRowCellAtIndex(){
    let table = document.getElementById("inputTable");
    tr = table.insertRow(0);
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


// Aggiunge righe alla tabella html e attribuisce valori
function addRowValue(){
    document.getElementById("inputMonth").disabled = true;
    createRowCellAtIndex (); 
    writeTable(tableRimborso);
    setRowsAttribute();
}

function addRowObject(row){
    arrayGetValue(row);
    tableRimborso.push(row);
    sortByColumn(columnIndexSort, tableRimborso);
    calcolaSommaDovuto();
}

function addNewRow(){
    let index;
    let row = {"type" : "", "date" : "", "importo" : 0, "ricevuta" : "", "stato" : "", "dovuto" : 0, "primaryKey" : primaryKey};
    addRowObject(row);
    addRowValue();
    console.log(tableRimborso);
    primaryKey++;
    return false;
}

// Funzione che mi setta il max nel mese che posso scegliere
// ONLOAD EVENT PAGE RIMBORSI.HTML
function maxMonth(){
    // Per controllo giusta assegnazione ruolo da JSON
    // Inizio
    let maxTaxi = Number(sessionStorage.getItem("maxTaxi"));
    let maxVitto = Number(sessionStorage.getItem("maxVitto"));
    let maxHotel = Number(sessionStorage.getItem("maxHotel"));
    let maxTreno = Number(sessionStorage.getItem("maxTreno"));
    console.log( maxTaxi, maxVitto, maxHotel, maxTreno);
    // Fine
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


// reset table come funzione da sola? resetAll?
// resettare anche lo status di cambio riga
function resetTable(){
    resetMonth();
    tableRimborso = [];
    let tbody = document.getElementById("inputTable")
    while(tbody.hasChildNodes()){
        tbody.deleteRow(0);
    }
    calcolaSommaDovuto();
    document.getElementById("inputTotale").innerHTML = sum;

    changeButtonDisable();
}


function deleteRow(button){
    let tr = button.parentNode.parentNode;
    let id = tr.getAttribute("id");
    tr.parentNode.removeChild(tr); 
    tableRimborso = tableRimborso.filter(row => row.primaryKey != id);
    calcolaSommaDovuto();
    document.getElementById("inputTotale").innerHTML = sum;
    changeButtonDisable();
}

// Session storage di chi è loggato
function storeJSON(){
    role = document.getElementById("inputRole").value;
    fetch('./rimborsoMax.json')
    .then(response => response.json())
    .then(data => {storageRimborsoMax(data);})
    .catch(error => console.log(error));
}


function storageRimborsoMax(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].ruolo == role){
            sessionStorage.setItem("maxTaxi", data[i].taxi)
            sessionStorage.setItem("maxVitto", data[i].vitto)
            sessionStorage.setItem("maxHotel", data[i].hotel)
            sessionStorage.setItem("maxTreno", data[i].treno)
        }
    }
}

function goToRimborsi(){
    location.replace("rimborsi.html");
}

function changeSizeTable(){
    if(tableIsBig){
        document.getElementById("rightSide").style.width = null;
        document.getElementById("leftSide").style.display = null;
        document.getElementById("buttonSubmitAll").style.display = "none";
        tableIsBig = false;
    } else {
        document.getElementById("rightSide").style.width = "100%";
        document.getElementById("leftSide").style.display = "none";
        document.getElementById("buttonSubmitAll").style.display = "inline";
        tableIsBig = true;
    }
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

function changeSortByColumn(th){
    console.log("%c __________________ ","background-color:yellow;color:blue;")
    let column = th.getAttribute("id");
    columnIndexSort = columnType.indexOf(column);
    console.log(columnIndexSort);
    changeButtonDisable();
    sortByColumn(columnIndexSort, tableRimborso);
    writeTable(tableRimborso);
}

function sortByColumn (columnIndexSort, tableRimborso){
    console.log(columnIndexSort)
    let sortedAsc;
    if(columnIndexSort  == 0){
        console.log("%c _______________ ","background-color:green")
        sortedAsc = tableRimborso.sort(function(a, b){
        let aa = a.date.split('-').join();
        let bb = b.date.split('-').join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });
    }
    
    if(columnIndexSort  == 1){
        console.log("%c _______________ ","background-color:red")
        sortedAsc = tableRimborso.sort((a, b) =>
             ('' + a.type).localeCompare(b.type))

        
    }

    if(columnIndexSort  == 2){
        console.log("%c _______________ ","background-color:red")
        sortedAsc = tableRimborso.sort( (a, b) =>
             Number(a.importo) - Number(b.importo)
        );
    }
    if(columnIndexSort  == 3){
        console.log("%c _______________ ","background-color:red")
        sortedAsc = tableRimborso.sort( (a, b)  =>
            ('' + a.ricevuta).localeCompare(b.ricevuta)
        )
    }
    if(columnIndexSort  == 4){
        console.log("%c _______________ ","background-color:red")
        sortedAsc = tableRimborso.sort( (a, b)   =>
            ('' + a.stato).localeCompare(b.stato)
        )
    }
    
    if(columnIndexSort  == 5){
        console.log("%c _______________ ","background-color:red")
        sortedAsc = tableRimborso.sort( (a, b) =>
            Number(a.dovuto) - Number(b.dovuto)
        );
    }
}

function writeTable(tableRimborso){
    let table = document.getElementById("inputTable");
    if( tableRimborso.length == 0){
        cellWrite(table.rows[0], row)
    }
    tableRimborso.map(function (row, i) {
        table.rows[i].setAttribute("id", row.primaryKey);
        cellWrite(table.rows[i], row)});
    
  document.getElementById("inputTotale").innerHTML = sum;
}

function filterTable(){
    let value = document.getElementById("inputFilter").value;
    tableRimborsoFiltered = tableRimborso;
    tableRimborsoFiltered = tableRimborsoFiltered.filter( row => row.importo >= Number(value))
    console.log(tableRimborsoFiltered);
}
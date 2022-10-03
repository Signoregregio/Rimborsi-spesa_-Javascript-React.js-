let tableRimborso = [];
let primaryKey = 0;
let role;
let tr;
let date = new Date;
let tableIsBig = false;


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
// todo il sessionStorage non funziona bene!!!
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

// Stampa e calcola totale Rimborso
function sommaDovuto(){
    let sum = 0;
    for(let count = 0; count < tableRimborso.length; count++){
        sum += Number(tableRimborso[count].dovuto)
    }
    sum = sum.toFixed(2);
    document.getElementById("inputTotale").innerHTML = sum;
}

// Funzione che mi riporta nella form i dati cliccando su una riga della tabella.
function activateChangeStatusEvent(cell) {
    tr = cell.parentNode;
    let id = tr.getAttribute("id");
    let index = findIndexOfId(id);
    formGetValue(tableRimborso[index]);

    document.getElementById("buttonChange").setAttribute("Value", index);
    document.getElementById("buttonChange").disabled = false;
    document.getElementById("buttonSend").disabled = true;
}


function changeRowButton(){
    let index = document.getElementById("buttonChange").getAttribute("Value");
    arrayGetValue(tableRimborso[index]);
    cellWrite(tr, tableRimborso[index]);
    sommaDovuto();

    document.getElementById("buttonChange").disabled = true;
    document.getElementById("buttonSend").disabled = false;
}


function setRowsAttribute(){  
    tr.setAttribute("id", primaryKey);
    for(let i = 0; i < 6; i++){
        tr.cells[i].setAttribute("onclick", "activateChangeStatusEvent(this)");
    }
}

// Posso ciclare gli elementi? foreach
function cellWrite(tr, row){
    tr.cells[0].innerHTML = row.date;
    tr.cells[1].innerHTML = row.type;
    tr.cells[2].innerHTML = row.importo;
    tr.cells[3].innerHTML = row.ricevuta;
    tr.cells[4].innerHTML = row.stato;
    tr.cells[5].innerHTML = row.dovuto;
    tr.cells[6].innerHTML = '<button class="deleteRow" onclick="deleteRow(this)">X</button>';
}

// ciclo for
function createRowCell(){
    let table = document.getElementById("inputTable");
    tr = table.insertRow(-1);
    for(i = 0; i < 7; i++){
        tr.insertCell(i);
    }
}

// Fondere queste due funzioni !!! cambia solo row.ricevuta e row.primarykey
// sol: if row.primary == 0 allora inserisci row.ricevutae primarykey, senno lascia stare primaryKey e calcola unversed ricevuta 
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
    row.dovuto  = gestisciImportiDovuti(row);
}


// Aggiunge righe alla tabella html e attribuisce valori
function aggiungiRiga(){
    let tableLength = tableRimborso.length - 1;
    let row = {"type" : "", "date" : "", "importo" : 0, "ricevuta" : "", "stato" : "", "dovuto" : 0, "primaryKey" : primaryKey};
    document.getElementById("inputMonth").disabled = true;
    arrayGetValue(row);
    tableRimborso.push(row);
    createRowCell();   
    cellWrite(tr, row);
    setRowsAttribute(tableLength);
    console.log(tableRimborso);
    primaryKey++;
    sommaDovuto(tableRimborso);
    let prova = sortTableRimborsi(row.date, tableRimborso);
    console.log(prova);
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


function getRangeDays (){
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
    let dateEndMonth = new Date(yearInput, monthInput, daysInMonth);
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
    sommaDovuto(tableRimborso);
    document.getElementById("buttonChange").disabled = true;
    document.getElementById("buttonSend").disabled = false;
}


//for each or indexof
function findIndexOfId(id){
    for(let i = 0; i < tableRimborso.length; i++){
        if(tableRimborso[i].primaryKey == id)
            return i;   
    }
}


function deleteRow(button){
    let tr = button.parentNode.parentNode;
    let id = tr.getAttribute("id");
    tr.parentNode.removeChild(tr); 
    indexToRemove = findIndexOfId(id);
    tableRimborso.splice(indexToRemove, 1);
    sommaDovuto(tableRimborso);
}

// Session storage di chi sono loggato
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

function sortTableRimborsi(data, tableRimborso){
    if(tableRimborso.length == 0){
        return 0;
    }
    let i;
    for(i = 0; i < tableRimborso.length; i++){
        console.log(data + tableRimborso[i].date)
        if(data < tableRimborso[i].date)
            return i;
    }
    return i;
}
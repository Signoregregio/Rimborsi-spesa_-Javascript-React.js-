let tableRimborso = [];
let primaryKey = 0;
let role;
let table;
let tr;
let cell1;
let cell2;
let cell3;
let cell4;
let cell5;
let cell6;
let cell7;
let type;
let date ;
let importo;
let ricevuta;
let stato;
let dovuto;

// Traduce la checkbox in stringa => Si o No
function scontrino(){
    if(document.getElementById("inputRicevuta").checked == true)
        return "Sì"

    if(document.getElementById("inputRicevuta").checked != true)
        return "No"
}


function translateScontrino(ricevuta){
    if(ricevuta == "Sì")
        document.getElementById("inputRicevuta").checked = true;

    if(ricevuta == "No")
        document.getElementById("inputRicevuta").checked = false;
}


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

    // if(row.importo > 120)
    //     return 0;

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
function sommaDovuto(tableRimborso){
    let sum = 0;
    for(let count = 0; count < tableRimborso.length; count++){
        sum += Number(tableRimborso[count].dovuto)
    }
    document.getElementById("inputTotale").innerHTML = sum;
}

// Funzione che mi riporta nella form i dati cliccando su una riga della tabella. CAMBIARE NOME
function backToForm(cell) {
    tr = cell.parentNode;
    let id = tr.getAttribute("id");
    let index = findIndexOfId(id);
    formGetValue(tableRimborso[id]);

    document.getElementById("buttonChange").setAttribute("Value", index);
    document.getElementById("buttonChange").disabled = false;
    document.getElementById("buttonSend").disabled = true;
}


function changeRow(){
    let index = document.getElementById("buttonChange").getAttribute("Value");
    arrayGetValue(tableRimborso[index]);
    console.log(tableRimborso[index])
    // to do numero riga e riga
    // tr = document.getElementById("inputTable").row[index];
    // console.log(row);
    // cellWrite(row, id);
    cellWrite(tr, index);

    document.getElementById("buttonChange").disabled = true;
    document.getElementById("buttonSend").disabled = false;
}


function setRowsAttribute(){
    
    tr.setAttribute("id", primaryKey);
    // no, alle prime 5 celle
    // let costr = document.getElementById("inputTable");
    for(let i = 0; i < 7; i++){
        tr.cells[i].setAttribute("onclick", "backToForm(this)");
    }
}

function cellWrite(tr, tableLength){
    tr.cells[0].innerHTML = tableRimborso[tableLength].date;
    tr.cells[1].innerHTML = tableRimborso[tableLength].type;
    tr.cells[2].innerHTML = tableRimborso[tableLength].importo;
    tr.cells[3].innerHTML = tableRimborso[tableLength].ricevuta;
    tr.cells[4].innerHTML = tableRimborso[tableLength].stato;
    tr.cells[5].innerHTML = tableRimborso[tableLength].dovuto;
    tr.cells[6].innerHTML = '<button class="deleteRow" onclick="deleteRow(this)">X</button>';
}

//Posso cancellare i cell?
function createRowCell(){
    table = document.getElementById("inputTable");
    tr = table.insertRow(-1);
    tr.insertCell(0);
    tr.insertCell(1);
    tr.insertCell(2);
    tr.insertCell(3);
    tr.insertCell(4);
    tr.insertCell(5);
    tr.insertCell(6);
}


function formGetValue(row){
    document.getElementById("inputType").value = row.type;
    document.getElementById("inputDate").value = row.date;
    document.getElementById("inputImporto").value = row.importo;
    translateScontrino(row.ricevuta);
}


function arrayGetValue(row){
    row.type = document.getElementById("inputType").value;
    row.date = document.getElementById("inputDate").value;
    row.importo = document.getElementById("inputImporto").value;
    row.ricevuta = scontrino(row);
    row.stato = approvazione(regoleApprovazione(row));
    row.dovuto  = gestisciImportiDovuti(row);
    row.primaryKey = primaryKey;
}


// Aggiunge righe alla tabella html e attribuisce valori
// inoltre salva i valori in array diversi per ogni colonna
function aggiungiRiga(){
    // Disabilito la scelta del mese
    disableMonth();
    // Prendo le variabili dalla form e faccio la add in tableRimborso 
    let row = {"type" : "", "date" : "", "importo" : 0, "ricevuta" : "", "stato" : "", "dovuto" : 0, "primaryKey" : 0};
    arrayGetValue(row);
    tableRimborso.push(row);

    //Creo celle e le inserisco in fondo alla tbody
    createRowCell();
    
    
    //innerHTML delle variabili della form
    let tableLength = tableRimborso.length - 1;
    cellWrite(tr, tableLength);

    // Set attribute della righe e dei bottoni con primaryKey
    setRowsAttribute(tableLength);
    
    console.log(tableRimborso);

    primaryKey++;
    sommaDovuto(tableRimborso);
    return false;
}


function disableMonth(){
    let monthDisabled = document.getElementById("inputMonth").disabled;
    if(monthDisabled == false)
        document.getElementById("inputMonth").disabled = true;
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

    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getYear() + 1900;

    if(month < 10)
        month = "0" + month;

    let maxMonth = year + "-" + month;
    document.getElementById("inputMonth").setAttribute("max", maxMonth);
}


// Passa ad #inputMonth il min ed il max dei giorni selezionabili
function getRangeDays (){
    undisableDate();
    // Prendo data e mese da input
    let monthInput = document.getElementById("inputMonth").value.slice(5,7);
    let yearInput = document.getElementById("inputMonth").value.slice(0,4);
    // Prendo quanti giorni ci sono in un mese -> (Mese + 1) e prendo il giorno -1
    let daysInMonth = new Date(yearInput, monthInput, 0).getDate();
    let minDate = yearInput + "-" + monthInput + "-" + "01";
    let maxDate = getMaxDate(yearInput, monthInput, daysInMonth);

    document.getElementById("inputDate").setAttribute("min", minDate);
    document.getElementById("inputDate").setAttribute("max", maxDate);
}


function undisableDate(){
    let dateDisabled = document.getElementById("inputDate").disabled;
    if(dateDisabled == true)
        document.getElementById("inputDate").disabled = false;
}


function getMaxDate(yearInput, monthInput, daysInMonth){
    let dateToday = new Date();
    let dateEndMonth = new Date(yearInput, monthInput, daysInMonth);
    
    // controllo sul mese. La data non puo essere superiore ad oggi
    if(dateToday < dateEndMonth)
        return yearInput + "-" + monthInput + "-" + dateToday.getDate();
    else
        return yearInput + "-" + monthInput + "-" + daysInMonth;
}


function resetMonth(){
    document.getElementById("inputMonth").disabled = false;
    document.getElementById("inputDate").disabled = true;
}


function resetTable(){
    resetMonth();
    tableRimborso = [];
    let tbody = document.getElementById("inputTable")
    while(tbody.hasChildNodes()){
        tbody.deleteRow(0);
    }
    sommaDovuto(tableRimborso);
}


function findIndexOfId(id){
    for(let i = 0; i < tableRimborso.length; i++){
        if(tableRimborso[i].primaryKey == id)
            return i;   
    }
}


function deleteRow(button){
    //rimuovo riga e ottengo id e value
    let tr = button.parentNode.parentNode;
    let id = tr.getAttribute("id");
    tr.parentNode.removeChild(tr); 
    indexToRemove = findIndexOfId(id);
    tableRimborso.splice(indexToRemove, 1);
    sommaDovuto(tableRimborso);
}


function gotoRimborsi(){
    role = document.getElementById("inputRole").value;
    fetch('./rimborsoMax.json')
    .then(response => response.json())
    .then(data => {storeRimborsoMax(data);}    )
    .catch(error => console.log(error));
    location.replace("rimborsi.html");
}


function storeRimborsoMax(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].ruolo == role){
            sessionStorage.setItem("maxTaxi", data[i].taxi)
            sessionStorage.setItem("maxVitto", data[i].vitto)
            sessionStorage.setItem("maxHotel", data[i].hotel)
            sessionStorage.setItem("maxTreno", data[i].treno)
        }
    }
}
let tableRimborso = [];
let primaryKey = 0;
let totale = 0;
let role;


// Traduce la checkbox in stringa => Si o No
function scontrino(){
    if(document.getElementById("inputRicevuta").checked == true)
        return "Sì"

    if(document.getElementById("inputRicevuta").checked != true)
        return "No"
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
function regoleApprovazione(riga){
    if(riga.ricevuta == "No" && riga.importo > 10 )
        return -1;

    // if(riga.importo > 120)
    //     return 0;

    else
        return 1;
}


// Gestisce gli importi dovuti
function gestisciImportiDovuti(riga){
    let maxTaxi = Number(localStorage.getItem("maxTaxi"));
    let maxVitto = Number(localStorage.getItem("maxVitto"));
    let maxHotel = Number(localStorage.getItem("maxHotel"));
    let maxTreno = Number(localStorage.getItem("maxTreno"));

    if(riga.stato == "Non approvata")
        return 0;
        
    if(riga.stato == "In attesa di approvazione")
        return 0;

    if(riga.type == "Taxi" && riga.importo > maxTaxi)
        return maxTaxi;
    
    if(riga.type == "Vitto" && riga.importo > maxVitto)
        return maxVitto;
    
    if(riga.type == "Hotel" && riga.importo > maxHotel)
        return maxHotel;
        
    if(riga.type == "Treno" && riga.importo > maxTreno)
        return maxTreno;
    
    return riga.importo;    
}

function sommaDovuto(tableRimborso){
    let sum = 0;
    for(let count = 0; count < tableRimborso.length; count++){
        sum += Number(tableRimborso[count].dovuto)
    }
    return sum;
}


// Aggiunge righe alla tabella html e attribuisce valori
// inoltre salva i valori in array diversi per ogni colonna

function aggiungiRiga(){
    // Disabilito la scelta del mese
    document.getElementById("inputMonth").disabled = true;

    // Creo le variabili e l'oggetto. dopo faccio la add 
    let type = document.getElementById("inputType").value;
    let date = document.getElementById("inputDate").value;
    let importo = document.getElementById("inputImporto").value;
    let ricevuta = scontrino();
    let stato = "";
    let dovuto = 0;
    let riga = {"type" : type, "date" : date, "importo" : importo, "ricevuta" : ricevuta, "stato" : stato, "dovuto" : dovuto, "primaryKey" : primaryKey};
    
    riga.stato = approvazione(regoleApprovazione(riga));
    riga.dovuto  = gestisciImportiDovuti(riga);
    tableRimborso.push(riga);
    let tableLength = tableRimborso.length - 1;
    //Calcolo l'importo dovuto
    //Creo tabelle e righe
    var table = document.getElementById("inputTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    cell1.innerHTML = tableRimborso[tableLength].date;
    cell2.innerHTML = tableRimborso[tableLength].type;
    cell3.innerHTML = tableRimborso[tableLength].importo;
    cell4.innerHTML = tableRimborso[tableLength].ricevuta;
    cell5.innerHTML = tableRimborso[tableLength].stato;
    cell6.innerHTML = tableRimborso[tableLength].dovuto;
    cell7.innerHTML = '<button class="deleteRow" onclick="deleteRow(this)">X</button>';
    cell7.firstElementChild.setAttribute("id", primaryKey);

    primaryKey++;
    totale = sommaDovuto(tableRimborso);
    document.getElementById("inputTotale").innerHTML = totale;

    return false;
}


// Funzione che mi setta il max nel mese che posso scegliere
// 
function maxMonth(){
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
    document.getElementById("inputDate").disabled = false;
    // Prendo data e mese da input
    let month = document.getElementById("inputMonth").value.slice(5,7);
    let year = document.getElementById("inputMonth").value.slice(0,4);
    // Prendo quanti giorni ci sono in un mese -> (Mese + 1) e prendo il giorno -1
    let daysInMonth = new Date(year, month, 0).getDate();
    let minDate = year + "-" + month + "-" + "01";
    let maxDate;
    let dateToday = new Date();
    let dateEndMonth = new Date(year, month, daysInMonth);
    
    // controllo sul mese. La data non puo essere superiore ad oggi
    if(dateToday < dateEndMonth)
        maxDate = year + "-" + month + "-" + dateToday.getDate();
    else
        maxDate = year + "-" + month + "-" + daysInMonth;

    document.getElementById("inputDate").setAttribute("min", minDate);
    document.getElementById("inputDate").setAttribute("max", maxDate);
}


function resetMonth(){
    document.getElementById("inputMonth").disabled = false;
}


function resetTable(){
    resetMonth();
    let tbody = document.getElementById("inputTable")
    while(tbody.hasChildNodes()){
        tbody.deleteRow(0);
    }
    totale = 0;
    document.getElementById("inputTotale").innerHTML = totale;
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
    let id = button.getAttribute("id");
    tr.parentNode.removeChild(tr);
    
    indexToRemove = findIndexOfId(id);
    totale -= tableRimborso[indexToRemove].dovuto; 
    document.getElementById("inputTotale").innerHTML = totale;
    tableRimborso.splice(indexToRemove, 1);
}


function gotoRimborsi(){
    role = document.getElementById("inputRole").value;
    fetch('rimborsoMax.json')
    .then(response => response.json())
    .then(data => {getMax(data);})
    .catch(error => console.log(error));
    location.replace("rimborsi.html");
}

function getMax(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].ruolo == role){
            localStorage.setItem("maxTaxi", data[i].taxi);
            localStorage.setItem("maxVitto", data[i].vitto);
            localStorage.setItem("maxHotel", data[i].hotel);
            localStorage.setItem("maxTreno", data[i].treno);
        }
    }
}
    
let type = [];
let date = [];
let importo = [];
let ricevuta = [];
let stato = [];
let dovuto = [];
let count = 0;

// Traduce la checkbox in stringa => Si o No
function scontrino(){
    if(document.getElementById("inputRicevuta").checked == true)
        return "Sì"
    if(document.getElementById("inputRicevuta").checked != true)
        return "No"
}

// Traduce in stringa l'approvazione del rimborso
function approvazione(stato){
    if(stato == -1)
        return "Non approvata"
    if(stato == 0)
        return "In attesa di approvazione"
    if(stato == 1)
        return "Approvata"
}

//Tutte le regole per cui un rimborso deve essere accettato o meno
function regoleApprovazione(ricevuta, importo, type){
    if(ricevuta == "No" && importo > 10 )
        return -1;

    if(importo > 120)
        return 0;

    else
        return 1;
}

// Gestisce gli importi dovuti
function gestisciImportiDovuti(ricevuta, importo, type, stato){
    if(stato == "Non approvata")
        return 0;
        
    if(stato == "In attesa di approvazione")
        return 0;

    if(type == "Taxi" && importo > 40)
        return 40;
    
    if(type == "Hotel" && importo > 80)
        return 80;
    
    if(type == "Vitto" && importo > 25)
        return 25;

    return importo;    
}

// Aggiunge righe alla tabella html e attribuisce valori
// inoltre salva i valori in array diversi per ogni colonna
function aggiungiRiga(){
    //Creo tabelle e righe
    var table = document.getElementById("table");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    type [count] = document.getElementById("inputType").value;
    date [count] = document.getElementById("inputDate").value;
    importo [count] = document.getElementById("inputImporto").value;
    ricevuta [count] = scontrino();
    //Calcolo lo stato. Approvazione mi traduce valore in stringa.
    stato[count] = approvazione(regoleApprovazione(ricevuta[count], importo[count], type[count]));
    //Calcolo il dovuto
    dovuto [count] = gestisciImportiDovuti(ricevuta[count], importo[count], type[count], stato[count]);


    //Calcolo l'importo dovuto
    // dovuto[count] =
    console.log(type);
    console.log(date);
    console.log(importo);
    console.log(ricevuta);
    console.log(stato);


    cell1.innerHTML = date [count];
    cell2.innerHTML = type [count];
    cell3.innerHTML = importo [count];
    cell4.innerHTML = ricevuta [count];
    cell5.innerHTML = stato [count];
    cell6.innerHTML = dovuto [count];

    count++;
    document.getElementById("totale").innerHTML = dovuto.reduce((partialSum, a) => Number(partialSum) + Number(a), 0);


    return false;
}
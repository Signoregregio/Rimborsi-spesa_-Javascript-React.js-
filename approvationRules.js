let maxTaxi;
let maxVitto;
let maxHotel;
let maxTreno;
let userId;


function loadingConfiguration() {
    maxMonth();
    maxTaxi = Number(sessionStorage.getItem("maxTaxi"));
    maxVitto = Number(sessionStorage.getItem("maxVitto"));
    maxHotel = Number(sessionStorage.getItem("maxHotel"));
    maxTreno = Number(sessionStorage.getItem("maxTreno"));
    userId = sessionStorage.getItem("userId");
    console.log( maxTaxi, maxVitto, maxHotel, maxTreno, userId);
}

function approvazione(status) {
    if (status == -1) {
        return 'Non approvata'
    }
    // if (status == 0) {
    //     return 'In attesa di approvazione'
    // }   
    if (status == 1) {
        return 'Approvata'
    }
}

function regoleApprovazione(row) {
    if (row.ricevuta == "No" && row.importo > 10 ) {
        return -1;
    } else {
        return 1;
    }
}

function gestisciImportiDovuti(row) {
    if (row.stato == "Non approvata" || row.stato == "In attesa di approvazione") {
        return 0;
    }
    if (row.type == "Taxi" && row.importo > maxTaxi) {
        return maxTaxi;
    }
    if (row.type == "Vitto" && row.importo > maxVitto) {
        return maxVitto;
    }
    if (row.type == "Hotel" && row.importo > maxHotel) {
        return maxHotel;
    }
    if (row.type == "Treno" && row.importo > maxTreno) {
        return maxTreno;
    }
    return row.importo;    
}
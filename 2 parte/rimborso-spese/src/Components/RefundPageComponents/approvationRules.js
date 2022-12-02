export function translateStatus(status) {
	if (status === -1) {
		return "Non approvata";
	}
	// if (status === 0) {
	//     return 'In attesa di approvazione'
	// }
	if (status === 1) {
		return "Approvata";
	}
}

export function approveStatus(ticket, amount) {
    if (ticket === "No" && amount > 10 ) {
        return -1;
    } else {
        return 1;
    }
}

export function calculateMaxRefundable(row, maxRef) {
    if (row.state === "Non approvata" && row.amount >= 10) {
        return 10;
    }
    if(row.state === "Non approvata" && row.amount < 10){
        return row.amount;
    }
    if (row.type === "Taxi" && row.amount > maxRef.taxi) {
        return maxRef.taxi;
    }
    if (row.type === "Vitto" && row.amount > maxRef.vitto) {
        return maxRef.vitto;
    }
    if (row.type === "Hotel" && row.amount > maxRef.hotel) {
        return maxRef.hotel;
    }
    if (row.type === "Treno" && row.amount > maxRef.Treno) {
        return maxRef.Treno;
    }
    return row.amount;    
}
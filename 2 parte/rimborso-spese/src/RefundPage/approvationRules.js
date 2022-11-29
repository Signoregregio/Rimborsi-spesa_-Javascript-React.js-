import { maxRefundable } from "../Json/maxRefundable";

let maxTaxi = maxRefundable[0].taxi;
let maxVitto = maxRefundable[0].vitto;
let maxHotel = maxRefundable[0].hotel;
let maxTreno = maxRefundable[0].treno;

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

export function setMaxRefundable(state, type, amount) {
    if (state === "Non approvata" && amount >= 10) {
        return 10;
    }
    if(state === "Non approvata" && amount < 10){
        return amount;
    }
    if (type === "Taxi" && amount > maxTaxi) {
        return maxTaxi;
    }
    if (type === "Vitto" && amount > maxVitto) {
        return maxVitto;
    }
    if (type === "Hotel" && amount > maxHotel) {
        return maxHotel;
    }
    if (type === "Treno" && amount > maxTreno) {
        return maxTreno;
    }
    return amount;    
}
function maxMonth(){
    // Per controllo giusta assegnazione ruolo da JSON
    // Inizio
    let maxTaxi = Number(sessionStorage.getItem("maxTaxi"));
    let maxVitto = Number(sessionStorage.getItem("maxVitto"));
    let maxHotel = Number(sessionStorage.getItem("maxHotel"));
    let maxTreno = Number(sessionStorage.getItem("maxTreno"));
    console.log( maxTaxi, maxVitto, maxHotel, maxTreno);
    // Fine
    splittedDateToday = (dateToday.toISOString().split('T')[0]).match("[0-9]{4}[-][0-9]{2}");
    let maxMonth = splittedDateToday;
    document.getElementById("inputMonth").setAttribute("max", maxMonth);
}

// 2022-10-2
// Passa ad #inputMonth il min ed il max dei giorni selezionabili
function getRangeDays (){
    document.getElementById("inputDate").disabled = false;
    // Prendo data e mese da input
    let inputYearMonth = (document.getElementById("inputMonth").value).split("-");;
    let daysInMonth = new Date(inputYearMonth[0], inputYearMonth[1], 0).getDate();
    console.log(daysInMonth)
    let minDate = inputYearMonth[0] + "-" + inputYearMonth[1] + "-" + "01";
    let maxDate = getMaxDate(inputYearMonth, daysInMonth);
    document.getElementById("inputDate").setAttribute("min", minDate);
    document.getElementById("inputDate").setAttribute("max", maxDate);
}


// let aa = dateToday.toISOString()
function getMaxDate(inputYearMonth, daysInMonth){
    let dateEndMonth = new Date(inputYearMonth[0], inputYearMonth[1], daysInMonth);
    let myMonthSelected = dateToday < dateEndMonth;
    let today = ("0" + dateToday.getDate()).slice(-2);
    console.log(inputYearMonth[0] + inputYearMonth[1] + "-" + dateToday.getDate())
    if(myMonthSelected)
        return inputYearMonth[0] + "-" + inputYearMonth[1] + "-" + today;
    else
        return inputYearMonth[0] + "-" + inputYearMonth[1] + "-" + daysInMonth;
}
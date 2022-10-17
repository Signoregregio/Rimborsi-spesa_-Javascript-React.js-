let date = new Date;


function translateDay(date) {
    let giorniSettimana = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
    let day = date.slice(8,10);
    let month = date.slice(5,7);
    let year = date.slice(0,4);
    let dateSelected = new Date(year, month - 1, day); 
    let nameDay = giorniSettimana[dateSelected.getDay()];
    year = date.slice(2,4);
    return nameDay + " " + day + "/" + month + "/" + year;
}


function maxMonth() {
    let inputMonthYear = date.toISOString().split('T')[0]
    let maxMonth = inputMonthYear.match("[0-9]{4}[-][0-9]{2}");
    document.getElementById("inputMonth").setAttribute("max", maxMonth);
}



function maxMonth() {
    let inputMonthYear = date.toISOString().split('T')[0]
    let maxMonth = inputMonthYear.match("[0-9]{4}[-][0-9]{2}");
    document.getElementById("inputMonth").setAttribute("max", maxMonth);
}

function setRangeDays () {
    document.getElementById("inputDate").disabled = false;
    let monthInput = document.getElementById("inputMonth").value.slice(5,7);
    let yearInput = document.getElementById("inputMonth").value.slice(0,4);
    let daysInMonth = new Date(yearInput, monthInput, 0).getDate();
    let minDate = yearInput + "-" + monthInput + "-" + "01";
    let maxDate = getMaxDate(yearInput, monthInput, daysInMonth);
    document.getElementById("inputDate").setAttribute("min", minDate);
    document.getElementById("inputDate").setAttribute("max", maxDate);
}

function getMaxDate(yearInput, monthInput, daysInMonth) {
    let dateToday = ("0" + date.getDate()).slice(-2);
    let dateEndMonth = new Date(yearInput, monthInput - 1, daysInMonth);
    let myMonthSelected = date < dateEndMonth;
    // controllo sul mese. La data non puo essere superiore ad oggi
    if (myMonthSelected)
        return yearInput + "-" + monthInput + "-" + dateToday;
    else
        return yearInput + "-" + monthInput + "-" + daysInMonth;
}

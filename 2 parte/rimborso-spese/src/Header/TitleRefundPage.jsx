export default function TitleRefundPage({dateMonth}){
    function translateMonth () {
        let month = dateMonth.slice(5,7);
        let year = dateMonth.slice(0,4);
        let monthArray = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
        dateMonth = monthArray[month - 1] + " " + year;
    }

    (dateMonth !== "" && translateMonth());

    return(
        <h1 className="title">Pagina Rimborso Spese di {dateMonth}</h1>
    )
}
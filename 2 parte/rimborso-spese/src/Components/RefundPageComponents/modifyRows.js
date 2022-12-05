let asc = true;
const columnType = ["dateRefund", "type", "amount", "ticket", "state", "refund"];

export function sortByColumn (sortType, sortAsc, tableListRimborso) {
    console.log("%c SORTING BY ","background-color:yellow;color:blue;font-size:16px;")
    console.log(columnType[sortType])
    let sortedArray;
    if (columnType[sortType]  == "dateRefund") {
        sortedArray = tableListRimborso.sort(function(a, b) {
        let aa = a.dateRefund.split('-').join();
        let bb = b.dateRefund.split('-').join();
        if(sortAsc){
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        } else {
            return aa < bb ? (aa > bb ? 1 : 0) : -1;
        }
        });
    }
    if (columnType[sortType]  == "type") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(sortAsc){
                return (a.type).localeCompare(b.type);
            } else {
                return (b.type).localeCompare(a.type);
            }
        }) 
    }
    if (columnType[sortType]  == "amount") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(sortAsc){
                return Number(a.amount) - Number(b.amount)
            } else {
                return Number(b.amount) - Number(a.amount)
            }
        });
    }
    if (columnType[sortType]  == "ticket") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(sortAsc){
                return (a.ticket).localeCompare(b.ticket);
            } else {
                return (b.ticket).localeCompare(a.ticket);
            }
        }) 
    }
    if (columnType[sortType]  == "state") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(sortAsc){
                return (a.state).localeCompare(b.state);
            } else {
                return (b.state).localeCompare(a.state);
            }
        }) 
    } 
    if (columnType[sortType]  == "refund") {
        sortedArray = tableListRimborso.sort((a, b) =>{
            if(sortAsc){
                return Number(a.refund) - Number(b.refund)
            } else {
                return Number(b.refund) - Number(a.refund)
            }
    });
    }
    return sortedArray
}

export function filterArray(rows, filterInput) {
    let filteredRows = rows;
    console.log(filterInput)
        if (filterInput.date  !== "") {
            console.log(filterInput.date)
            filteredRows = filteredRows.filter(row => row.dateRefund == filterInput.date);
        }
        if (filterInput.type  !== "") {
            filteredRows = filteredRows.filter(row => row.type.toLowerCase().indexOf((filterInput.type).toLowerCase()) > -1);
        }
        // if (filterInput.amountMin  !== "") {
        //     filteredRows = filteredRows.filter(row => row.amount >= Number(filterInput.amountMin));
        // }
        // if (filterInput.amountMax  !== "") {
        //     filteredRows = filteredRows.filter(row => row.amount <= Number(filterInput.amountMax));
        // }

        if (filterInput.amountMin  !== "" || filterInput.amountMax  !== "") {
            console.log("enter")
            console.log(filterInput.amountMin)
            console.log(filterInput.amountMax)
            if(filterInput.amountMin === ""){
                console.log("1")
                filteredRows = filteredRows.filter(row => row.amount <= Number(filterInput.amountMax));
            }
            if(filterInput.amountMax === ""){
                console.log("2")
                filteredRows = filteredRows.filter(row => row.amount >= Number(filterInput.amountMin));
            }
            if(filterInput.amountMin <= filterInput.amountMax){
                console.log("3")
                filteredRows = filteredRows.filter(row =>  Number(filterInput.amountMin) <= row.amount <= Number(filterInput.amountMax)) ;
            }
            if(filterInput.amountMin >= filterInput.amountMax){
                console.log("4")
                filteredRows = filteredRows.filter(row =>  Number(filterInput.amountMax) <= row.amount <= Number(filterInput.amountMin)) ;
            }
        }

        
        if (filterInput.ticket  !== "") {
            filteredRows = filteredRows.filter(row => row.ticket.toLowerCase().indexOf(filterInput.ticket.toLowerCase()) > -1);
        }
        if (filterInput.state  !== "") {
            filteredRows = filteredRows.filter(row => row.state.toLowerCase().indexOf((filterInput.state).toLowerCase()) > -1);
        }
        if (filterInput.refundMax  !== "") {
            console.log(filterInput.refund)
            filteredRows = filteredRows.filter( row => row.refund >= Number(filterInput.refundMax));
        }
        console.log(filteredRows)
        return filteredRows;
}
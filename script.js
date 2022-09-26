function newRow(){
    var output='<table border="2" cellspacing="1" cellpadding="8" class="table">'
        output=output + '<tr>'
        output=output + '<td>'+
            '<select class="input" required>' +
                '<option value="" disabled selected hidden>Inserire il tipo</option>' +
                '<option value="taxi">Taxi</option>' +
                '<option value="vitto">Vitto</option>' +
                '<option value="hotel">Hotel</option>' +
                '<option value="treno">Treno</option>'+
            '</select>' + '</td>'
        output=output+'<td>'+ '<label for="date">Data:</label>' + '<input class="input" type="date" name="date" placeholder="dd/mm">'+'</td>'
        output=output+'<td>'+'<input class="input" type="number" maxlength="4" size="1" !important placeholder="0,00 €">'+'</td>'
        output=output+'<td>'+'<input class="input" type="checkbox" placeholder=" ">'+'</td>'
        output=output+'<td>'+'<input class="input" type="text" placeholder=" " size="1" readonly>'+'</td>'
        output=output+'<td>'+'<input class="input read" type="number" placeholder="0,00 €" readonly>'+'</td>'
        
    output=output+'</tr>'
    output=output+'</table>'
    document.getElementById('container').innerHTML += output    
    }
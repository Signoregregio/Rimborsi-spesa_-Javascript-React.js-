let role;
let idArray = [];


function mockLink() {
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/"
}
function mockLinkUser(userId) {
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/user/" + userId;
}
function mockLinkSpesa(userId) {
    return "https://63453f7439ca915a69f9a522.mockapi.io/api/user/" + userId + "/spesa";
}


async function login() {
    await getRole();
    sessionStorage.setItem("userId", userId);
    await storageRimborsoMax();
    location.replace("rimborsi.html")
}

async function getRole() {
    console.log("%c ___ ","background-color:orange;");
    userId = document.getElementById("inputId").value;
    await fetch(mockLinkUser(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {role = data.role; console.log(role)})
    .catch(error => console.log(error));
}

async function storageRimborsoMax() {
    await fetch(mockLink() + "rimborsoMax")
    .then(response => response.json())
    .then(data => {
        for (const key in data) {
            if (data[key].ruolo == role) {
                sessionStorage.setItem("maxTaxi", data[key].taxi)
                sessionStorage.setItem("maxVitto", data[key].vitto)
                sessionStorage.setItem("maxHotel", data[key].hotel)
                sessionStorage.setItem("maxTreno", data[key].treno)
            }
        }})
    .catch(error => console.log(error));
}


async function downloadTable() {
    disableForm();
    console.log("%c DOWNLOADING ","background-color:DeepPink;color:white;")
    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => jsonToArray(data))
    .catch(error => console.log(error));

    console.log(tableListRimborso)
    sortByColumn(columnSort, tableListRimborso);
    resetTable();
    writeCreateTable(tableListRimborso);
    undisableForm();
}

function disableForm() {
    var form = document.getElementById("formUser");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;
    }
}

function undisableForm() {
    var form = document.getElementById("formUser");
    var elements = form.elements;
    let changeRowButton = 7
    for (var i = 0, len = elements.length; i < len; ++i) {
        if(i == changeRowButton) {
            continue;
        }
        elements[i].disabled = false;
    }
}


// map map

function jsonToArray(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    tableListRimborso = [];
    obj.map(value => {
        Object.keys(value).map(item => {
            if (item != 'id' && item != 'userId') {
                let tableDate = value[item].date.match("[0-9]{4}[-][0-9]{2}");
                if (yearMonth == tableDate) {
                    value[item].primaryKey = primaryKey++;
                    tableListRimborso.push(value[item]);
                }    
            }
        })
    })
}

// map filter. Non funziona. ritorna una lista di oggetti che non è sortabile

// function jsonToArray(obj) {
//     let yearMonth = document.getElementById("inputMonth").value
//     tableListRimborso = [];
//     obj.map(value => {
//         value = Object.entries(value)
//         let filtered = value.filter(elem => {
//             if(elem[0] != 'id' && elem[0] != 'userId') {
//                 let tableDate = elem[1].date.match("[0-9]{4}[-][0-9]{2}");
//                 if(yearMonth == tableDate) {
//                     elem[1].primaryKey = primaryKey++;
//                     return elem[1];
//                 }
//             }
//         })
//         tableListRimborso = tableListRimborso.concat(filtered)
//     })
//     tableListRimborso = Object.fromEntries(tableListRimborso);
// }

  
async function SubmitMonthMock() {
    disableForm();
    console.log("%c SUBMIT IS STARTING ","background-color:brown;color:white;")
    idArray = await getIdByMonthMock();
    await deleteMockByUserId(idArray)
    idArray = [];
    await postTable();
    undisableForm();
}

async function getIdByMonthMock() {
    console.log("%c GETTING ID ","background-color:red;color:white;")

    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => idMonthSelected(data))
    .catch(error => console.log(error));
    console.log("ID TO DELETE : ")
    console.log(idArray)
    return idArray;
}


async function idMonthSelected(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    console.log(yearMonth)
    obj.filter(value => {
        let tableDate = value[0].date.match("[0-9]{4}[-][0-9]{2}");
        if (tableDate == yearMonth) {
            idArray.push(value.id)
        }
    })
}

function jsonToArray(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    tableListRimborso = [];
    obj.map(value => {
        Object.keys(value).map(item => {
            if (item != 'id' && item != 'userId') {
                let tableDate = value[item].date.match("[0-9]{4}[-][0-9]{2}");
                if (yearMonth == tableDate) {
                    value[item].primaryKey = primaryKey++;
                    tableListRimborso.push(value[item]);
                }    
            }
        })
    })
}


async function deleteMockByUserId(idArray) {
    console.log("%c DELETING ","background-color:black;color:white;")
    for (const element of idArray) {
        await fetch(mockLinkSpesa(userId) + "/" + element, {
        method: "DELETE",
        headers: {
                'Content-type': 'application/json'
            }
      })
    .then(response => { return response.json()})
    .then(data => console.log(data) );
    }
}

async function postTable() {
    let tableIsEmpty = sumImporto == 0;
    if(!tableIsEmpty) {
        console.log("%c POSTING ","background-color:white;color:black;")
        await fetch(mockLinkSpesa(userId),{
            method: "POST",
            body: JSON.stringify(tableListRimborso),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(data => {console.log(data); console.log("NUOVO ID " + data.id)})
        .catch(error => console.log(error));
    } else {
        console.log("tableIsEmpty")
    }
}
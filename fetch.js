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
    console.log("%c ___ ","background-color:red;")
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
        if(i == changeRowButton){
            continue;
        }
        elements[i].disabled = false;
    }
}

function jsonToArray(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    tableListRimborso = [];
    for (const key in obj) {
        const value = obj[key];
        for (const prop in value) {
            if (prop == "id" || prop == "userId") {
                continue;
            }
            let tableDate = value[prop].date.match("[0-9]{4}[-][0-9]{2}");
            if (yearMonth == tableDate) {
                value[prop].primaryKey = primaryKey;
                tableListRimborso.push(value[prop]);
                primaryKey++;
            }
        }
    }
}

  
async function SubmitMonthMock() {
    disableForm();
    console.log("%c ___ ","background-color:brown;")
    idArray = await getIdByMonthMock();
    await deleteMockByUserId(idArray)
    idArray = [];
    await postTable();
    undisableForm();
}

async function getIdByMonthMock() {
    console.log("%c ___ ","background-color:red;")

    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => idMonthSelected(data))
    .catch(error => console.log(error));
    console.log(idArray)
    return idArray;
}

async function idMonthSelected(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    console.log(yearMonth)
    for (const key in obj) {
        const value = obj[key];
        if (value.userId == userId) {
            for (const prop in value) {
                let tableDate = value[prop].date.match("[0-9]{4}[-][0-9]{2}");
                if (tableDate == yearMonth) {
                    idArray.push(value.id);
                }
                break;
            }
        }
        continue;
    }
}

async function deleteMockByUserId(idArray) {
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
    if(!tableIsEmpty){
        console.log("%c ___ ","background-color:white;")
        await fetch(mockLinkSpesa(userId),{
            method: "POST",
            body: JSON.stringify(tableListRimborso),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(data => { console.log(data);})
        .catch(error => console.log(error));
    } else {
        console.log("tableIsEmpty")
    }
}



// async function unloadCheck(){
//     let equal;
//     t
//     await fetch(mockLinkSpesa(userId),{
//         method: "GET",
//         headers: {"Content-type": "application/json; charset=UTF-8"}
//     })
//     .then(response => response.json())
//     .then(data => {equal = jsonToArray(data) == tableListRimborso;
//         console.log(tableListRimborso);
//         console.log(jsonToArray(data))})
//     .catch(error => console.log(error));
//     console.log(equal)
//     if(sumImporto == 0 || sumImporto != 0)
//         return "kkkkkkkkkk"
// }
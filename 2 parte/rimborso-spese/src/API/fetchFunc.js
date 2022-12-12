let role;
let idArray = [];
let foundedAccount;
let id;

function mockLink() {
    return 'https://638a2950c5356b25a2141671.mockapi.io/'
}
function mockLinkUser(userId) {
    return 'https://638a2950c5356b25a2141671.mockapi.io/users/' + userId;
}
function mockLinkSpesa(userId) {
    return 'https://638a2950c5356b25a2141671.mockapi.io/users/' + userId + '/spesa';
}


export async function getRole(username) {
    console.log("%c ___ ","background-color:orange;");
    await fetch(mockLinkUser(username),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {role = data.role})
    .catch(error => console.log(error));
    return role;
}

export async function storageRimborsoMax(role) {
    const maxRefundable = {};
    await fetch(mockLink() + "maxRefundable")
    .then(response => response.json())
    .then(data => {
        for (const key in data) {
            if (data[key].ruolo === role) {
                maxRefundable.taxi = data[key].taxi
                maxRefundable.vitto = data[key].vitto
                maxRefundable.hotel = data[key].hotel
                maxRefundable.treno = data[key].treno
            }
        }})
    .catch(error => console.log(error));
    console.log(maxRefundable)
    return maxRefundable;
}

export async function downloadTable(userId, month) {
    console.log("%c DOWNLOADING ","background-color:DeepPink;color:white;font-size:16px;")
    let refundList = [];
    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => jsonToArray(data, month, refundList))
    .catch(error => console.log(error));

    return refundList;
}

function jsonToArray(obj, month, refundList) {
    obj.forEach(value => {
        Object.keys(value).forEach(item => {
            if (item !== "id" && item !== "userId") {
                let tableDate = value[item].dateRefund.match('[0-9]{4}[-][0-9]{2}');
                if (month === tableDate) {
                    refundList.push(value[item]);
                }    
            }
        })
    })
}

export async function submitMonthMock(rows, userId, yearMonth) {
    console.log("%c SUBMIT IS STARTING ","background-color:brown;color:white;font-size:16px;")
    idArray = await getIdByMonthMock(userId, yearMonth);
    await deleteMockByUserId(idArray, userId)
    idArray = [];
    await postTable(rows, userId);
}

async function getIdByMonthMock(userId, yearMonth) {
    console.log("%c GETTING ID ","background-color:red;color:white;font-size:16px;")

    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => idMonthSelected(data, yearMonth))
    .catch(error => console.log(error));
    console.log("id TO DELETE : ")
    console.log(idArray)
    return idArray;
}

function idMonthSelected(obj, yearMonth) {
    console.log(yearMonth)
    obj.forEach(value => {
        let tableDate = value[0].dateRefund.match('[0-9]{4}[-][0-9]{2}');
        if (tableDate === yearMonth) {
            idArray.push(value.id)
        }
    })
}

async function deleteMockByUserId(idArray, userId) {
    console.log("%c DELETING ","background-color:black;color:white;font-size:16px;")
    for (const element of idArray) {
        await fetch(mockLinkSpesa(userId) + '/' + element, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
      })
    .then(response => { return response.json()})
    .then(data => console.log(data) );
    }
}

async function postTable(rows, userId) {
    let tableIsEmpty = (rows.length === 0)
    if(!tableIsEmpty) {
        console.log("%c POSTING ","background-color:white;color:black;font-size:16px;")
        await fetch(mockLinkSpesa(userId),{
            method: "POST",
            body: JSON.stringify(rows),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(data => {console.log(data); console.log("NUOVO id " + data.id)})
        .catch(error => console.log(error));
    } else {
        console.log("%c tableIsEmpty","font-size:16px;")
    }
    console.log("%c SUBMITTING ENDED ","background-color:brown;color:white;font-size:16px;") 
}

export async function hasRegistered(user){
    foundedAccount = false;
    await fetch((mockLink() + "users"),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => checkLoginForm(data, user))
    .catch(error => console.log(error));
    
    return foundedAccount;
}

function checkLoginForm(data, user){
    data.forEach(mock => { 
        if(mock.username === user.username && mock.password === user.password){
            foundedAccount = true;
        }
    })
}

export async function registerNewUser(userData){
    console.log("%c REGISTERING ","background-color:grey;color:white;font-size:16px;")

    await fetch((mockLink() + "users"),{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {console.log(data); console.log("NUOVO id " + data.id)})
    .catch(error => console.log(error));
}

export async function getId(user){
	id = null;
    await fetch((mockLink() + "users"),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => checkId(data, user))
    .catch(error => console.log(error));
    
	console.log(id)
    return id;
}

function checkId(data, user){
    data.forEach(mock => { 
        if(mock.username === user.username){
           	id = mock.id
        }
    })
}
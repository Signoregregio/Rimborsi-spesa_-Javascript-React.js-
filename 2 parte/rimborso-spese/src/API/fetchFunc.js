let role;
let idArray = [];
let userId;
let tableListRimborso = [];

export function mockLink() {
    return 'https://638a2950c5356b25a2141671.mockapi.io/'
}
export function mockLinkUser(userId) {
    return 'https://638a2950c5356b25a2141671.mockapi.io/users/' + userId;
}
export function mockLinkSpesa(userId) {
    return 'https://638a2950c5356b25a2141671.mockapi.io/users/' + userId + '/spesa';
}


export async function getRole(username) {
    console.log("%c ___ ","background-color:orange;");
    await fetch(mockLinkUser(username),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {role = data.role; console.log(role)})
    .catch(error => console.log(error));
    return role;
}

export async function storageRimborsoMax(role) {
    const maxRefundable = {};
    await fetch(mockLink() + "maxRefundable")
    .then(response => response.json())
    .then(data => {
        for (const key in data) {
            if (data[key].ruolo == role) {
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

    console.log(refundList)
    return refundList;
    // sortByColumn(columnSort, tableListRimborso);
    // resetTable();
    // writeCreateTable(tableListRimborso);
    // undisableForm();
}

export function jsonToArray(obj, month, refundList) {
    obj.map(value => {
        Object.keys(value).map(item => {
            if (item != "id" && item != "userId") {
                let tableDate = value[item].dateRefund.match('[0-9]{4}[-][0-9]{2}');
                if (month == tableDate) {
                    // value[item].primaryKey = primaryKey++;
                    refundList.push(value[item]);
                }    
            }
        })
    })
}

export async function SubmitMonthMock() {
    console.log("%c SUBMIT IS STARTING ","background-color:brown;color:white;font-size:16px;")
    idArray = await getIdByMonthMock();
    await deleteMockByUserId(idArray)
    idArray = [];
    await postTable();
}

export async function getIdByMonthMock() {
    console.log("%c GETTING primaryKey ","background-color:red;color:white;font-size:16px;")

    await fetch(mockLinkSpesa(userId),{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => idMonthSelected(data))
    .catch(error => console.log(error));
    console.log("primaryKey TO DELETE : ")
    console.log(idArray)
    return idArray;
}

export async function idMonthSelected(obj) {
    let yearMonth = document.getElementById("inputMonth").value
    console.log(yearMonth)
    obj.filter(value => {
        let tableDate = value[0].date.match('[0-9]{4}[-][0-9]{2}');
        if (tableDate == yearMonth) {
            idArray.push(value.primaryKey)
        }
    })
}

export async function deleteMockByUserId(idArray) {
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

export async function postTable() {
    // let tableIsEmpty = sumImporto == 0;
    // if(!tableIsEmpty) {
    //     console.log("%c POSTING ","background-color:white;color:black;font-size:16px;")
    //     await fetch(mockLinkSpesa(userId),{
    //         method: "POST",
    //         body: JSON.stringify(tableListRimborso),
    //         headers: {"Content-type": "application/json; charset=UTF-8"}
    //     })
    //     .then(response => response.json())
    //     .then(data => {console.log(data); console.log("NUOVO primaryKey " + data.primaryKey)})
    //     .catch(error => console.log(error));
    // } else {
    //     console.log("%c tableIsEmpty","font-size:16px;")
    // }
    console.log("%c SUBMITTING ENDED ","background-color:brown;color:white;font-size:16px;") 
}
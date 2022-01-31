
let currentDataAddQuality = {
    currentId: null,
    dataModalAddQualityContent: [],
    operator: null
}
const getAllInventory = () => {
    //console.log('holaaaa');
    fetch('./getAllInventory', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            'X-CSRF-TOKEN': document.getElementById('_token').value
        }
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                console.log(data);
                currentDataAddQuality.dataModalAddQualityContent = data;
                //pait rows in tableMateriaPrima with data
                let table = document.getElementById('tableMateriaPrima');
                let tbody = table.getElementsByTagName('tbody')[0];
                tbody.innerHTML = '';
                data.forEach(element => {
                    let tr = document.createElement('tr');
                    tr.innerHTML = `
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.typeOfStorage}</td>
                    <td>${element.expirationDate}</td>
                    <td>${element.quantity} Kg</td>
                    <td><button data-bs-toggle="modal" data-bs-target="#modalObservations" class="btn btn-primary" onclick="showObservation(${element.id})" title="Ver historial"><img src="img/icos/list-check.svg"></button></td>
                    <td>
                        <button data-bs-toggle="modal" data-bs-target="#modalAddQuality" class="btn btn-light" onclick="chargeDataRawMaterialsById(${element.id},'+')" title="Añadir de este producto"><img src="img/icos/plus-circle.svg"></button>
                        <button data-bs-toggle="modal" data-bs-target="#modalAddQuality" class="btn btn-light" onclick="chargeDataRawMaterialsById(${element.id},'-')" title="Retirar de este producto"><img src="img/icos/dash-circle.svg"></button>
                        <button class="btn btn-danger" onclick="showModalAddById(${element.id})" title="Desabilitar este producto"><img src="img/icos/archive-fill.svg"></button>
                    </td>
                    `;
                    tbody.appendChild(tr);
                });


            }
        });
}

const chargeDataRawMaterialsById = (id, operator) => {
    //console.log(id);
    currentDataAddQuality.currentId = id;
    currentDataAddQuality.operator = operator;
    let modal = document.querySelector('#modalAddQualityContent>div');
    let modalTitle = document.querySelector('#modalAddQuality>div>div>div>h5');
    if (operator == '+') {
        modalTitle.innerText = 'Ingreso de cantidad';
    } else {
        modalTitle.innerText = 'Retiro de cantidad';
    }
    let element = currentDataAddQuality.dataModalAddQualityContent.find(element => element.id == id);
    modal.innerHTML = `
    <div class="input-group-text">${element.id}</div>
    <div class="input-group-text">${element.name}</div>
    <div class="input-group-text">${element.typeOfStorage}</div>
    <div class="input-group-text">${element.quantity} Kg</div>
    `;
}
const saveQuantity = () => {
    if (currentDataAddQuality.currentId != null && document.getElementById('inputQuality').value != '') {
        fetch('./saveQuantityById', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json',
                //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                'X-CSRF-TOKEN': document.getElementById('_token').value
            },
            body: JSON.stringify({
                id: currentDataAddQuality.currentId,
                quantity: document.getElementById('inputQuality').value,
                operator: currentDataAddQuality.operator,
                concept: document.getElementById('inputConcept').value
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    let btnModalClose = document.getElementById('btnModalAddQualityClose');
                    btnModalClose.click();
                    document.getElementById('messageSuccessText').innerText = data.success;
                    document.getElementById('messageSuccess').classList.remove('d-none');
                    getAllInventory();
                    setTimeout(() => {
                        document.getElementById('messageSuccess').classList.add('d-none');

                    }, 3000);
                }
            });
    } else {
        alert('Ingrese una cantidad valida');
    }
}

const showObservation = (id) => {
    let observations = currentDataAddQuality.dataModalAddQualityContent.find(element => element.id == id).observation;
    let modal = document.querySelector('#modalObservationsContent>div>table tbody');
    modal.innerHTML = '';
    observations.forEach(item => {
        let tr = document.createElement('tr');
        element = JSON.parse(item.description);
        tr.innerHTML = `
    <td>
    <div>${item.id}</div>
    <div>${element.description}</div>
    <div>${element.quantity} Kg</div>
    </td>
    `;
        modal.appendChild(tr);
    });
}

const saveNewQuantity = () => {
    fetch('./saveNewQuantity', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            'X-CSRF-TOKEN': document.getElementById('_token').value
        },
        body: JSON.stringify({
            name: document.getElementById('inputNewName').value,
            description: document.getElementById('inputNewDescription').value,
            typeOfStorage: document.getElementById('inputNewTypeOfStorage').value,
            expirationDate: document.getElementById('inputNewDate').value
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                let btnModalClose = document.getElementById('btnModalAddNewQualityClose');
                btnModalClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                getAllInventory();
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
            }
        });

}
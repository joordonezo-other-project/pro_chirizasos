
let currentDataAddQuality = {
    currentId: null,
    dataModalAddQualityContent: [],
    operator: null
}

let currentNewProduct = {
    reference: null,
    name: null,
    description: null,
    productsFormulation: [],
    wrapper: null,
    typeOfStorage: null,
}

let tempListProductFormulation = [];

let tempReference = [];

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

const searchProductByName = () => {
    let value = document.getElementById('productNameSearch').value;
    if (value.length > 2) {
        fetch('./searchProductByName', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.getElementById('_token').value
            },
            body: JSON.stringify({
                name: value
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    tempListProductFormulation = data;
                    //draw in listProductNameSearch
                    let listProductNameSearch = document.querySelector('#listProductNameSearch');
                    listProductNameSearch.innerHTML = '';
                    data.forEach(item => {
                        let li = document.createElement('li');
                        li.classList.add('list-group-item');
                        li.innerHTML = `
                        <a onclick="addProductNameSearch(${item.id})">${item.name} <img src="img/icos/plus-circle.svg"> </a>
                        `;
                        listProductNameSearch.appendChild(li);
                    });
                }
            });
    }
}

const addProductNameSearch = (id) => {
    let item = tempListProductFormulation.find(element => element.id == id);
    let listProductFormulation = document.querySelector('#listProductFormulation');
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
    <div class="input-group">
    <span class="input-group-text">
    <div class="form-group">
    <a onclick="removeProductNameSearch(${item.id})">${item.name}
    <img src="img/icos/dash-circle.svg">
    </a>
    </div>
    </span>
    <input type="number" class="form-control mb-2" id="valueProductFormulation${item.id}" value="0" required>
    <span class="input-group-text"> Kg</span>
    </div>`;
    listProductFormulation.appendChild(li);
    currentNewProduct.productsFormulation.push(item);
}

const removeProductNameSearch = (id) => {
    let listProductFormulation = document.querySelector('#listProductFormulation');
    let item = currentNewProduct.productsFormulation.find(element => element.id == id);
    let index = currentNewProduct.productsFormulation.indexOf(item);
    currentNewProduct.productsFormulation.splice(index, 1);
    listProductFormulation.removeChild(listProductFormulation.lastChild);

}

const saveNewProduct = () => {
    fetch('./saveNewProduct', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('_token').value
        },
        body: JSON.stringify({
            reference: document.getElementById('inputNewProductReference').value,
            name: document.getElementById('inputNewProductName').value,
            description: document.getElementById('inputNewProductDescription').value,
            formulation: getProductFormulationWithValue(),
            wrapper: document.getElementById('inputNewProductWrapper').value,
            typeOfStorage: document.getElementById('inputNewProductTypeOfStorage').value,


        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                let btnModalClose = document.getElementById('btnModalAddNewProductClose');
                btnModalClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
            }
        });

}

const getProductFormulationWithValue = () => {
    let listProducts = [];
    currentNewProduct.productsFormulation.forEach(item => {
        let itemTemp = {
            idInventory: item.id,
            quantity: document.getElementById(`valueProductFormulation${item.id}`).value,
            units: 'kg'
        }
        listProducts.push(itemTemp);
    });
    return listProducts;
}

const getAllProductReference = () => {
    fetch('./getAllProductReference', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('_token').value
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                tempReference = data;
                //draw inputs group in modalAddPE
                let modalAddPEBodyTable = document.querySelector('#modalAddPE .modal-body table tbody');
                modalAddPEBodyTable.innerHTML = '';
                data.forEach(item => {
                    let tr = document.createElement('tr');
                    tr.innerHTML = `
                    <td>
                    ${item.id}
                    </td>
                    <td>${item.reference}</td>
                    <td><input id="valuePE${item.id}" type="number" class="form-control" value="0"></td>
                    `;
                    modalAddPEBodyTable.appendChild(tr);
                });
            }
        });

}

const saveNewPE = () => {
let productionPE = [];
    tempReference.forEach(item => {
        let itemTemp = {
            idProduct: item.id,
            estimatedProduction: Number(document.getElementById(`valuePE${item.id}`).value),
            realProduction: 0,
            dateOfProduction: document.getElementById('inputDateProduction').value,
        }
        productionPE.push(itemTemp);
    });
    console.log(productionPE);
    fetch('./saveNewPE', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('_token').value
        },
        body: JSON.stringify({
            productionPE: productionPE,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                let btnModalClose = document.getElementById('btnModalAddPEClose');
                btnModalClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
            }
        });

}


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
let tempProviders = [];
let tempStock = [];
let orderDetails = [];
let tempOrders = [];

const getAllInventory = () => {
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

const getAllProductReference = (dateByDay) => {
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
            if (!data.error) {
                tempReference = data;
                document.getElementById('inputDateProductionPE').value = dateByDay;
                document.getElementById('inputDateProductionPR').value = dateByDay;
                //draw inputs group in modalAddPE
                let modalAddPEBodyTable = document.querySelector('#modalAddPE .modal-body table tbody');
                let modalAddPRBodyTable = document.querySelector('#modalAddPR .modal-body table tbody');
                modalAddPEBodyTable.innerHTML = '';
                modalAddPRBodyTable.innerHTML = '';
                data.forEach(item => {
                    let tr = document.createElement('tr');
                    let tr2 = document.createElement('tr');
                    tr.innerHTML = `
                    <td>
                    ${item.id}
                    </td>
                    <td>${item.reference}</td>
                    <td><input id="valuePE${item.id}" type="number" class="form-control" value="0"></td>
                    `;
                    tr2.innerHTML = `
                    <td>
                    ${item.id}
                    </td>
                    <td>${item.reference}</td>
                    <td><input id="valuePR${item.id}" type="number" class="form-control" value="0"></td>
                    `;
                    modalAddPEBodyTable.appendChild(tr);
                    modalAddPRBodyTable.appendChild(tr2);
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
            dateOfProduction: document.getElementById('inputDateProductionPE').value,
        }
        productionPE.push(itemTemp);
    });
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
            if (!data.error) {
                let btnModalClose = document.getElementById('btnModalAddPEClose');
                btnModalClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
                updateCalendar();
            }
        });

}
function getCalendarStart(dayOfWeek, currentDate) {
    var date = currentDate - 1;
    var startOffset = (date % 7) - dayOfWeek;
    if (startOffset > 0) {
        startOffset -= 7;
    }
    return Math.abs(startOffset);
}

const updateCalendar = async () => {

    let currentDate = new Date();
    let firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let neutralDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let day = firstDate.getUTCDay();
    let date = firstDate.getUTCDate();
    let dayOfWeek = getCalendarStart(day, date);
    let tableCalendar = document.querySelector('#tableProduction tbody');
    tableCalendar.innerHTML = '';
    let currenDay = 0;
    let currentProduction = await getProductionByMonth(currentDate.getFullYear(), (currentDate.getMonth() + 1));

    for (i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        for (j = 0; j < 7; j++) {
            let td = document.createElement('td');
            if ((i == 0 && j > dayOfWeek - 1) || (i > 0 && neutralDate.getDate() > currenDay)) {
                currenDay++;
                let dateByDay = getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currenDay);
                let prodTotal = currentProduction.find(item => item.dateOfProduction == dateByDay);
                td.innerHTML = `
                                        <div class="container">
                                            <span class="badge bg-light text-dark">${dateByDay}</span>
                                            <div class="input-group-sm mb-2"><span class="input-group-text"><b>Estimada:
                                                    </b> ${prodTotal ? prodTotal.pe : 0} Kg</span></div>
                                            <div class="input-group-sm mb-2"><span class="input-group-text"><b>Real: </b>
                                            ${prodTotal ? prodTotal.pr : 0} Kg</span></div>
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-primary" onclick="getAllProductReference('${dateByDay}')" data-bs-toggle="modal" data-bs-target="#modalAddPE" class="btn btn-primary mb-2"
                                            title="Añadir nuevo producto">PE <img
                                                    src="img/icos/plus-circle.svg"></button>
                                            <button class="btn btn-secondary" onclick="getAllProductReference('${dateByDay}')"  data-bs-toggle="modal" data-bs-target="#modalAddPR" class="btn btn-primary mb-2">PR <img
                                                    src="img/icos/plus-circle.svg"></button>
                                        </div>
            `;
            }
            tr.appendChild(td);
        }
        tableCalendar.appendChild(tr);
    }

}

const getDateFormat = (year, month, day) => {
    //dateFormat yyyy-MM-dd
    return `${year}-${(month + 1) > 9 ? (month + 1) : '0' + (month + 1)}-${day > 9 ? day : '0' + day}`;
}

const getProductionByMonth = (year, month) => {

    return fetch('./getProductionByMonth', {
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
            month: month,
            year: year,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                return data;
            }
        });
}

const saveNewPR = () => {
    let productionPR = [];
    tempReference.forEach(item => {
        let itemTemp = {
            idProduct: item.id,
            realProduction: Number(document.getElementById(`valuePR${item.id}`).value),
            dateOfProduction: document.getElementById('inputDateProductionPR').value,
        }
        productionPR.push(itemTemp);
    });
    fetch('./saveNewPR', {
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
            productionPR: productionPR,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                let btnModalClose = document.getElementById('btnModalAddPRClose');
                btnModalClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
                updateCalendar();
            }
        });

}

const getAllProviders = () => {
    fetch('./getAllProviders', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('_token').value
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                tempProviders = data;
                let tableProviders = document.querySelector('#tableProviders tbody');
                tableProviders.innerHTML = '';
                data.forEach(item => {
                    let tr = document.createElement('tr');
                    let statusConfig = {};
                    if (item.status == 'active') {
                        statusConfig = {

                            class: 'btn btn-light',
                            title: 'Inactivar Proveedor',
                            ico: 'img/icos/lock.svg',
                        }
                    } else {
                        statusConfig = {

                            class: 'btn btn-danger',
                            title: 'Activar Proveedor',
                            ico: 'img/icos/unlock.svg',
                        }
                    }
                    tr.innerHTML = `
                                        <td>${item.id}</td>
                                        <td>${item.name}</td>
                                        <td>${item.address}</td>
                                        <td>${item.phone}</td>
                                        <td>${item.nit}</td>
                                        <td><a href="${item.webPage}" target="_blank">${item.webPage}</a></td>
                                        <td>${item.dateOfVinculation}</td>
                                        <td>
                                        <button data-bs-toggle="modal" data-bs-target="#modalEditProvider" class="btn btn-light" onclick="editProviderById(${item.id})" title="Editar Proveedor"><img src="img/icos/pen.svg"></button>
                                        <button class="${statusConfig.class}" onclick="changeStatusProviderById(${item.id})" title="${statusConfig.title}"><img src="${statusConfig.ico}"></button>
                                        </td>
                    `;
                    tableProviders.appendChild(tr);
                });
            }
        });
}

const editProviderById = (id) => {
    let currentProvider = tempProviders.find(item => item.id == id);
    document.getElementById('idEditProvider').value = currentProvider.id;
    document.getElementById('nameEditProvider').value = currentProvider.name;
    document.getElementById('addressEditProvider').value = currentProvider.address;
    document.getElementById('phoneEditProvider').value = currentProvider.phone;
    document.getElementById('nitEditProvider').value = currentProvider.nit;
    document.getElementById('webPageEditProvider').value = currentProvider.webPage;
    document.getElementById('dateOfVinculationEditProvider').value = currentProvider.dateOfVinculation;

}

const changeStatusProviderById = (id) => {
    let status = tempProviders.find(item => item.id == id).status;
    if (status == 'active') {
        status = 'inactive';
    } else {
        status = 'active';
    }
    fetch('./changeStatusProviderById', {
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
            id: id,
            status: status,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
                getAllProviders();
            }
        });
}

const saveEditProvider = () => {
    fetch('./saveEditProvider', {
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
            id: document.getElementById('idEditProvider').value,
            name: document.getElementById('nameEditProvider').value,
            address: document.getElementById('addressEditProvider').value,
            phone: document.getElementById('phoneEditProvider').value,
            nit: document.getElementById('nitEditProvider').value,
            webPage: document.getElementById('webPageEditProvider').value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                let btnModalClose = document.getElementById('btnModalEditProviderClose');
                btnModalClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
                getAllProviders();
            }
        });

}

const saveAddProvider = () => {
    fetch('./saveAddProvider', {
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
            name: document.getElementById('nameAddProvider').value,
            address: document.getElementById('addressAddProvider').value,
            phone: document.getElementById('phoneAddProvider').value,
            nit: document.getElementById('nitAddProvider').value,
            webPage: document.getElementById('webPageAddProvider').value,
            dateOfVinculation: document.getElementById('dateOfVinculationAddProvider').value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                let btnModalClose = document.getElementById('btnModalAddProviderClose');
                btnModalClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);
                getAllProviders();
            }
        });

}

const getStock = () => {
    fetch('./getStock', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('_token').value
        },
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                console.log(data);
                tempStock = data;
                let currentDate = new Date();
                document.getElementById('orderDate').value = getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            }
        });
}

const searchProductSellByName = () => {
    let search = document.getElementById('productReferenceSearch').value;
    let listProductNameSearchSell = document.getElementById('listProductNameSearchSell');
    let copyTempStock = [...tempStock];
    let productAvailables = copyTempStock.filter(item => item.reference.toLowerCase().includes(search.toLowerCase()));
    listProductNameSearchSell.innerHTML = '';
    if (productAvailables) {
        productAvailables.forEach(item => {
            listProductNameSearchSell.innerHTML = `
            <li class="list-group-item">
            <div class="input-group">
            <span class="input-group-text">${item.reference}</span>
            <span class="input-group-text">${item.name}</span>
            <input id="quantityOrder${item.id}" type="number" class="form-control"  value="0"  max="${item.units}">
            <input id="description${item.id}" type="text" class="form-control" placeholder="Descripción">
            <button class="btn btn-primary mb-2" onclick="addProductSell('${item.id}')">Agregar <img src="img/icos/plus-circle.svg"></button>
            </div>
            </li>
            `;
        });
    } else {
        listProductNameSearchSell.innerHTML = `
        <li class="list-group-item">No se encontraron productos</li>
        `;
    }
}

const refreshOrderDetails = () => {
    let orderDetailsTable = document.querySelector('#orderDetailsTable tbody');
    orderDetailsTable.innerHTML = '';
    let total = 0;
    orderDetails.forEach(item => {
        total += item.value;
        let product = tempStock.find(pro => pro.id == item.id);
        orderDetailsTable.innerHTML += `
        <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.reference}</td>
        <td>${item.quantity}</td>
        <td>${item.description}</td>
        <td>$ ${item.value}</td>
        <td><button class="btn btn-danger" onclick="deleteOrderDetail('${item.id}')"><img src="img/icos/trash2.svg"></button></td>
        </tr>
        `;
    });
    orderDetailsTable.innerHTML += `
    <tr>
    <td colspan="5" class="text-right fw-bold">Total</td>
    <td>$ ${total}</td>
    <td></td>
    </tr>
    `;
}

const addProductSell = (id) => {
    let product = tempStock.find(item => item.id == id);
    orderDetails.push({
        id: id,
        quantity: document.getElementById(`quantityOrder${id}`).value,
        idProduct: product.idProduct,
        description: document.getElementById(`description${id}`).value,
        value: product.priceByUnit * document.getElementById(`quantityOrder${id}`).value
    });
    refreshOrderDetails();
}
const deleteOrderDetail = (id) => {
    orderDetails = orderDetails.filter(item => item.id != id);
    refreshOrderDetails();
}

const saveOrder = () => {
    if (orderDetails.length > 0) {
        fetch('./saveOrder', {
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
                nameClientOrder: document.getElementById('nameClientOrder').value,
                deliveryDate: document.getElementById('deliveryDate').value,
                orderDate: document.getElementById('orderDate').value,
                description: document.getElementById('descriptionOrder').value,
                orderDetails: orderDetails,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    let btnModalClose = document.getElementById('btnModalAddOrderSellClose');
                    btnModalClose.click();
                    document.getElementById('messageSuccessText').innerText = data.success;
                    document.getElementById('messageSuccess').classList.remove('d-none');
                    setTimeout(() => {
                        document.getElementById('messageSuccess').classList.add('d-none');

                    }, 3000);
                    getAllOrders();
                }
            });
    } else {

        document.getElementById('messageSuccessText').innerText = 'No se puede guardar una orden sin productos';
        document.getElementById('messageSuccess').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('messageSuccess').classList.add('d-none');

        }, 3000);
    }


}

const getAllOrders = () => {
    fetch('./getAllOrders', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.getElementById('_token').value
        },
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                console.log(data);
                tempOrders = data;
                let ordersTable = document.querySelector('#allOrdesTable tbody');
                ordersTable.innerHTML = '';
                data.forEach(item => {
                    let status = '';
                    if (item.status == 'created') {
                        status = 'Creada';
                    } else if (item.status == 'delivered') {
                        status = 'Entregada';
                    } else if (item.status == 'canceled') {
                        status = 'Cancelada';
                    }
                    ordersTable.innerHTML += `
                    <tr>
                    <td>${item.id}</td>
                    <td>${item.nameClient}</td>
                    <td>${item.deliveryDate}</td>
                    <td>${item.orderDate}</td>
                    <td>${item.comments}</td>
                    <td>${status}</td>
                    <td>
                    <button data-bs-toggle="modal" data-bs-target="#modalOrderDetails"  class="btn btn-primary" onclick="getOrderDetailsById('${item.id}')"><img src="img/icos/eye.svg"></button>
                    </td>
                    </tr>
                    `;
                });
            }
        });
}

const getOrderDetailsById = (id) => {
    fetch('./getOrderDetailsById', {
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
            id: id
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                console.log(data);
                let orderDetailsTable = document.querySelector('#detailsOrderTableView tbody');
                orderDetailsTable.innerHTML = '';
                let total = 0;
                data.forEach(item => {
                    total += item.value;
                    orderDetailsTable.innerHTML += `
                    <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.reference}</td>
                    <td>${item.quantity}</td>
                    <td>${item.description}</td>
                    <td>$ ${item.value}</td>
                    </tr>
                    `;
                });
                orderDetailsTable.innerHTML += `
                <tr>
                <td colspan="5" class="text-right fw-bold">Total</td>
                <td>$ ${total}</td>
                <td></td>
                </tr>
                `;
            }
        });
}

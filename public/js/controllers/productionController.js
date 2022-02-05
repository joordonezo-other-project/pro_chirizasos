const searchProductByName = () => {
    let value = document.getElementById('productNameSearch').value;
    let listProductNameSearch = document.querySelector('#listProductNameSearch');
    listProductNameSearch.innerHTML = '';
    if (value.length > 0) {
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
    let currentDate = new Date();
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
            priceByUnit: document.getElementById('inputNewProductPriceByUnit').value,
            weightPerUnit: document.getElementById('inputNewProductWeightPerUnit').value,
            lastUpdate: getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),


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
                let inputDateProductionPE = document.getElementById('inputDateProductionPE');
                if (inputDateProductionPE)
                    inputDateProductionPE.value = dateByDay;
                document.getElementById('inputDateProductionPR').value = dateByDay;
                //draw inputs group in modalAddPE
                let modalAddPEBodyTable = document.querySelector('#modalAddPE .modal-body table tbody');
                let modalAddPRBodyTable = document.querySelector('#modalAddPR .modal-body table tbody');
                if (modalAddPEBodyTable)
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
                    if (modalAddPEBodyTable)
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


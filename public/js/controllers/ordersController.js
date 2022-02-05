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
        quantity: Number(document.getElementById(`quantityOrder${id}`).value),
        idProduct: product.idProduct,
        description: document.getElementById(`description${id}`).value || '',
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
                description: document.getElementById('descriptionOrder').value || '',
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
                    <td>${item.orderDate}</td>
                    <td>${item.deliveryDate}</td>
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


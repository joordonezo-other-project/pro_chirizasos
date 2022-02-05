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


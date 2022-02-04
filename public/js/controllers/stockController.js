const getAllStock = () => {
    fetch('./getAllStock', {
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
                tempAllStock = data;
                let stockTable = document.querySelector('#stockTable tbody');
                stockTable.innerHTML = '';
                data.forEach(item => {
                    stockTable.innerHTML += `
                    <tr>
                    <td>${item.id}</td>
                    <td>${item.reference}</td>
                    <td>${item.name}</td>
                    <td>${item.units}</td>
                    <td>${item.lastUpdate}</td>
                    <td>$ ${item.priceByUnit}</td>
                    <td>${item.weightPerUnit} Kg</td>
                    <td>
                    <button data-bs-toggle="modal" data-bs-target="#modalEditStock" class="btn btn-primary" onclick="editStock('${item.id}')"><img src="img/icos/pen.svg"></button>
                    </td>
                    </tr>
                    `;
                });
            }
        });
}

const editStock = (id) => {
    let stock = tempAllStock.find(item => item.id == id);
    document.getElementById('idStock').value = stock.id;
    document.getElementById('referenceStock').value = stock.reference;
    document.getElementById('nameStock').value = stock.name;
    document.getElementById('priceByUnitStock').value = stock.priceByUnit;
    document.getElementById('weightPerUnitStock').value = stock.weightPerUnit;
}

const saveEditStock = () => {
    fetch('./saveEditStock', {
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
            id: document.getElementById('idStock').value,
            priceByUnit: document.getElementById('priceByUnitStock').value,
            weightPerUnit: document.getElementById('weightPerUnitStock').value
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                console.log(data);
                let btnModalEditStockClose = document.getElementById('btnModalEditStockClose');
                btnModalEditStockClose.click();
                document.getElementById('messageSuccessText').innerText = data.success;
                document.getElementById('messageSuccess').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('messageSuccess').classList.add('d-none');

                }, 3000);

                getAllStock();
            }
        });

}
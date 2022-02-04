<button data-bs-toggle="modal" data-bs-target="#modalAddNewProduct" class="btn btn-primary mb-2"
    title="Añadir nuevo producto">Nuevo Producto <img src="img/icos/plus-circle.svg"></button>

@include('productionsTemplates.modals.modalAddNewProduct')

<table class="table" id="tableProduction">
    <caption>Tabla Producción</caption>
    <thead class="table-light">
        <tr>
            <th scope="col" class="text-center">DO</th>
            <th scope="col" class="text-center">LU</th>
            <th scope="col" class="text-center">MA</th>
            <th scope="col" class="text-center">MI</th>
            <th scope="col" class="text-center">JU</th>
            <th scope="col" class="text-center">VI</th>
            <th scope="col" class="text-center">SA</th>
        </tr>
    </thead>
    <tbody>
        <!--By js controller-->
    </tbody>
</table>


@include('productionsTemplates.modals.modalAddPE')

@include('productionsTemplates.modals.modalAddPR')

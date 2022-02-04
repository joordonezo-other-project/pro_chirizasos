<button data-bs-toggle="modal" data-bs-target="#modalAddNewQuality" class="btn btn-primary mb-2"
    title="Añadir nuevo producto">Nuevo Producto <img src="img/icos/plus-circle.svg"></button>

@include('inventoriesTemplates.modals.modalAddNewQuality')

<table class="table" id="tableMateriaPrima">
    <caption>Tabla de Materia prima</caption>
    <thead class="table-light">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Tipo de Almacenamiento</th>
            <th scope="col">Fecha vencimiento</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Observaciones</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody>
        <!--to-do from javaScript controller-->
    </tbody>
</table>

@include('inventoriesTemplates.modals.modalAddQuality')

@include('inventoriesTemplates.modals.modalObservations')

<button data-bs-toggle="modal" data-bs-target="#modalAddProvider" class="btn btn-primary mb-2"
    title="Añadir nuevo proveedor">Nuevo Proveedor <img src="img/icos/plus-circle.svg"></button>

<table class="table" id="tableProviders">
    <caption>Tabla de Proveedores</caption>
    <thead class="table-light">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Telefóno</th>
            <th scope="col">Nit</th>
            <th scope="col">Página Web</th>
            <th scope="col">Fecha vinculación</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody>
        <!--to-do from javaScript controller-->
    </tbody>
</table>

@include('providersTemplates.modals.modalEditProvider')


@include('providersTemplates.modals.modalAddProvider')
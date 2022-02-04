<button data-bs-toggle="modal" data-bs-target="#modalAddOrderSell" class="btn btn-primary mb-2"
    title="Añadir nuevo proveedor" onclick="getStock()">Nuevo Pedido (Venta) <img
        src="img/icos/plus-circle.svg"></button>


@include('ordersTemplates.modals.modalAddOrderSell')

<table class="table" id="allOrdesTable">
    <caption>Pedidos</caption>
    <thead class="table-light">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha Pedido</th>
            <th scope="col">Fecha entrega</th>
            <th scope="col">Comentarios</th>
            <th scope="col">Estado</th>
            <th scope="col">Detalle de Pedido</th>
        </tr>
    </thead>
    <tbody>
        <!--to-do from javaScript controller-->
    </tbody>
</table>
@include('ordersTemplates.modals.modalOrderDetails')

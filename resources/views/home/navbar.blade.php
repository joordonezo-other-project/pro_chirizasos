<ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
            type="button" role="tab" aria-controls="pills-home" aria-selected="true">Inicio</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-production-tab" data-bs-toggle="pill" data-bs-target="#pills-production"
            type="button" role="tab" aria-controls="pills-production" aria-selected="false"
            onclick="updateCalendar()">Producción</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-inventory-tab" data-bs-toggle="pill" data-bs-target="#pills-inventory"
            type="button" role="tab" aria-controls="pills-inventory" aria-selected="false"
            onclick="getAllInventory()">Insumos</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-stock-tab" data-bs-toggle="pill" data-bs-target="#pills-stock"
            type="button" role="tab" aria-controls="pills-stock" aria-selected="false"
            onclick="getAllStock()">Inventario</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-providers-tab" data-bs-toggle="pill" data-bs-target="#pills-providers"
            type="button" role="tab" aria-controls="pills-providers" aria-selected="false"
            onclick="getAllProviders()">Proveedores</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-delivery-tab" data-bs-toggle="pill" data-bs-target="#pills-delivery"
            type="button" role="tab" aria-controls="pills-delivery" aria-selected="false"
            onclick="getAllOrders()">Pedidos</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-distribuitors-tab" data-bs-toggle="pill"
            data-bs-target="#pills-distribuitors" type="button" role="tab" aria-controls="pills-distribuitors"
            aria-selected="false">Distribuidores</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-reports-tab" data-bs-toggle="pill" data-bs-target="#pills-reports"
            type="button" role="tab" aria-controls="pills-reports" aria-selected="false">Reportes</button>
    </li>
</ul>

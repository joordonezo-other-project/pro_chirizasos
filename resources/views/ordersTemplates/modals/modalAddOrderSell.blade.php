<!-- Modal -->
<div class="modal fade" id="modalAddOrderSell" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nueva Venta</h5>
                <button id="btnModalAddOrderSellClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-md-8 mx-auto">
                    <div class="input-group justify-content-center">
                        <div class="row mb-3">
                            <label for="deliveryDate"
                                class="col-md-4 col-form-label text-md-end">{{ __('Fecha Entrega') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="deliveryDate" type="date" class="form-control" autofocus required>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="orderDate"
                                class="col-md-4 col-form-label text-md-end">{{ __('Fecha Pedido') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="orderDate" type="date" class="form-control" autofocus disabled
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="nameClientOrder"
                                class="col-md-4 col-form-label text-md-end">{{ __('Nombre Cliente') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="nameClientOrder" type="text" class="form-control" autofocus required>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="cantidad"
                                class="col-md-4 col-form-label text-md-end">{{ __('Referencia') }}</label>
                            <div class="col-md-12">
                                <div class="input-group">
                                    <ul id="listProductNameSearchSell" class="list-group  col-md-12 mb-2"></ul>
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text"><img src="img/icos/search.svg"></span>
                                    <input id="productReferenceSearch" type="text" class="form-control"
                                        placeholder="Referencia" onkeypress="searchProductSellByName()">
                                </div>
                                <div class="input-group">
                                    <table class="table" id="orderDetailsTable">
                                        <caption>Detalle de Pedido</caption>
                                        <thead class="table-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Referencia</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Sub Total</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!--to-do from javaScript controller-->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="descriptionOrder"
                                class="col-md-4 col-form-label text-md-end">{{ __('Comentarios') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="descriptionOrder" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveOrder()">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalAddNewProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
                <button id="btnModalAddNewProductClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Referencia') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewProductReference" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewProductName" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Descripción') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewProductDescription" type="text" class="form-control" required
                                autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Formulación') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <ul id="listProductNameSearch" class="list-group"></ul>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text"><img src="img/icos/search.svg"></span>
                            <input id="productNameSearch" type="text" class="form-control"
                                placeholder="Nombre producto" onkeypress="searchProductByName()">
                        </div>
                        <div class="input-group">
                            <ul id="listProductFormulation" class="list-group"></ul>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="concepto" class="col-md-4 col-form-label text-md-end">{{ __('Empaque') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewProductWrapper" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad"
                        class="col-md-4 col-form-label text-md-end">{{ __('Tipo de alacenamiento') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <select id="inputNewProductTypeOfStorage" class="form-control">
                                <option value="Refrigerado">Refrigerado</option>
                                <option value="Congelado">Congelado</option>
                                <option value="Seco">Seco</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputNewProductPriceByUnit"
                        class="col-md-4 col-form-label text-md-end">{{ __('Precio por Unidad') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewProductPriceByUnit" type="number" value="1" class="form-control"
                                required autofocus>

                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputNewProductWeightPerUnit"
                        class="col-md-4 col-form-label text-md-end">{{ __('Peso Por Unidad') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewProductWeightPerUnit" type="number" value="0.001" class="form-control"
                                required autofocus>
                            <span class="input-group-text">Kg</span>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveNewProduct()">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modalEditStock" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Precio y Cantidad</h5>
                <button id="btnModalEditStockClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3 ">
                    <div class="input-group justify-content-center">
                        <div class="row mb-3">
                            <label for="referenceStock"
                                class="col-md-4 col-form-label text-md-end">{{ __('Referencia') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="referenceStock" type="text" class="form-control" disabled autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="idStock" class="col-md-4 col-form-label text-md-end">{{ __('Id') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="idStock" type="text" class="form-control" autofocus disabled>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="nameStock"
                                class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="nameStock" type="text" class="form-control" autofocus disabled>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="priceByUnitStock"
                                class="col-md-4 col-form-label text-md-end">{{ __('Precio Por Unidad') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="priceByUnitStock" type="number" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="weightPerUnitStock"
                                class="col-md-4 col-form-label text-md-end">{{ __('Peso Por Unidad') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="weightPerUnitStock" type="number" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="saveEditStock()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</div>

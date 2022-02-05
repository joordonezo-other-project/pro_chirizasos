<!-- Modal -->
<div class="modal fade" id="modalAddNewQuality" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
                <button id="btnModalAddNewQualityClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewName" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Descripción') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewDescription" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad"
                        class="col-md-4 col-form-label text-md-end">{{ __('Tipo de Almacenamiento') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <select id="inputNewTypeOfStorage" class="form-control">
                                <option value="Refrigerado">Refrigerado</option>
                                <option value="Congelado">Congelado</option>
                                <option value="Seco">Seco</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="concepto"
                        class="col-md-4 col-form-label text-md-end">{{ __('Fecha vencimiento') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewDate" type="date" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveNewQuantity()">Guardar</button>
            </div>
        </div>
    </div>
</div>

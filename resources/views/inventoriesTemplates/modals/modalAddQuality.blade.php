<!-- Modal -->
<div class="modal fade" id="modalAddQuality" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ingreso de cantidad</h5>
                <button id="btnModalAddQualityClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="modalAddQualityContent" class="row mb-3 ">
                    <div class="input-group justify-content-center">
                        <!--by controller-->
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Cantidad') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputQuality" type="number" class="form-control" required autofocus>
                            <span class="input-group-text">Kg</span>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="concepto" class="col-md-4 col-form-label text-md-end">{{ __('Concepto') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputConcept" type="text" class="form-control" autofocus>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveQuantity()">Guardar</button>
            </div>
        </div>
    </div>
</div>

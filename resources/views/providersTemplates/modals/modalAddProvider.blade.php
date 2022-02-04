<!-- Modal -->
<div class="modal fade" id="modalAddProvider" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar proveedor</h5>
                <button id="btnModalAddProviderClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="modalObservationsContent" class="row mb-3 ">
                    <div class="input-group justify-content-center">
                        <div class="row mb-3">
                            <label for="nameAddProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="nameAddProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="addressAddProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Dirección') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="addressAddProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="phoneAddProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Telefóno') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="phoneAddProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="nitAddProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Nit') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="nitAddProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="webPageAddProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Página Web') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="webPageAddProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="dateOfVinculationAddProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Fecha Vinculación') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="dateOfVinculationAddProvider" type="date" class="form-control"
                                        autofocus>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveAddProvider()">Guardar</button>
            </div>
        </div>
    </div>
</div>

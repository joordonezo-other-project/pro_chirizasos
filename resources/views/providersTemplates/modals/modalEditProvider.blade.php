<!-- Modal -->
<div class="modal fade" id="modalEditProvider" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar proveedor</h5>
                <button id="btnModalEditProviderClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="modalObservationsContent" class="row mb-3 ">
                    <div class="input-group justify-content-center">
                        <div class="row mb-3">
                            <label for="idEditProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Id') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="idEditProvider" type="text" class="form-control" disabled autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="nameEditProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="nameEditProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="addressEditProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Dirección') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="addressEditProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="phoneEditProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Telefóno') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="phoneEditProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="nitEditProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Nit') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="nitEditProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="webPageEditProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Página Web') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="webPageEditProvider" type="text" class="form-control" autofocus>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="dateOfVinculationEditProvider"
                                class="col-md-4 col-form-label text-md-end">{{ __('Fecha Vinculación') }}</label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input id="dateOfVinculationEditProvider" type="date" class="form-control"
                                        autofocus disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveEditProvider()">Guardar</button>
            </div>
        </div>
    </div>
</div>

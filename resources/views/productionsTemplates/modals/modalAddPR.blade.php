<!-- Modal -->
<div class="modal fade" id="modalAddPR" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Producción Real</h5>
                <button id="btnModalAddPRClose" type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <input id="inputDateProductionPR" type="date" class="form-control mb-2" value="" required autofocus>
                </div>
                <table class="table">
                    <caption>Producción Real</caption>
                    <thead class="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Referencia</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--to-do from javaScript controller-->
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveNewPR()">Guardar</button>
            </div>
        </div>
    </div>
</div>

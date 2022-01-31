@extends('layouts.app')

@section('content')
<div class="container">
<input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
    <div class="row justify-content-center">
        <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Inicio</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Producción</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onclick="getAllInventory()">Inventario</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-providers-tab" data-bs-toggle="pill" data-bs-target="#pills-providers" type="button" role="tab" aria-controls="pills-providers" aria-selected="false">Proveedores</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-delivery-tab" data-bs-toggle="pill" data-bs-target="#pills-delivery" type="button" role="tab" aria-controls="pills-delivery" aria-selected="false">Pedidos</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-distribuitors-tab" data-bs-toggle="pill" data-bs-target="#pills-distribuitors" type="button" role="tab" aria-controls="pills-distribuitors" aria-selected="false">Distribuidores</button>
        </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">

        <div id="messageSuccess" class="alert alert-success d-flex align-items-center d-none" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
            <div id="messageSuccessText">
                <!--by controller-->
            </div>
          </div>


    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
      1

  </div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
      2
  </div>
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
      3
      <button  data-bs-toggle="modal" data-bs-target="#modalAddNewQuality" class="btn btn-primary mb-2" title="Añadir nuevo producto">Nuevo Producto <img src="img/icos/plus-circle.svg"></button>
      <!-- Modal -->
<div class="modal fade" id="modalAddNewQuality" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
          <button id="btnModalAddNewQualityClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
              <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Tipo de Almacenamiento') }}</label>
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
              <label for="concepto" class="col-md-4 col-form-label text-md-end">{{ __('Fecha vencimiento') }}</label>
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

      <table class="table" id="tableMateriaPrima">
        <caption>Tabla de Materia prima</caption>
        <thead class="table-light">
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Tipo de Almacenamiento</th>
            <th scope="col">Fecha vencimiento</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Observaciones</th>
            <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!--to-do from javaScript controller-->
        </tbody>
        </table>

<!-- Modal -->
<div class="modal fade" id="modalAddQuality" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ingreso de cantidad</h5>
        <button id="btnModalAddQualityClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
  <!-- Modal -->
<div class="modal fade" id="modalObservations" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Historial</h5>
          <button  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="modalObservationsContent" class="row mb-3 ">
              <div class="input-group justify-content-center">
                <table class="table">
                    <caption>Tabla Historial</caption>
                    <thead class="table-light">
                        <tr>
                        <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--to-do from javaScript controller-->
                    </tbody>
                    </table>
              </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
  </div>
  <div class="tab-pane fade" id="pills-providers" role="tabpanel" aria-labelledby="pills-providers-tab">
      4
  </div>
  <div class="tab-pane fade" id="pills-delivery" role="tabpanel" aria-labelledby="pills-delivery-tab">
      5
  </div>
  <div class="tab-pane fade" id="pills-distribuitors" role="tabpanel" aria-labelledby="pills-distribuitors-tab">
      6
  </div>
</div>

        </div>
    </div>
</div>
@endsection

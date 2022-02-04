<div class="tab-content" id="pills-tabContent">

    @include('helpers.messages')

    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

        <iframe src="http://chorizasos.com/" width="100%" height="450" frameborder="0" style="border:0"
            allowfullscreen></iframe>
    </div>
    <div class="tab-pane fade" id="pills-production" role="tabpanel" aria-labelledby="pills-production-tab">
        @include('productionsTemplates.productionPanel')
    </div>
    <div class="tab-pane fade" id="pills-inventory" role="tabpanel" aria-labelledby="pills-inventory-tab">
        @include('inventoriesTemplates.inventoryPanel')
    </div>
    <div class="tab-pane fade" id="pills-stock" role="tabpanel" aria-labelledby="pills-stock-tab">
        @include('stocksTemplates.stockPanel')
    </div>
    <div class="tab-pane fade" id="pills-providers" role="tabpanel" aria-labelledby="pills-providers-tab">
        @include('providersTemplates.providerPanel')
    </div>
    <div class="tab-pane fade" id="pills-delivery" role="tabpanel" aria-labelledby="pills-delivery-tab">
        @include('ordersTemplates.orderPanel')
    </div>
    <div class="tab-pane fade" id="pills-distribuitors" role="tabpanel" aria-labelledby="pills-distribuitors-tab">
        @include('distribuitorsTemplates.distribuitorPanel')
    </div>
    <div class="tab-pane fade" id="pills-reports" role="tabpanel" aria-labelledby="pills-reports-tab">
        @include('reportsTemplates.reportPanel')
    </div>
</div>

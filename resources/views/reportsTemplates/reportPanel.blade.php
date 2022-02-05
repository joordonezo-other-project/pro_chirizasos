<div class="row g-3">
    <div class="col-auto">
        <label for="typeOfReport" class="">Seleccione un Reporte</label>
        <select readonly class="form-control" id="typeOfReport">
            <option value="orders">Pedidos</option>
            <option value="stock">Disponibilidad</option>
            <option value="production">Producción</option>
        </select>
    </div>
    <div class="col-auto">
        <label for="typeOfChart" class="">Tipo Gráfico</label>
        <select readonly class="form-control" id="typeOfChart">
            <option value="bar">Barras</option>
            <option value="pie">Torta</option>
            <option value="line">Linea</option>
            <option value="scatter">Disperción</option>
        </select>
    </div>
    <div class="col-auto">
        <label for="startDate" class="">Fecha Inicio</label>
        <input type="date" class="form-control" id="startDate">
    </div>
    <div class="col-auto">
        <label for="endDate" class="">Fecha Fin</label>
        <input type="date" class="form-control" id="endDate">
    </div>
    <div class="col-auto">
        <button class="btn btn-primary mb-3" onclick="generateReport()">Buscar</button>
    </div>
</div>
<div class="row g-3">
    <canvas id="chart" class="col"></canvas>

</div>

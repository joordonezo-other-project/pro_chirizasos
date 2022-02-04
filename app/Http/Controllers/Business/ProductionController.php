<?php

namespace App\Http\Controllers\Business;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProductionController extends Controller
{
    public function saveNewProduct(Request $request)
    {
        $formulation = $request->formulation;
        $idsFormulation = [];
        foreach ($formulation as $item) {
            $idFormu = DB::table('formulation')->insertGetId([
                'idInventory' => $item['idInventory'],
                'quantity' => $item['quantity'],
                'units' => $item['units'],
            ]);
            array_push($idsFormulation, $idFormu);
        }

        $idProduct = DB::table('product')->insertGetId([
            'reference' => $request->reference,
            'name' => $request->name,
            'description' => $request->description,
            'idsFormulation' => '[' . implode(',', $idsFormulation) . ']',
            'wrapper' => $request->wrapper,
            'typeOfStorage' => $request->typeOfStorage,
        ]);

        DB::table('stock')->insert([
            'idProduct' => $idProduct,
            'units' => 0,
            'lastUpdate' => $request->lastUpdate,
            'priceByUnit' => $request->priceByUnit,
            'weightPerUnit' => $request->weightPerUnit,
        ]);
        return response()->json(['success' => 'Producto agregado correctamente']);

    }

    public function getAllProductReference()
    {
        $product = DB::table('product')->select('id', 'reference')->get();
        return response()->json($product);
    }

    public function saveNewPE(Request $request)
    {
        $productionPE = $request->productionPE;
        $dataFinalProductionPE = [];
        $date = '';
        foreach ($productionPE as $item) {
            $date = $item['dateOfProduction'];
            array_push($dataFinalProductionPE, [
                'idProduct' => $item['idProduct'],
                'estimatedProduction' => $item['estimatedProduction'],
                'realProduction' => $item['realProduction'],
                'dateOfProduction' => $item['dateOfProduction'],
            ]);
        }
        DB::table('production')->insert($dataFinalProductionPE);
        return response()->json(['success' => 'Producción Esperada para la fecha ' . $date . ' agregada correctamente']);

    }

    public function getProductionByMonth(Request $request)
    {
        $month = $request->month;
        $year = $request->year;
        $month = $month > 9 ? $month : '0' . $month;
        $production = DB::table('production')
            ->select('dateOfProduction', DB::raw('SUM(estimatedProduction) as pe'), DB::raw('SUM(realProduction) as pr'))
            ->where('dateOfProduction', 'like', '%' . $year . '-' . $month . '%')
            ->groupBy('dateOfProduction')
            ->get();
        return response()->json($production);
    }

    public function saveNewPR(Request $request)
    {
        $productionPR = $request->productionPR;
        $date = '';
        foreach ($productionPR as $item) {
            $stock = DB::table('stock')
                ->select('units', 'weightPerUnit')
                ->where('idProduct', '=', $item['idProduct'])
                ->get();

            DB::table('stock')
                ->where('idProduct', '=', $item['idProduct'])
                ->update(['units' => ($stock[0]->units + ($item['realProduction'] / $stock[0]->weightPerUnit))]);

            $date = $item['dateOfProduction'];
            DB::table('production')
                ->where('dateOfProduction', '=', $item['dateOfProduction'])
                ->where('idProduct', '=', $item['idProduct'])
                ->update(['realProduction' => $item['realProduction']]);
        }
        return response()->json(['success' => 'Producción Real para la fecha ' . $date . ' agregada correctamente']);

    }
}

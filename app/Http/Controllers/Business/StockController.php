<?php

namespace App\Http\Controllers\Business;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class StockController extends Controller
{
    public function getAllStock()
    {
        $stock = DB::table('stock')
            ->select('product.*', 'stock.*')
            ->join('product', 'stock.idProduct', '=', 'product.id')
            ->get();
        return response()->json($stock);
    }

    public function saveEditStock(Request $request)
    {
        $id = $request->id;
        $priceByUnit = $request->priceByUnit;
        $weightPerUnit = $request->weightPerUnit;
        DB::table('stock')->where('id', $id)->update(
            ['priceByUnit' => $priceByUnit, 'weightPerUnit' => $weightPerUnit]
        );
        return response()->json(['success' => 'Stock actualizado correctamente']);
    }
}

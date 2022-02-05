<?php

namespace App\Http\Controllers\Business;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ReportController extends Controller
{
    public function generateReport(Request $request)
    {
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        if ($request->typeOfReport == 'orders') {
            $orders = DB::table('detailsOrder')
                ->select(
                    'productOrder.orderDate',
                    'productOrder.deliveryDate',
                    'detailsOrder.quantity',
                    'detailsOrder.value',
                    'product.reference')
                ->join('productOrder', 'detailsOrder.idProductOrder', '=', 'productOrder.id')
                ->join('product', 'detailsOrder.idProduct', '=', 'product.id')
                ->whereBetween('productOrder.orderDate', [$startDate, $endDate])
                ->distinct()
                ->get();
            return response()->json($orders);
        } else if ($request->typeOfReport == 'stock') {
            $stock = DB::table('stock')
                ->select('product.reference', 'stock.units', 'stock.lastUpdate')
                ->join('product', 'stock.idProduct', '=', 'product.id')
                ->whereBetween('lastUpdate', [$startDate, $endDate])
                ->get();
            return response()->json($stock);
        } else if ($request->typeOfReport == 'production') {
            $production = DB::table('production')
                ->select('product.reference', 'production.realProduction', 'production.dateOfProduction')
                ->join('product', 'production.idProduct', '=', 'product.id')
                ->whereBetween('dateOfProduction', [$startDate, $endDate])
                ->get();
            return response()->json($production);
        }
    }
}

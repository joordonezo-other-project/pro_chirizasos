<?php

namespace App\Http\Controllers\Business;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class OrdersController extends Controller
{
    public function getStock()
    {
        $stock = DB::table('stock')
            ->select('product.*', 'stock.*')
            ->join('product', 'stock.idProduct', '=', 'product.id')
            ->get();
        return response()->json($stock);
    }

    public function saveOrder(Request $request)
    {
        $idOrder = DB::table('productOrder')->insertGetId(
            ['deliveryDate' => $request->deliveryDate,
                'orderDate' => $request->orderDate,
                'comments' => $request->description,
                'nameClient' => $request->nameClientOrder,
                'status' => 'created']
        );
        $orderDetails = $request->orderDetails;
        $dataFinalOrderDetails = [];
        foreach ($orderDetails as $item) {
            $units = DB::table('stock')
                ->select('units')
                ->where('idProduct', '=', $item['idProduct'])
                ->get();

            DB::table('stock')
                ->where('idProduct', $item['idProduct'])
                ->update(['units' => $units[0]->units - $item['quantity']]);

            array_push($dataFinalOrderDetails, [
                'idProductOrder' => $idOrder,
                'quantity' => $item['quantity'],
                'idProduct' => $item['idProduct'],
                'description' => $item['description'],
                'value' => $item['value'],
            ]);
        }
        DB::table('detailsOrder')->insert($dataFinalOrderDetails);
        return response()->json(['success' => 'Orden agregada correctamente']);
    }

    public function getAllOrders()
    {
        $orders = DB::table('productOrder')
            ->get();
        return response()->json($orders);
    }

    public function getOrderDetailsById(Request $request)
    {
        $id = $request->id;
        $orderDetails = DB::table('detailsOrder')
            ->select('detailsOrder.*', 'product.*')
            ->join('product', 'detailsOrder.idProduct', '=', 'product.id')
            ->where('idProductOrder', '=', $id)
            ->get();
        return response()->json($orderDetails);
    }
}

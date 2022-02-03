<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');

    }

    public function getAllInventory()
    {
        $inventory = DB::table('inventory')->get();
        foreach ($inventory as $item) {
            $item->observation = DB::table('observations')->where('idField', '=', $item->id)->where('table', '=', 'inventory')->get();
        }
        return response()->json($inventory);
    }

    public function saveQuantityById(Request $request)
    {
        $id = $request->id;
        $quantity = $request->quantity;
        $description = new \stdClass();
        $description->quantity = $quantity;
        $description->description = $request->concept;
        DB::table('observations')->insert(['table' => 'inventory', 'description' => json_encode($description), 'idField' => $id]);
        $currentQuantity = DB::table('inventory')->where('id', $id)->value('quantity');
        if ($request->operator == '+') {
            $newQuantity = $currentQuantity + $quantity;
        } else {
            $newQuantity = $currentQuantity - $quantity;
        }
        DB::table('inventory')->where('id', $id)->update(['quantity' => $newQuantity]);
        return response()->json(['success' => 'Cantidad actualizada correctamente']);
        //return response()->json(['success' => $request->id, 'quantity' => $request->quantity]);

    }

    public function saveNewQuantity(Request $request)
    {
        DB::table('inventory')->insert([
            'name' => $request->name,
            'description' => $request->description,
            'typeOfStorage' => $request->typeOfStorage,
            'expirationDate' => $request->expirationDate,
            'quantity' => 0,
        ]);
        return response()->json(['success' => 'Producto agregado correctamente']);

    }
    public function searchProductByName(Request $request)
    {
        $name = $request->name;
        $inventory = DB::table('inventory')->where('name', 'like', '%' . $name . '%')->get();
        return response()->json($inventory);
    }

    public function saveNewProduct(Request $request)
    {
        $formulation = $request->formulation;
        $dataFinalFormulation = [];
        foreach ($formulation as $item) {
            array_push($dataFinalFormulation, [
                'idInventory' => $item['idInventory'],
                'quantity' => $item['quantity'],
                'units' => $item['units'],
            ]);
        }
        $idsFormulation = DB::table('formulation')->insert($dataFinalFormulation);

        DB::table('product')->insert([
            'reference' => $request->reference,
            'name' => $request->name,
            'description' => $request->description,
            'idsFormulation' => json_encode($idsFormulation),
            'wrapper' => $request->wrapper,
            'typeOfStorage' => $request->typeOfStorage,
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
            $date = $item['dateOfProduction'];
            DB::table('production')
                ->where('dateOfProduction', '=', $item['dateOfProduction'])
                ->where('idProduct', '=', $item['idProduct'])
                ->update(['realProduction' => $item['realProduction']]);
        }
        return response()->json(['success' => 'Producción Real para la fecha ' . $date . ' agregada correctamente']);

    }
    public function getAllProviders()
    {
        $providers = DB::table('providers')->get();
        return response()->json($providers);
    }

    public function saveEditProvider(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $address = $request->address;
        $phone = $request->phone;
        $nit = $request->nit;
        $webPage = $request->webPage;

        DB::table('providers')->where('id', $id)->update(
            ['name' => $name, 'address' => $address, 'phone' => $phone, 'nit' => $nit, 'webPage' => $webPage]
        );
        return response()->json(['success' => 'Proveedor actualizado correctamente']);
    }

    public function saveAddProvider(Request $request)
    {
        $name = $request->name;
        $address = $request->address;
        $phone = $request->phone;
        $nit = $request->nit;
        $webPage = $request->webPage;
        $dateOfVinculation = $request->dateOfVinculation;

        DB::table('providers')->insert(
            ['name' => $name, 'address' => $address, 'phone' => $phone, 'nit' => $nit, 'webPage' => $webPage, 'dateOfVinculation' => $dateOfVinculation, 'status' => 'active']
        );
        return response()->json(['success' => 'Proveedor agregado correctamente']);
    }

    public function changeStatusProviderById(Request $request)
    {
        $id = $request->id;
        $status = $request->status;
        DB::table('providers')->where('id', $id)->update(['status' => $status]);
        return response()->json(['success' => 'Proveedor actualizado correctamente']);
    }

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

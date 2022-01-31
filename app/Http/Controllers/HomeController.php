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
        /*$inventory = DB::table('inventory')
        ->join('observations', 'inventory.id', '=', 'observations.idField')
        ->select('inventory.*', 'observations.description as observation')
        ->where('observations.table', '=', 'inventory')
        ->distinct()
        ->get();*/
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
                'quantity' => 0
            ]);
        return response()->json(['success' => 'Producto agregado correctamente']);

    }
}

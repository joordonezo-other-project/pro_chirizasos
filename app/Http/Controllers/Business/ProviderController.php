<?php

namespace App\Http\Controllers\Business;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProviderController extends Controller
{
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
}

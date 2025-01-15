<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PermissionController extends Controller
{
    public function list(Request $request)
    {
        $list = DB::table('permissions')
            ->select('module', 'view_name', 'id')
            ->get()
            ->groupBy('module')
            ->map(function ($items) {
                return $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'view_name' => $item->view_name,
                    ];
                });
            })
            ->toArray();

        return response()->json([
            'message' => 'Se ha obtenido la lista de permisos correctamente',
            'data' => $list
        ], Response::HTTP_OK);
    }
}

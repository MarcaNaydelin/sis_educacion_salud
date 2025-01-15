<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Http\Resources\Service as ResourcesService;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ServiceController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');

        $query = Service::query();
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $list = $query->paginate($perPage);

        return response()->json([
            'message' => 'Se ha obtenido la lista de servicios correctamente',
            'data' => ResourcesService::collection($list),
            'pagination' => [
                'total' => $list->total(),
                'per_page' => $list->perPage(),
                'previous_page' => $list->previousPageUrl(),
                'next_page' => $list->nextPageUrl()
            ]
        ], Response::HTTP_OK);
    }

    public function store(ServiceRequest $request)
    {
        try {
            DB::beginTransaction();
            $newService = Service::create($request->validated());
            DB::commit();
            return response()->json([
                'messages' => 'Se ha creado el servicio correctamente',
                'data' => new ResourcesService($newService)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear el servicio',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json([
            'messages' => 'Se ha obtenido el servicio correctamente',
            'data' => new ResourcesService($service)
        ], Response::HTTP_OK);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        try {
            DB::beginTransaction();
            $service->update($request->validated());
            DB::commit();
            return response()->json([
                'messages' => 'Se ha actualizado el servicio correctamente',
                'data' => new ResourcesService($service)
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar el servicio',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Service $service)
    {
        try {
            DB::beginTransaction();
            $service->delete();
            DB::commit();
            return response()->json([
                'messages' => 'Se ha eliminado el servicio correctamente'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al eliminar el servicio',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAllServices(Request $request)
    {
        $list = Service::select('id', 'name')->get();
        return response()->json([
            'message' => 'Se ha obtenido la lista de servicios correctamente',
            'data' => $list
        ], Response::HTTP_OK);
    }
}

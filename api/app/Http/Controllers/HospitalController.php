<?php

namespace App\Http\Controllers;

use App\Http\Requests\HospitalRequest;
use App\Http\Resources\Hospital as ResourcesHospital;
use App\Http\Resources\HospitalWithServices;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class HospitalController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');

        $query = Hospital::query();
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('director', 'like', "%{$search}%")
                ->orWhere('phone_numbers', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%{$search}%")
                ->orWhere('zone', 'like', "%{$search}%")
                ->orWhere('district', 'like', "%{$search}%");
        }

        $list = $query->paginate($perPage);
        return response()->json([
            'message' => 'Se ha obtenido la lista de hospitales correctamente',
            'data' => ResourcesHospital::collection($list),
            'pagination' => [
                'total' => $list->total(),
                'per_page' => $list->perPage(),
                'previous_page' => $list->previousPageUrl(),
                'next_page' => $list->nextPageUrl()
            ]
        ], Response::HTTP_OK);
    }

    public function store(HospitalRequest $request)
    {
        try {
            DB::beginTransaction();
            $services = $request->get('services');
            $newHospital = Hospital::create($request->validated());
            $newHospital->services()->sync($services);
            DB::commit();
            return response()->json([
                'messages' => 'Se ha creado el hospital correctamente',
                'data' => new ResourcesHospital($newHospital)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear el hospital',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $hospital = Hospital::findOrFail($id);
        return response()->json([
            'messages' => 'Se ha obtenido el hospital correctamente',
            'data' => new HospitalWithServices($hospital)
        ], Response::HTTP_OK);
    }

    public function update(HospitalRequest $request, Hospital $hospital)
    {
        try {
            DB::beginTransaction();
            $services = $request->get('services');
            $hospital->update($request->validated());
            $hospital->services()->sync($services);
            DB::commit();
            return response()->json([
                'messages' => 'Se ha actualizado el hospital correctamente',
                'data' => new ResourcesHospital($hospital)
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar el hospital',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Hospital $hospital)
    {
        try {
            DB::beginTransaction();
            $hospital->delete();
            DB::commit();
            return response()->json([
                'messages' => 'Se ha eliminado el hospital correctamente'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al eliminar el hospital',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getByStatus(Request $request)
    {
        try {
            $data = Hospital::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status');
            $countActive = $data->get(true, 0);
            $countInactive = $data->get(false, 0);
            return response()->json([
                'messages' => 'Se ha obtenido la lista de hospitales correctamente',
                'data' => [
                    'count_hospital_active' => $countActive,
                    'count_hospital_inactive' => $countInactive
                ]
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al obtener los hospitales',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

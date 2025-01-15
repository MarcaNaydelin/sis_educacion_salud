<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolRequest;
use App\Http\Resources\School as ResourcesSchool;
use App\Http\Resources\SchoolWithCourses;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class SchoolController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $list = School::paginate($perPage);
        return response()->json([
            'message' => 'Se ha obtenido la lista de escuelas correctamente',
            'data' => ResourcesSchool::collection($list),
            'pagination' => [
                'total' => $list->total(),
                'per_page' => $list->perPage(),
                'previous_page' => $list->previousPageUrl(),
                'next_page' => $list->nextPageUrl()
            ]
        ], Response::HTTP_OK);
    }

    public function store(SchoolRequest $request)
    {
        try {
            DB::beginTransaction();
            $courses = $request->get('courses');
            $newSchool = School::create($request->validated());
            $newSchool->courses()->sync($courses);
            DB::commit();
            return response()->json([
                'messages' => 'Se ha creado la escuela correctamente',
                'data' => new ResourcesSchool($newSchool)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear la escuela',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $school = School::findOrFail($id);
        return response()->json([
            'messages' => 'Se ha obtenido la escuela correctamente',
            'data' => new SchoolWithCourses($school)
        ], Response::HTTP_OK);
    }

    public function update(SchoolRequest $request, School $school)
    {
        try {
            DB::beginTransaction();
            $courses = $request->get('courses');
            $school->update($request->validated());
            $school->courses()->sync($courses);
            DB::commit();
            return response()->json([
                'messages' => 'Se ha actualizado la escuela correctamente',
                'data' => new ResourcesSchool($school)
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar la escuela',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(School $school)
    {
        try {
            DB::beginTransaction();
            $school->delete();
            DB::commit();
            return response()->json([
                'messages' => 'Se ha eliminado la escuela correctamente'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al eliminar la escuela',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getByStatus(Request $request)
    {
        try {
            $data = School::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status');
            $countActive = $data->get(true, 0);
            $countInactive = $data->get(false, 0);
            return response()->json([
                'messages' => 'Se ha obtenido la lista de escuelas correctamente',
                'data' => [
                    'count_school_active' => $countActive,
                    'count_school_inactive' => $countInactive
                ]
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al obtener los escuelas',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

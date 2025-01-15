<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Http\Resources\Course as ResourcesCourse;
use App\Models\Course;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');

        $query = Course::query();
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }
        $list = $query->paginate($perPage);
        return response()->json([
            'message' => 'Se ha obtenido la lista de cursos correctamente',
            'data' => ResourcesCourse::collection($list),
            'pagination' => [
                'total' => $list->total(),
                'per_page' => $list->perPage(),
                'previous_page' => $list->previousPageUrl(),
                'next_page' => $list->nextPageUrl()
            ]
        ], Response::HTTP_OK);
    }

    public function store(CourseRequest $request)
    {
        try {
            DB::beginTransaction();
            $newCourse = Course::create($request->validated());
            DB::commit();
            return response()->json([
                'messages' => 'Se ha creado el curso correctamente',
                'data' => new ResourcesCourse($newCourse)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear el curso',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json([
            'messages' => 'Se ha obtenido el curso correctamente',
            'data' => new ResourcesCourse($course)
        ], Response::HTTP_OK);
    }

    public function update(CourseRequest $request, Course $course)
    {
        try {
            DB::beginTransaction();
            $course->update($request->validated());
            DB::commit();
            return response()->json([
                'messages' => 'Se ha actualizado el curso correctamente',
                'data' => new ResourcesCourse($course)
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar el curso',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Course $course)
    {
        try {
            DB::beginTransaction();
            $course->delete();
            DB::commit();
            return response()->json([
                'messages' => 'Se ha eliminado el curso correctamente'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al eliminar el curso',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAllCourses(Request $request)
    {
        $list = Course::select('id', 'name')->get();
        return response()->json([
            'message' => 'Se ha obtenido la lista de cursos correctamente',
            'data' => $list
        ], Response::HTTP_OK);
    }
}

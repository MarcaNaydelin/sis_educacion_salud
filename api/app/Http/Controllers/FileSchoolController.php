<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileSchoolRequest;
use App\Http\Resources\ListImages;
use App\Models\FileSchool;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class FileSchoolController extends Controller
{
    public function list($id)
    {
        $hospital = School::findOrFail($id);
        $list = $hospital->files()->orderBy('id', 'asc')->get();
        return response()->json([
            'message' => 'Se ha obtenido las imagenes del colegio seleccionado correctamente',
            'data' => ListImages::collection($list)
        ], Response::HTTP_OK);
    }

    public function store(FileSchoolRequest $request)
    {
        try {
            DB::beginTransaction();
            $files = $request->file('files');
            $status = $request->get('status');
            foreach ($files as $index => $file) {
                $path = $file->store('school_images', 'public');
                FileSchool::create([
                    'school_id' => $request->get('school_id'),
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'status' => filter_var($status[$index], FILTER_VALIDATE_BOOLEAN)
                ]);
            }
            DB::commit();
            return response()->json([
                'message' => 'Se han subido las imagenes de la escuela correctamente',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al subir la imagen de la escuela',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function destroy($id)
    {
        DB::beginTransaction();
        $hospital_image = FileSchool::findOrFail($id);
        $hospital_image->status = false;
        $hospital_image->save();
        DB::commit();
        return response()->json([
            'message' => 'Se ha eliminado la imagen de la escuela correctamente',
        ], Response::HTTP_OK);
    }
}

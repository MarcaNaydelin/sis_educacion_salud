<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileHospitalRequest;
use App\Http\Resources\ListImages;
use App\Models\FileHospital;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class FileHospitalController extends Controller
{

    public function list($id)
    {
        $hospital = Hospital::findOrFail($id);
        $list = $hospital->files()->orderBy('id', 'asc')->get();
        return response()->json([
            'message' => 'Se ha obtenido las imagenes del hospital seleccionado correctamente',
            'data' => ListImages::collection($list)
        ], Response::HTTP_OK);
    }

    public function store(FileHospitalRequest $request)
    {
        try {
            DB::beginTransaction();
            $files = $request->file('files');
            $status = $request->get('status');
            foreach ($files as $index => $file) {
                $path = $file->store('hospital_images', 'public');
                FileHospital::create([
                    'hospital_id' => $request->get('hospital_id'),
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'status' => filter_var($status[$index], FILTER_VALIDATE_BOOLEAN)
                ]);
            }
            DB::commit();
            return response()->json([
                'message' => 'Se han subido las imagenes del hospital correctamente',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al subir la imagen del hospital',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function destroy($id)
    {
        DB::beginTransaction();
        $hospital_image = FileHospital::findOrFail($id);
        $hospital_image->status = false;
        $hospital_image->save();
        DB::commit();
        return response()->json([
            'message' => 'Se ha eliminado la imagen del hospital correctamente',
        ], Response::HTTP_OK);
    }
}

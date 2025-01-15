<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Hospital;
use App\Models\School;
use App\Models\Service;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientController extends Controller
{

    public function getFiltersSchool(Request $request)
    {
        $shift = School::distinct()->pluck('shift');

        $zones = School::distinct()->pluck('zone');

        $districts = School::distinct()->pluck('district');

        return response()->json([
            'messages' => 'Se ha obtenido la lista de filtros de escuelas correctamente',
            'data' => [
                'shift' => $shift,
                'zones' => $zones,
                'districts' => $districts
            ]
        ], Response::HTTP_OK);
    }

    public function getSchoolsByFilters(Request $request)
    {
        $courses = $request->get('courses');
        $shift = $request->get('shift');
        $zone = $request->get('zone');
        $district = $request->get('district');

        $query = School::query();

        if (!empty($courses)) {
            $query->whereHas('courses', function ($query) use ($courses) {
                $query->whereIn('courses.name', $courses);
            });
        }

        if (!empty($shift)) {
            $query->where('shift', $shift);
        }

        if (!empty($zone)) {
            $query->where('zone', $zone);
        }

        if (!empty($district)) {
            $query->where('district', $district);
        }

        $data = $query->select('name', 'address', 'location')->get();

        return response()->json([
            'message' => 'Se ha obtenido la lista de escuelas correctamente',
            'data' => $data
        ], Response::HTTP_OK);
    }

    public function getPublicCourses(Request $request)
    {
        $list = Course::select('name')->get();
        return response()->json([
            'message' => 'Se ha obtenido la lista de cursos correctamente',
            'data' => $list
        ], Response::HTTP_OK);
    }

    public function getPublicServices(Request $request)
    {
        $list = Service::select('name')->get();
        return response()->json([
            'message' => 'Se ha obtenido la lista de servicios correctamente',
            'data' => $list
        ], Response::HTTP_OK);
    }


    public function getFiltersHospital(Request $request)
    {
        $levels = Hospital::distinct()->pluck('level');

        $zones = Hospital::distinct()->pluck('zone');

        $districts = Hospital::distinct()->pluck('district');

        return response()->json([
            'messages' => 'Se ha obtenido la lista de filtros de hospitales correctamente',
            'data' => [
                'levels' => $levels,
                'zones' => $zones,
                'districts' => $districts
            ]
        ], Response::HTTP_OK);
    }

    public function getHospitalsByFilters(Request $request)
    {
        $services = $request->get('services');
        $level = $request->get('level');
        $zone = $request->get('zone');
        $district = $request->get('district');

        $query = Hospital::query();

        if (!empty($services)) {
            $query->whereHas('services', function ($query) use ($services) {
                $query->whereIn('services.name', $services);
            });
        }

        if (!empty($level)) {
            $query->where('level', $level);
        }

        if (!empty($zone)) {
            $query->where('zone', $zone);
        }

        if (!empty($district)) {
            $query->where('district', $district);
        }

        //Sin filtros aplicados
        /*if (empty($services) && empty($level) && empty($zone) && empty($district)) {
            return response()->json([
                'message' => 'No se aplicaron filtros',
                'data' => []
            ], Response::HTTP_OK);
        }*/

        $data = $query->select('name', 'address', 'level', 'district', 'zone', 'location')
        ->with('services:name')
        ->get();

        return response()->json([
            'message' => 'Se ha obtenido la lista de hospitales correctamente',
            'data' => $data
        ], Response::HTTP_OK);

    }

    public function getCountHospitalAndSchool(Request $request)
    {

        $hospitals = Hospital::count();
        $schools = School::count();

        return response()->json([
            'message' => 'Se ha obtenido la lista de hospitales correctamente',
            'data' => [
                'schools' => $schools,
                'hospitals' => $hospitals
            ]
        ], Response::HTTP_OK);
    }
}

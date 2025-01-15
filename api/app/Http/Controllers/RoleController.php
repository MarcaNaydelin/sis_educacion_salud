<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\Role as ResourcesRole;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');

        $query = Role::query();
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $list = $query->paginate($perPage);
        return response()->json([
            'message' => 'Se ha obtenido la lista de roles correctamente',
            'data' => ResourcesRole::collection($list),
            'pagination' => [
                'total' => $list->total(),
                'per_page' => $list->perPage(),
                'previous_page' => $list->previousPageUrl(),
                'next_page' => $list->nextPageUrl()
            ]
        ], Response::HTTP_OK);
    }

    public function store(RoleRequest $request)
    {
        try {
            DB::beginTransaction();
            $newRole = Role::create([
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'guard_name' => 'api'
            ]);
            if ($request->has('permissions') && !empty($request->permissions)) {
                $permissions = array_map('intval', $request->permissions);
                $newRole->syncPermissions($permissions);
            }
            DB::commit();
            return response()->json([
                'messages' => 'Se ha creado el rol correctamente',
                'data' => new ResourcesRole($newRole)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear el rol',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json([
            'messages' => 'Se ha obtenido el rol correctamente',
            'data' => new ResourcesRole($role)
        ], Response::HTTP_OK);
    }

    public function update(RoleRequest $request, Role $role)
    {
        try {
            DB::beginTransaction();
            $role->update([
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'guard_name' => 'api'
            ]);
            if ($request->has('permissions') && !empty($request->permissions)) {
                $permissions = array_map('intval', $request->permissions);
                $role->syncPermissions($permissions);
            }
            DB::commit();
            return response()->json([
                'messages' => 'Se ha actualizado el rol correctamente',
                'data' => new ResourcesRole($role)
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar el rol',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Role $role)
    {
        try {
            DB::beginTransaction();
            $role->delete();
            DB::commit();
            return response()->json([
                'messages' => 'Se ha eliminado el rol correctamente'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al eliminar el rol',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAllRoles(Request $request)
    {
        $list = Role::select('id', 'name')->get();
        return response()->json([
            'message' => 'Se ha obtenido la lista de roles correctamente',
            'data' => $list,
        ], Response::HTTP_OK);
    }
}

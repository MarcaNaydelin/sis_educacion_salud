<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserRoleRequest;
use App\Http\Resources\User as ResourcesUser;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Constraint\IsEmpty;

class UserController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');
        $loggedInUserId = auth()->id();

        $query = User::query();
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }
        $query->where('id', '!=', $loggedInUserId);

        $list = $query->paginate($perPage);

        return response()->json([
            'message' => 'Se ha obtenido la lista de usuarios correctamente',
            'data' => ResourcesUser::collection($list),
            'pagination' => [
                'total' => $list->total(),
                'per_page' => $list->perPage(),
                'previous_page' => $list->previousPageUrl(),
                'next_page' => $list->nextPageUrl()
            ]
        ], Response::HTTP_OK);
    }

    public function store(UserRequest $request)
    {
        try {
            DB::beginTransaction();
            $newUser = User::create([
                'name' => $request->get('name'),
                'password' => Hash::make($request->get('password')),
                'email' => $request->get('email'),
                'is_active' => $request->get('is_active')
            ]);
            DB::commit();
            return response()->json([
                'messages' => 'Se ha creado el usuario correctamente',
                'data' => new ResourcesUser($newUser)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear el usuario',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'messages' => 'Se ha obtenido el usuario correctamente',
            'data' => new ResourcesUser($user)
        ], Response::HTTP_OK);
    }

    public function update(UserRequest $request, User $user)
    {
        try {
            DB::beginTransaction();
            if ($request->get('password')) {
                $user->update([
                    'name' => $request->get('name'),
                    'email' => $request->get('email'),
                    'is_active' => $request->get('is_active'),
                    'password' => Hash::make($request->get('password'))
                ]);
            } else {
                $user->update([
                    'name' => $request->get('name'),
                    'email' => $request->get('email'),
                    'is_active' => $request->get('is_active')
                ]);
            }
            DB::commit();
            return response()->json([
                'messages' => 'Se ha actualizado el usuario correctamente',
                'data' => new ResourcesUser($user)
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar el usuario',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(User $user)
    {
        try {
            DB::beginTransaction();
            $user->delete();
            DB::commit();
            return response()->json([
                'messages' => 'Se ha eliminado el usuario correctamente'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al eliminar el usuario',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getRolesAndPermissions($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'messages' => 'Se ha obtenido los rolesy permisos del usuario correctamente',
            'data' => [
                'permissions' => $user->permissions->pluck('id'),
                'roles' => $user->roles->select('id', 'name')
            ]
        ], Response::HTTP_OK);
    }


    public function assignRolesAndPermissions(UserRoleRequest $request, $id)
    {
        try {
            DB::beginTransaction();
            $user = User::findOrFail($id);
            if (!empty($request->get('roles'))) {
                $user->syncRoles($request->roles);
            }
            if (!empty($request->get('permissions'))) {
                $permissions = array_map('intval', $request->permissions);
                $user->syncPermissions($permissions);
            }
            DB::commit();
            return response()->json([
                'messages' => 'Se ha actualizado los roles y permisos del usuario correctamente'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al asignar los roles y permisos al usuario',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

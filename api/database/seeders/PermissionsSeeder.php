<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear permisos por módulo
        $permissionsByModule = [
            'Hospitales' => [
                'hospitals.view' => 'Ver hospitales',
                'hospitals.create' => 'Crear hospitales',
                'hospitals.edit' => 'Editar hospitales',
                'hospitals.delete' => 'Eliminar hospitales',
                'hospitals.image.create' => 'Subir imagenes hospitales',
                'hospitals.image.delete' => 'Eliminar imagenes de hospitales',
            ],
            'Escuelas' => [
                'schools.view' => 'Ver escuelas',
                'schools.create' => 'Crear escuelas',
                'schools.edit' => 'Editar escuelas',
                'schools.delete' => 'Eliminar escuelas',
                'schools.image.create' => 'Eliminar imagenes de escuelas',
                'schools.image.delete' => 'Subir imagenes escuelas',
            ],
            'Servicios' => [
                'services.view' => 'Ver servicios',
                'services.create' => 'Crear servicios',
                'services.edit' => 'Editar servicios',
                'services.delete' => 'Eliminar servicios',
            ],
            'Cursos' => [
                'courses.view' => 'Ver cursos',
                'courses.create' => 'Crear cursos',
                'courses.edit' => 'Editar cursos',
                'courses.delete' => 'Eliminar cursos',
            ],
            'Usuarios' => [
                'users.view' => 'Ver usuarios',
                'users.create' => 'Crear usuarios',
                'users.edit' => 'Editar usuarios',
                'users.delete' => 'Eliminar usuarios',
                'users.roles' => 'Asignar y remover roles a usuarios',
                'users.permissions' => 'Asignar y remover permisos de usuarios',
            ],
            'Roles' => [
                'roles.view' => 'Ver roles',
                'roles.create' => 'Crear roles',
                'roles.edit' => 'Editar roles',
                'roles.delete' => 'Eliminar roles',
            ],
            'Permisos' => [
                'permissions.view' => 'Ver permisos',
            ],
        ];

        // Crear permisos en la base de datos
        foreach ($permissionsByModule as $module => $permissions) {
            foreach ($permissions as $permission => $description) {
                Permission::create([
                    'name' => $permission,
                    'module' => $module,
                    'view_name' => $description,
                    'guard_name' => 'api'
                ]);
            }
        }

        $superAdmin = Role::create([
            'name' => 'super-admin',
            'description' => 'Administrador con acceso total al sistema',
            'guard_name' => 'api'
        ]);

        $superAdmin->givePermissionTo(Permission::all());

        $admin_educacion = Role::create([
            'name' => 'edu-admin',
            'description' => 'Administrador de colegio',
            'guard_name' => 'api'
        ]);

        $admin_educacion->givePermissionTo(Permission::where('module', '=', 'Escuelas')->get());
        $admin_educacion->givePermissionTo(Permission::where('module', '=', 'Cursos')->get());

        $admin_hospital = Role::create([
            'name' => 'hospital-admin',
            'description' => 'Administrador de hospital',
            'guard_name' => 'api'
        ]);

        $admin_hospital->givePermissionTo(Permission::where('module', '=', 'Hospitales')->get());
        $admin_hospital->givePermissionTo(Permission::where('module', '=', 'Servicios')->get());

        $user = User::create([
            'name' => 'Admin General',
            'email' => 'admincentrosgamc@gmail.com',
            'password' => Hash::make('4dm1ng4mc'),
            'is_active' => true
        ]);

        $user->assignRole($superAdmin);

        $user2 = User::create([
            'name' => 'Admin Educación',
            'email' => 'educaciongamc@gmail.com',
            'password' => Hash::make('3duc0l3g10s'),
            'is_active' => true
        ]);

        $user2->assignRole($admin_educacion);

        $user3 = User::create([
            'name' => 'Admin Hospitales',
            'email' => 'hospitalesgamc@gmail.com',
            'password' => Hash::make('h0sp1t4l3s'),
            'is_active' => true
        ]);

        $user3->assignRole($admin_hospital);
    }
}

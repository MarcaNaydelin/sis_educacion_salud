<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\FileHospitalController;
use App\Http\Controllers\FileSchoolController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login'])->name('api.auth.login');

Route::middleware('auth:api')->group(function () {

    Route::post('logout', [AuthController::class, 'logout'])->name('api.logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('api.auth.refresh');
    Route::post('me', [AuthController::class, 'me'])->name('api.auth.me');

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'list'])->middleware('role_or_permission:users.view')->name('api.users.list');
        Route::post('/', [UserController::class, 'store'])->middleware('role_or_permission:users.create')->name('api.users.store');
        Route::get('/{user}', [UserController::class, 'show'])->middleware('role_or_permission:users.view')->name('api.users.show');
        Route::patch('/{user}', [UserController::class, 'update'])->middleware('role_or_permission:users.edit')->name('api.users.update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->middleware('role_or_permission:users.delete')->name('api.users.destroy');
        Route::get('/roles-permissions/{user}', [UserController::class, 'getRolesAndPermissions'])->middleware('role_or_permission:users.roles')->name('api.users.get.roles.permissions');
        Route::post('/roles-permissions/{user}', [UserController::class, 'assignRolesAndPermissions'])->middleware('role_or_permission:users.roles')->name('api.users.assign.roles');
    });

    Route::group(['prefix' => 'roles'], function () {
        Route::get('/', [RoleController::class, 'list'])->middleware('role_or_permission:roles.view')->name('api.roles.list');
        Route::get('/get-roles', [RoleController::class, 'getAllRoles'])->middleware('role_or_permission:users.roles')->name('api.roles.all');
        Route::post('/', [RoleController::class, 'store'])->middleware('role_or_permission:roles.create')->name('api.roles.store');
        Route::get('/{role}', [RoleController::class, 'show'])->middleware('role_or_permission:roles.view')->name('api.roles.show');
        Route::patch('/{role}', [RoleController::class, 'update'])->middleware('role_or_permission:roles.edit')->name('api.roles.update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->middleware('role_or_permission:roles.delete')->name('api.roles.destroy');
    });

    Route::group(['prefix' => 'permissions'], function () {
        Route::get('/', [PermissionController::class, 'list'])->middleware('role_or_permission:permissions.view')->name('api.roles.list');
    });


    Route::group(['prefix' => 'services'], function () {
        Route::get('/', [ServiceController::class, 'list'])->middleware('role_or_permission:services.view')->name('api.services.list');
        Route::get('/get-services', [ServiceController::class, 'getAllServices'])->middleware('role_or_permission:services.view')->name('api.services.all');
        Route::post('/', [ServiceController::class, 'store'])->middleware('role_or_permission:services.create')->name('api.services.store');
        Route::get('/{service}', [ServiceController::class, 'show'])->middleware('role_or_permission:services.view')->name('api.services.show');
        Route::patch('/{service}', [ServiceController::class, 'update'])->middleware('role_or_permission:services.edit')->name('api.services.update');
        Route::delete('/{service}', [ServiceController::class, 'destroy'])->middleware('role_or_permission:services.delete')->name('api.services.destroy');
    });

    Route::group(['prefix' => 'courses'], function () {
        Route::get('/', [CourseController::class, 'list'])->middleware('role_or_permission:courses.view')->name('api.courses.list');
        Route::get('/get-courses', [CourseController::class, 'getAllCourses'])->middleware('role_or_permission:courses.view')->name('api.courses.all');
        Route::post('/', [CourseController::class, 'store'])->middleware('role_or_permission:courses.create')->name('api.courses.store');
        Route::get('/{course}', [CourseController::class, 'show'])->middleware('role_or_permission:courses.view')->name('api.courses.show');
        Route::patch('/{course}', [CourseController::class, 'update'])->middleware('role_or_permission:courses.edit')->name('api.courses.update');
        Route::delete('/{course}', [CourseController::class, 'destroy'])->middleware('role_or_permission:courses.delete')->name('api.courses.destroy');
    });

    Route::group(['prefix' => 'hospitals'], function () {
        Route::get('/', [HospitalController::class, 'list'])->middleware('role_or_permission:hospitals.view')->name('api.hospitals.list');
        Route::get('/get-by-status', [HospitalController::class, 'getByStatus'])->middleware('role_or_permission:hospitals.view')->name('api.hospitals.listByStatus');
        Route::post('/', [HospitalController::class, 'store'])->middleware('role_or_permission:hospitals.create')->name('api.hospitals.store');
        Route::get('/{hospital}', [HospitalController::class, 'show'])->middleware('role_or_permission:hospitals.view')->name('api.hospitals.show');
        Route::patch('/{hospital}', [HospitalController::class, 'update'])->middleware('role_or_permission:hospitals.edit')->name('api.hospitals.update');
        Route::delete('/{hospital}', [HospitalController::class, 'destroy'])->middleware('role_or_permission:hospitals.delete')->name('api.hospitals.destroy');
        Route::get('/images/{hospital}', [FileHospitalController::class, 'list'])->middleware('role_or_permission:hospitals.image.create')->name('api.hospitals.images.list');
        Route::post('/images', [FileHospitalController::class, 'store'])->middleware('role_or_permission:hospitals.image.create')->name('api.hospitals.images.store');
        Route::patch('/images/{image}', [FileHospitalController::class, 'destroy'])->middleware('role_or_permission:hospitals.image.delete')->name('api.hospitals.images.destroy');
    });

    Route::group(['prefix' => 'schools'], function () {
        Route::get('/', [SchoolController::class, 'list'])->middleware('role_or_permission:schools.view')->name('api.schools.list');
        Route::get('/get-by-status', [SchoolController::class, 'getByStatus'])->middleware('role_or_permission:schools.view')->name('api.schools.listByStatus');
        Route::post('/', [SchoolController::class, 'store'])->middleware('role_or_permission:schools.create')->name('api.schools.store');
        Route::get('/{school}', [SchoolController::class, 'show'])->middleware('role_or_permission:schools.view')->name('api.schools.show');
        Route::patch('/{school}', [SchoolController::class, 'update'])->middleware('role_or_permission:schools.edit')->name('api.schools.update');
        Route::delete('/{school}', [SchoolController::class, 'destroy'])->middleware('role_or_permission:schools.update')->name('api.schools.destroy');
        Route::get('/images/{school}', [FileSchoolController::class, 'list'])->middleware('role_or_permission:schools.image.create')->name('api.schools.images.list');
        Route::post('/images', [FileSchoolController::class, 'store'])->middleware('role_or_permission:schools.image.create')->name('api.schools.images.store');
        Route::patch('/images/{image}', [FileSchoolController::class, 'destroy'])->middleware('role_or_permission:schools.image.delete')->name('api.schools.images.destroy');
    });
});

//PUBLIC ROUTES

Route::get('public/services', [ClientController::class, 'getPublicServices'])->name('public.services.list');
Route::get('public/hospitals-filters', [ClientController::class, 'getFiltersHospital'])->name('public.hospitals.filters.list');
Route::get('public/hospitals', [ClientController::class, 'getHospitalsByFilters'])->name('public.hospitals.byFilters');

Route::get('public/courses', [ClientController::class, 'getPublicCourses'])->name('public.courses.list');
Route::get('public/schools-filters', [ClientController::class, 'getFiltersSchool'])->name('public.schools.filters.list');
Route::get('public/schools', [ClientController::class, 'getSchoolsByFilters'])->name('public.schools.byFilters');

Route::get('public/schools-hospitals', [ClientController::class, 'getCountHospitalAndSchool'])->name('public.count.schools.hospitals');

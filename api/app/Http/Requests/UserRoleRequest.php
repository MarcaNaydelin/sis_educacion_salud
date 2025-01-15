<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'roles' => ['sometimes', 'array'],
            'roles.*' => ['sometimes', 'integer', Rule::exists(Role::class, 'id')],
            'permissions' => ['sometimes', 'array'],
            'permissions.*' => ['sometimes', 'integer', Rule::exists(Permission::class, 'id')]
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Service;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
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
        $rules = [
            'name' => ['required', 'string', Rule::unique(Service::class, 'name')],
            'description' => ['sometimes', 'string']
        ];

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules = [
                'name' => ['required', 'string', Rule::unique(Service::class, 'name')->ignore($this->service)],
                'description' => ['sometimes', 'string']
            ];
        }
        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del servicio es obligatorio.',
            'name.string' => 'El nombre del servicio debe ser un texto válido.',
            'name.unique' => 'Ya existe un servicio con este nombre. Por favor, elige otro.',
            'description.string' => 'La descripción debe ser un texto válido.',
        ];
    }
}

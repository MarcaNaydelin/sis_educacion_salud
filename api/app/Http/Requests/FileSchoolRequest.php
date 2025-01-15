<?php

namespace App\Http\Requests;

use App\Models\School;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FileSchoolRequest extends FormRequest
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
            'school_id' => ['required', 'integer', Rule::exists(School::class, 'id')],
            'files' => ['required', 'array'],
            'files.*' => ['file', 'mimes:jpg,png', 'max:10240'],
            'status' => ['required', 'array'],
            'status.*' => ['required', 'boolean']
        ];
    }


    public function messages(): array
    {
        return [
            'hospital_id.required' => 'El ID del hospital es obligatorio.',
            'hospital_id.integer' => 'El ID del hospital debe ser un número entero.',
            'hospital_id.exists' => 'El hospital seleccionado no existe.',

            'files.required' => 'Debe seleccionar al menos un archivo.',
            'files.array' => 'Los archivos deben ser un arreglo.',
            'files.*.file' => 'Cada archivo debe ser un archivo válido.',
            'files.*.mimes' => 'Los archivos deben ser de tipo imagen: jpg, png.',
            'files.*.max' => 'El tamaño máximo permitido para cada archivo es 10MB.',

            'status.required' => 'Debe seleccionar al menos un estado para cada archivo.',
            'status.array' => 'Los estados deben ser un arreglo.',
            'status.*.required' => 'Cada estado es obligatorio.',
            'status.*.boolean' => 'Cada estado debe ser verdadero o falso.',
        ];
    }
}

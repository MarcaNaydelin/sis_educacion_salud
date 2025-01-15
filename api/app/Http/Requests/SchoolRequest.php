<?php

namespace App\Http\Requests;

use App\Models\Course;
use App\Models\School;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SchoolRequest extends FormRequest
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
            'name' => ['required', Rule::unique(School::class, 'name')],
            'address' => ['required'],
            'zone' => ['required', Rule::in('zona norte', 'zona sur')],
            'district' => ['required'],
            'location' => ['required', 'array'],
            'location.latitude' => ['required', 'string'],
            'location.longitude' => ['required', 'string'],
            'type' => ['required', Rule::in('Fiscal', 'Convenio', 'Tecnico')],
            'shift' => ['required', Rule::in('Turno mañana', 'Turno tarde', 'Turno nocturno')],
            'status' => ['required', 'boolean'],
            'courses' => ['sometimes', 'array'],
            'courses.*' => ['sometimes', 'integer', Rule::exists(Course::class, 'id')]
        ];

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules = [
                'name' => ['required', Rule::unique(School::class, 'name')->ignore($this->school)],
                'address' => ['required'],
                'zone' => ['required', Rule::in('zona norte', 'zona sur')],
                'district' => ['required'],
                'location' => ['required', 'array'],
                'location.latitude' => ['required', 'string'],
                'location.longitude' => ['required', 'string'],
                'type' => ['required', Rule::in('Fiscal', 'Convenio', 'Tecnico')],
                'shift' => ['required', Rule::in('Turno mañana', 'Turno tarde', 'Turno nocturno')],
                'status' => ['required', 'boolean'],
                'courses' => ['sometimes', 'array'],
                'courses.*' => ['sometimes', 'integer', Rule::exists(Course::class, 'id')]
            ];
        }
        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la escuela es obligatorio.',
            'name.unique' => 'El nombre de la escuela ya está registrado, por favor elige otro nombre.',
            'address.required' => 'La dirección de la escuela es obligatoria.',
            'zone.required' => 'La zona es obligatoria.',
            'zone.in' => 'La zona debe ser una de las siguientes opciones: zona norte, zona sur.',
            'district.required' => 'El distrito es obligatorio.',
            'location.required' => 'La ubicación es obligatoria.',
            'location.array' => 'La ubicación debe ser un arreglo.',
            'location.latitude.required' => 'La latitud de la ubicación es obligatoria.',
            'location.latitude.string' => 'La latitud debe ser una cadena de texto.',
            'location.longitude.required' => 'La longitud de la ubicación es obligatoria.',
            'location.longitude.string' => 'La longitud debe ser una cadena de texto.',
            'type.required' => 'El tipo de escuela es obligatorio.',
            'type.in' => 'El tipo de escuela debe ser uno de los siguientes: Fiscal, Convenio, Técnico.',
            'shift.required' => 'El turno es obligatorio.',
            'shift.in' => 'El turno debe ser uno de los siguientes: Turno mañana, Turno tarde, Turno nocturno.',
            'status.required' => 'El estado es obligatorio.',
            'status.boolean' => 'El estado debe ser verdadero o falso.',
            'courses.array' => 'Los cursos deben ser una lista válida',
            'courses.*.exists' => 'No existe el curso - :attribute '
        ];
    }
}

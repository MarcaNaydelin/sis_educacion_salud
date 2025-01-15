<?php

namespace App\Http\Requests;

use App\Models\Hospital;
use App\Models\Service;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class HospitalRequest extends FormRequest
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
            'name' => ['required', Rule::unique(Hospital::class, 'name')],
            'director' => ['required', Rule::unique(Hospital::class, 'director')],
            'address' => ['required'],
            'zone' => ['required', Rule::in('zona norte', 'zona sur')],
            'district' => ['required'],
            'location' => ['required', 'array'],
            'location.latitude' => ['required', 'string'],
            'location.longitude' => ['required', 'string'],
            'level' => ['required', Rule::in('Primer nivel', 'Segundo nivel', 'Tercer nivel')],
            'shifts' => ['required'],
            'status' => ['required', 'boolean'],
            'phone_numbers' => ['required', 'array'],
            'services' => ['sometimes', 'array'],
            'services.*' => ['sometimes', 'integer', Rule::exists(Service::class, 'id')]
        ];
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules = [
                'name' => ['required', Rule::unique(Hospital::class, 'name')->ignore($this->hospital)],
                'director' => ['required', Rule::unique(Hospital::class, 'director')->ignore($this->hospital)],
                'address' => ['required'],
                'zone' => ['required', Rule::in('zona norte', 'zona sur')],
                'district' => ['required'],
                'location' => ['required', 'array'],
                'location.latitude' => ['required', 'string'],
                'location.longitude' => ['required', 'string'],
                'level' => ['required', Rule::in('Primer nivel', 'Segundo nivel', 'Tercer nivel')],
                'shifts' => ['required'],
                'status' => ['required', 'boolean'],
                'phone_numbers' => ['required', 'array'],
                'services' => ['sometimes', 'array'],
                'services.*' => ['sometimes', 'integer', Rule::exists(Service::class, 'id')]
            ];
        }
        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre del hospital es obligatorio.',
            'name.unique' => 'Ya existe un hospital con este nombre.',
            'director.required' => 'El nombre del director es obligatorio.',
            'director.unique' => 'Ya existe un director con este nombre.',
            'address.required' => 'La dirección es obligatoria.',
            'zone.required' => 'La zona es obligatoria.',
            'zone.in' => 'La zona debe ser "zona norte" o "zona sur".',
            'district.required' => 'El distrito es obligatorio.',
            'location.required' => 'La ubicación es obligatoria.',
            'location.latitude.required' => 'La latitude de la localización es obligatorio.',
            'location.longitude.required' => 'La longitud de la localización es obligatorio.',
            'level.required' => 'El nivel del hospital es obligatorio.',
            'level.in' => 'El nivel debe ser "Primer nivel", "Segundo nivel" o "Tercer nivel".',
            'shifts.required' => 'Los turnos son obligatorios.',
            'status.required' => 'El estado es obligatorio.',
            'status.boolean' => 'El estado debe ser verdadero o falso.',
            'phone_numbers.required' => 'Los números de teléfono son obligatorios.',
            'phone_numbers.array' => 'Los números de teléfono deben ser una lista válida.',
            'services.array' => 'Los servicios deben ser una lista válida',
            'services.*.exists' => 'No existe el servicio - :attribute '
        ];
    }
}

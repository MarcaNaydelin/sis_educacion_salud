<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HospitalWithServices extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'director' => $this->director,
            'phone_numbers' => $this->phone_numbers,
            'level' => $this->level,
            'shifts' => $this->shifts,
            'address' => $this->address,
            'zone' => $this->zone,
            'district' => $this->district,
            'status' => $this->status,
            'location' => $this->location,
            'services' => $this->services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name
                ];
            }),
        ];
    }
}

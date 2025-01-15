<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Hospital extends JsonResource
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
            'address' => $this->address,
            'zone' => $this->zone,
            'district' => $this->district,
            'location' => $this->location,
            'level' => $this->level,
            'shifts' => $this->shifts,
            'status' => $this->status,
            'phone_numbers' => $this->phone_numbers,
            'services' => $this->services
        ];
    }
}

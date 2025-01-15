<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchoolWithCourses extends JsonResource
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
            'address' => $this->address,
            'zone' => $this->zone,
            'district' => $this->district,
            'location' => $this->location,
            'type' => $this->type,
            'shift' => $this->shift,
            'status' => $this->status,
            'courses' => $this->courses->map(function ($course) {
                return [
                    'id' => $course->id,
                    'name' => $course->name
                ];
            }),
        ];
    }
}

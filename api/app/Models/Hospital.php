<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hospital extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'hospitals';

    protected $fillable = [
        'name',
        'director',
        'address',
        'zone',
        'district',
        'location',
        'level',
        'shifts',
        'status',
        'phone_numbers'
    ];

    protected $casts = [
        'location' => 'array',
        'shifts' => 'array',
        'phone_numbers' => 'array',
    ];

    public function files()
    {
        return $this->hasMany(FileHospital::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'hospital_has_services')->withPivot('deleted_at')->withTimestamps();
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($hospital) {
            if ($hospital->isForceDeleting()) {
                $hospital->files()->forceDelete();
                $hospital->services()->detach();
            } else {
                $hospital->files()->delete();
                $hospital->services()->each(function ($service) use ($hospital) {
                    $hospital->services()->updateExistingPivot($service->id, ['deleted_at' => now()]);
                });
            }
        });

        static::restoring(function ($hospital) {
            $hospital->files()->withTrashed()->restore();
            $hospital->services()->withTrashed()->each(function ($service) use ($hospital) {
                $hospital->services()->updateExistingPivot($service->id, ['deleted_at' => null]);
            });
        });
    }
}

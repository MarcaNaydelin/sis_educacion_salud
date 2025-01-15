<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'services';

    protected $fillable = [
        'name',
        'description'
    ];

    public function hospitals()
    {
        return $this->belongsToMany(Hospital::class, 'hospital_has_services')->withPivot('deleted_at')->withTimestamps();;
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($service) {
            if ($service->isForceDeleting()) {
                $service->hospitals()->detach();
            } else {
                $service->hospitals()->each(function ($hospital) use ($service) {
                    $service->hospitals()->updateExistingPivot($hospital->id, ['deleted_at' => now()]);
                });
            }
        });

        static::restoring(function ($service) {
            $service->hospitals()->withTrashed()->each(function ($hospital) use ($service) {
                $service->hospitals()->updateExistingPivot($hospital->id, ['deleted_at' => null]);
            });
        });
    }
}

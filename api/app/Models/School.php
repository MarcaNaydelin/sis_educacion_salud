<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class School extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'schools';

    protected $fillable = [
        'name',
        'address',
        'zone',
        'district',
        'location',
        'type',
        'shift',
        'status'
    ];

    protected $casts = [
        'location' => 'array'
    ];

    public function files()
    {
        return $this->hasMany(FileSchool::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'school_has_courses');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($school) {
            if ($school->isForceDeleting()) {
                $school->files()->forceDelete();
                $school->courses()->detach();
            } else {
                $school->files()->delete();
                $school->courses()->each(function ($course) use ($school) {
                    $school->courses()->updateExistingPivot($course->id, ['deleted_at' => now()]);
                });
            }
        });

        static::restoring(function ($school) {
            $school->files()->withTrashed()->restore();
            $school->courses()->withTrashed()->each(function ($course) use ($school) {
                $school->courses()->updateExistingPivot($course->id, ['deleted_at' => null]);
            });
        });
    }
}

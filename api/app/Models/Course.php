<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'courses';

    protected $fillable = [
        'name',
        'description'
    ];

    public function schools()
    {
        return $this->belongsToMany(School::class, 'school_has_courses');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($course) {
            if ($course->isForceDeleting()) {
                $course->schools()->detach();
            } else {
                $course->schools()->each(function ($school) use ($course) {
                    $course->schools()->updateExistingPivot($school->id, ['deleted_at' => now()]);
                });
            }
        });

        static::restoring(function ($course) {
            $course->schools()->withTrashed()->each(function ($school) use ($course) {
                $course->schools()->updateExistingPivot($school->id, ['deleted_at' => null]);
            });
        });
    }
}

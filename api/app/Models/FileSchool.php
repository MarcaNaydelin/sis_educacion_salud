<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FileSchool extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'school_has_files';

    protected $fillable = [
        'school_id',
        'name',
        'path',
        'status'
    ];

    public function schools()
    {
        return $this->belongsTo(School::class);
    }
}

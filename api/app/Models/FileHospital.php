<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FileHospital extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'hospital_has_files';

    protected $fillable = [
        'hospital_id',
        'name',
        'path',
        'status'
    ];

    public function schools()
    {
        return $this->belongsTo(Hospital::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrolment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function student(){
        $this->belongsTo(User::class,'student_id','id');
    }

    public function course(){
        $this->belongsTo(Course::class,'course_id','id');
    }
}

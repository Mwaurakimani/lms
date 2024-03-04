<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrolment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Psy\Util\Json;

class CourseController extends Controller
{
    public function create(Request $request)
    {
        $course = json_decode($request->input('course'));

        DB::beginTransaction();

        try {

            $course_saved = Course::create([
                'title' => $course->title,
                'description' => $course->description,
                'image' => $course->image,
                'banner' => $course->banner,
                'status' => $course->status,
            ]);

            DB::commit();

            return $course_saved;
        }catch (\Exception  $exception){
            DB::rollBack();
            return $exception;
        }
    }

    public function viewAll(Request $request)
    {
        return Course::all();
    }

    public function viewCourse(Request $request, Course $id)
    {
        return $id;
    }

    public function enroll(Request $request, Course $id)
    {
        $course = $id;

        DB::beginTransaction();

        try {
            $enrollment = Enrolment::create([
                'student_id' => Auth::user()->id,
                'course_id' => $course->id
            ]);

            return ['success'];

        }catch (\Exception $err){
            DB::rollBack();
            return $err;
        }
    }

    public function viewEnrolled(Request $request){
        $enrolled = Enrolment::where('student_id',Auth::user()->id)->get()->pluck('course_id');
        $courses = Course::whereIn('id', $enrolled)->get();

        return $courses;
    }
}

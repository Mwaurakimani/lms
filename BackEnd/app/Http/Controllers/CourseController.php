<?php

namespace App\Http\Controllers;


use App\Models\Course;
use App\Models\Enrolment;
use App\Models\Modules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function create(Request $request)
    {
        DB::beginTransaction();

        try {

            $course_saved = Course::create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'status' => $request->input('status'),
            ]);

            if ($request->file('image')) {
                $path = $this->uploadCourseImage(
                    $request->file('image'),
                    '/courses/image/' . $course_saved->id
                );

                $course_saved->image = $path;
            }

            if ($request->file('banner')) {
                $path = $this->uploadCourseImage(
                    $request->file('image'),
                    '/courses/banner/' . $course_saved->id
                );

                $course_saved->banner = $path;
            }

            $modules =
                $request->input('modules') ?
                    json_decode($request->input('modules')) :
                    null;

            if ($modules) {
                foreach ($modules as $module) {
                    $module_save = new Modules();

                    $module_save->title = $module->title;
                    $module_save->description = $module->description;
                    $module_save->video = $module->file;
                    $module_save->time = $module->time;
                    $module_save->course_id = $course_saved->id;

                    $module_save->save();
                }
            }

            $course_saved->save();


            DB::commit();

            return $course_saved;
        } catch (\Exception  $exception) {
            DB::rollBack();
            return $exception;
        }
    }

    public function viewAll(Request $request)
    {
        return Course::with('modules')->get();
    }

    public function viewCourse(Request $request, Course $id)
    {
        return $id->load('modules');
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

        } catch (\Exception $err) {
            DB::rollBack();
            return $err;
        }
    }

    public function viewEnrolled(Request $request)
    {
        $enrolled = Enrolment::where('student_id', Auth::user()->id)->get()->pluck('course_id');
        $courses = Course::whereIn('id', $enrolled)->get();

        return $courses;
    }

    /**
     * @throws \Exception
     */
    private function uploadCourseImage(array|\Illuminate\Http\UploadedFile|null $file, string $passPath)
    {
        $path = null;

        try {
            // Generate a random file name using Str::random()
            $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();

            // Store the file with the generated file name
            $storage = $file->storeAs('public' . $passPath, $fileName);

            $path = $passPath . '/' . $fileName;

            // Return the path to the stored file
            return $path;
        } catch (\Exception $e) {
            throw new \Exception('Error uploading image: ' . $e->getMessage());
        }
    }

}

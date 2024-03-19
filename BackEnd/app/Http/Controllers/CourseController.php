<?php

namespace App\Http\Controllers;


use App\Models\Course;
use App\Models\Enrolment;
use App\Models\Modules;
use App\Models\User;
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
                    $request->file('banner'),
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

    public function enroll(Request $request, User $User, Course $Course)
    {
        DB::beginTransaction();

        try {
            $enrollment = Enrolment::create([
                'student_id' => $User->id,
                'course_id' => $Course->id
            ]);

            DB::commit();
            return [$enrollment];

        } catch (\Exception $err) {
            DB::rollBack();
            return $err;
        }
    }

    public function viewEnrolled(Request $request)
    {
        $enrolled = Enrolment::where('student_id', Auth::user()->id)
            ->with(['course'])
            ->get();

        return $enrolled;
    }

    public function study(Request $request, Course $Course){
        $Course->load('modules');
        return $Course;
    }

    public function getModule(Request $request,Modules $Module){
        $user = Auth::user()->id;
        $course = $Module->course_id;
        $enrol = Enrolment::where('student_id',$user)->where('course_id',$course)->first();
        $enrol->current_module = $Module->id;
        $enrol->save();

        $modules = Modules::where('course_id',$course)->get();
        $count = $modules->count();

        $enrol->next_module = ($enrol->current_module/$count)*100;
        $enrol->save();

        if($enrol->next_module == 100){
            $enrol->status = "Completed";
            $enrol->save();
        }

        return [$Module];
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

    public function delete(Request $request, Course $course)
    {
        return response()->json($course->delete());
    }

}

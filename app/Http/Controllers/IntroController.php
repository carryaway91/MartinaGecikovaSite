<?php

namespace App\Http\Controllers;

use App\Http\Resources\IntroResource;
use App\Models\Intro;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class IntroController extends Controller
{
    public function index() {
        return new IntroResource(Intro::first());
    }

    public function create($request) {
        $request->validate([
            'front_title' => 'required',
            'front_second_title' => 'required',
            'photo' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time() . '-' . $request->photo->extension();
        $request->photo->move(base_path('\storage\app\public'), $imageName);
        $path = Storage::url($imageName);
        
        Intro::create([
            'front_title' => $request->front_title,
            'front_second_title' => $request->front_second_title,
            'intro_photo' => $path
        ]);

        return response([
            'status' => 'success',
            'message' => 'Intro created!'
        ], 201);
    }

    public function update(Intro $intro, Request $request) {

        $intro = Intro::first();
        if(empty($intro)) {
            $this->create($request);
        }

        $request->validate([
            'front_title' => 'required',
            'front_second_title' => 'required',
            'photo' => ''
        ]);
        

        if (!empty($request->photo)) {
            $imageName = time() . '-' . $request->photo->extension();
            $request->photo->move(base_path('\storage\app\public'), $imageName);
            $path = Storage::url($imageName);
    
            Intro::first()->update([
                'front_title' => $request->front_title,
                'front_second_title' => $request->front_second_title,
                'intro_photo' => $path
            ]);
        } else {
            Intro::first()->update([
                'front_title' => $request->front_title,
                'front_second_title' => $request->front_second_title,
            ]);
        }
    }
}

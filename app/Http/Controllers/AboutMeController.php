<?php

namespace App\Http\Controllers;

use App\Http\Resources\AboutMeResource;
use App\Http\Resources\IntroResource;
use App\Models\AboutMe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutMeController extends Controller
{

    public function index() {
        return new AboutMeResource(AboutMe::first());
    }

    public function create($request) {
        $request->validate([
            'about' => 'required',
            'aboutPhoto' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

            $imageName = time() . '-' . $request->aboutPhoto->extension();
            $request->aboutPhoto->move(base_path('\storage\app\public'), $imageName);
            $path = Storage::url($imageName);

            AboutMe::create([
                'about' => $request->about,
                'aboutPhoto' => $path
            ]);

            return response([
                'status' => 'success',
                'message' => 'About info has been created!'
            ], 201);
    }


    public function update( Request $request) {

        $about = AboutMe::first();

        if(empty($about)) {
            $this->create($request);
        }

        $this->validateData();

        
        if(!empty($request->aboutPhoto)) {
            $imageName = time() . '-' . $request->aboutPhoto->extension();
            $request->aboutPhoto->move(base_path('\storage\app\public'), $imageName);
            $path = Storage::url($imageName);

            AboutMe::first()->update([
                'about' => $request->about,
                'aboutPhoto' => $path
            ]);
        } else {
            AboutMe::first()->update([
                'about' => $request->about
            ]);
        } 

    }
    
    private function validateData() {
        request()->validate([
            'about' => 'required',
            'aboutPhoto' => ''
        ]);
    }
}
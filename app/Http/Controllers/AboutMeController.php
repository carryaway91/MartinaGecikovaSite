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

    public function update( Request $request) {
        $this->validateData();

        
        if(!empty($request->photo)) {
            $imageName = time() . '-' . $request->photo->extension();
            $request->photo->move(base_path('\storage\app\public'), $imageName);
            $path = Storage::url($imageName);

            AboutMe::first()->first()->update([
                'about' => $request->about,
                'photo' => $path
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
            'photo' => ''
        ]);
    }
}
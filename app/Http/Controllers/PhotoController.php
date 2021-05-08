<?php

namespace App\Http\Controllers;

use App\Http\Resources\PhotoResource;
use App\Models\Photo;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    
    public function index(Photo $photo) {
        return PhotoResource::collection($photo->all());
    }

    public function store(Request $request) {
        
        // zvalidujem co pride
            $this->validatedData();
            
            
            // vytvorim originalny nazov pre fotku aby niekto neposlal dve fotky s tym istym nazvom
            $newImageName = time() . '.' . $request->image->extension();
    
            // potom tuto fotku premiestnim do zlinkovaneho storage
            $request->image->move(base_path('\storage\app\public'), $newImageName);
            
            // odoberem URL kde obrazok je ulozeny
            $path = Storage::url($newImageName);
            
            // vytvorim fotku
            return Photo::create([
                'gallery_id' => $request->gallery_id,
                'image' => $path,
                'title' => $request->title,
                'description' => $request->description
            ]);
            
    }

    public function show(Photo $id) {
        return Photo::find($id);
    }

    public function update(Photo $photo, Request $request) {
        $request->validate([
            'title'=> '',
            'description' => '',
            'gallery_id' => 'required'
        ]);

        $photo->update([
            'title' => $request->title,
            'description' => $request->description,
            'gallery_id' => $request->gallery_id
        ]);
    }

    public function destroy(Photo $photo) {
        return $photo->delete();
    }

    protected function validatedData() {

            request()->validate([
                'gallery_id' => 'required',
                'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'title' => '',
                'description' => ''
                ]);
    }
        
}

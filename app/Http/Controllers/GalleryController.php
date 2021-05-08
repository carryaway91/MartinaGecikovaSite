<?php

namespace App\Http\Controllers;

use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    
    public function index(Gallery $gallery) {
        return GalleryResource::collection($gallery->all());
    }
    
    public function show(Gallery $id) {
        return new GalleryResource($id);
    }
    
    public function store(Request $request) {

        $this->validatedData();

        $imageName = time() . '.' . $request->coverPhoto->extension();
        $request->coverPhoto->move(base_path('\storage\app\public'), $imageName);

        $imagePath = Storage::url($imageName);

        Gallery::create([
            'name' => $request->name,
            'coverPhoto' => $imagePath,
        ]);
    }

    public function update(Gallery $gallery, Request $request) {
        $request->validate([
            'coverPhoto' => '',
            'name' => '',
        ]);

        if(!empty($request->coverPhoto)) {
            $imageName = time() . '.' . $request->coverPhoto->extension();
            $request->coverPhoto->move(base_path('\storage\app\public'), $imageName);
            $path = Storage::url($imageName);
    
            $gallery->update([
                'name' => $request->name,
                'coverPhoto' => $path
            ]);
        } else {
            $gallery->update([
                'name' => $request->name
            ]);
        }
    }

    public function destroy(Gallery $gallery) {
        return $gallery->delete();
    }

    public function getCategories(Gallery $gallery) {
        return GalleryResource::collection($gallery->all());
    }
    
    protected function validatedData() {
        return request()->validate([
            'name' => 'required',
            'coverPhoto' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    } 
}

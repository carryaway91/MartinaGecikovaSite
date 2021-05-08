<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    public function index() {
        return Contact::all();
    }

    public function store(Request $request) {
        
        $request->validate([
            'email' => 'required|string|email',
            'message' => 'required|min:6'
        ]);
        
        Contact::create([
            'email' => $request->email,
            'message' => $request->message
        ]);
        
        return response([
            'status' => 'Success',
            'message' => 'Thank you for your message!'
        ], 201);
    }
}

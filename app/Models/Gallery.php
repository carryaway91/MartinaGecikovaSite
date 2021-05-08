<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Photo;


class Gallery extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function photos() {
        return $this->hasMany(Photo::class);
    }
   
    public function getNameAttribute($value) {
        return $value;
    }
}

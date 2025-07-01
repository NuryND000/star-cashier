<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Toko extends Model
{
protected $fillable = ['name', 'alamat', 'no_telp'];
    use HasFactory;
}

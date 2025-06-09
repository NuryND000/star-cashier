<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class suplay extends Model
{
    use HasFactory;
    
    protected $fillable = ['produk_id', 'jumlah'];

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }
}

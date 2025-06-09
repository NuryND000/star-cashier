<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class transaksi extends Model
{
    use HasFactory;
    protected $fillable = ['produk_id', 'jumlah', 'beli', 'jual', 'created_at'];
    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }
}

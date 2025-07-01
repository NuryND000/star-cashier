<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produk extends Model
{
    use HasFactory;
    public function transaksis()
    {
        return $this->hasMany(transaksi::class);
    }
    protected $fillable = [
        'name',
        'merk',
        'kategori_id',
        'beli',
        'jual',
        'stok',
        'image',
        'barcode',
    ];

    public function suplays()
    {
        return $this->hasMany(Suplay::class);
    }

    public function kategori()
{
    return $this->belongsTo(Kategori::class);
}

}

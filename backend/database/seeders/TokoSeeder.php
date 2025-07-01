<?php

namespace Database\Seeders;
use App\Models\Toko;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TokoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Toko::create([
            'name' => 'Toko Sinar Jaya',
            'alamat' => 'Jl. Merdeka No. 10, Jakarta',
            'no_telp' => '081234567890',
        ]);
    }
}

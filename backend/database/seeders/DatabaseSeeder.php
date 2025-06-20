<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'KasirQu',
            'nama_toko'=>'Sumber Makmur',
            'alamat' => 'Jl. Jati No. 78 Sukorejo Kota Blitar',
            'no_telp'=> '081554223',
            'email' => 'kasir@mail.com',
            'password'=> Hash::make('kasir123'),
        ]);
    }
}

<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
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
DB::table('users')->truncate();
        \App\Models\User::factory()->create([
            'name' => 'Bintang Emon',
            'no_telp'=> '081554223',
            'email' => 'admin@mail.com',
            'password'=> Hash::make('admin123'),
	    'role' => 'admin',
        ]);

	    $this->call([
        TokoSeeder::class,
    ]);
    }
}

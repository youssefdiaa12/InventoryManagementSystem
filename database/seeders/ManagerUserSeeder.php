<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ManagerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\User::factory()->create([
            'name' => 'Warehouse Manager',
            'email' => 'manager@inventory.com',
            'password' => bcrypt('password'),
            'role' => 'manager',
        ]);
    }
}

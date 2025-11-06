<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class ManagerUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'manager@inventory.com'],
            [
                'name' => 'Warehouse Manager',
                'password' => bcrypt('password'),
                'role' => 'manager',
            ]
        );
    }
}

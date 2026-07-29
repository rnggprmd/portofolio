<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'period',
        'role',
        'company',
        'type',
        'location',
        'description',
        'responsibilities',
        'tech_badges',
        'order',
    ];

    protected $casts = [
        'responsibilities' => 'array',
        'tech_badges' => 'array',
    ];
}

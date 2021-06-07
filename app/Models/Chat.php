<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static orderBy(string $string, string $string1)
 */
class Chat extends Model
{
    protected $table = "chats";
    protected $fillable = [
        "usuario", "mensaje"
    ];



}

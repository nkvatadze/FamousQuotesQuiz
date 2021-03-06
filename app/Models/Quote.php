<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quote extends Model
{
    use HasFactory;

    const BINARY_MODE = 'binary';
    const MULTIPLE_MODE = 'multiple';
    const BINARY_CHOICE_YES = 'yes';
    const BINARY_CHOICE_NO = 'no';

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }
}

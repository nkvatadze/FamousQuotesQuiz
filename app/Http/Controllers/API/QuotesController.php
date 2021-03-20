<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuoteResource;
use App\Models\Option;
use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuotesController extends Controller
{
    const QUOTES_PER_SESSION = 10;
    const RANDOM_OPTION_AMOUNT = 2;

    public function index(): JsonResource
    {
        $options = Option::cursor()->remember();
        $quotes = Quote::with('option')
            ->inRandomOrder()->take(self::QUOTES_PER_SESSION)->get()
            ->each(fn($quote) => $quote->options = collect(
                $options->where('id', '!=', $quote->id)->random(self::RANDOM_OPTION_AMOUNT))->push($quote->option)->shuffle()
            );

        return QuoteResource::collection($quotes);
    }
}

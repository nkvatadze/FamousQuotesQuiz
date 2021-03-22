<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\IndexQuoteRequest;
use App\Http\Resources\QuoteResource;
use App\Models\Author;
use App\Models\Quote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuotesController extends Controller
{
    const QUOTES_PER_SESSION = 10;
    const RANDOM_AUTHORS_AMOUNT = 2;

    public function index(IndexQuoteRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $authors = Author::cursor()->remember();
        $quotes = Quote::with('author')->inRandomOrder()->take(self::QUOTES_PER_SESSION)->get();

        if ($validated['mode'] === Quote::MULTIPLE_MODE) {
            $quotes = $quotes->each(fn($quote) => $quote->authors = collect(
                $authors->where('id', '!=', $quote->id)->random(self::RANDOM_AUTHORS_AMOUNT))->push($quote->author)->shuffle()
            );
        } elseif ($validated['mode'] === Quote::BINARY_MODE) {
            $quotes = $quotes->each(fn($quote) => $quote->authors = collect([
                rand(0, 10) > 5 ? $quote->author : $authors->where('id', '!=', $quote->id)->random()
            ]));
        }

        return response()->json([
            'mode' => request()->get('mode'),
            'quotes' => QuoteResource::collection($quotes)
        ]);
    }
}

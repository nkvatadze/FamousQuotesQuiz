<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Quote;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class QuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quotesGroupedByAuthor = collect(Http::get('https://goquotes-api.herokuapp.com/api/v1/random?count=200')->json()['quotes'])
            ->groupBy('author');
        $insertData = [];
        foreach ($quotesGroupedByAuthor as $author => $quotes) {
            $author = Author::create([
                'name' => $author
            ]);
            foreach ($quotes as $quote) {
                $insertData [] = [
                    'text' => $quote['text'],
                    'author_id' => $author->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
        }
        Quote::insert($insertData);
    }
}

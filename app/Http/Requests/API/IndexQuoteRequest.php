<?php

namespace App\Http\Requests\API;

use App\Models\Quote;
use Illuminate\Foundation\Http\FormRequest;

class IndexQuoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return $this->wantsJson();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'mode' => 'required|string|in:' . Quote::BINARY_MODE . ',' . Quote::MULTIPLE_MODE
        ];
    }
}

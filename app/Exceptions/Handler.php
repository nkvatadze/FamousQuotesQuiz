<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (\Exception $e, Request $request) {
            if ($e instanceof ValidationException) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'errors' => $e->errors()
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($e instanceof ModelNotFoundException)
                return response()->json([
                    'code' => Response::HTTP_NOT_FOUND,
                    'errors' => "Not found, please reload page"
                ], Response::HTTP_NOT_FOUND);
        });
    }
}

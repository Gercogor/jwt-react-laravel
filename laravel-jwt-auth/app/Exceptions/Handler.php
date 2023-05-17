<?php

namespace App\Exceptions;

use Exception;
use HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Exception|Throwable $e
     * @return Response
     */
    public function render($request, $e)
    {
        $response = $this->handleException($request, $e);
        return $response;
    }

    public function handleException($request, Exception $e)
    {

        if ($e instanceof MethodNotAllowedHttpException) {
            return response()->json(['error'=>'The specified method for the request is invalid'], 405);
        }

        if ($e instanceof NotFoundHttpException) {
            return response()->json(['error'=>'The specified URL cannot be found'], 404);
        }

        if ($e instanceof HttpException) {
            return response()->json($e->getMessage(), $e->getStatusCode());
        }

        if (config('app.debug')) {
            return parent::render($request, $e);
        }

        return response()->json(['error'=>'Unexpected Exception. Try later'], 500);

    }
}

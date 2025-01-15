<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Throwable;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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

    public function render($request, Throwable $e)
    {
        if ($request->expectsJson()) {
            if ($e instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'No existe el recurso que se desea obtener',
                    'errors' => $e->getMessage(),
                ], Response::HTTP_NOT_FOUND);
            }
            if ($e instanceof NotFoundHttpException) {
                return response()->json([
                    'message' => 'Runta no encontrada'
                ], Response::HTTP_NOT_FOUND);
            }
            if ($e instanceof \PDOException) {
                return response()->json([
                    'error' => $e->getMessage(),
                    'message' => 'Error de base de datos'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            if ($e instanceof AuthorizationException) {
                return response()->json([
                    'message' => 'No tienes los permisos necesarios para realizar esta acción'
                ], Response::HTTP_FORBIDDEN);
            }
            if ($e instanceof HttpException) {
                return response()->json([
                    'message' => $e->getMessage()
                ], $e->getStatusCode());
            }
            if ($e instanceof TokenMismatchException) {
                return response()->json([
                    'message' => 'Sesión expirada. Por favor, recarga la página.'
                ], 419);
            }
            if ($e instanceof ValidationException) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $e->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            return response()->json([
                'message' => 'Error interno del servidor',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return parent::render($request, $e);
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}

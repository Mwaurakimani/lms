<?php

namespace App\Http\Middleware;

use Closure;

class DumpMiddleware
{
    public function handle($request, Closure $next)
    {
        // Execute the next middleware in the pipeline
        $response = $next($request);

        // Add the CORS header to the response
        $response->headers->set('Access-Control-Allow-Origin', '*');

        // Return the modified response
        return $response;
    }
}

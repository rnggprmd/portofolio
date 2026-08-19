<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS on production (needed for InfinityFree & shared hosting behind proxy)
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
            // Trust all proxies (InfinityFree uses reverse proxy/CDN)
            Request::setTrustedProxies(['*'], Request::HEADER_X_FORWARDED_FOR | Request::HEADER_X_FORWARDED_HOST | Request::HEADER_X_FORWARDED_PORT | Request::HEADER_X_FORWARDED_PROTO);
        }

        // Set global password validation defaults (min 8 chars)
        Password::defaults(fn () => Password::min(8));
    }
}

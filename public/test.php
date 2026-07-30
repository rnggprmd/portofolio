<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use Illuminate\Http\Request;
use Illuminate\Contracts\Http\Kernel;

echo "<h1>PHP & Laravel Kernel Test</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";

try {
    require __DIR__ . '/../vendor/autoload.php';
    echo "<p>✅ Autoload OK</p>";

    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "<p>✅ App Bootstrapped OK</p>";

    $kernel = $app->make(Kernel::class);
    echo "<p>✅ Kernel Resolved OK</p>";

    $request = Request::capture();
    $response = $kernel->handle($request);

    echo "<p>✅ Kernel Handled! Status Code: " . $response->getStatusCode() . "</p>";
    
    // Check if it's a redirect
    if ($response->isRedirection()) {
        echo "<p style='color: orange;'>⚠️ Redirect Target: " . $response->headers->get('Location') . "</p>";
    }

    echo "<h3>Response Content:</h3>";
    echo "<div style='border: 2px solid #0070f3; padding: 15px; margin-top: 15px; background: #fff;'>";
    echo htmlspecialchars(substr($response->getContent(), 0, 1000));
    if (strlen($response->getContent()) > 1000) {
        echo "<br>... (truncated)";
    }
    echo "</div>";

    $kernel->terminate($request, $response);

} catch (Throwable $e) {
    echo "<div style='background: #fee; border: 2px solid red; padding: 20px; color: red;'>";
    echo "<h2>❌ Fatal Exception Caught:</h2>";
    echo "<p><strong>Message:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>File:</strong> " . $e->getFile() . " on line " . $e->getLine() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
    echo "</div>";
}

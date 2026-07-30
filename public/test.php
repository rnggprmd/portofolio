<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use Illuminate\Http\Request;

echo "<h1>PHP & Laravel Diagnostic Test</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";

try {
    require __DIR__ . '/../vendor/autoload.php';
    echo "<p>✅ Autoload OK</p>";

    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "<p>✅ App Bootstrapped OK</p>";

    echo "<h2>Executing Request...</h2>";
    $request = Request::capture();
    $response = $app->handleRequest($request);

    echo "<p>✅ Request Handled! Status Code: " . $response->getStatusCode() . "</p>";
    echo "<div style='border: 1px solid #ccc; padding: 15px; margin-top: 15px;'>";
    echo $response->getContent();
    echo "</div>";

} catch (Throwable $e) {
    echo "<div style='background: #fee; border: 2px solid red; padding: 20px; color: red;'>";
    echo "<h2>❌ Fatal Exception Caught:</h2>";
    echo "<p><strong>Message:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>File:</strong> " . $e->getFile() . " on line " . $e->getLine() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
    echo "</div>";
}

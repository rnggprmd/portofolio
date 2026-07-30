<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>PHP Test Page</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";

echo "<h2>Testing Vendor Autoload:</h2>";
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    echo "<p>✅ vendor/autoload.php exists!</p>";
    try {
        require __DIR__ . '/../vendor/autoload.php';
        echo "<p>✅ vendor/autoload.php loaded successfully!</p>";
    } catch (Throwable $e) {
        echo "<p style='color:red'>❌ Error loading vendor/autoload.php: " . $e->getMessage() . "</p>";
    }
} else {
    echo "<p style='color:red'>❌ vendor/autoload.php DOES NOT EXIST!</p>";
}

echo "<h2>Testing Bootstrap App:</h2>";
if (file_exists(__DIR__ . '/../bootstrap/app.php')) {
    echo "<p>✅ bootstrap/app.php exists!</p>";
    try {
        $app = require_once __DIR__ . '/../bootstrap/app.php';
        echo "<p>✅ bootstrap/app.php loaded successfully! App type: " . get_class($app) . "</p>";
    } catch (Throwable $e) {
        echo "<p style='color:red'>❌ Error loading bootstrap/app.php: " . $e->getMessage() . "</p>";
    }
} else {
    echo "<p style='color:red'>❌ bootstrap/app.php DOES NOT EXIST!</p>";
}

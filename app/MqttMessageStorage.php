<?php

// app/MqttMessageStorage.php

namespace App;

class MqttMessageStorage
{
private static $instance;
private $message = '';

private function __construct()
{
// Private constructor to prevent direct instantiation
}

public static function getInstance()
{
if (!self::$instance) {
self::$instance = new self();
}

return self::$instance;
}

public function setMessage($message)
{
    $this->message = $message;

}

public function getMessage()
{
return $this->message;
}
}
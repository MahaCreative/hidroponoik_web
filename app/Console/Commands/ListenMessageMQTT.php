<?php

namespace App\Console\Commands;

use App\Events\GetMessageMQTTEvent;
use App\Models\DataIot;
use App\MqttMessageStorage;
use Illuminate\Console\Command;
use PhpMqtt\Client\ConnectionSettings;
use PhpMqtt\Client\Facades\MQTT;
use PhpMqtt\Client\MqttClient;

class ListenMessageMQTT extends Command
{
    protected $signature = 'mqtt:listen';
    protected $description = 'Listen for MQTT messages from Arduino';

    public function handle()
    {
        $mqttBroker = 'test.mosquitto.org'; // Ganti dengan broker yang sesuai
        $mqttPort = 1883;
        $clientId = 'laravel-mqtt-client';
        $clean_session = true;
        $connectionSetting = (new ConnectionSettings)
        ->setConnectTimeout(10)
        ->setKeepAliveInterval(60);
        $mqtt = new MqttClient($mqttBroker, $mqttPort, $clientId);
        $mqtt->connect($connectionSetting, $clean_session);
        printf("Client connected");
        $messageDecoded = '';

      $mqtt->subscribe('ESP/IOT', function ($topic, $message) {
            $messageDecoded = json_decode($message); // Jika pesan berupa JSON, decode menjadi objek PHP
            $messageStorage = MqttMessageStorage::getInstance();
            $messageStorage->setMessage($messageDecoded);
            broadcast(new GetMessageMQTTEvent($messageDecoded))->toOthers();

            printf("Received message on topic [%s]: %s\n", $topic, $message);
        }, 0);
        $mqtt->loop(true);


    }
}
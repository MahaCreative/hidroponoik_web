<?php

use App\Models\DataIot;
use App\MqttMessageStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpMqtt\Client\Facades\MQTT;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', function(){


    return inertia('Home');
});
Route::post('publish', function(Request $request){
    $data = DataIot::findOrFail(1);

    $data->update(['dinamo' => $request->data]);
    MQTT::publish('ESP/IOT', $request->data);
    return redirect()->back();
})->name('publish');
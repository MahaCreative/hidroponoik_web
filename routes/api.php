<?php

use App\Events\GetMessageMQTTEvent;
use App\Models\DataIot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('getData', function(){
    $data = DataIot::first();
    return json_decode($data);
})->name('getData');

Route::post('postData', function(Request $request){
    $data = DataIot::findOrFail(1);
    $data->update([
        'data_ph' => $request->dataPH,
    ]);
    broadcast(new GetMessageMQTTEvent($data))->toOthers();
    return $data;
});
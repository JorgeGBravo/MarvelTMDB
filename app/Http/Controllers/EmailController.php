<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use DB;

class EmailController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function newFuncitonUpdate(){
        $result = DB::select('select email from users ');

    }

    public function __invoke(Request $request)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail;
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

    public function contact(Request $request){

        $mails = User::select('select email from users');
        foreach ($mails as $mail ){

            $subject = $request->input('asunto');
            $for = $mail;
            Mail::send('email',$request->all(), function($msj) use($subject,$for){
                $msj->from("admincomicsypeliculas@comicsypeliculas.com","Administrador");
                $msj->subject($subject);
                $msj->to($for);
            });
            return redirect()->back();
        }
    }
}

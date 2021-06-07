<?php

namespace App\Http\Livewire;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Log;
use DB;


class ChatList extends Component
{
    public $usuario;
    public $mensajes;
    protected $ultimoId;

    protected $listeners = ['mensajeRecibido', 'cambioUsuario'];

    public function mount()
    {
        $ultimoId = 0;
        $this->mensajes = [];

        $this->usuario = request()->query('usuario', Auth::id()) ?? "";
        $this->actualizarMensajes();
        log::info('estamos en mount');
        log::info($this->usuario);
    }

    public function  mensajeRecibido($data)
    {
        log::info('mensajeRecibido');
        $this->actualizarMensajes($data);
    }

    public function cambioUsuario($usuario)
    {
        $this->usuario = $usuario;
    }

    public function actualizarMensajes()
    {
    log::info('actualizarMensajes');
        if($this->usuario != "")
        {
            log::info('hey');
            // El contenido de la Push
            //$data = \json_decode(\json_encode($data));

            $mensajes = Chat::orderBy("created_at", "desc")->take(5)->get();
            log:info($mensajes);
            //$this->mensajes = [];

            foreach($mensajes as $mensaje)
            {
                //$mensaje->usuario
                    $this->ultimoId = $mensaje->id;
                    log::info($mensaje->usuario);
                    $requestName= DB::select('select name from users where id = "'.$mensaje->usuario.'"');


                    $item = [
                        "id" => $mensaje->id,
                        "usuario" => $requestName[0]->name,
                        "mensaje" => $mensaje->mensaje,
                        "recibido" => ($mensaje->usuario != Auth::id()),
                        "fecha" => $mensaje->created_at->diffForHumans()
                    ];

                    array_unshift($this->mensajes, $item);
                    //array_push($this->mensajes, $item);

                log::info($item);

                if(count($this->mensajes) > 5)
                {
                    array_pop($this->mensajes);
                }
            }


        }
        else
        {
            log::info('heyElse');
            $this->emit('solicitaUsuario');
        }
    }

    public function resetMensajes()
    {
        log::info('resetMensajes');
        $this->mensajes = [];
        $this->actualizarMensajes();
    }

    public function dydrate()
    {
        if($this->usuario == "")
        {
            // Le pedimos el uisuario al otro componente
            $this->emit('solicitaUsuario');
        }
    }

    public function render()
    {
        return view('livewire.chat-list');
    }
}

//BD::select('select name from users where id = "'. $mensaje->usuario.'"')

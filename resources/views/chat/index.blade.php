@extends("layouts.general")
@section("contenido")

    <div class="col mx-3 my-3">

        <div class="col">
            <div class="col-md-6">
                @livewire("chat-list")
            </div>
            <div class="col-md-6">
                @livewire("chat-form")
            </div>
        </div>

    </div>

@endsection("contenido")

<div class="">



    <!-- El Usuario
    <div class="form-group">
        <label for="usuario"><strong>Usuario</strong></label>
        <input
            type="text"
            wire:model="usuario"
            class="form-control"
            id="usuario">-->

        <!-- Validación
        @error("usuario")
        <small class="text-danger">{{ $message }}</small>
        @else
            <small class="text-muted">Tu nombre: {{$usuario}}</small>
            @enderror
    </div> -->

    <!-- Mensaje de Chat a Enviar -->
    <div class="form-group">
        <label for="mensaje"><strong>Mensaje</strong></label>
        <input type="text"
               wire:model="mensaje"
               wire:keydown.enter="enviarMensaje"
               class="form-control"
               id="mensaje"
               onclick="limpiarFormulario()">

        <!-- Validación -->
        @error("mensaje")
        <small class="text-danger">{{ $message }}</small>
        @else
            <small class="text-muted">Escribe tu mensaje y teclea <code>ENTER</code> para enviarlo</small>
            @enderror
    </div>

    <div wire:offline class="alert alert-danger text-center">
        <strong>Se ha perdido la conexión a Internet</strong>
    </div>

    <div class="row">
        <div class="col-6">
            <!-- Mensajes de alerta -->
            <div style="position: absolute;"
                 class="alert alert-success collapse"
                 role="alert"
                 id="avisoSuccess"
            >Se ha enviado</div>
        </div>
        <div class="col-6 pt-2 text-right">
            <button
                id="boton"
                class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                wire:click="enviarMensaje"
                wire:loading.attr="disabled"
                wire:offline.attr="disabled"
            >Enviar Mensaje</button>
        </div>
    </div>

    <script>
        function limpiarFormulario() {
            document.getElementById('mensaje').value = "";
        };

        // Esto lo recibimos en JS cuando lo emite el componente
        // El evento "enviadoOK"
        $( document ).ready(function() {
            window.livewire.on('enviadoOK', function () {
                $("#avisoSuccess").fadeIn("slow");
                setTimeout(function(){ $("#avisoSuccess").fadeOut("slow"); }, 3000);
            });
        });



    </script>

</div>

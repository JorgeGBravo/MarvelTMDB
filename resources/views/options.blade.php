<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Hola '. Auth::user()->name . ', solo puedes hacer estas cosas... no son muchas pero...') }}
        </h2>
    </x-slot>
    <div id="item" class="flex flex-row">
        <div id="left" class="w-1/5 h-screen"></div>
        <div id="center" class=" w-3/5 -mt-1">
            <div id="visor" class="justify-between mt-52 bg-customHeader ">
                    <h1 id="h1film" class="flex justify-center py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 -mt-40" >Opciones</h1>
                    <h1 id="h1film" class="flex justify-center py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " >Cambio de color de fondo</h1>
                    <!--<h1 id="h1film" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 -mt-40" style="display: none"> Films cedidos por TBMD</h1>-->
                    <div id="visorOptionsColors" class="flex flex-wrap justify-evenly">
                        <script>
                            window.onload = function (){loadColorsBackGround()};
                        </script>
                    </div>
                <!--<div><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow" onclick="getColorUser()">
                        <a >prueba</a>
                    </button></div>-->
            </div>
        </div>
        <div id="right" class="w-1/5 h-screen"></div>
    </div>
</x-app-layout>


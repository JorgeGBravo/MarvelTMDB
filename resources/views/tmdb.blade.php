<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Hola, '. Auth::user()->name . ', como estas? jhgffEstoy en .... TMDB') }}
        </h2>
    </x-slot>

        <div id="buscador" class="text-center bg-gray-200">
            <label for="search"></label><input id="search" onchange="search()" type="text" placeholder="Busca tu personaje... "  autofocus>
        </div>
    <div id="item" class="flex flex-row bg-gray-200">
        <div id="left" class="w-1/5 h-screen"></div>
        <div id="center" class=" w-3/5 -mt-1">
            <div id="visor" class="justify-between mt-52 bg-customHeader ">
                    <h1 id="h1film" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 -mt-40" style="display: none"> Films cedidos por TBMD</h1>
                    <div id="visorTmdb" class="flex flex-wrap justify-evenly bg-white"></div>
            </div>
        </div>
        <div id="right" class="w-1/5 h-screen"></div>
    </div>
</x-app-layout>


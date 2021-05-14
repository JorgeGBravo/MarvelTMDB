<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <div id="buscador" class="text-center mb-10">
                        <label for="busqueda"></label><input id="busqueda" onchange="buscar()"  type="text" placeholder="Busca tu personaje... "  >
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-white">
        <div class="overflow-x-auto">
            <h1 id="h1Char" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " style="display: none"> Personajes </h1>
            <div id="visorChar" class="flex flex-row bg-white"></div>
        </div>
        <div class="overflow-x-auto">
            <h1 id="h1Comic" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " style="display: none"> Comics </h1>
            <div id="visorComics" class="flex flex-row bg-white"></div>
        </div>
        <div class="overflow-x-auto">
            <h1 id="h1film" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " style="display: none"> Peliculas </h1>
            <div id="visorTmdb" class="flex flex-row bg-white"></div>
        </div>
    </div>
</x-app-layout>


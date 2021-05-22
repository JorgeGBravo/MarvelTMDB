<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Hola, '. Auth::user()->name . ', como estas?') }}
        </h2>
    </x-slot>
    <div id="item" class="flex flex-row">
        <div id="left" class="w-1/5 h-screen"></div>
        <div id="center" class=" w-3/5">
            <div class="flex flex-col ">
                <img class="md:h-full" style="z-index:1" id="imagenStyle" src="{{asset("storage/customheader.jpg")}}"/>
                <!--<div class="bg-custom max-w-7xl mx-auto sm:px-6 lg:px-8">-->
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg opacity-60" style="z-index: 2">
                    <div class=" p-6 bg-white border-b border-gray-200">
                        <div id="buscador" class="text-center mb-10">
                            <label for="search"></label><input id="search" onchange="search()"  type="text" placeholder="Busca tu personaje... " autofocus>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" mt-52 bg-customHeader">
                <div class="overflow-x-auto">
                    <h1 id="h1Char" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " style="display: none"> Personajes </h1>
                    <div id="visorChar" class="flex flex-row bg-white"></div>
                </div>
                <div class="overflow-x-auto ">
                    <h1 id="h1Comic" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 mt-12 " style="display: none"> Comics </h1>
                    <div id="visorComics" class="flex flex-row bg-white mb-20"></div>
                </div>
                <div class="overflow-x-auto ">
                    <h1 id="h1film" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " style="display: none"> Peliculas </h1>
                    <div id="visorTmdb" class="flex flex-row bg-white"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="right" class="w-1/5 h-screen"></div>
</x-app-layout>


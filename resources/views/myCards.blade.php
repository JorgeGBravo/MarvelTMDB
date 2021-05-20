<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Hola, '. Auth::user()->name . ', como estas? Estoy en .... Mi Cards') }}
        </h2>
    </x-slot>
    <div id="item" class="flex flex-row bg-gray-200">
        <div id="left" class="w-1/5 h-screen"></div>
        <div id="center" class="w-3/5 ">
            <div id="visor" class=" mt-52 bg-customHeader">
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
        <div id="right" class="w-1/5 h-screen"></div>
    </div>

</x-app-layout>


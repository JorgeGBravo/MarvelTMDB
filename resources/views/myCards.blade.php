<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __(Auth::user()->name . ', aquí veras todas las cartas que han gustado y has clickado.') }}
        </h2>
    </x-slot>
    <script>
        window.onload = function (){
            getColorUser()
            getCardsLogin()
        };
    </script>
    <div id="item" class="flex flex-row ">
        <div id="left" class="w-1/5 h-screen"></div>
        <div id="center" class="w-3/5 ">
            <div id="visor" class="  bg-customHeader">
                <div id="divChars" class="overflow-x-auto" style="display: none">
                    <h1 id="h1Char" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " > Personajes </h1>
                    <div id="visorChar" class="flex flex-row"></div>
                </div>
                <div id="divComics" class="overflow-x-auto " style="display: none">
                    <h1 id="h1Comic" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 mt-12 " > Comics </h1>
                    <div id="visorComics" class="flex flex-row h-screen  mb-20"></div>
                </div>
                <div id="divFilms" class="overflow-x-auto" style="display: none">
                    <h1 id="h1film" class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 " > Peliculas </h1>
                    <div id="visorTmdb" class="flex flex-row"></div>
                </div>
            </div>
        </div>
        <div id="right" class="w-1/5 h-screen"></div>
    </div>

</x-app-layout>

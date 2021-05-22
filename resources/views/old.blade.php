<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"
            integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A=="
            crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/css/app.css" rel="stylesheet">
    <title>{{env('app_name')}}</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap" rel="stylesheet">
</head>
<body class="antialiased bg-gray-200 dark:bg-gray-900">
<div class="relative flex items-top justify-end  md:h-24 bg-gray-200 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
    @if (Route::has('login'))
        <div class="hidden fixed  top-0  right-100 px-6 py-4 sm:block">
            @auth
                <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 underline">Dashboard</a>
            @else
                <button
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Log in</a>
                </button>
                @if (Route::has('register'))
                    <button
                        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        <a href="{{ route('register') }}" class="text-sm text-gray-700 underline">Register</a>
                    </button>
                @endif
            @endauth
        </div>
    @endif
</div>
<div class="flex flex-col  bg-gray-200 dark:bg-gray-900">

    <div class="content-around"><img class="h-2/6 w-2/6" src="https://i.ibb.co/Kz6HFYm/MARVEL-The-Movie-db-1.png" alt="MARVEL-The-Movie-db-1" border="0" style="margin-left: 600px;"></div>
    <div class="text-center"><h1 class=" text-4xl font-roboto">MARVEL and The Movie db</h1></div>
    <div id="buscador" class="text-center mb-10">
        <label for="search"></label><input id="search" onchange="search()"  type="text" placeholder="Busca tu personaje...">
    </div>
    <div id="visor" class="flex-col"></div>
</div>
</body>
</html>
<script>
    const publicK = "7701abbe011f97d07fd57cbc7599a3b6";
    const privateK = "265976491cc8e9aa0bc0b62b38819bea7b45fb89";
    const ts = Date.now();
    const ts2 = Date.now() + 1;
    const APIKey = "5011e9d9f4f0d149651d30d4df35c971"

    async function search() {
        const busqueda = document.getElementById("search").value.toLowerCase();
        console.log(busqueda);

        const md5ComposeA = CryptoJS.MD5(ts + privateK + publicK).toString();
        const md5ComposeB = CryptoJS.MD5(ts2 + privateK + publicK).toString();

        let urlStart = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${busqueda}&ts=${ts}&apikey=${publicK}&hash=${md5ComposeA}`;
        let urlComic = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&title=${busqueda}&ts=${ts2}&apikey=${publicK}&hash=${md5ComposeB}`;
        let urlTmdb = `https://api.themoviedb.org/4/search/movie?api_key=${APIKey}&language=es-ES&query=${busqueda}`;
        let urlQuery = `/datacharacter/${busqueda}`;

        const resultBackUrlQuery = await axios.get(urlQuery);
        console.log("resultado urlQuery del BackEnd");
        console.log(resultBackUrlQuery);
        console.log("hasta aqui el BackEnd");

        if(resultBackUrlQuery.data != 0){
            console.log("BackData en función")
            document.getElementById("visor").innerHTML = resultBackUrlQuery.data.map(composeStringDataBack).join(" ");
        }
        else {
            console.log("No se encuentra ningún dato en el BackEnd")
            console.log("Llamando a APIS")
            const requestStart = await axios.get(urlStart);
            console.log("startKey");
            console.log(requestStart);
            console.log("-------------")
            const requestComic = await axios.get(urlComic);
            console.log("comics");
            console.log(requestComic.data.data);
            console.log("-------------")
            const requestTmdb = await axios.get(urlTmdb);
            console.log("Tmdb");
            console.log(requestTmdb.data);
            console.log("-------------")

            if (requestStart.status === 200 || requestComic.status === 200 || respuesta === 200) {

                document.getElementById("visor").innerHTML = requestStart.data.data.results.map(composeStringStart).join(" ");
                document.getElementById("visor").innerHTML += requestComic.data.data.results.map(composeStringComic).join(" ");
                document.getElementById("visor").innerHTML += requestTmdb.data.results.map(composeTmdb).join(" ");

            } else {
                document.getElementById("visor").innerHTML = "Hay algún problema";
            }
        }
    }

    function composeStringDataBack(dataResult){

        let data = JSON.parse(dataResult.json)

        if (data.description != null){
            return `
            			<div class="flex-col justify-center bg-white p-4 shadow rounded-lg">

            				    <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
            				        <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-52 w-52">
            					        <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full" ">
            				        </div>
            				    </button>
            				    <h2 class="mt-4 font-bold text-xl">${data.name}</h2>

                            <div>
            				    <p class="text-xs text-gray-500 text-center mt-3 overflow-y-auto">
            					    ${data.description}
            				    </p>
            				</div>
            				<div class="flex flex-col items-center">
            				    <ul class="flex flex-row mt-4 space-x-2">
            					    ${data.urls.map(composeStringUrls).join("")}
            				    </ul>
            				    <h6 class="mt-2 text-sm font-medium">Data provided by Marvel.</h6>
            				    <h6 class="mt-2 text-sm font-medium">© 2014 Marvel</h6>
                            </div>
            			</div>`

        }else {
            return `    <div class="flex-col bg-white p-4 shadow rounded-lg">
            			<div>
            				<button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"  type="button" onclick="safeCard(${data.id})">
            				    <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-52 w-52">
            					    <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full" ">
            				    </div>
            				</button>
            				<h2 class="mt-4 font-bold text-xl">${data.name}</h2>
            			</div>
            			<div>
            				<p class="text-xs text-gray-500 text-center mt-3">
            					No provisto de descripción alguna.
            				</p>
            			</div>
                        <div class="flex flex-col items-center">
            				<ul class="flex flex-row mt-4 space-x-2">
            					${data.urls.map(composeStringUrls).join("")}
            				</ul>
            				<h6 class="mt-2 text-sm font-medium">Data provided by Marvel.</h6>
            				<h6 class="mt-2 text-sm font-medium">© 2014 Marvel</h6>
                        </div>
                    </div>`
        }
    }
    function composeStringUrlsBack(data){

        return `<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
<a class="" href="${data.url}">${data.type}</a>
</button>`;
    }
    function composeStringUrls(data){
        return `<a class="waves-effect grey btn-large " href="${data.url}">${data.type}</a>`

        /*`<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
<a class="" href="${data.url}">${data.type}</a>
</button>`;*/

    }
    function arrayurls(data){
        let arrayurl = [];
        data.forEach(item => arrayurl.push(item));
        //console.log(arrayurl);
        return arrayurl;
    }

    function composeStringStart(data) {

        let urlStart = `/datacharacter`;

        axios({
            method: 'post',
            url: urlStart,
            data: {
                idPlatform: data.id,
                json: data,
                platform: "Marvel-Char",
                name: data.name,
                description: data.description,
                image: data.thumbnail.path + '.' + data.thumbnail.extension,
                urlLinks: arrayurls(data.urls),
                charComics: arrayurls(data.comics.items),
                charSeries: arrayurls(data.series.items),
                searchQuery: document.getElementById("search").value,
            }

        });

        if (data.description != null){
            return `
            			<div class="flex-col bg-white p-4 shadow rounded-lg">
            			    <div>
            				    <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
            				        <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-52 w-52">
            					        <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full" ">
            				        </div>
            				    </button>
            				    <h2 class="mt-4 font-bold text-xl">${data.name}</h2>
                            </div>
                            <div>
            				    <p class="text-xs text-gray-500 text-center mt-3 overflow-y-auto">
            					    ${data.description}
            				    </p>
            				</div>
            				<div class="flex flex-col items-center">
            				    <ul class="flex flex-row mt-4 space-x-2">
            					    ${data.urls.map(composeStringUrls).join("")}
            				    </ul>
            				    <h6 class="mt-2 text-sm font-medium">Data provided by Marvel.</h6>
            				    <h6 class="mt-2 text-sm font-medium">© 2014 Marvel</h6>
                            </div>
            			</div>`

        }else {
            return `    <div class="flex-col bg-white p-4 shadow rounded-lg content-around ">
            			<div>
            				<button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"  type="button" onclick="safeCard(${data.id})">
            				    <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-52 w-52">
            					    <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full" ">
            				    </div>
            				</button>
            				<h2 class="mt-4 font-bold text-xl">${data.name}</h2>
            			</div>
            			<div>
            				<p class="text-xs text-gray-500 text-center mt-3">
            					No provisto de descripción alguna.
            				</p>
            			</div>
                        <div class="flex flex-col items-center">
            				<ul class="flex flex-row mt-4 space-x-2">
            					${data.urls.map(composeStringUrls).join("")}
            				</ul>
            				<h6 class="mt-2 text-sm font-medium">Data provided by Marvel.</h6>
            				<h6 class="mt-2 text-sm font-medium">© 2014 Marvel</h6>
                        </div>
                    </div>`
        }
    }
    function composeStringComic(data) {

        let urlStart = `/datacharacter`;

        axios({
            method: 'post',
            url: urlStart,
            data: {
                idPlatform: data.id,
                json: data,
                platform: "Marvel-Comics",
                name: data.title,
                description: data.description,
                image: data.thumbnail.path + '.' + data.thumbnail.extension,
                diamondCode: data.diamondCode,
                creators: data.creators,
                charComics: arrayurls(data.characters.items),
                dateComics: arrayurls(data.dates),
                urlLinks: arrayurls(data.urls),
                searchQuery: document.getElementById("search").value,
            }

        });
    }
    function composeTmdb(data) {

        let urlStart = `/datacharacter`;

        axios({
            method: 'post',
            url: urlStart,
            data: {
                idPlatform: data.id,
                json: data,
                platform: "TMDb",
                name: data.original_title,
                description: data.overview,
                image: data.poster_path,
                imageBackground: data.backdrop_path,
                vote_average: data.vote_average,
                vote_count: data.vote_count,
                release_date: data.release_date,
                searchQuery: document.getElementById("search").value,
            }

        });
    }


</script>

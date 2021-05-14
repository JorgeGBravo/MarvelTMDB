<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Scripts -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"
                integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A=="
                crossorigin="anonymous"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <!-- Styles -->
        <style>

            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-t{border-top-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}}
        </style>

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 underline">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Log in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                        @endif
                    @endauth
                </div>
            @endif
            <div>
            </div>
                <!-- Body App-->

                <div class="row">
                    <div class="text-center"><h1 class=" text-red-600 text-4xl font-roboto">The MARVEL and DataBaseMovie</h1></div>

                   <div><img class="justify-center h-2/6 w-2/6" src=https://i.ibb.co/FzmsMgP/M-Mdb-1.gif" alt="M-Mdb-1" border="0" style="margin-left: 540px;"></div>

                    <div id="buscador">
                        <label for="busqueda"></label><input id="busqueda" onchange="buscar()"  type="text" placeholder="Busca tu personaje...">
                    </div>

                    <div id="visor"></div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="js/materialize.min.js"></script>
    </body>
</html>
<script>
    const publicK = "7701abbe011f97d07fd57cbc7599a3b6";
    const privateK = "265976491cc8e9aa0bc0b62b38819bea7b45fb89";
    const ts = Date.now();
    const ts2 = Date.now() + 1;
    const APIKey = "5011e9d9f4f0d149651d30d4df35c971"

    async function buscar() {
        const busqueda = document.getElementById("busqueda").value.toLowerCase();
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
            return `<div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="${data.thumbnail.path}.${data.thumbnail.extension}">
          <span class="card-title">${data.name}</span>
        </div>
        <div class="card-content">
          <p>${data.description}</p>
        </div>
        <div class="card-action">
            ${data.urls.map(composeStringUrls).join("")}
      </div>
    </div>
  </div>`
        }
        else {
            return `<div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="${data.thumbnail.path}.${data.thumbnail.extension}">
          <span class="card-title">${data.name}</span>
        </div>
        <!--<div class="card-content">
          <p>${data.description}</p>
        </div>-->
        <div class="card-action">
            ${data.urls.map(composeStringUrls).join("")}
      </div>
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
                searchQuery: document.getElementById("busqueda").value,
            }

        });

        return `<div class="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-900 flex items-center justify-center">
            <div>
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.name}</h3>
                    <img class="w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation" />
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    <p class="text-center leading-relaxed">${data.description}</p>
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">MARVEL</span>
                    <button class="px-24 py-1 bg-red-600 rounded-md text-white text-sm focus:border-transparent"><a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a></button>
                </div>
            </div>
        </div>`
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
                searchQuery: document.getElementById("busqueda").value,
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
                searchQuery: document.getElementById("busqueda").value,
            }

        });
    }


</script>

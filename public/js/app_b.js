

function limpiar() {
    document.getElementById("prueba").value = "";
}

function composeStringUrls(data){
    return `<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
<a class="" href="${data.url}">${data.type}</a>
</button>`;
}
function composeStringUrlNewCard(dataNewCard){
    return`<li>
            	<a href="${dataNewCard.url}" class="flex items-center justify-center h-8 w-8 border rounded-full text-gray-800 border-gray-800">
            	    <i class="fab fa-facebook"></i>
            	</a>
           </li>`
}


function arrayurls(data){
    let arrayurl = [];
    data.forEach(item => arrayurl.push(item));
    //console.log(arrayurl);
    return arrayurl;
}


function composeStringStart(data) {
    console.log("Aquí...")
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

    if (data.description != null){
        return `<div class="max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
            			<div class="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
            				<div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
            				<button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
            					<img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full">
            					</button>
            				</div>

            				<h2 class="mt-4 font-bold text-xl">${data.name}</h2>

            				<p class="text-xs text-gray-500 text-center mt-3">
            					${data.description}
            				</p>

            				<ul class="flex flex-row mt-4 space-x-2">
            					${data.urls.map(composeStringUrls).join("")}
            				</ul>
            				<h6 class="mt-2 text-sm font-medium">Data provided by Marvel. © 2014 Marvel</h6>
            			</div>
            		</div>
            	</div>`

    }else {
        return `
                <div class="max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
            			<div class="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
            				<div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
            				<button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
            					    <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full"/>
            					</button>
            				</div>

            				<h2 class="mt-4 font-bold text-xl">${data.name}</h2>

            				<p class="text-xs text-gray-500 text-center mt-3">
            					No provisto de descripción alguna.
            				</p>

            				<ul class="flex flex-row mt-4 space-x-2">
            					${data.urls.map(composeStringUrls).join("")}
            				</ul>
            				<h6 class="mt-2 text-sm font-medium">Data provided by Marvel. © 2014 Marvel</h6>
            			</div>
            		</div>
            	</div>`
    }
}

function composeStringComic(data) {
    console.log("data.....");
    console.log(data.characters.items);
    console.log("...............");

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

     return `<div class="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-900 ">
         <div>
             <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
                 <h3 class="font-serif font-bold text-gray-900 text-xl">${data.title}</h3>
                 <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                    <img class="w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                 </button>
                 <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                 <p class="text-center leading-relaxed">${data.description}</p>
                 ${data.urls.map(composeStringUrls).join("")}
                 <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                 <button class="px-24 py-1 bg-red-600 rounded-md text-white text-sm focus:border-transparent"><a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a></button>
                </div>
            </div>
        </div>`
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
     return `<div class="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-900 ">
        <div>
            <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
                <h3 class="font-serif font-bold text-gray-900 text-xl">${data.original_title}</h3>
                <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                    <img class="w-full rounded-md" src="${"https://image.tmdb.org/t/p/original/" + data.poster_path}" alt="motivation" />
                </button>
                <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                <p class="text-center leading-relaxed">${data.overview}</p>
                <span class="text-center">TheMovieDB</span>
                <button class="px-24 py-1 bg-red-600 rounded-md text-white text-sm focus:border-transparent"><a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a></button>
                </div>
            </div>
        </div>`

}

function composeStringUrlsBack(data){

    return `<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
<a class="" href="${data.url}">${data.type}</a>
</button>`;
}

function composeStringDataComicMarvel(dataResult) {
    let data = JSON.parse(dataResult.json)

    if (data.description != null) {
            return `<div class="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-900 ">
            <div>
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.name}</h3>
                    <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                        <img class="w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    <p class="text-center leading-relaxed">${data.description}</p>
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <button class="px-24 py-1 bg-red-600 rounded-md text-white text-sm focus:border-transparent"><a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a></button>
                </div>
            </div>
        </div>`
        } else {
            return `<div class="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-900 ">
            <div>
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.name}</h3>
                    <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                        <img class="w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <button class="px-24 py-1 bg-red-600 rounded-md text-white text-sm focus:border-transparent"><a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a></button>
                </div>
            </div>
        </div>`
        }
}
function composeStringDataBackTmdb(dataResult) {
    let data = JSON.parse(dataResult.json)

    return `<div class="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-900 bg-white">
        <div>
            <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
                <h3 class="font-serif font-bold text-gray-900 text-xl">${data.original_title}</h3>
                <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                    <img class="w-full rounded-md" src="${"https://image.tmdb.org/t/p/original/" + data.poster_path}" alt="motivation"/>
                </button>
                <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                <p class="text-center leading-relaxed">${data.overview}</p>
                <span class="text-center">TheMovieDB</span>
                <button class="px-24 py-1 bg-red-600 rounded-md text-white text-sm focus:border-transparent"><a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a></button>
                </div>
            </div>
        </div>`
}
function composeStringCharMarvel(dataResult){
    console.log(dataResult)
    let data = JSON.parse(dataResult.json)
    if (data.description != null){
        return `<div class="max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
            			<div class="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
            				<button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
            				    <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
            					    <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full" ">
            				    </div>
            				</button>

            				<h2 class="mt-4 font-bold text-xl">${data.name}</h2>

            				<p class="text-xs text-gray-500 text-center mt-3">
            					${data.description}
            				</p>

            				<ul class="flex flex-row mt-4 space-x-2">
            					${data.urls.map(composeStringUrls).join("")}
            				</ul>
            				<h6 class="mt-2 text-sm font-medium">Data provided by Marvel. © 2014 Marvel</h6>
            			</div>
            		</div>
            	</div>`

    }else {
        return `
                <div class="max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center">
            			<div class="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
            				<button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
            				    <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
            					    <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="" class="h-full w-full" ">
            				    </div>
            				</button>

            				<h2 class="mt-4 font-bold text-xl">${data.name}</h2>

            				<p class="text-xs text-gray-500 text-center mt-3">
            					No provisto de descripción alguna.
            				</p>

            				<ul class="flex flex-row mt-4 space-x-2">
            					${data.urls.map(composeStringUrls).join("")}
            				</ul>
            				<h6 class="mt-2 text-sm font-medium">Data provided by Marvel. © 2014 Marvel</h6>
            			</div>
            		</div>
            	</div>`
    }


    }



async function buscar() {
    const publicK = "7701abbe011f97d07fd57cbc7599a3b6";
    const privateK = "265976491cc8e9aa0bc0b62b38819bea7b45fb89";
    const ts = Date.now();
    const ts2 = Date.now() + 1;
    const APIKey = "5011e9d9f4f0d149651d30d4df35c971";


    const busqueda = document.getElementById("busqueda").value.toLowerCase();
    console.log(busqueda);

    const md5ComposeA = CryptoJS.MD5(ts + privateK + publicK).toString();
    const md5ComposeB = CryptoJS.MD5(ts2 + privateK + publicK).toString();

    let urlStart = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${busqueda}&ts=${ts}&apikey=${publicK}&hash=${md5ComposeA}`;
    let urlComic = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&title=${busqueda}&ts=${ts2}&apikey=${publicK}&hash=${md5ComposeB}`;
    let urlTmdb = `https://api.themoviedb.org/4/search/movie?api_key=5011e9d9f4f0d149651d30d4df35c971&language=es-ES&query=${busqueda}`;


    let urlBackMarvelChar = `/datacharacterMarvelChar/${busqueda}`;
    let urlBackMarvelComics = `/datacharacterMarvelComics/${busqueda}`;
    let urlBackTmdb = `/datacharacterTmdb/${busqueda}`;

    //document.getElementById("busqueda").addEventListener('click',limpiar);


    const resultMarvelChar = await axios.get(urlBackMarvelChar);
    const resultMarvelComics =  await axios.get(urlBackMarvelComics);
    const resultTmdb = await axios.get(urlBackTmdb);

    console.log("resultado Query");
    console.log(resultMarvelChar);
    console.log(resultMarvelComics);
    console.log(resultTmdb);
    console.log("hasta aqui");

    hideH1();
    if (resultMarvelChar.data.length != 0 || resultMarvelComics.data.length != 0 ||resultTmdb.data.length != 0) {
        console.log("BackData en función")
        console.log(resultMarvelComics.data);
        if(resultMarvelChar.data != ""){
            document.getElementById("visorChar").innerHTML = resultMarvelChar.data.map(composeStringCharMarvel).join(" ");
        }

        if(resultMarvelComics.data != ""){
            document.getElementById("visorComics").innerHTML += resultMarvelComics.data.map(composeStringDataComicMarvel).join(" ");
        }
        if(resultTmdb.data != ""){
            document.getElementById("visorTmdb").innerHTML += resultTmdb.data.map(composeStringDataBackTmdb).join(" ");
        }


    } else {
        console.log("else");
        const requestStart = axios.request(urlStart);
        //console.log("startKey");
        //console.log(requestStart);
        //console.log("-------------")
        //const requestComic = await axios.get(urlComic);
        //console.log("comics");
        //console.log(requestComic.data.data);
        //console.log("-------------")
        //const respuesta = await axios.get(urlTmdb);
        //console.log("Tmdb");
        //console.log(respuesta.data);
        //console.log("-------------")

        if (requestStart.status === 200 || requestComic.status === 200 || respuesta === 200) {

            document.getElementById("visorChar").innerHTML = requestStart.data.data.results.map(composeStringStart).join(" ");
            document.getElementById("visorComics").innerHTML += requestComic.data.data.results.map(composeStringComic).join(" ");
            document.getElementById("visorTmdb").innerHTML += respuesta.data.results.map(composeTmdb).join(" ");

        } else {
            document.getElementById("visor").innerHTML = "Hay algún problema";
        }
    }
}

function hideH1(){
    document.getElementById("h1Char").style.display='';
    document.getElementById("h1Comic").style.display='';
    document.getElementById("h1film").style.display='';
}

function safeCard(element) {
    let urlCardSafe = `/cardSafeLogin`;

    console.log(element);
    axios({
        method: 'post',
        url: urlCardSafe,
        data: {
            idData: element,
        }
    });

}

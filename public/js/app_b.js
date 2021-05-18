

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
    data.forEach(function (data){
        if (data != "inAppLink"){
            arrayurl.push(data);
        }
    });
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
            				    <div class="mt-2">
                                    <div>
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="form-checkbox h-4 w-4" >
                                            <span class="ml-2">Visto</span>
                                        </label>
                                    </div>
                                </div>
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
            				<div class="mt-2 ">
                                <div>
                                  <label>
                                    <input type="checkbox" class="form-checkbox h-4 w-4" >
                                    <span class="ml-2">Visto</span>
                                  </label>
                                </div>
                            </div>
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
            searchQuery: document.getElementById("busqueda").value,
        }

    });
    if (data.description != null) {
        return `
            <div class="h-screen">
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.title}</h3>
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                        <img class="h-96 w-80 w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    <div class="overflow-auto h-32">
                        <p class="text-center leading-relaxed">${data.description}</p>
                    </div>
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4" >
                                <span class="ml-2">Visto</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    } else {
        return `
            <div class="h-screen">
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.title}</h3>
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                        <img class="h-96 w-80 w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4" >
                                <span class="ml-2">Visto</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>`
    }
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
    return `
        <div class="h-screen">
            <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                <h3 class="font-serif font-bold text-gray-900 text-xl text-justify">${data.original_title}</h3>
                <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                    <img class="h-96 w-80 rounded-md" src="${"https://image.tmdb.org/t/p/original/" + data.poster_path}" alt="motivation"/>
                </button>
                <div class="overflow-auto h-32">
                    <p class="text-center leading-relaxed">${data.overview}</p>
                </div>
                <span class="text-center">TheMovieDB</span>
                <div class="mt-2">
                    <div>
                        <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4" >
                                <span class="ml-2">Visto</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>`
}

function composeStringUrlsBack(data){

    return `<button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
<a class="" href="${data.url}">${data.type}</a>
</button>`;
}

function composeStringBackComicMarvel(dataResult) {
    let data = JSON.parse(dataResult.json);
    console.log('problemas data');
    console.log(data);

    if (data.description != null) {
            return `
            <div class="h-screen">
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.title}</h3>
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                        <img class="h-96 w-80 w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    <div class="overflow-auto h-32">
                        <p class="text-center leading-relaxed">${data.description}</p>
                    </div>
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4" >
                                <span class="ml-2">Visto</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        } else {
            return `
            <div class="h-screen">
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.title}</h3>
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                        <img class="h-96 w-80 w-full rounded-md" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4" >
                                <span class="ml-2">Visto</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>`
        }


}
function composeStringDataBackTmdb(dataResult) {
    let data = JSON.parse(dataResult.json)

    return `
        <div class="h-screen">
            <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                <h3 class="font-serif font-bold text-gray-900 text-xl text-justify">${data.original_title}</h3>
                <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id}">
                    <img class="h-96 w-80 rounded-md" src="${"https://image.tmdb.org/t/p/original/" + data.poster_path}" alt="motivation"/>
                </button>
                <div class="overflow-auto h-32">
                    <p class="text-center leading-relaxed">${data.overview}</p>
                </div>
                <span class="text-center">TheMovieDB</span>
                <div class="mt-2">
                    <div>
                        <label class="inline-flex items-center">
                                <input type="checkbox" class="form-checkbox h-4 w-4" >
                                <span class="ml-2">Visto</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>`
}


function composeStringBackCharMarvel(dataResult){
    console.log(dataResult)
    let data = JSON.parse(dataResult.json)
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
            				    <div class="mt-2">
                                    <div>
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="form-checkbox h-4 w-4" >
                                            <span class="ml-2">Visto</span>
                                        </label>
                                    </div>
                                </div>
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
            				<div class="mt-2 ">
                                <div>
                                  <label>
                                    <input type="checkbox" class="form-checkbox h-4 w-4" >
                                    <span class="ml-2">Visto</span>
                                  </label>
                                </div>
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
    let urlTmdb = `https://api.themoviedb.org/4/search/movie?api_key=${APIKey}&language=es-ES&query=${busqueda}`;

    let urlBackMarvelChar = `/datacharacterMarvelChar/${busqueda}`;
    let urlBackMarvelComics = `/datacharacterMarvelComics/${busqueda}`;
    let urlBackTmdb = `/datacharacterTmdb/${busqueda}`;


    const resultBackMarvelChar = await axios.get(urlBackMarvelChar);
    const resultBacMarvelComics =  await axios.get(urlBackMarvelComics);
    const resultBackTmdb = await axios.get(urlBackTmdb);

    console.log("resultado de Busqueda en el BackEnd");
    console.log(resultBackMarvelChar);
    console.log(resultBacMarvelComics);
    console.log(resultBackTmdb);
    console.log("hasta aqui");

    hideH1();
    if (resultBackMarvelChar.data.length != 0 || resultBacMarvelComics.data.length != 0 ||resultBackTmdb.data.length != 0) {

        console.log("BackData en función")


        if(resultBackMarvelChar.data != ""){
            console.log(resultBackMarvelChar.data);
            document.getElementById("visorChar").innerHTML = resultBackMarvelChar.data.map(composeStringBackCharMarvel).join(" ");
        }

        if(resultBacMarvelComics.data != ""){
            console.log(resultBacMarvelComics.data);
            document.getElementById("visorComics").innerHTML += resultBacMarvelComics.data.map(composeStringBackComicMarvel).join(" ");
        }
        if(resultBackTmdb.data != ""){
            console.log(resultBackTmdb.data);
            document.getElementById("visorTmdb").innerHTML += resultBackTmdb.data.map(composeStringDataBackTmdb).join(" ");
        }


    } else {
        console.log("Aquí comienzan las peticiones AXIOS");


        const requestStart = await axios.request(urlStart);
        console.log("startKey");
        console.log(requestStart);
        console.log("-------------")
        const requestComic = await axios.get(urlComic);
        console.log("comics");
        console.log(requestComic.data.data);
        console.log("-------------")
        const resquestTmdb = await axios.get(urlTmdb);
        console.log("Tmdb");
        console.log(resquestTmdb.data);
        console.log("-------------")

        if (requestStart.status === 200 || requestComic.status === 200 || resquestTmdb.status === 200) {

            document.getElementById("visorChar").innerHTML = requestStart.data.data.results.map(composeStringStart).join(" ");
            document.getElementById("visorComics").innerHTML += requestComic.data.data.results.map(composeStringComic).join(" ");
            document.getElementById("visorTmdb").innerHTML += resquestTmdb.data.results.map(composeTmdb).join(" ");

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

function checkView(element){
    let urlCardSafe = `/cardCheckView`;

    console.log(element);
    axios({
        method: 'post',
        url: urlCardSafe,
        data: {
            idData: element,
        }
    });
}

function changeImageStyle(){
    document.getElementById("imagenStyle").src="image2.jpg";
}

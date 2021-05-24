
function cleanOnclick(){
    let cleaner = document.getElementById("search");
    cleaner.addEventListener("click", function (){
        document.getElementById("visor").innerHTML = "";
    }, false);
}
function allClean(){
    document.getElementById("visorTmdb").innerHTML = "";
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
        if (data.type != "inAppLink"){
            arrayurl.push(data);
        }
    });
    console.log(arrayurl);
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
    if (data.description != null) {
        return `
            <div class="h-screen">
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                    <h3 class="font-serif font-bold text-gray-900 text-xl">${data.title}</h3>
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
                        <img class="h-96 w-80 w-full rounded-md shadow-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    <div class="overflow-auto h-32">
                        <p class="text-center leading-relaxed">${data.description}</p>
                    </div>
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <div class="inline-flex items-center">
                                <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})" >
                                <span class="ml-2">Visto</span>
                            </div>
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
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
                        <img class="h-96 w-80 w-full rounded-md shadow-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <div class="inline-flex items-center">
                                <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                <span class="ml-2">Visto</span>
                            </div>
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
            searchQuery: document.getElementById("search").value,
        }

    });
    return `
        <div class="h-screen">
            <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                <h3 class="font-serif font-bold text-gray-900 text-xl text-justify">${data.original_title}</h3>
                <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
                    <img class="h-96 w-80 rounded-md shadow-lg" src="${"https://image.tmdb.org/t/p/original/" + data.poster_path}" alt="motivation"/>
                </button>
                <div class="overflow-auto h-32">
                    <p class="text-center leading-relaxed">${data.overview}</p>
                </div>
                <span class="text-center">TheMovieDB</span>
                <div class="mt-2">
                    <div>
                        <div class="inline-flex items-center">
                                <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                <span class="ml-2">Visto</span>
                        </div>
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
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
                        <img class="h-96 w-80 w-full rounded-md shadow-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    <div class="overflow-auto h-32">
                        <p class="text-center leading-relaxed">${data.description}</p>
                    </div>
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <div class="inline-flex items-center">
                                <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                <span class="ml-2">Visto</span>
                            </div>
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
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
                        <img class="h-96 w-80 w-full rounded-md shadow-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                    </button>
                    <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                    ${data.urls.map(composeStringUrls).join("")}
                    <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                    <div class="mt-2">
                        <div>
                            <div class="inline-flex items-center">
                                <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                <span class="ml-2">Visto</span>
                            </div>
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
                <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="safeCard(${data.id})">
                    <img class="h-96 w-80 rounded-md shadow-lg" src="${"https://image.tmdb.org/t/p/original/" + data.poster_path}" alt="motivation"/>
                </button>
                <div class="overflow-auto h-32">
                    <p class="text-center leading-relaxed">${data.overview}</p>
                </div>
                <span class="text-center">TheMovieDB</span>
                <div class="mt-2">
                    <div>
                        <div class="inline-flex items-center">
                                <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                <span class="ml-2">Visto</span>
                        </div>
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

async function search() {
    const publicK = "7701abbe011f97d07fd57cbc7599a3b6";
    const privateK = "265976491cc8e9aa0bc0b62b38819bea7b45fb89";
    const ts = Date.now();
    const ts2 = Date.now() + 1;
    const APIKey = "5011e9d9f4f0d149651d30d4df35c971";


    const search = document.getElementById("search").value.toLowerCase();
    console.log(search);

    const md5ComposeA = CryptoJS.MD5(ts + privateK + publicK).toString();
    const md5ComposeB = CryptoJS.MD5(ts2 + privateK + publicK).toString();

    let urlStart = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=${ts}&apikey=${publicK}&hash=${md5ComposeA}`;
    let urlComic = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&title=${search}&ts=${ts2}&apikey=${publicK}&hash=${md5ComposeB}`;
    let urlTmdb = `https://api.themoviedb.org/4/search/movie?api_key=${APIKey}&language=es-ES&query=${search}`;

    let urlBackMarvelChar = `/datacharacterMarvelChar/${search}`;
    let urlBackMarvelComics = `/datacharacterMarvelComics/${search}`;
    let urlBackTmdb = `/datacharacterTmdb/${search}`;

    console.log(urlStart);
    const resultBackMarvelChar = await axios.get(urlBackMarvelChar);
    const resultBacMarvelComics =  await axios.get(urlBackMarvelComics);
    const resultBackTmdb = await axios.get(urlBackTmdb);

    console.log("resultado de Busqueda en el BackEnd");
    console.log(resultBackMarvelChar);
    console.log(resultBacMarvelComics);
    console.log(resultBackTmdb);
    console.log("hasta aqui");

    hideH1();
    if (resultBackMarvelChar.data.length != 0 && resultBacMarvelComics.data.length != 0 && resultBackTmdb.data.length != 0) {

        console.log("BackData en función")
        if (document.getElementById("visorChar") != null){
            document.getElementById("visorChar").innerHTML = "";
            document.getElementById("visorChar").innerHTML = resultBackMarvelChar.data.map(composeStringBackCharMarvel).join(" ");
            console.log(resultBackMarvelChar.data);
        }

        if (document.getElementById("visorComics") != null){
            document.getElementById("visorComics").innerHTML = "";
            document.getElementById("visorComics").innerHTML = resultBacMarvelComics.data.map(composeStringBackComicMarvel).join(" ");
            console.log(resultBacMarvelComics.data);

        }
        if (document.getElementById("visorTmdb") != null){
            document.getElementById("visorTmdb").innerHTML = "";
            document.getElementById("visorTmdb").innerHTML = resultBackTmdb.data.map(composeStringDataBackTmdb).join(" ");
            console.log(resultBackTmdb.data);
        }


    } else {
        console.log("Aquí comienzan las peticiones AXIOS");


        const requestStart = await axios.get(urlStart);
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

            if (document.getElementById("visorChar") != null){

                document.getElementById("visorChar").innerHTML = requestStart.data.data.results.map(composeStringStart).join(" ");
            }
            if (document.getElementById("visorComics") != null){

                document.getElementById("visorComics").innerHTML = requestComic.data.data.results.map(composeStringComic).join(" ");
            }
            if (document.getElementById("visorTmdb") != null){

                document.getElementById("visorTmdb").innerHTML = resquestTmdb.data.results.map(composeTmdb).join(" ");
            }

        } else {
            document.getElementById("visor").innerHTML = "Hay algún problema";
        }
    }
}

function hideH1(){
    if (document.getElementById("h1Char") != null){

        document.getElementById("h1Char").style.display='';
    }
    if (document.getElementById("h1Comic") != null){

        document.getElementById("h1Comic").style.display='';
    }
    if (document.getElementById("h1film") != null){

        document.getElementById("h1film").style.display='';
    }
}

function safeCard(element) {
    let urlCardSafe = `/cardSafeLogin`;

    console.log(element);
    axios({
        method: 'post',
        url: urlCardSafe,
        data: {
            idPlatform: element,
        }
    });

}
function cardCheckView(element){
    let urlCardCheck = `/cardCheckView`;
    console.log('estoy en cardCheckView');
    axios({
        method: 'post',
        url: urlCardCheck,
        data: {
            idPlatform: element,
        }
    });
}

function deleteCard(element) {
    let urlCardSafe = `/deleteCardSafeOnLogin`;

    console.log(element);
    axios({
        method: 'post',
        url: urlCardSafe,
        data: {
            idPlatform: element,
        }
    });

}
function deleteCardCheckView(element) {
    let urlCardSafe = `/deleteCardCheckView`;

    console.log(element);
    axios({
        method: 'post',
        url: urlCardSafe,
        data: {
            idPlatform: element,
        }
    });

}


function changeImageStyle(){
    document.getElementById("imagenStyle").src="image2.jpg";
}


async function getCardsLogin(){


    let urlGetCards =`/getCardsUser`
    let returnCards = await axios.get(urlGetCards);
    console.log(returnCards);

    document.getElementById("visorChar").innerHTML = returnCards.data.map(composeStringBackCharMarvelCardSave).join(" ");
    document.getElementById("visorComics").innerHTML = returnCards.data.map(composeStringBackComicMarvelCardSave).join(" ");
    document.getElementById("visorTmdb").innerHTML = returnCards.data.map(composeStringDataBackTmdbCardSave).join(" ");

}

function composeStringBackCharMarvelCardSave(dataResult){

    let data = JSON.parse(dataResult.json)

    if (dataResult.platform == "Marvel-Char"){
        document.getElementById("divChars").style.display='';
        if (data.description != null){
            return `
            			<div class="flex-col bg-white p-4 shadow rounded-lg">
            			    <div>
            				    <button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="deleteCard(${data.id})">
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
            				<button class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"  type="button" onclick="deleteCard(${data.id})">
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
}

function composeStringBackComicMarvelCardSave(dataResult) {
    let data = JSON.parse(dataResult.json);

    //console.log(data);
    if (dataResult.platform == "Marvel-Comics"){
        document.getElementById("divComics").style.display='';
        if (data.description != null) {
            return `
                <div class="h-screen">
                    <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                        <h3 class="font-serif font-bold text-gray-900 text-xl">${data.title}</h3>
                        <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="deleteCard(${data.id})">
                            <img class="h-96 w-80 w-full rounded-md shadow-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                        </button>
                        <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                        <div class="overflow-auto h-32">
                            <p class="text-center leading-relaxed">${data.description}</p>
                        </div>
                        ${data.urls.map(composeStringUrls).join("")}
                        <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                        <div class="mt-2">
                            <div>
                                <div class="inline-flex items-center">
                                    <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                    <span class="ml-2">Visto</span>
                                </div>
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
                        <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="deleteCard(${data.id})">
                            <img class="h-96 w-80 w-full rounded-md shadow-lg" src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="motivation"/>
                        </button>
                        <!-- <p class="text-center leading-relaxed">${data.id}</p> -->
                        ${data.urls.map(composeStringUrls).join("")}
                        <span class="text-center">Data provided by Marvel. © 2014 Marvel</span>
                        <div class="mt-2">
                            <div>
                                <div class="inline-flex items-center">
                                    <input id="checkView" type="checkbox" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                    <span class="ml-2">Visto</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    }
}

function composeStringDataBackTmdbCardSave(dataResult) {
    let data = JSON.parse(dataResult.json)
    if (dataResult.platform == "TMDb"){
        document.getElementById("divFilms").style.display='';
        return `
            <div class="h-screen">
                <div class="flex flex-col max-w-md bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg border border-gray-200">
                    <h3 class="font-serif font-bold text-gray-900 text-xl text-justify">${data.original_title}</h3>
                    <button class="h-96 w-80 text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onclick="deleteCard(${data.id})">
                        <img class="h-96 w-80 rounded-md shadow-lg" src="${"https://image.tmdb.org/t/p/original/" + data.poster_path}" alt="motivation"/>
                    </button>
                    <div class="overflow-auto h-32">
                        <p class="text-center leading-relaxed">${data.overview}</p>
                    </div>
                    <span class="text-center">TheMovieDB</span>
                    <div class="mt-2">
                        <div>
                            <div class="inline-flex items-center">
                                    <input id="checkView" type="checkbox" value="false" class="form-checkbox h-4 w-4" onclick="checkedView(${data.id})">
                                    <p class="ml-2">Visto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    }

}

function checkedView(id){
    //console.log(id);
    let checkBox = document.getElementById("checkView");
    console.log(checkBox.checked);
    if (checkBox.checked == true) {
        console.log('voy a cardCheckView');
        cardCheckView(id);
    }else{
        deleteCardCheckView(id);
    }
}

async function dataChartView(){
    let ctx = document.getElementById('myChart');
    let urldata = `/typesPlatform`;

    const data = await axios.get(urldata);
    console.log(data.data)

    let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Personajes', 'Comics', 'Peliculas'],
            datasets: [{
                label: '# of Votes',
                data: [data.data["Marvel-Char"], data.data["Marvel-Comics"], data.data["TMDb"]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadColorsBackGround(){
    let colors = [
        {
            "name": "Pink",
            "type": "#F2BFDD"
        },
        {
            "name": "Orange",
            "type": "#F2C986"
        },
        {
            "name": "lightBlue",
            "type": "#80BBD9"
        },{
            "name": "Green",
            "type": "#59D990"
        },
        {
            "name": "Grey",
            "type": "#a6a6a6"
        },
        {
            "name": "White",
            "type": "#ffffff"
        },
    ]


document.getElementById("visorOptionsColors").innerHTML = colors.map(composerColor).join("");

}
function composerColor(data){
    //console.log(data);
    let Hexcolor = data.type;
    return`
     <button id="hola" class="flex flex-grow px-3 hover:${data.type} text-white font-bold py-2 px-4 rounded" onclick="stilo('${data.type}')">
        <div class="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0" style="background-color:${data.type}">
            <div class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block">
                <div class="w-12 font-medium text-gray-900">
                    ${data.name}
                </div>
            </div>
        </div>
    </button>`
}
function stilo(hex){
    console.log(hex);
    safeColorUser(hex);
    document.getElementById('mainto').style.backgroundColor = hex;
}


function safeColorUser(element) {
    let urlColorSafe = `/newColorUser`;

    console.log(element);
    axios({
        method: 'post',
        url: urlColorSafe,
        data: {
            color: element,
        }
    });
}

async function getColorUser(){
    let urlData = `/getColorUser`;

    const data = await axios.get(urlData);

    console.log(data.data[0].color);

    if(data.data[0].color.length  != 0){
        console.log('Cambio hecho');
        document.getElementById('mainto').style.setProperty('background-color', data.data[0].color);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\ColorUser;
use App\Models\Data;
use App\Models\SearchQuery;
use App\Models\User;
use App\Models\userCheckView;
use App\Models\UserCheck;
use App\Models\QueryData;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Log;
use DB;
use Illuminate\Support\Facades\Storage;

class DataController extends Controller
{
    function postCharacter(Request $request)
    {
        $consultIdPlatform = DB::select('select IdPlatform from data where IdPlatform = "' . $request->input('idPlatform') . '"');

        $idQuerySearchQuery = DB::select('select idQueries from searchQueries where searchQuery = "' . $request->input('searchQuery') . '"');

        $querySearch = $request->input('searchQuery');


        if (count($idQuerySearchQuery) == 0) {
            $query = new searchquery();
            $query->searchQuery = $querySearch;
            $query->save();
        }

        if (count($consultIdPlatform) > 0) {
            //Actualizacion json.

            $jsonEncode = json_encode($request->input('json'));
            $jsonEncode = str_replace("'", "\'", $jsonEncode);
            DB::select('update data set json = \'' . $jsonEncode . '\' where IdPlatform = "' . $request->input('idPlatform') . '"');

        } else {

            $data = new data();
            $data->json = json_encode($request->input('json'));
            $data->idPlatform = $request->input('idPlatform');
            $data->platform = $request->input('platform');
            $data->name = $request->input('name');
            $data->originalTitle = $request->input('originalTitle');
            $data->image = $request->input('image');
            $data->imageBackground = $request->input('imageBackground');
            $data->description = $request->input('description');
            $data->urlLinks = json_encode($request->input('urlLinks'));
            $data->creators = json_encode($request->input('creators'));
            $data->charComics = json_encode($request->input('charComics'));
            $data->dateComics = json_encode($request->input('dateComics'));
            $data->diamondCode = $request->input('diamondCode');
            $data->vote_average = $request->input('vote_average');
            $data->vote_count = $request->input('vote_count');
            $data->release_date = $request->input('release_date');
            $data->charSeries = json_encode($request->input('charSeries'));
            $data->save();

            $idQuery = DB::select('select idQueries from searchQueries where searchQuery = "' . $request->input('searchQuery') . '"');

            $datId = DB::select('select idData from data where idPlatform =  "' . $data->idPlatform . '"');
            $queryData = new QueryData();
            $queryData->idData = $datId[0]->idData;
            $queryData->idQueries = $idQuery[0]->idQueries;
            $queryData->save();

        }
    }


    function checkCharacter($query)
    {


        $resultados = DB::select('select json from data INNER JOIN queryData ON data.idData = queryData.idData INNER JOIN searchQueries ON searchQueries.idQueries = queryData.idQueries
                        where searchQueries.searchQuery = "' . $query . '" AND platform = "Marvel-Char" AND data.created_at  BETWEEN  "' . Carbon::now()->subDays(10) . '" AND "' . Carbon::now() . '"');


        if (count($resultados) > 0) {
            return $resultados;
        } else {
            return false;
        }
    }

    function loguedCheckCaractersTmdb($query)
    {
        $resultados = DB::select('select json , data.idData from data INNER JOIN queryData ON data.idData = queryData.idData INNER JOIN searchQueries ON searchQueries.idQueries = queryData.idQueries
                        where searchQueries.searchQuery = "' . $query . '" AND platform = "TMDb" AND data.created_at  BETWEEN  "' . Carbon::now()->subDays(10) . '" AND "' . Carbon::now() . '"');

        if (count($resultados) > 0) {
            return $resultados;
        } else {
            return false;
        }
    }

    function loguedCheckCaractersMarvelChar($query)
    {
        $resultados = DB::select('select json, data.idData from data INNER JOIN queryData ON data.idData = queryData.idData INNER JOIN searchQueries ON searchQueries.idQueries = queryData.idQueries
                        where searchQueries.searchQuery = "' . $query . '" AND platform = "Marvel-Char" AND data.created_at  BETWEEN  "' . Carbon::now()->subDays(10) . '" AND "' . Carbon::now() . '"');

        if (count($resultados) > 0) {
            return $resultados;
        } else {
            return false;
        }
    }


    function loguedCheckCaractersMarvelComics($query)
    {
        $resultados = DB::select('select json, data.idData from data INNER JOIN queryData ON data.idData = queryData.idData INNER JOIN searchQueries ON searchQueries.idQueries = queryData.idQueries
                        where searchQueries.searchQuery = "' . $query . '" AND platform = "Marvel-Comics" AND data.created_at  BETWEEN  "' . Carbon::now()->subDays(10) . '" AND "' . Carbon::now() . '"');

        if (count($resultados) > 0) {
            return $resultados;
        } else {
            return false;
        }
    }

    function cardSafeOnLogin(Request $event)
    {
        $resultados = DB::select('select idPlatform from userCheckViews  where idUser = "' . Auth::id() . '" AND idPlatform = "' . $event->input('idData') . '"');
        if ($resultados == null) {
            $check = new UserCheckView();
            $check->idUser = Auth::id();
            $check->idPlatform = $event->input('idPlatform');
            $check->save();
        }
    }


    function cardCheckView(Request $event)
    {
        $results = DB::select('select idPlatform from userChecks  where idUser = "' . Auth::id() . '" AND idPlatform = "' . $event->input('idData') . '"');
        if ($results == null) {
            $check = new UserCheck();
            $check->idUser = Auth::id();
            $check->idPlatform = $event->input('idPlatform');
            $check->check = '1';
            $check->save();
        }

    }

    function deleteCardSafeOnLogin(Request $event)
    {

        $results = DB::select('delete from userCheckViews where idPlatform = "' . $event->input('idData') . '"');

    }

    function deleteCardCheckView(Request $event)
    {
        $results = DB::select('delete from userChecks where idPlatform = "' . $event->input('idData') . '"');
    }

    function getCardsView()
    {


        $results = DB::select('select data.json, data.platform from data INNER JOIN userCheckViews ON data.idPlatform = userCheckViews.idPlatform where userCheckViews.idUser = ' . Auth::id() . ';');


        return $results;
    }

    function getPlatform()
    {
        $results = DB::select('select platform from data ');
        $finalResults = [];
        foreach ($results as $result) {
            if (isset($result->platform)) {
                if (!array_key_exists(strval($result->platform), $finalResults)) {
                    $finalResults[strval($result->platform)] = 1;
                } else {
                    $finalResults[strval($result->platform)] = $finalResults[strval($result->platform)] + 1;
                }
            }
        }
        return $finalResults;
    }


    function getCardsTotal()
    {
        $results = DB::select('select  from data where platform = "Marvel-Char" ');
    }

    function getComicsNames()
    {
        $results = DB::select('select name from data where platform = "Marvel-Comics" ');
    }

    function getFilmsNames()
    {
        $results = DB::select('select name from data where platform = "TMDb" ');
    }

    function totalUsersBD(){

        $results = DB::select('select id from users');

    }

    function postColorUser(Request $request){

        $userColor = DB::select('select idUser from color_users');

        if ($userColor == null){
            $data = new ColorUser();
            $data->idUser = Auth::id();
            $data->color = $request->input('color');
            $data->save();
        }
        else{
            DB::select('UPDATE color_users SET color = "' . $request->input('color') . '" where idUser = "'. Auth::id().'"');
        }
    }
    function getColorUser(){

        $userColor = DB::select('select color from color_users where idUser= "'.Auth::id().'"');

        return $userColor;
    }
}

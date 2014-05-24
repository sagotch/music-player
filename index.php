<!DOCTYPE html>
<html lang="en" data-ng-app>
  <head>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="./public/img/default.png">
    <link rel="stylesheet" href="./public/css/bootstrap.css">
    <link rel="stylesheet" href="./public/css/app.css">
    <script type="text/javascript">
     var playlistsongs =  [];
    </script>
    <script type="text/javascript" src="./public/config.php?view=jsobject">
    </script>
    <script type="text/javascript" src="./public/player/audio.min.js"></script>
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
    <script type="text/javascript" src="./public/app/js/app.js"></script>
    <script type="text/javascript" src="./public/app/js/controllers.js"></script>
    <script type="text/javascript" src="./public/app/js/filters.js"></script>
  </head>
  <body>
    <div id="wrapper" data-ng-controller="DirectoriesList">

      <div id="albums">
        <h3>Artist / Albums</h3>
        <table class="table table-bordered">
          <tr data-ng-repeat="dir in directories">
            <td>
              <h4 data-ng-click="selectAlbum(dir.name)">
                {{dir.name}}
              </h4> 
              <div class="album link"
                   data-ng-repeat="album in dir.children"
                   data-ng-click="selectAlbum(dir.name+'/'+album.name)">
                {{album.name}}
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!--
      Here is the trick: putting a "float: right" div before
      another div will make this other div take place at the left
      of the "float: right" one and expands as much as it can.
      -->

      <div id="right">
        <h3>Playlist</h3>
        <div id="musicplayer">
          <audio id="player"></audio>
        </div>
        <div class="btn"
             data-ng-class="{'disabled': !playlistsongs.length}"
             data-ng-click="deleteAllSongs()">
          Clear playlist
        </div>
        <div class="btn"
             data-ng-class="{'disabled': !playlistsongs.length}"
             data-ng-click="prevSong()">
          <<
        </div>
        <div class="btn"
             data-ng-class="{'disabled': !playlistsongs.length}"
             data-ng-click="nextSong()">
          >>
        </div>
        <p class="do-first" data-ng-if="!playlistsongs.length">
          <strong>Select a song.</strong>
        </p>
        <table class="table table-bordered"
               data-ng-if="playlistsongs.length">
          <tr data-ng-repeat="song in playlistsongs track by $index">
            <td>
              <span class="song link"
                    data-ng-class="{'current': $index==currentSongIndex}"
                    data-ng-click="playSong($index)">
                {{song.name}}
                <span data-ng-if="$index!=currentSongIndex"
                      data-ng-click="deleteSong($index)"
                      class="delete icon-trash">
                </span>
              </span>
            </td>
          </tr>
        </table>
      </div>

      <div id="center">
        <h3>
          Songs
        </h3>
        <img src="{{directorycover}}" alt="{{directorycover}}" />
        <div class="btn disabled"
             data-ng-class="{'disabled': !directorysongs.length}"
             data-ng-click="addAllSongs(directorysongs)">
          Add All
        </div>
        <p class="do-first" data-ng-if="!directorysongs.length">
          <strong>Choose an album.</strong>
        </p>
        <table class="table table-bordered"
               data-ng-if="directorysongs.length">
          <tr data-ng-repeat="song in directorysongs">
            <td>
              <span data-ng-click="addSong(song)" class="link">
                {{song.name}}
              </span>
            </td>
          </tr>
        </table>
      </div>

    </div>
    <script type="text/javascript">
     var currentSongIndex = 0;
     var player = audiojs.newInstance(document.getElementById("player"));
    </script>

  </body>
</html>

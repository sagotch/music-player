<!DOCTYPE html>
<html lang="en" data-ng-app>
  <head>
    <meta charset="utf-8">
    <script type="text/javascript">
     var playlistsongs =  [];
    </script>
    <link rel="stylesheet" href="./public/css/bootstrap.css">
    <link rel="stylesheet" href="./public/css/app.css">
    <script type="text/javascript" src="./public/config.php?view=jsobject">
    </script>
    <script type="text/javascript" src="./public/player/audio.min.js"></script>
    <script type="text/javascript" src="./public/js/angular.min.js"></script>
    <script type="text/javascript" src="./public/app/js/app.js"></script>
    <script type="text/javascript" src="./public/app/js/controllers.js"></script>
    <script type="text/javascript" src="./public/app/js/filters.js"></script>
  </head>
  <body data-ng-controller="DirectoriesList">
    <div class="span4" id="albums">
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
    <div class="span4" id="center">
      <h3>
        Songs
      </h3>
      <div class="btn disabled"
           data-ng-show="!directorysongs.length"
           data-ng-click="addAllSongs(directorysongs)">
        Add All
      </div>
      <div class="btn"
           data-ng-show="directorysongs.length"
           data-ng-click="addAllSongs(directorysongs)">
        Add All
      </div>
      <p data-ng-show="!directorysongs.length">
        <strong>&larr; Choose an album first.</strong>
      </p>
      <table class="table table-bordered" data-ng-show="directorysongs.length">
        <tr data-ng-repeat="song in directorysongs">
          <td>
            <span data-ng-click="addSong(song)" class="link">
              {{song.name}}
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div class="span4" id="right">
      <h3>Playlist</h3>
      <div id="musicplayer">
        <audio id="player"></audio>
      </div>
      <div class="btn disabled"
           data-ng-show="!playlistsongs.length"
           data-ng-click="deleteAllSongs()">
        Clear playlist
      </div>
      <div class="btn"
           data-ng-show="playlistsongs.length"
           data-ng-click="deleteAllSongs()">
        Clear playlist
      </div>
      <p data-ng-show="!playlistsongs.length">
        <strong>&larr; Select a song to add it to playlist.</strong>
      </p>
      <table class="table table-bordered" data-ng-show="playlistsongs.length">
        <tr data-ng-repeat="song in playlistsongs">
          <td>
            <span class="song link current"
                  data-ng-show="$index==currentSongIndex">
              {{song.name}}
            </span>
            <span class="song link"
                  data-ng-show="$index!=currentSongIndex"
                  data-ng-click="playSong($index)">
              {{song.name}}
              <span data-ng-click="deleteSong($index)"
                    class="delete icon-trash">
              </span>
              </>
          </td>
        </tr>
      </table>
    </div>
    <script type="text/javascript">
     var currentSongIndex = 0;
     var player = audiojs.newInstance(document.getElementById("player"));
    </script>

  </body>
</html>

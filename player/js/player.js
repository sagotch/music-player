'use strict';

/* var data is defined in a js file included before this one */

/* Controllers */
function DirectoriesList($scope, $http) {

    $scope.library = data;

    var currentSongIndex = 0;
    var player = document.getElementById("player");

    player.onended = function (e) {
        $scope.nextSong();
    };

    $scope.openedDirectories = [];

    $scope.currentSongIndex = 0;
    $scope.playlistsongs = [];

    $scope.openDir = function (dir)
    {

        var i = $scope.openedDirectories.indexOf(dir);
        if (i == -1)
        {
            $scope.openedDirectories.push(dir);
        }
        else
        {
            $scope.openedDirectories.splice(i, 1);
        }
    };

    $scope.isOpenedDir = function (dir)
    {
        return $scope.openedDirectories.indexOf(dir) > -1;
    };

    $scope.selectAlbum = function (artistId, albumId)
    {
        $scope.artistId = artistId;
        $scope.albumId = albumId;
        var album = $scope.library.artists[artistId].albums[albumId];
        $scope.directorytitle = album.title;
        $scope.directorycover = album.cover;
        $scope.directorysongs = album.songs
    };

    $scope.deleteAllSongs = function ()
    {
        $scope.playlistsongs = [];
        $scope.currentSongIndex = 0;
        if (!player.paused)
        {
            player.pause();
        }
    };

    $scope.addAlbum = function (artistId, albumId)
    {
        var len =
            $scope.library.artists[artistId].albums[albumId].songs.length;

        for (var i = 0; i < len; i++)
        {
            $scope.playlistsongs.push([artistId, albumId, i]);
        }

        /* Start playing if playlist was empty */
        if (! ($scope.playlistsongs.length - len))
        {
            runPlaylist();
        }

    };

    $scope.addSong = function(artistId, albumId, songId)
    {
        $scope.playlistsongs.push([artistId, albumId, songId]);

        if (! ($scope.playlistsongs.length - 1))
        {
            runPlaylist();
        }
    };

    $scope.deleteSong = function(index)
    {

        // Shift elements.
        for (var i = index; i < $scope.playlistsongs.length - 1; i++)
        {
            $scope.playlistsongs[i] = $scope.playlistsongs[i + 1]
        }

        // Adjust current index if needed.
        if (index < $scope.currentSongIndex)
        {
            $scope.currentSongIndex -= 1;
        }

        // Remove the last item.
        $scope.playlistsongs.pop();

    };

    $scope.prevSong = function ()
    {
        if ($scope.currentSongIndex !== 0)
        {
            $scope.playIndex($scope.currentSongIndex - 1);
        }
    };

    $scope.nextSong = function ()
    {
        if ($scope.currentSongIndex !== $scope.playlistsongs.length - 1)
        {
            $scope.playIndex($scope.currentSongIndex + 1);
        }
    }

    $scope.playPause = function ()
    {
        if (!player.paused)
        {
            player.pause();
        }
        else
        {
            player.play();
        }
    }

    $scope.shuffle = function ()
    {

        var cur = $scope.playlistsongs[$scope.currentSongIndex];

        $scope.playlistsongs.sort (
            function ()
            {
                return Math.floor( Math.random() * 3) - 1;
            }
        );

        $scope.currentSongIndex = 0;

        if (!player.paused)
        {
            var tmp = $scope.playlistsongs[0];
            var i = $scope.playlistsongs.indexOf(cur);
            $scope.playlistsongs[0] = $scope.playlistsongs[i];
            $scope.playlistsongs[i] = tmp;
        }

    }

    $scope.onKeyDown = function (ev)
    {
        switch (ev.which)
        {
        case 37: // left
            ev.preventDefault();
            $scope.prevSong();
            break;
        case 39: // right
            ev.preventDefault();
            $scope.nextSong();
            break;
        case 32: // space
            ev.preventDefault();
            $scope.playPause();
            break;
        }
    }

    function runPlaylist(){
        if(player.paused){
            $scope.playIndex($scope.currentSongIndex);
        }
    }

    /* Play file given a path */
    $scope.playPath = function (path)
    {
        player.src = path;
        player.load ();
        player.play ();
    }

    /* Play song in playlist and update current song index */
    $scope.playIndex = function (index)
    {
        var ids = $scope.playlistsongs[index];
        var artist = $scope.library.artists[ids[0]];
        var album = artist.albums[ids[1]];
        var song = album.songs[ids[2]];

        console.log($scope.library.prefix
                        + '/' + artist.name + '/' + album.title + '/' + song);

        $scope.playPath($scope.library.prefix
                        + '/' + artist.name + '/' + album.title + '/' + song);
        $scope.currentSongIndex = index;
    };

    $scope.trackTitle = function (ids)
    {
        return $scope.library.artists[ids[0]].albums[ids[1]].songs[ids[2]];
    };


    $scope.trimSong = function (song)
    {
        return song.replace(/^\d+\s*[-.]?\s*|\.[^.]+$/gi, '');
    };

}

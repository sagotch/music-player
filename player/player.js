'use strict';

/* Controllers */
function DirectoriesList($scope, $http) {

    var currentSongIndex = 0;
    var player = document.getElementById("player");

    player.onended = function (e) {
        $scope.nextSong();
    }

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

    $scope.selectAlbum = function(dir){
        $http({
            url : 'public/app/directories/songs.php',
            params : {
                dir : dir
            },
            method : 'get'
        }).success(function(data) {
            $scope.directorysongs = data.songs;
            $scope.directorycover = data.cover;
        });    
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

    $scope.addAllSongs = function(songs){
        var cnt = 0,
            numCnt = songs.length;

        for(; cnt < numCnt; cnt++){
            songs[cnt].playing = false;
            $scope.playlistsongs.push(songs[cnt]);
        }
        
        if (! ($scope.playlistsongs.length - numCnt))
        {
            runPlaylist();
        }

    };

    $scope.addSong = function(song){

        $scope.playlistsongs.push(song);

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
        $scope.playPath($scope.playlistsongs[index].path);
        $scope.currentSongIndex = index;
    };


    $scope.trimSong = function (song)
    {
        return song.replace(/^\d+\s*[-.]?\s*|\.[^.]+$/gi, '');
    };

    $http({
        url : 'public/app/directories/directories.php',
        method : "get"
    }).success(function(data) {
        $scope.directories = data;
    });

}

function ReadAlbum(){
    console.log("DA", arguments);
}

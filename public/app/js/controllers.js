'use strict';

/* Controllers */
function DirectoriesList($scope, $http) {
    $scope.currentSongIndex = 0;
    $scope.playlistsongs = [];

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
            player.trackEnded = songFinished;
        });    
    };

    $scope.deleteAllSongs = function ()
    {
        $scope.playlistsongs = [];
        $scope.currentSongIndex = 0;
        if (player.playing)
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
            $scope.playSong($scope.currentSongIndex - 1);
        }
    };

    $scope.nextSong = function ()
    {
        if ($scope.currentSongIndex !== $scope.playlistsongs.length - 1)
        {
            $scope.playSong($scope.currentSongIndex + 1);
        }
    }

    function runPlaylist(){
        if(player.playing == false){
            $scope.playSong($scope.currentSongIndex);
        }
    }

    function songFinished ()
    {
        $scope.nextSong ();
    }

    $scope.playSong = function (index)
    {
        player.load ($scope.playlistsongs[index].path);
        player.play ();
        $scope.currentSongIndex = index;
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

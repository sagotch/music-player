'use strict';

/* var data is defined in a js file included before this one */

/* Controllers */
function DirectoriesList($scope, $http) {

    var currentTrackIndex = 0;
    var player = document.getElementById("player");

    $scope.library = data;
    $scope.expanded = [];
    $scope.currentTrackIndex = 0;
    $scope.playlistTracks = [];

    player.onended = function (e) {
        $scope.nextTrack();
    };

    $scope.toggleArtist = function (id)
    {

        var i = $scope.expanded.indexOf(id);
        if (i == -1)
        {
            $scope.expanded.push(id);
        }
        else
        {
            $scope.expanded.splice(i, 1);
        }
    };

    $scope.isExpanded = function (id)
    {
        return $scope.expanded.indexOf(id) > -1;
    };

    $scope.selectAlbum = function (artistId, albumId)
    {
        $scope.artistId = artistId;
        $scope.albumId = albumId;
        var album = $scope.library.artists[artistId].albums[albumId];
        $scope.directorytitle = album.title;
        $scope.directorycover = album.cover;
        $scope.directorytracks = album.tracks
    };

    $scope.deleteAllTracks = function ()
    {
        $scope.playlistTracks = [];
        $scope.currentTrackIndex = 0;
        if (!player.paused)
        {
            player.pause();
        }
    };

    $scope.addAlbum = function (artistId, albumId)
    {
        var len =
            $scope.library.artists[artistId].albums[albumId].tracks.length;

        for (var i = 0; i < len; i++)
        {
            $scope.playlistTracks.push([artistId, albumId, i]);
        }

        /* Start playing if playlist was empty */
        if (! ($scope.playlistTracks.length - len))
        {
            runPlaylist();
        }

    };

    $scope.addTrack = function(artistId, albumId, trackId)
    {
        $scope.playlistTracks.push([artistId, albumId, trackId]);

        if (! ($scope.playlistTracks.length - 1))
        {
            runPlaylist();
        }
    };

    $scope.deleteTrack = function(index)
    {

        // Shift elements.
        for (var i = index; i < $scope.playlistTracks.length - 1; i++)
        {
            $scope.playlistTracks[i] = $scope.playlistTracks[i + 1]
        }

        // Adjust current index if needed.
        if (index < $scope.currentTrackIndex)
        {
            $scope.currentTrackIndex -= 1;
        }

        // Remove the last item.
        $scope.playlistTracks.pop();

    };

    $scope.prevTrack = function ()
    {
        if ($scope.currentTrackIndex !== 0)
        {
            $scope.playIndex($scope.currentTrackIndex - 1);
        }
    };

    $scope.nextTrack = function ()
    {
        if ($scope.currentTrackIndex !== $scope.playlistTracks.length - 1)
        {
            $scope.playIndex($scope.currentTrackIndex + 1);
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

        var cur = $scope.playlistTracks[$scope.currentTrackIndex];

        $scope.playlistTracks.sort (
            function ()
            {
                return Math.floor( Math.random() * 3) - 1;
            }
        );

        $scope.currentTrackIndex = 0;

        if (!player.paused)
        {
            var tmp = $scope.playlistTracks[0];
            var i = $scope.playlistTracks.indexOf(cur);
            $scope.playlistTracks[0] = $scope.playlistTracks[i];
            $scope.playlistTracks[i] = tmp;
        }

    }

    $scope.onKeyDown = function (ev)
    {
        switch (ev.which)
        {
        case 37: // left
            ev.preventDefault();
            $scope.prevTrack();
            break;
        case 39: // right
            ev.preventDefault();
            $scope.nextTrack();
            break;
        case 32: // space
            ev.preventDefault();
            $scope.playPause();
            break;
        }
    }

    function runPlaylist(){
        if(player.paused){
            $scope.playIndex($scope.currentTrackIndex);
        }
    }

    /* Play file given a path */
    $scope.playPath = function (path)
    {
        player.src = path;
        player.load ();
        player.play ();
    }

    /* Play track in playlist and update current track index */
    $scope.playIndex = function (index)
    {
        var ids = $scope.playlistTracks[index];
        var artist = $scope.library.artists[ids[0]];
        var album = artist.albums[ids[1]];
        var track = album.tracks[ids[2]];

        console.log($scope.library.prefix
                        + '/' + artist.name + '/' + album.title + '/' + track);

        $scope.playPath($scope.library.prefix
                        + '/' + artist.name + '/' + album.title + '/' + track);
        $scope.currentTrackIndex = index;
    };

    $scope.trackTitle = function (ids)
    {
        return $scope.library.artists[ids[0]].albums[ids[1]].tracks[ids[2]];
    };


    $scope.trimTrack = function (track)
    {
        return track.replace(/^\d+\s*[-.]?\s*|\.[^.]+$/gi, '');
    };

}

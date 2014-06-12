<?php

function scan_dir ($dir)
{
    return array_diff (scandir ($dir), array('.', '..') ) ;
}

/**
 * @return php representation of album object
 * {
 *   "cover": "cover_file.jpg",
 *   "songs": ["track-01.ogg", "track-02.ogg, ..."]
 * }
 */
function album ($dir, $name)
{

    $album = array () ;

    $album ['title'] = $name ;

    $album ['cover'] = "" ;

    $album ['songs'] = array () ;

    $dirEntries = scan_dir ($dir) ;

    foreach ($dirEntries as $entrie)
    {
        if (stristr ($entrie, '.mp3')
            || stristr ($entrie, '.ogg')
            || stristr ($entrie, '.m4a'))
        {
            $album ['songs'] [] = $entrie ;
        }
        else if (stristr ($entrie, '.jpg')
                 || stristr ($entrie, '.png'))
        {
            $album ['cover'] = $entrie ;
        }
    }

    return $album ;
}

/**
 * @return 
 * {
 *   "name" : "artist name",
 *   "albums" : [ album list ]
 * }
 */
function artist ($dir, $name)
{

    $artist = array () ;

    $artist ['name'] = $name;

    $artist ['albums'] = array () ;

    $dirEntries = scan_dir ($dir) ;

    foreach ($dirEntries as $entrie)
    {
        if (is_dir ("$dir/$entrie"))
        {
            $artist ['albums'] [] = album ("$dir/$entrie", $entrie) ;
        }
    }

    return $artist;
}

function library ($dir)
{

    $artists = array () ;

    $dirEntries = scan_dir ($dir) ;

    foreach ($dirEntries as $entrie)
    {
        if (is_dir ("$dir/$entrie"))
        {
            $artists [] = artist ("$dir/$entrie", $entrie) ;
        }
    }

    return $artists;
}

/*** main ***/

$library = array () ;

$library ['prefix'] = $argv [1] ;

$library ['artists'] = library ($argv [2]) ;

echo 'var data=' ;
echo json_encode ($library) ;
echo ';' ;
?>

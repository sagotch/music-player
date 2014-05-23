<?php

require_once "../../config.php";

$get_dir = isset ($_GET['dir']) ? strip_tags ($_GET['dir']) : false;

function error_message ()
{
    echo json_encode (array ("data" => array (), "error" => true));
    die ();
}

if ($get_dir === false)
{
    error_message ();
}

$request_dir = $root.$get_dir;

if (realpath ($request_dir) === false)
{
    error_message ();
}
if (strstr ($request_dir, $root) === false)
{
    error_message ();
    // tries to list no music dirs
}

if (! is_readable ($request_dir))
{
    error_message ();
}

$return = array ();

$return ['cover'] = "";

$list = scandir ($request_dir);

$songs = array ();

foreach ($list as $file)
{

    if (! is_dir ($request_dir.$file))
    {
        if (stristr ($file, ".mp3"))
        {
            $songs [] = array (
                "name" => $file,
                "path" => $get_dir . "/" . $file
            );
        }
        else if (stristr ($file, ".jpg"))
        {
            $return ['cover'] = $get_dir . "/" . $file;
        }
    }
}

$return ['songs'] = $songs;

echo json_encode ($return);

?>

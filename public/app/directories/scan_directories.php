<?php

require_once "../../config.php";

/**
 * type folder = name : string, children : folder list
 */

function scanFolders ($dir)
{
    global $exclude_dirs;
    $dirs = array ();

    if(! is_readable ($dir))
    {
        return $dirs;
    }

    $list = scandir ($dir);

    foreach ($list as $row)
    {
        if (is_dir ($dir.$row)
            && ! in_array ($row, $exclude_dirs))
        {
            $dirs [$row] = array (
                "name" => $row,
                "children" => scanFolders ($dir . $row."/")
            );
        }
    }
    return $dirs;
}

$dirs = scanFolders($root);

if ($dynamic_dir_scan === true)
{
    echo json_encode($dirs);
}

else
{
    if (is_writable ($root."public/cache/directories.json"))
    {
        $file_handler = fopen ($root . "public/cache/directories.json", "w+");
        fwrite ($file_handler, json_encode ($dirs));
        fclose ($file_handler);
    }
}
?>

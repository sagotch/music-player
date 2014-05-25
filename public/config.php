<?php

$root = realpath (dirname (__FILE__) . '/..');

$music_dir = 'music';

$host = 'http://'
      . $_SERVER['HTTP_HOST']
      . str_replace ('public/config.php', '', $_SERVER['PHP_SELF']);

$exclude_dirs = array ('.', '..', 'public', '.git');

$dynamic_dir_scan = true;

$public = array(
    "host" => $host,
    "server" => $host . '/public'
);

if (isset ($_GET['view']))
{
    if ($_GET['view'] == 'jsobject')
    {
        echo 'var config = {};';
        foreach ($public as $key => $value)
        {
            echo "config.$key = '$value'\n";
        }
    }
}
?>

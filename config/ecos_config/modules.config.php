<?php
/**
 * List of enabled modules for this application.
 *
 * This should be an array of module namespaces used in the application.
 */

 $default_modules = require __DIR__ . '/../modules.config.php'; 

 getModules($default_modules);

 // Get Folder Module
 function getModules(&$result) {
     $modules = array();
     $registerModule = array();
     $directories = glob(dirname(__DIR__) .'/../module/*');
     foreach ($directories as $directory) {
         if(is_dir($directory .'/config')){
             $modules[basename($directory)] = basename($directory);
             $registerModule[] = basename($directory);
         } else {
             $subModules = glob($directory . '/*');
             foreach ($subModules as $subModule) {
                 $modules[basename($directory)][] = basename($subModule);
                 $registerModule[] = basename($subModule);
             }
         }
     }
     
     $result = array_merge($result,$registerModule);
 
     //Check Module Composer
     $isDiff = false;
     $composer_file = json_decode(file_get_contents(dirname(__DIR__) .'/../composer.json'));
     $autoload = (array)$composer_file->autoload;
     $prs_4 = (array)$autoload['psr-4'];
     
     //Check Is Module
     foreach ($prs_4 as $_module => $value) {
         $name_module = str_replace("\\","", $_module);
         if(!is_dir(dirname(__DIR__) .'/../module/'.$name_module .'/config')) {
             unset($prs_4[$_module]);
             $isDiff = true;
         }
     }
 
     //Check Module
     foreach ($modules as $key => $module) {
        if(is_array($module)) {
            foreach ($module as $path) {
                if(!isset($prs_4[$path ."\\"])){
                    $prs_4[$path ."\\"] = "module/". $key ."/".$path ."/src/";
                    $isDiff = true;
                }
            }
        }else {
         if(!isset($prs_4[$module ."\\"])){
             $prs_4[$module ."\\"] = "module/". $module ."/src/";
             $isDiff = true;
         }
        }
     }
 
     if($isDiff) {
         //Update Composer File
         $autoload['psr-4'] = $prs_4;
         (array)$composer_file->autoload = $autoload;
         //Write File Composer
         file_put_contents(dirname(__DIR__) .'/../composer.json',json_encode($composer_file));
 
         $cmd  = "composer dump-autoload" ;
         exec( $cmd );
     }
 }
 
 return $default_modules;
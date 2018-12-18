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
     $directories = glob(dirname(__DIR__) .'/../module/*');
     foreach ($directories as $directory) {
         if(is_dir($directory)){
             $modules[] = basename($directory);
         }
     }
     $result = array_merge($result,$modules);
 
     //Check Module Composer
     $isDiff = false;
     $composer_file = json_decode(file_get_contents(dirname(__DIR__) .'/../composer.json'));
     $autoload = (array)$composer_file->autoload;
     $prs_4 = (array)$autoload['psr-4'];
     
     //Check Is Module
     foreach ($prs_4 as $_module => $value) {
         $name_module = str_replace("\\","", $_module);
         if(!is_dir(dirname(__DIR__) .'/../module/'.$name_module)) {
             unset($prs_4[$_module]);
             $isDiff = true;
         }
     }
 
     //Check Module
     foreach ($modules as $module) {
         if(!isset($prs_4[$module ."\\"])){
             $prs_4[$module ."\\"] = "module/". $module ."/src/";
             $isDiff = true;
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
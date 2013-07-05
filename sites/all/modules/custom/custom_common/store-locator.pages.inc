<?php

function store_locator_map_render($cid){
   drupal_add_js(drupal_get_path('module', 'custom_common') . '/js/store-locator-map.js');
   drupal_add_js(array('storelocator' => array('cid' => $cid)), array('type' => 'setting'));
   $output = '<div id="map-canvas" style="height:500px;width:600px;float:left;"></div>';
   $output .= '<div id="side_bar" style="float:left;">
    <ul></ul
   </div>';
   return $output; 
}
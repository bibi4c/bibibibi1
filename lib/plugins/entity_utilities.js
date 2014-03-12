/*
Plugin Name: HTML Button
Plugin URI: https://github.com/empika/ImpactJS-Plugins
Description: Bind HTML buttons to ordinary mouse clicks (mouseup, mousedown, click)
Version: 0.2
Revision Date: 20-05-2012
Requires: ImpactJS
Author: Edward Parris
Author URI: http://www.nixonmcinnes.co.uk/people/edward/
Changelog
---------
0.2: Namespace the plugin.
0.1: Initial release.
*/

ig.module(
  'plugins.entity_utilities'
)
.requires(
  'impact.entity',
  'impact.input'
)
.defines(function() {
  ig.Entity.inject({
    zIndex: 1,
    isMouseInside: function (){
      var entities = ig.game.entitiesUnderMouse();
      if(this == entities[entities.length -1]){
        return true;
      }
      return false;
    }
    
  });
});
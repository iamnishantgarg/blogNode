var map = { 17: false, 98: false };
$(document)
  .keydown(function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = true;
      if (map[17] && map[69] && map[98]) {
        // FIRE EVENT
        console.log("crtl +b pressed");
      }
    }
  })
  .keyup(function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = false;
    }
  });

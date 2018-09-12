function randomBetween(start, end){
  return Math.floor(Math.random() * (end - start + 1) + start);
}

function randomFloatBetween(start, end){
  return Math.random() * (end - start) + start;
}

// Useful helpers:
function copyCssStyle(elementTo, elementFrom, stylename) {
  $(elementTo).css(stylename, $(elementFrom).css(stylename));
}

function rgba(r, g, b, a) {
  return "" + dec2hex(r) + dec2hex(g) + dec2hex(b);// + dec2hex(r)
}

function dec2hex(d) {
  //return d.toString(16); // unpadded
  return (d / 256 + 1 / 512).toString(16).substring(2, 4);
}

function isTouchDevice() {
  var el = document.createElement('div');
  el.setAttribute('id',"touchtesttoremove");
  el.setAttribute('ongesturestart', 'return;');
  if(typeof el.ongesturestart == "function"){
    $('#touchtesttoremove').remove();
    return true;
  } else {
    $('#touchtesttoremove').remove();
    return false;
  }
}

// $(function() {
//   window.keydown = {};
//
//   function keyName(event) {
//     return jQuery.hotkeys.specialKeys[event.which] ||
//       String.fromCharCode(event.which).toLowerCase();
//   }
//
//   $(document).bind("keydown", function(event) {
//     keydown[keyName(event)] = true;
//     event.preventDefault();
//   });
//
//   $(document).bind("keyup", function(event) {
//     keydown[keyName(event)] = false;
//     event.preventDefault();
//   });
// });

// Debug tools:
function dumpObject(myObj) {
  //debugClear();
  console.log("");
  for (myKey in myObj){
    console.log("myObj["+myKey +"] = "+myObj[myKey]);
  }
}
function stringify(myObj) {
  console.log(JSON.stringify(myObj));
}


const padChar = '　'

exports.fullWidth = function(text) {
  var full = '';
  for (var i=0;i<text.length;i++) {
    let code = text.charCodeAt(i);
    if (code == 32) {
      full += padChar;
    } else if (code >= 33 && code <= 126) {
      full += String.fromCharCode(code+0xfee0); // full width conversion
    }
  }
  return full;
}

exports.paddedFullWidth = function(text,padSize) {
  var padded = exports.fullWidth(text);
  while(padded.length < padSize) {
    padded += padChar;
  }
  return padded;
}

exports.errorWrap = function(func) {
  return function() {
    var r;
    try {
      r = func.apply(this,arguments);
    } catch(e) {
      console.error(e);
    }
    return r;
  }
}

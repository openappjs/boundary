var beforeHook = require('beforefn');
var afterHook = require('afterfn');

module.exports = function wrapSync (handler, before, after) {
  var fn = handler;
  for (var i = 0; i < before.length; i++) {
    fn = beforeHook(fn, before[i]);
  }
  for (var i = 0; i < after.length; i++) {
    fn = afterHook(fn, after[i])
  }
  return fn;
};

var debug = require('debug')('boundary');

var types = require('./types');

module.exports = Boundary;

function Boundary(desc, options) {
  // call new constructor if not already
  if (!(this instanceof Boundary)) {
    return new Boundary(desc, options);
  }
  debug("constructor", desc, options);

  // save input schema
  this.input = desc.input || {};
  // save output schema
  this.output = desc.output || {};

  // save before hooks
  this.before = desc.before || [];
  // save after hooks
  this.after = desc.after || [];

  // save options
  // with default of empty object
  this.options = options || {};
  // default plugins to empty array
  this.options.plugins = this.options.plugins || [];

  // use plugins
  this.options.plugins.forEach(function (plugin) {
    this.use(plugin);
  }.bind(this));
}

// prototype function to handle plugin functions
Boundary.prototype.use = function _Boundary_use (plugin) {
  debug("use", plugin);
  return plugin.call(this, this);
};

// prototype function to wrap handler functions
Boundary.prototype.wrap = function _Boundary_wrap (type, handler) {
  debug("wrap", type, handler);
  return types[type](handler, this.before, this.after);
};

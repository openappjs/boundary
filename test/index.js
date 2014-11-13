var test = require('tape');

var Boundary;

test("require module", function (t) {
  Boundary = require('../');
  t.equal(typeof Boundary, "function");
  t.end();
});

test("sync wrap of simple boundary with before hooks", function (t) {
  var called = [];

  var boundary = Boundary({
    before: [
      function up () {
        called.push("up")
        up.args[0] = up.args[0].toUpperCase();
      },
      function pass () {
        called.push("pass");
      },
    ],
  });

  t.equal(typeof boundary, "object");
  t.equal(typeof boundary.input, "object");
  t.equal(typeof boundary.output, "object");
  t.equal(Array.isArray(boundary.before), true);
  t.equal(Array.isArray(boundary.after), true);
  t.equal(typeof boundary.options, "object");
  t.equal(typeof boundary.use, "function");
  t.equal(typeof boundary.wrap, "function");

  function hello (str) {
    return "hello " + str;
  }

  t.equal(hello("Taylor"), "hello Taylor");

  var wrapped = boundary.wrap('sync', hello);
  t.ok(wrapped);
  t.equal(wrapped("Taylor"), "hello TAYLOR");

  t.deepEqual(called, ["up", "pass"]);

  t.end();
});

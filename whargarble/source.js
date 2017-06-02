import * as assert2 from 'assert';
var assert1 = require("assert");
var x = 1;
assert1(1 == 1, 'fail');
assert2(1 == 1, 'fail');
assert1 = "derp";
function derp(){
    function assert2(){

    }
  var assert1 = () => {};
    assert2();

    assert1();
}

assert1(1==1, 'fail');

var assert1 = require('assert');

assert1(1==1, 'wooooo');
assert1 = "das";
assert1(1==1, 'woooo');

class something {}
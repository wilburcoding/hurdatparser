import test from 'ava';
import { Hurdat, Util, Point } from "../src/index.js"
var util;
var point
test.before(() => {
  util=new Util();
  point=new Point(1,2);
})
test('Testing Util.ktToMph (Converts)', t => {
	t.is(util.ktToMph(1),1.1507794480136)
});
test('Testing Util.ktToMph (Invalid)', t => {
	t.throws(() => util.ktToMph(false))
});
test('Testing Util.mphToKt (Converts)', t => {
	t.is(util.mphToKt(1),0.86897624)
});
test('Testing Util.mphToKt (Invalid)', t => {
	t.throws(() => util.mphToKt(false))
});
test('Testing Util.kphToMph (Converts)', t => {
	t.is(util.kphToMph(1),0.621371192)
});
test('Testing Util.kphToMph (Invalid)', t => {
	t.throws(() => util.kphToMph(false))
});
test('Testing Util.mhpToKph (Converts)', t => {
	t.is(util.mhpToKph(1),1.6093440006147)
});
test('Testing Util.mhpToKph (Invalid)', t => {
	t.throws(() => util.mhpToKph(false))
});
test('Testing Util.ktToKph (Converts)', t => {
	t.is(util.ktToKph(1),1.852)
});
test('Testing Util.ktToKph (Invalid)', t => {
	t.throws(() => util.kphToMph(false))
});
test('Testing Util.kphToKt (Converts)', t => {
	t.is(util.kphToKt(1),0.5399568)
});
test('Testing Util.kphToKt (Invalid)', t => {
	t.throws(() => util.kphToKt(false))
});

test('Testing Point.getLat', t => {
	t.is(point.getLat(), 1)
});

test('Testing Point.getLong', t => {
	t.is(point.getLong(), 2)
});
test('Testing Point (invalid lat)', t => {
	t.throws(()=>new Point(-95,2));
});
test('Testing Point (invalid long)', t => {
	t.throws(()=>new Point(-5,190));
});

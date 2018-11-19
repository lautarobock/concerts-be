import test from 'ava';

const fn = async () => Promise.resolve('foo');

test('Foo', async t => {
	t.is(await fn(), 'foo');
});

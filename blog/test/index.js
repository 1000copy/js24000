import test from 'ava';
test(t => {
    t.deepEqual([1, 2], [1, 2]);
    t.true(true,"not true");
    t.is(1,1,"not equal");
});
test.todo('will think about writing this later');
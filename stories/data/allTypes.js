const allTypes = () => {
  const dt = new Date();
  const er = new Error("hello, I'm an error");
  const fn = () => "Hello world";
  const re = new RegExp("ab+c");
  const all = {
    array: [
      [-105.00432014465332, 39.74732195489861],
      [-105.00715255737305, 39.7462000683517],
      [-105.00921249389647, 39.74468219277038],
      [-105.01067161560059, 39.74362625960105]
    ],
    "boolean-true": true,
    "boolean-false": false,
    "circular-ref": "?",
    date: dt,
    error: er,
    function: fn,
    math: Math.PI,
    null: null,
    number: 42,
    object: {
      foo: "bar",
      baz: "qux"
    },
    regexp1: re,
    string: "hello, world",
    undefined: undefined
  };
  all["circular-ref"] = all.array[2];
  return all;
};
export { allTypes };

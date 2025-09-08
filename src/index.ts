const foo = () => {
  console.group("foo running...");
  console.groupEnd();
};

const bar = () => {
  console.group("bar running...");
  console.groupEnd();
};

export { foo, bar };

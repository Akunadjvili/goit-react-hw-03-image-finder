const scroll = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
const scrollBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};

export { scroll, scrollTop, scrollBottom };

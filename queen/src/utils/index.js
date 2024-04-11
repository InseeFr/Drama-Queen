export { default as addOnlineStatusObserver } from './online-status-observer';
export const getPercent = (n, length) => Math.round((100 * n) / length);

export const chunk = (array, chunkSize) => {
  const res = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

export const goToTopPage = topRef => {
  if (topRef && topRef.current) {
    topRef.current.tabIndex = -1;
    topRef.current.focus();
    topRef.current.blur();
    window.scrollTo({ top: 0 });
    topRef.current.removeAttribute('tabindex');
  }
};

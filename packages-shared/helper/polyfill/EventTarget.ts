// @ts-ignore
EventTarget.prototype.subscribe = function (type, listener) {
  this.addEventListener(type, listener);
  return () => this.removeEventListener(type, listener);
};

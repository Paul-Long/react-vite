export function loadJS(url: string, elementId: string) {
  return new Promise<void>((resolve, reject) => {
    const oldElement = document.getElementById(elementId);
    if (oldElement) {
      oldElement.addEventListener('load', () => resolve());
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = elementId;
    script.async = true;
    script.src = url;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', (e) => reject(e));
    document.body.appendChild(script);
  });
}

const ASCII = {38: 'UP', 40: 'DOWN', 37: 'LEFT', 39: 'RIGHT'};
const INVALID_ASCII = [9, 10, 11, 13, 27];

const key$ = Rx.Observable.fromEvent(document, 'keydown')
  .map(event => event.keyCode);

const bufferedKeys$ = key$
  .buffer(() => key$.debounce(500));

const convertedKeys$ = bufferedKeys$
  .map(keyArray => keyArray
    .filter(key => INVALID_ASCII.indexOf(key) < 0)
    .slice(-10)
    .map(ascii => ASCII[ascii] || String.fromCharCode(ascii))
    .join(' ')
  );

const konamiCode$ = convertedKeys$
  .filter(keyString => keyString === 'UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A');

// Logging
convertedKeys$.subscribe(console.log);
konamiCode$.subscribe(() => {
  console.warn('Congrats!  You entered the Konami code.');
  setTimeout(() => window.location.href = 'https://www.youtube.com/watch?v=oHg5SJYRHA0', 2000);
});

// Visuals
key$.subscribe(key => createMarble('key', key));
bufferedKeys$.subscribe(keys => createMarble('keysBuffered', keys));
convertedKeys$.subscribe(keys => createMarble('keysConverted', keys));

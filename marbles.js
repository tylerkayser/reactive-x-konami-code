function createMarble(id, key) {
  const marble = document.createElement('template');
  const visual = document.getElementById(id);
  marble.innerHTML = '<div class="rx-marble">' + key + '</div>';
  const child = marble.content.firstChild;
  child.classList.add('rx-marble-' + getRandomColor());

  visual.appendChild(child);
  setTimeout(() => {
    child.classList.add('rx-marble-animated');
    child.addEventListener('transitionend', () => child.parentNode.removeChild(child));
  }, 100);
}

function getRandomColor() {
  const COLORS = [
    'indigo',
    'blue',
    'green',
    'yellow',
    'orange',
    'red'
  ];

  return COLORS[Math.floor(Math.random() * 5)];
}

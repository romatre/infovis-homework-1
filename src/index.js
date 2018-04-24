/* eslint-disable max-len,no-undef,arrow-body-style,prefer-destructuring */
const d3 = require('d3');
const keypress = require('./utilities/keypress');
const actions = require('./utilities/actions');
const sound = require('./sounds/biplane.mp3');

require('./css/style.css');

const root = d3.select('#root');

let state = actions.appendAircraft(root, {
  rotate: 0,
  x: (window.innerWidth / 2) - 50,
  y: (window.innerHeight / 2) - 50,
  previousCommand: 'up',
  meters: 0,
});

const istruzioni = root.append('div').attr('id', 'istruzioni').append('div');
istruzioni.append('p').text('Per muovere l\'areoplanino utilizza i tasti direzione della tastiera.');
const istruzioniH2 = istruzioni.append('h2');
istruzioniH2.append('span').attr('id', 'metri').text('0');
istruzioniH2.append('span').text(' metri percorsi');

root.append('audio').attr('id', 'sound').append('source').attr('src', sound);

['Up', 'Right', 'Down', 'Left'].forEach(direction => keypress[`onKey${direction}`](() => {
  d3.selectAll('audio').node().play();
  state = actions[`moveAircraft${direction}`](root, state);
}));

let oldState;
setInterval(() => {
  if (oldState === JSON.stringify(state)) {
    d3.selectAll('audio').node().pause();
  }
  oldState = JSON.stringify(state);
}, 1000);

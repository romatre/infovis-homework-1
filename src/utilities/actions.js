/* eslint-disable prefer-destructuring,no-undef */
const d3 = require('d3');
const { silhouette } = require('../paths');

const STEPS = 50;

const updateAircraftState = (root, data, transition = true, speed = 200) => {
  root
    .selectAll('.aircraft')
    .data([data])
    .transition()
    .duration(transition ? speed : 0)
    .ease(d3.easeLinear)
    .attr('transform', ({ x, y, rotate }) => `translate(${x} ${y}) rotate(${rotate} 50 100)`);
  const tail = root.select('.tail').node().getBoundingClientRect();
  Array(10).fill(Math.random() * 10).forEach((r) => {
    root.select('svg')
      .append('circle')
      .attr('class', 'cloud')
      .attr('fill', 'white')
      .attr('cx', tail.x + (Math.random() * 10))
      .attr('cy', tail.y + (Math.random() * 10))
      .attr('r', r);
  });
  root.selectAll('#metri').data([data]).text(({ meters }) => meters);
  setTimeout(() => {
    root.selectAll('.cloud').remove();
  }, Math.random() * 2000);
  return data;
};

const appendAircraft = (root, initialState) => {
  const aircraft = root
    .append('svg')
    .append('g')
    .attr('class', 'aircraft')
    .attr('transform', `translate(${initialState.x} ${initialState.y}) rotate(${initialState.rotate} 50 100)`);
  aircraft.append('path')
    .attr('d', silhouette);
  aircraft.append('circle')
    .attr('class', 'tail')
    .attr('fill', 'white')
    .attr('r', 0)
    .attr('cx', 50)
    .attr('cy', 100);
  return updateAircraftState(root, initialState);
};

const moveAircraft = (root, x, y, s) => {
  let posX = s.x + x;
  let posY = s.y + y;
  let transition = true;
  if (posX + 100 < 0) {
    posX = window.innerWidth;
    transition = false;
  }
  if (posX - 50 > window.innerWidth) {
    posX = -80;
    transition = false;
  }
  if (posY + 100 < 0) {
    posY = window.innerHeight;
    transition = false;
  }
  if (posY - 50 > window.innerHeight) {
    posY = -80;
    transition = false;
  }
  return updateAircraftState(root, Object.assign({}, s, {
    meters: Math.round(s.meters + (Math.random() * 10)),
    x: posX,
    y: posY,
  }), transition);
};

const moveAircraftUp = (root, s, S = STEPS) => {
  let rotate;
  switch (s.previousCommand) {
    case 'right':
      rotate = s.rotate - 90;
      break;
    case 'down':
      rotate = s.rotate - 180;
      break;
    case 'left':
      rotate = s.rotate + 90;
      break;
    default:
      rotate = s.rotate;
  }
  return moveAircraft(root, 0, -S, Object.assign({}, s, { previousCommand: 'up', rotate }));
};

const moveAircraftRight = (root, s, S = STEPS) => {
  let rotate;
  switch (s.previousCommand) {
    case 'left':
      rotate = s.rotate - 180;
      break;
    case 'down':
      rotate = s.rotate - 90;
      break;
    case 'up':
      rotate = s.rotate + 90;
      break;
    default:
      rotate = s.rotate;
  }
  return moveAircraft(root, S, 0, Object.assign({}, s, { previousCommand: 'right', rotate }));
};

const moveAircraftDown = (root, s, S = STEPS) => {
  let rotate;
  switch (s.previousCommand) {
    case 'left':
      rotate = s.rotate - 90;
      break;
    case 'right':
      rotate = s.rotate + 90;
      break;
    case 'up':
      rotate = s.rotate + 180;
      break;
    default:
      rotate = s.rotate;
  }
  return moveAircraft(root, 0, S, Object.assign({}, s, { previousCommand: 'down', rotate }));
};

const moveAircraftLeft = (root, s, S = STEPS) => {
  let rotate;
  switch (s.previousCommand) {
    case 'right':
      rotate = s.rotate + 180;
      break;
    case 'down':
      rotate = s.rotate + 90;
      break;
    case 'up':
      rotate = s.rotate - 90;
      break;
    default:
      rotate = s.rotate;
  }
  return moveAircraft(root, -S, 0, Object.assign({}, s, { previousCommand: 'left', rotate }));
};

module.exports = {
  appendAircraft,
  moveAircraftUp,
  moveAircraftRight,
  moveAircraftDown,
  moveAircraftLeft,
};

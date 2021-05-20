let letters = [];
let letterInput;
let submitButton;
let main;
let resultsContainer;

function setup() {
  noCanvas();
  resultsContainer = createElement('results');
  let container = createDiv();
  container.addClass('container');
  main = select('main');
  letterInput = createInput();
  letterInput.attribute('placeholder', 'Letters...');
  letterInput.attribute('id', 'letter-input');
  submitButton = createButton('&#xf002', 'submit');
  submitButton.attribute('id', 'submit-button');
  submitButton.mousePressed(getLetters);
  submitButton.input(getLetters);
  container.child(letterInput);
  container.child(submitButton);
  main.child(container);
  loadWords();
}

function getLetters() {
  if (DONE == false) {
    alert('Please let the dictionairy load first!');
    return;
  }
  PAST = new Set()  // reset PAST
  let _letters = letterInput
    .value()
    .replace(/\s+/g, '')
    .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
  letterInput.value('');
  let letterArray = Array.from(_letters).map((s) => s.toLowerCase());
  let sortedWords = {};
  for (let letters of reduce(letterArray)) {
    for (let letter of sortedPossibilities(letters)) {
      if (sortedWords[letter.length.toString()] === undefined) {
        sortedWords[letter.length.toString()] = [letter];
      } else {
        sortedWords[letter.length.toString()].push(letter);
      }
    }
  }
  console.log(letterArray);
  console.log(sortedWords);
  createWordList(sortedWords);
  delete sortedWords;
  delete letterArray;
}

function createWordList(sortedWords) {
  select('.results-container')?.remove();
  let keys = Object.keys(sortedWords);
  let parent = createDiv();
  parent.addClass('results-container');
  for (let key of keys) {
    parent.child(createElement('h2').html(`Words with length ${key}`));
    const toList = (elem) => {
      parent.child(createDiv().html(elem));
    };
    sortedWords[key].map(toList);
    resultsContainer.child(parent);
  }
}

function loadWords() {
  createWords();
  let loaded = select('#loaded');
  let loading = select('#loading');

  function checkDone() {
    if (DONE == false) {
      window.setTimeout(checkDone, 100);
    } else {
      loading.addClass('hidden');
      loaded.removeClass('hidden');
      setTimeout(function () {
        loaded.addClass('hidden');
      }, 2000);
    }
  }
  checkDone();
}

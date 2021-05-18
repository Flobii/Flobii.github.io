function findAllPossibilities(lettersList) {
  function* stage(remLetters) {
    if (remLetters.length > 1) {
      for (let letter of remLetters) {
        remLetters.unshift(remLetters.pop());
        let [letter, ...subList] = remLetters;
        for (let element of stage(subList)) {
          yield letter + element;
        }
      }
    } else {
      yield remLetters[0];
    }
  }

  return stage(lettersList);
}

function* reduce(lettersList) {
  let length = lettersList.length;
  yield lettersList;

  for (let _ of lettersList) {
    let head = lettersList.pop();
    let tail = lettersList;
    if (length > 4) {
      for (let reduced of reduce(tail)) {
        yield reduced;
      }
    }
    yield tail;
    lettersList.unshift(head);
  }
}

async function createWords() {
  const URL =
    'https://gist.githubusercontent.com/MarvinJWendt/2f4f4154b8ae218600eb091a5706b5f4/raw/36b70dd6be330aa61cd4d4cdfda6234dcb0b8784/wordlist-german.txt';
  let words = await fetch(URL);
  words = (await words.text()).split('\n');
  words = words.map((value) => value.toLowerCase());
  console.log('Done');
  DONE = true;
  WORDS = new Set(words);
}

let DONE = false;
let PAST = new Set();
let WORDS;

function* sortedPossibilities(letters) {
  let posibilities = findAllPossibilities(letters);
  for (let pos of posibilities) {
    if (!PAST.has(pos) && WORDS.has(pos)) {
      PAST.add(pos);
      yield pos;
    }
  }
}

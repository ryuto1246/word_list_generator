import vocabulary1 from './vocabulary/vocabulary1.json' with { type: 'json' };
// import vocabulary2 from './vocabulary/vocabulary2.json' with { type: 'json' };

function loadVocabularyFiles() {
  const vocabularyData = [
    { title: 'vocabulary1.json', data: vocabulary1 },
    // { title: 'vocabulary2.json', data: vocabulary2 },
  ];
  return vocabularyData;
}

function getArticle(gender) {
  switch (gender) {
    case 'masculine':
      return 'der';
    case 'feminine':
      return 'die';
    case 'neuter':
      return 'das';
    default:
      return '';
  }
}

function displayVocabularyData(vocabularyData) {
  const vocabularyList = document.getElementById('vocabularyList');
  vocabularyList.innerHTML = '';

  const modeSwitch = document.getElementById('modeSwitch');

  vocabularyData.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'vocabulary-section';

    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = section.title;
    sectionDiv.appendChild(sectionTitle);

    section.data.forEach(entry => {
      const vocabularyEntry = document.createElement('div');
      vocabularyEntry.className = 'vocabulary-entry';

      const wordDiv = document.createElement('div');
      wordDiv.className = 'word';

      entry.word.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        if (modeSwitch.checked && entry.gender) {
          if (entry.gender[index] === 'masculine') {
            wordSpan.classList.add('gender-m');
          } else if (entry.gender[index] === 'neuter') {
            wordSpan.classList.add('gender-n');
          } else if (entry.gender[index] === 'feminine') {
            wordSpan.classList.add('gender-f');
          } else if (entry.gender[index] === null) {
            wordSpan.classList.add('gender-p');
          }
        }
        const article = entry.gender && entry.gender[index] ? getArticle(entry.gender[index]) : '';
        wordSpan.textContent = `${article} ${word}`;
        wordDiv.appendChild(wordSpan);

        if (index < entry.word.length - 1) {
          const separator = document.createTextNode(' / ');
          wordDiv.appendChild(separator);
        }
      });

      vocabularyEntry.appendChild(wordDiv);

      const detailsDiv = document.createElement('div');
      detailsDiv.className = 'details';

      const meaningsDiv = document.createElement('div');
      meaningsDiv.className = 'meanings';
      entry.meanings.forEach(meaning => {
        const meaningText = document.createTextNode(`${meaning.ja} / ${meaning.en}`);
        meaningsDiv.appendChild(meaningText);
        meaningsDiv.appendChild(document.createElement('br'));
      });
      detailsDiv.appendChild(meaningsDiv);

      if (entry.prefix) {
        const prefixMeaningDiv = document.createElement('div');
        prefixMeaningDiv.className = 'prefix-meaning';
        const prefixParts = entry.prefix.split('|');
        prefixParts.forEach((part, index) => {
          const partText = document.createTextNode(`${part} (${entry.prefixMeaning[index]})`);
          prefixMeaningDiv.appendChild(partText);
          if (index < prefixParts.length - 1) {
            prefixMeaningDiv.appendChild(document.createTextNode(', '));
          }
        });
        detailsDiv.appendChild(prefixMeaningDiv);
      }

      const exampleDiv = document.createElement('div');
      exampleDiv.className = 'example';
      exampleDiv.textContent = entry.example;
      detailsDiv.appendChild(exampleDiv);

      // const exampleTranslationDiv = document.createElement('div');
      // exampleTranslationDiv.className = 'example-translation';
      // const exampleTranslationMatch = entry.example.match(/\((.+)\)/);
      // if (exampleTranslationMatch) {
      //   exampleTranslationDiv.textContent = exampleTranslationMatch[1];
      // }
      // detailsDiv.appendChild(exampleTranslationDiv);

      vocabularyEntry.appendChild(detailsDiv);

      sectionDiv.appendChild(vocabularyEntry);
    });

    vocabularyList.appendChild(sectionDiv);
  });
}

const vocabularyData = loadVocabularyFiles();
displayVocabularyData(vocabularyData);

document.getElementById('modeSwitch').addEventListener('change', () => {
  displayVocabularyData(vocabularyData);
});
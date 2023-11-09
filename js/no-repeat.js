'use strict';

function cl(input) { console.log(input); }
/* THE GLOBAL "STATE" OF THE APPLICATION */
let state = {
  numClicksAllowed: 20,
  maxClicksReached: 0,
};

/* PICTURES OBJECT */
let pictures = [
  { id: 1, name: 'unicorn', filePath: 'img/unicorn.jpg', views: 0, votes: 0 },
  { id: 2, name: 'bathroom', filePath: 'img/bathroom.jpg', views: 0, votes: 0 },
  { id: 3, name: 'pet-sweep', filePath: 'img/pet-sweep.jpg', views: 0, votes: 0 },
  { id: 4, name: 'banana', filePath: 'img/banana.jpg', views: 0, votes: 0 },
  { id: 5, name: 'breakfast', filePath: 'img/breakfast.jpg', views: 0, votes: 0 },
  { id: 6, name: 'boots', filePath: 'img/boots.jpg', views: 0, votes: 0 },
  { id: 7, name: 'tauntaun', filePath: 'img/tauntaun.jpg', views: 0, votes: 0 },
  { id: 8, name: 'dragon', filePath: 'img/dragon.jpg', views: 0, votes: 0 },
  { id: 9, name: 'chair', filePath: 'img/chair.jpg', views: 0, votes: 0 },
  { id: 10, name: 'bubblegum', filePath: 'img/bubblegum.jpg', views: 0, votes: 0 },
  { id: 11, name: 'wine-glass', filePath: 'img/wine-glass.jpg', views: 0, votes: 0 },
  { id: 12, name: 'shark', filePath: 'img/shark.jpg', views: 0, votes: 0 },
  { id: 13, name: 'pen', filePath: 'img/pen.jpg', views: 0, votes: 0 },
  { id: 14, name: 'cthulhu', filePath: 'img/cthulhu.jpg', views: 0, votes: 0 },
  { id: 15, name: 'bag', filePath: 'img/bag.jpg', views: 0, votes: 0 },
  { id: 16, name: 'scissors', filePath: 'img/scissors.jpg', views: 0, votes: 0 },
  { id: 17, name: 'dog-duck', filePath: 'img/dog-duck.jpg', views: 0, votes: 0 },
  { id: 18, name: 'water-can', filePath: 'img/water-can.jpg', views: 0, votes: 0 },
  { id: 19, name: 'sweep', filePath: 'img/sweep.png', views: 0, votes: 0 },
];

/* CLASS / OLD CLASS */
function Picture(id, name, filePath, views = 0, votes = 0) {
  this.id = id;
  this.name = name;
  this.filePath = filePath;
  this.views = views;
  this.votes = votes;
}

/* LOCAL STORAGE LOGIC */
let getStoredPictures = localStorage.getItem('pictures');
if(getStoredPictures){
  pictures = JSON.parse(getStoredPictures);
}

/* GLOBAL VARS */
const pictureObjects = pictures.map(picture => new Picture(
  picture.id,
  picture.name,
  picture.filePath,
  picture.views,
  picture.votes
));
const imgElement = document.querySelectorAll('.clickables');
const displayedPictures = [];

/* FUNCTIONS / METHODS */
function getRandomPicture() {
  let availablePictures = pictureObjects.filter(
    picture => !displayedPictures.includes(picture)
  );

  if (availablePictures.length === 0) {
    // Reset displayedPictures array if all pictures have been shown
    displayedPictures.length = 0;
    availablePictures = pictureObjects.filter(
      picture => !displayedPictures.includes(picture)
    );
  }
  const randomIndex = Math.floor(Math.random() * availablePictures.length);
  return availablePictures[randomIndex];
}

function displayRandomPictures() {
  for (let i = 1; i <= 3; i++) {
    const imgElement = document.getElementById(`img_${i}`);
    const picture = getRandomPicture();

    picture.views++;
    displayedPictures.push(picture);
    imgElement.src = picture.filePath;
    imgElement.alt = picture.name;
    imgElement.dataset.pictureId = picture.id;
  }
}

function handleClick(e) {
  const altText = e.target.alt;
  const clickedPictureId = e.target.dataset.pictureId;
  const getNumClicks = pictureObjects.find(
    ({ name }) => name === altText
  );

  getNumClicks.votes++;
  e.target.dataset.votes = getNumClicks.votes;

  if (clickedPictureId) {
    // Handle user click on the picture with ID = clickedPictureId
    console.log(`User clicked on picture with ID ${clickedPictureId}`);
  }
  checkState();
}

function checkState() {
  if (state.maxClicksReached >= state.numClicksAllowed) {
    const resultsList = document.getElementById('result-list');
    const resultsBtn = document.getElementById('results-btn');
    const clearBtn = document.getElementById('clear-btn');
    const imgContainer = document.getElementById('img-selector');
    // Store object with new results in local storage
    localStorage.setItem('pictures', JSON.stringify(pictureObjects));

    cl('All pictures have been viewed this round!');
    // Remove event listeners
    imgElement.forEach(img => {
      img.removeEventListener('click', handleClick);
      if(!img.classList.contains('hidden')) {
        img.classList.add('hidden');
      }
    });

    resultsBtn.classList.remove('hidden');
    resultsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderResults(pictureObjects);
      imgContainer.classList.replace('img-container', 'all-vis');
      // Un-hide pictures
      imgElement.forEach(el => {
        el.classList.remove('hidden');
      });
      // Hide results button
      resultsBtn.classList.add('hidden');
      clearBtn.classList.remove('hidden');
    });

    clearBtn.addEventListener('click', (e) => {
      localStorage.removeItem('pictures');
      location.reload();
    });
  } else {
    displayRandomPictures(); // Display new pictures after a click
  }
  state.maxClicksReached++;
}

function createChart(imagesArr) {
  const votes = imagesArr.map(img => img.votes);
  const views = imagesArr.map(img => img.views);
  const names = imagesArr.map(img => img.name);
  const ctx = document.getElementById('chart-canvas').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [
        {
          label: 'Votes',
          data: votes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Views',
          data: views,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

/* METHOD TO RENDER RESULTS */
function renderResults(imagesArr) {
  const resultsList = document.getElementById('result-list');
  let sortedVotes = imagesArr.slice().sort((a, b) => {
    return b.votes - a.votes;
  });

  sortedVotes.forEach(sorted => {
    let li = document.createElement('li');
    let subLiVotes = document.createElement('li');
    let subLiViews = document.createElement('li');

    li.textContent = `${sorted.name}`;
    subLiVotes.textContent = `Votes: ${sorted.votes}`;
    subLiViews.textContent = `Views: ${sorted.views}`;

    li.classList.add('result-li-name');
    subLiVotes.classList.add('result-li-votes');
    subLiViews.classList.add('result-li-views');

    li.appendChild(subLiVotes);
    //li.appendChild(subLiViews);
    resultsList.appendChild(li);
  });

  createChart(imagesArr);
}


imgElement.forEach(img => {
  img.addEventListener('click', handleClick);
});

checkState();

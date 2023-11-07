const cl = (input) => {console.log(input);};
// The global "State" of the application
let state = {
  numClicksAllowed: 5,
  allPics: [],
};

const pictures = [
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

function Picture(id, name, filePath) {
  this.id = id;
  this.name = name;
  this.filePath = filePath;
  this.votes = 0;
  this.views = 0;
}

const pictureObjects = pictures.map(
  picture => new Picture(picture.id, picture.name, picture.filePath)
);

const allImages = document.querySelectorAll('.clickables');

allImages.forEach(img => {
  img.dataset.tooltip = img.alt;
});

const viewedPictures = [];


function getRandomPermutation(arr, num) {
  const shuffled = arr.slice(); // Clone the array
  let i = arr.length;
  const result = [];

  while (i-- && num > 0) {
    const index = Math.floor((i + 1) * Math.random());
    result.push(shuffled[index]);
    shuffled.splice(index, 1);
    num--;
  }

  return result;
}


function displayRandomPictures() {
  const uniquePermutation = getRandomPermutation(pictureObjects, 3);
  for (let i = 0; i < 3; i++) {
    const picture = uniquePermutation[i];
    const getNumViews = pictures.find(({name}) => name === picture.name);
    getNumViews.views++;
    viewedPictures.push(picture);

    const imgElement = document.getElementById(`img_${i + 1}`);
    imgElement.src = picture.filePath;
    imgElement.alt = picture.name;
    imgElement.dataset.pictureId = picture.id;
  }
}


function renderResults(imagesArr) {
  const resultsList = document.getElementById('result-list');

  let sortedVotes = imagesArr.sort((a, b) => {
    return(b.votes - a.votes);
  });

  sortedVotes.forEach(sorted => {
    let li         = document.createElement('li');
    li.textContent = `${sorted.name} -- votes = ${sorted.votes}`;
    resultsList.appendChild(li);
  });
}


function handleClick(e) {
  /* const clickedPictureId = e.target.dataset.pictureId; */
  const altText          = e.target.alt;
  let votes              = e.target.dataset.votes;
  const getNumClicks     = pictures.find(({name}) => name === altText);

  getNumClicks.votes++;
  votes = getNumClicks.votes;

  if (votes) {
    if(votes >= state.numClicksAllowed){
      renderResults(pictures);
      cl(pictures);
      alert(`Maximum number of clicks reached [${votes}] for ${altText}`);
      return true;
    }
  }

  /* if (clickedPictureId) {
    console.log(`User clicked on picture with ID ${clickedPictureId}`);
  } */
  displayRandomPictures();
}


allImages.forEach(img => {
  img.addEventListener('click', handleClick);
});


displayRandomPictures();

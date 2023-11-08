'use strict';
/* THE GLOBAL "STATE" OF THE APPLICATION */
let state = {
  numClicksAllowed: 5,
  maxClicksReached: 0,
  allPics: [],
};

export function cl(input) { console.log(input); };

export class Picture {
  /* Constructor for the Picture class */
  constructor(id, name, filePath) {
    this.id = id;
    this.name = name;
    this.filePath = filePath;
    this.votes = 0;
    this.views = 0;
  }

  static maxClicksReached = false;
  //=============================NOTE=============================
  /* The slice() method is used to create a shallow copy of the
    array it is called on. It takes a portion of the original array
    and returns a new array containing the selected elements.
    If no arguments are provided, it copies the entire array.

    Using the Array.slice method allows you to modify a copy of
    an array, without changing the original array, and can be used
    for comparisons */
  //=============================NOTE=============================

  /* METHOD TO GENERATE A RANDOM PERMUTATION OF PICTUREOBJECT */
  static getRandomPermutation(arr, num) {
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

  /* METHOD TO DISPLAY RANDOM PICTURES */
  static displayRandomPictures(pictureObject) {
    const uniquePermutation = Picture.getRandomPermutation(pictureObject,3);
    let viewedPictures = [];

    for (let i = 0; i < 3; i++) {
      const picture = uniquePermutation[i];
      const getNumViews = pictureObject.find(
        ({ name }) => name === picture.name
      );
      getNumViews.views++;
      viewedPictures.push(picture);

      const imgElement = document.getElementById(`img_${i + 1}`);
      imgElement.src = picture.filePath;
      imgElement.alt = picture.name;
      imgElement.dataset.pictureId = picture.id;
    }
    return (viewedPictures);
  }


  /* METHOD TO RENDER RESULTS */
  static renderResults(imagesArr) {
    const resultsList = document.getElementById('result-list');
    let sortedVotes = imagesArr.slice().sort((a, b) => {
      return b.votes - a.votes;
    });

    sortedVotes.forEach(sorted => {
      let li = document.createElement('li');
      li.textContent = `${sorted.name} -- votes = ${sorted.votes}`;
      resultsList.appendChild(li);
    });
  }


  /* METHOD TO HANDLE IMAGE CLICK EVENT */
  static handleClick(e, pictureObjects, domObjects = []) {
    e.preventDefault();
    const altText = e.target.alt;
    let votes = e.target.dataset.votes;
    const getNumClicks = pictureObjects.find(
      ({ name }) => name === altText
    );
    getNumClicks.votes++;
    votes = getNumClicks.votes;

    if (votes) {
      if (votes >= state.numClicksAllowed) {
        Picture.renderResults(pictureObjects);
        // Remove event listeners
        this.maxClicksReached = votes;
        alert(
          `Maximum number of clicks reached [${votes}] for ${altText}`
        );

        domObjects.forEach(obj => {
          cl(obj);
          obj.removeEventListener('click', e);
        })

        return false;
      }
    }
    /* CALL THE METHOD TO RENDER RANDOM IMAGES */
    Picture.displayRandomPictures(pictureObjects);
  }


  /* METHOD TO SET TOOLTIPS FOR ALL IMAGES */
  static getAllImages(documentQuery, pictureObject) {
    const allImages = document.querySelectorAll(documentQuery);
    // Add event listeners to allImages
    allImages.forEach(img => {
      // Add data.tooltip to element and set it to the alt text
      img.dataset.tooltip = img.alt;
      img.addEventListener(
        'click', (e) => this.handleClick(e, pictureObject, allImages)
      );
    });
  }

  /* DYNAMICALLY CREATED BUTTON ELEMENT */
  static createButton(parent) {
    let getParent = document.getElementById(parent);
    let createdButton = document.createElement('button');
    createdButton.classList.add('results-button');
    createdButton.id = 'results-button';
    createdButton.textContent = 'Show Results';
    getParent.appendChild(createdButton);
  }
}

'use strict';
import {cl, Picture} from "./pictures2.js";

/* PICTURES OBJECT */
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


// Instantiate pictureObjects using the Picture class
const pictureObjects = pictures.map(
  picture => new Picture(picture.id, picture.name, picture.filePath)
);

Picture.getAllImages('.clickables', pictureObjects);

// Initial display of random pictures
Picture.displayRandomPictures(pictureObjects);


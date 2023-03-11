<template>
      <h1>404 NOT FOUND</h1>
    <div class="not-found">
      <iframe width="560" height="315" :src="'https://www.youtube.com/embed/XAcalGBmIoo?autoplay=1'" frameborder="0" allowfullscreen autoplay="true"></iframe>
    </div>
  </template>
  
  <style>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  video {
    width: 100%;
    max-width: 800px;
  }
  </style>
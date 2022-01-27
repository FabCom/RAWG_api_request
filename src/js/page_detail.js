export const PageDetail = (urlParams = '') => {
  let content = document.getElementById('content');

  const preparePage = () =>{
    let url = 'https://api.rawg.io/api/games/'+ urlParams.get('id')+'?key='+process.env.API_KEY ;
    fetch(url)
      .then((response) => response.json())
      .then((game) => {
        content.innerHTML =
        `
        <div id="game-detail">
          <div id='image'><img src=${game.background_image}><a href=${game.website} target="_blank">Website</a></div>
          <h1>${game.name}</h1>
          <p><b>Description</b></p>
          <p>${game.description_raw}</p>
          <div id="informations">
            <div class='item'>
              <p><b>Release date</b></p>
              <p>${game.released}</p>
            </div>
            <div class='item'>
              <p><b>Developer</b></p>
              <p>${game.developers.map(dev => dev.name).join(', ')}</p>
            </div>
            <div class='item'>
              <p><b>Platforms</b></p>
              <p>${game.platforms.map(p => p.platform.name).join(', ')}</p>
            </div>
            <div class='item'>
              <p><b>Publishers</b></p>
              <p>${game.publishers.map(p => p.name).join(', ')}</p>
            </div>
            <div class='item' id='genres'>
              <p><b>Genres</b></p>
              <p>${game.genres.map(g => g.name).join(', ')}</p>
            </div>
            <div class='item' id='tags'>
              <p><b>Tags</b></p>
              <p>${game.tags.map(t => t.name).join(', ')}</p>
            </div>
          </div>
          <h2>Buy</h2>
        `+
          game.stores.map(store => `<a href=http://${store.store.domain} target="_blank">`+store.store.name+`</a>`).join(', ')
        + `
          <h2>Screenshots</h2>
          <div id='screenshots'></div>
        </div>
        `
        addScreenshots();
      });
  }
  const addScreenshots = () => {
    let urlScreenshots = 'https://api.rawg.io/api/games/'+ urlParams.get('id')+'/screenshots?key='+process.env.API_KEY ;
    console.log(urlScreenshots)
    let div_screenshots = document.getElementById('screenshots');
    fetch(urlScreenshots)
      .then((response) => response.json())
      .then((screenshots) => {
        screenshots.results.forEach(element => {
          let img = new Image;
          img.src = element.image;
          div_screenshots.appendChild(img)
        });
        
      });
  }

  const render = () => {
    
      preparePage();
  }
  render();
}
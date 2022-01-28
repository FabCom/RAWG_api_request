import { platformLinks } from "./utils";
import search_ico from '../assets/images/logos/search.svg'

export const PageList = (urlParams) => {

  const preparePage = () => {

    const displaySelectPlatform = () => {
      fetch('https://api.rawg.io/api/platforms/lists/parents?key='+process.env.API_KEY)
      .then((response) => response.json())
      .then((responseData) => { 
        let select = document.getElementById('search-select');
        responseData.results.forEach(platform => {
          let option = document.createElement('option');
          option.text = platform.name;
          option.value = platform.id + ',' + platform.platforms.map(e => e.id).join(',');
          if(urlParams.get('platforms') == option.value){option.selected = true;}
          select.add(option);
        });
        select.addEventListener("change", (event) => {
          location.href='#list?search='+urlParams.get('search')+'&page='+urlParams.get('page')+'&platforms='+event.target.value;
        });
      });

    };

    const displayNav = (previous=null,next=null) => {
      
      let content = document.getElementById('content');
      let div_nav = document.createElement('div');
      div_nav.classList.add('nav-search');
      content.appendChild(div_nav)

      if (previous){
        let requestParams = new URLSearchParams(previous.split('?')[1]);
        let btn_next = document.createElement('button');
        btn_next.textContent = "Page précédente";
        btn_next.addEventListener('click', () => {
          location.href='#list?search='+requestParams.get('search')+'&page='+requestParams.get('page')+'&platforms='+requestParams.get('platforms');
        })
        div_nav.appendChild(btn_next);
      }
      if (next){
        let requestParams = new URLSearchParams(next.split('?')[1]);
        let btn_next = document.createElement('button');
        btn_next.textContent = "Page suivante";
        btn_next.addEventListener('click', () => {
          location.href='#list?search='+requestParams.get('search')+'&page='+requestParams.get('page')+'&platforms='+requestParams.get('platforms');
        })
        div_nav.appendChild(btn_next)
      }

      //cloneNode ne clone pas les events
      // let card_list_div = document.getElementsByClassName('card-list')[0];
      // content.insertBefore(div_nav.cloneNode(true), card_list_div)

    };
    
    const listenSearch = () => {
      let btn_search = document.getElementById('btn-search');
      btn_search.addEventListener('click', () => {
        let search = document.getElementById('searchInput').value;
        location.href='#list?search='+search+'&platforms='+urlParams.get('platforms');
      })
    }

    const displayResults = (articles) => {
      let content = document.getElementById('content');
      let resultsContainer = document.createElement('div');
      resultsContainer.classList.add('card-list');
      content.appendChild(resultsContainer);
      for (let article of articles) {
        let div = document.createElement('div');
        div.classList.add('card');
        div.addEventListener("click", () => {location.href="#detail?id="+ article.id})
        div.innerHTML = 
          `
          <img src=${article.background_image}>
          <h1>${article.name}</h1>
          `
        let hover_div = document.createElement('div');
        hover_div.innerHTML=`<p><b>${article.genres.map(genre => genre.name).join('<br>')}</b></p>`;
        hover_div.classList.add('card-more');
        hover_div.classList.add('hide');
        div.appendChild(hover_div);
        div.addEventListener('mouseover', () => hover_div.classList.remove('hide'));
        div.addEventListener('mouseout', () => hover_div.classList.add('hide'));
        let platforms_div = document.createElement('div');
        platforms_div.classList.add('footer');
        div.appendChild(platforms_div);
        let platforms = article.platforms.map(platform => platform.platform.name).join();
        platformLinks(platforms,platforms_div);
        resultsContainer.appendChild(div);
      }

    };

    const fetchList = (url, search, page_size, page, platform) => {
      console.log(platform)
      if (page == null || page == 'null'){page = 1};
      if (search == null || search == 'null'){search = ''};
      if (platform == null || platform == 'null'){platform = '1'};
      const finalURL = `${url}?key=${process.env.API_KEY}&page_size=${page_size}&page=${page}&search=${search}&search_precise=1&platforms=${platform}`
      console.log(finalURL)
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          displaySelectPlatform();
          displayResults(responseData.results)
          displayNav(responseData.previous, responseData.next)
          listenSearch();
        });
    };

    fetchList('https://api.rawg.io/api/games', urlParams.get('search'), 40, urlParams.get('page'), urlParams.get('platforms'));
  }

  const render = () => {
    let content = document.getElementById('content');
    content.innerHTML =
      `
        <div id='top'>
          <h1>The Hyper ProGames</h1>
          <div id='search'><img id='btn-search' src=${search_ico}><input id='searchInput' type="text"></div>
        </div>
        <p>Bienvenue sur notre plateforme de présentation de jeux vidéo.</p>
        <select id="search-select">
        </select>

      `
    preparePage();
  }
  render();
}
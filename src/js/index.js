import "../stylesheets/styles.scss";
import anime from 'animejs/lib/anime.es.js';
import {routes} from './routes.js';

class App{
  constructor(){
    console.log("hello world ! Start app");
    this.addMenu();
  }

  addMenu(){
    let items = [{"text":"Accueil", "href":"#list?dates=2021-06-01,2022-06-01&ordering=-added"},{'text':'Parcourir', 'href':'#list'},{'text':'Hasard','href':'#detail?id='+ Math.floor(Math.random() * 675024)}];
    let body_div = document.getElementById('menu');
    for(let item of items){
      let link = document.createElement('a');
      link.textContent = item.text;
      link.href = item.href;
      body_div.appendChild(link);
    }
    window.addEventListener('hashchange', () => this.setRoute());
    window.addEventListener('DOMContentLoaded', () => this.setRoute());
  }

  setRoute(){
    const { hash } = window.location;
    const pageName = hash.substring(1).split('/')[0].split('?')[0];
    const queryString  = hash.substring(1).split('/')[0].split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    // console.log(pageName);
    // console.log(urlParams);
    this.resetContent();
    routes[pageName](urlParams);
  }

  resetContent(){
    let content = document.getElementById('content');
    content.innerHTML = '';

  }
}

const app = new App()

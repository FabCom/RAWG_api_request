export const Home = (argument = '') => {
  console.log('Home');
  
  const render = () => {
    let content = document.getElementById('content');
    content.innerHTML =
      `
        <h1>ACCUEIL</h1>
      `
  };
  render();
}
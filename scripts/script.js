const url = `https://rickandmortyapi.com/api/episode/`;
const root = document.querySelector("#root");
const div = document.createElement("div");
const div3 = document.createElement("div");
root.appendChild(div);
root.appendChild(div3);
root.className = "container d-flex";
div3.className = "content";
div.innerHTML = '<div class="sidebar"><a href="/" class="active">Rick & Morty</a><div class="list-group list-group-flush border-bottom scrollarea"></div></div>';

const clearContent = () => {
  const contenido = document.querySelector(".content");
  contenido.innerHTML = "";
};

const renderContenido = (episodio) => {
  clearContent();
  const contenido = document.querySelector(".content");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const div4 = document.createElement("div");
  div4.className = "personajesEpisodios d-flex row";
  contenido.appendChild(h1);
  contenido.appendChild(h3);
  contenido.appendChild(div4);
  h1.innerText = episodio.name;
  h3.innerText = `${episodio.air_date} - ${episodio.episode}`;
  episodio.characters.forEach((character) => {
    fetch(character)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const personajesEpisodios = document.querySelector(".personajesEpisodios");
        const div5 = document.createElement("div");
        div5.className = "col-3";
        personajesEpisodios.appendChild(div5);
        div5.innerHTML = `<div class="card m-3" style="width: 14rem;"><img src="${json.image}" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${json.name}</h5><h5 class="card-title">${json.species} | ${json.status}</h5></div></div>`;
      });
  });
};
const contenidoEpisodio = async (episodio) => {
  try {
    const url2 = `${url}+${episodio}`;
    const request = await fetch(url2);
    const response = await request.json();
    renderContenido(response);
  } catch (error) {
    console.log(error);
  }
};
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    const count = json.info.count;
    const lista = document.querySelector(".sidebar");
    div.appendChild(lista);
    for (let i = 0; i < count; i++) {
      const div2 = document.createElement("div");
      lista.appendChild(div2);
      div2.innerHTML = `<a href="#" ><div class="d-flex w-100 align-items-center justify-content-between"><strong class="mb-1 episodeList">Episode-${i + 1}</strong></div></a>`;
      div2.onclick = () => contenidoEpisodio(i + 1);
    }
  })
  .catch((error) => console.warn(error));
const url = `https://rickandmortyapi.com/api/episode/`;
const root = document.querySelector("#root");
const div = document.createElement("div");
const div3 = document.createElement("div");

root.appendChild(div);
root.appendChild(div3);

root.className = "container d-flex";
div3.className = "content";

div.innerHTML =
  '<div class="sidebar"><a href="/" class="active">Rick & Morty</a><div class="list-group list-group-flush border-bottom scrollarea"></div></div>';

const clearContent = () => {
  const contenido = document.querySelector(".content");
  contenido.innerHTML = "";
};

const renderLocation = (location) => {
  clearContent();
  fetch(location)
    .then((request) => request.json())
    .then((response) => {
      const contenido = document.querySelector(".content");
      const h1 = document.createElement("h1");
      const h3 = document.createElement("h3");
      const div4 = document.createElement("div");
      div4.className = "personajesEpisodios d-flex row";
      contenido.appendChild(h1);
      contenido.appendChild(h3);
      contenido.appendChild(div4);
      h1.innerText = response.name;
      h3.innerText = `${response.type} - ${response.dimension}`;
      response.residents.forEach((resident) => {
        fetch(resident)
          .then((response) => response.json())
          .then((json) => {
            const personajesEpisodios = document.querySelector(
              ".personajesEpisodios"
            );
            const div5 = document.createElement("div");
            div5.className = "col-3";
            personajesEpisodios.appendChild(div5);
            div5.innerHTML = `<div class="card m-3" style="width: 14rem; cursor:pointer"><img src="${json.image}" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${json.name}</h5><h5 class="card-title">${json.species} | ${json.status}</h5></div></div>`;
            div5.onclick = () => contenidoPersonaje(json);
          });
      });
    });
};

const contenidoPersonaje = (personaje) => {
  console.log(personaje);
  clearContent();
  const contenido = document.querySelector(".content");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const div6 = document.createElement("div");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const img = document.createElement("img");
  const hr = document.createElement("hr");
  const button = document.createElement("button");

  div1.className = "contenidoPersonaje1 d-flex col m-3";
  div2.className = "contenidoPersonaje2 d-flex row";
  div6.className = "contenidoPersonaje3 d-flex row m-3 p-3";
  button.className = "btn btn-outline-primary";
  img.style.width = "200px";
  contenido.appendChild(div1);
  contenido.appendChild(hr);
  contenido.appendChild(div2);
  div1.appendChild(img);
  div1.appendChild(div6);
  div6.appendChild(h1);
  div6.appendChild(h3);
  div6.appendChild(button);
  img.src = `${personaje.image}`;
  h1.innerText = personaje.name;
  h3.innerHTML = `${personaje.species} | ${personaje.status} | ${personaje.gender} | ${personaje.origin.name}`;
  button.innerText = "Location";
  button.onclick = () => renderLocation(personaje.location.url);
  personaje.episode.forEach((episode) => {
    fetch(episode)
      .then((request) => request.json())
      .then((response) => {
        const personajesEpisodios = document.querySelector(
          ".contenidoPersonaje2"
        );
        const div5 = document.createElement("div");
        div5.className = "col-3";
        personajesEpisodios.appendChild(div5);
        div5.innerHTML = `<div class="card m-3" style="width: 14rem; cursor:pointer; border:none;"><div class="card-body"><h5 class="card-title"><b>Episode - ${response.id}</b></h5><h5 class="card-title">${response.episode}</h5></div></div>`;
      });
  });
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
        const personajesEpisodios = document.querySelector(
          ".personajesEpisodios"
        );
        const div5 = document.createElement("div");
        div5.className = "col-3";
        personajesEpisodios.appendChild(div5);
        div5.innerHTML = `<div class="card m-3" style="width: 14rem; cursor:pointer"><img src="${json.image}" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">${json.name}</h5><h5 class="card-title">${json.species} | ${json.status}</h5></div></div>`;
        div5.onclick = () => contenidoPersonaje(json);
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

const paginar = (urlNext) => {
  fetch(urlNext)
    .then((response) => response.json())
    .then((json) => {
      const count = json.results;
      const lista = document.querySelector(".sidebar");
      div.appendChild(lista);
      count.forEach((result, id) => {
        const div2 = document.createElement("div");
        lista.appendChild(div2);
        div2.innerHTML = `<a href="#" ><div class="d-flex w-100 align-items-center justify-content-between"><strong class="mb-1 episodeList">Episode-${result.id}</strong></div></a>`;
        div2.onclick = () => contenidoEpisodio(result.id);
      });
      const button = document.createElement("button");
      button.className = "btn btn-outline-primary m-3";
      lista.appendChild(button);
      button.innerText = "Load More";
      button.onclick = (event) => {
        event.preventDefault();
        paginar(json.info.next);
        button.className = "d-none";
      };
    })
    .catch((error) => console.warn(error));
};

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    const count = json.results;
    const lista = document.querySelector(".sidebar");
    div.appendChild(lista);
    count.forEach((result) => {
      const div2 = document.createElement("div");
      lista.appendChild(div2);
      div2.innerHTML = `<a href="#" ><div class="d-flex w-100 align-items-center justify-content-between"><strong class="mb-1 episodeList">Episode-${result.id}</strong></div></a>`;
      div2.onclick = () => contenidoEpisodio(result.id);
    });
    const button = document.createElement("button");
    button.className = "btn btn-outline-primary m-3";
    lista.appendChild(button);
    button.innerText = "Load More";
    button.onclick = (event) => {
      event.preventDefault();
      paginar(json.info.next);
      button.className = "d-none";
    };
  })
  .catch((error) => console.warn(error));

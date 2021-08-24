const root = document.querySelector("#root");

const divSideBar = document.createElement("div");
divSideBar.classList.add("sidebar");
root.appendChild(divSideBar);

var link = document.createTextNode("Menu");
const aSideBar = document.createElement("a");
aSideBar.classList.add("active");
aSideBar.appendChild(link);
aSideBar.href = "https://www.google.com";
divSideBar.appendChild(aSideBar);

var link1 = document.createTextNode("This is link");
const aSideBar1 = document.createElement("a");
aSideBar1.appendChild(link1);
aSideBar1.href = "https://github.com/jcepedaf/javascript-module-3";
divSideBar.appendChild(aSideBar1);

var link2 = document.createTextNode("This is link");
const aSideBar2 = document.createElement("a");
aSideBar2.appendChild(link2);
aSideBar2.href = "https://github.com/jcepedaf/javascript-module-3";
divSideBar.appendChild(aSideBar2);

var link3 = document.createTextNode("This is link");
const aSideBar3 = document.createElement("a");
aSideBar3.appendChild(link3);
aSideBar3.href = "https://github.com/jcepedaf/javascript-module-3";
divSideBar.appendChild(aSideBar3);

const divContent = document.createElement("div");
divContent.classList.add("content");
root.appendChild(divContent);

const getAllRickAndMorty = async () => {
    try {
      const url = `https://rickandmortyapi.com/api/episode`;
      const response = await fetch(url);
      const parsedRes = await response.json();
      console.log(parsedRes);
    } catch (error) {
      console.log(error);
      clearContent();
      renderAlert("Something went wrong with your request");
    }
  };

  getAllRickAndMorty();
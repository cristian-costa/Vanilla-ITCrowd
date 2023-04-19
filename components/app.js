const resultDiv = document.querySelector("#resultDiv");
const formulario = document.querySelector("#formulario");

window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
  searchTopGames();
};

function validarFormulario(e) {
  e.preventDefault();

  const inputSearch = document.querySelector("#input-search").value;

  if (inputSearch === "") {
    showAlert("Add a search term");
    return;
  }

  searchGame(inputSearch);
}

function showAlert(message) {
  const alert = document.querySelector(".bg-red-100");

  if (!alert) {
    const textAlert = document.createElement("p");
    textAlert.classList.add("alerta-personalizada");

    textAlert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;

    formulario.appendChild(textAlert);

    setTimeout(() => {
      textAlert.remove();
    }, 3000);
  }
}

async function searchTopGames(inputSearch) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "88588f5151msh1d054ea5ad3519fp1d1d1ejsn76a9619ef5b5",
      "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      "https://opencritic-api.p.rapidapi.com/game/popular",
      options
    );
    const result = await response.json();
    renderResult(result);
  } catch (error) {
    console.log(error);
  }
}

async function searchGame(inputSearch) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "88588f5151msh1d054ea5ad3519fp1d1d1ejsn76a9619ef5b5",
      "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
    },
  };

  // let formattedInput = inputSearch.replace(/\s/g, "%20");

  try {
    const response = await fetch(
      `https://opencritic-api.p.rapidapi.com/game/search?criteria=${inputSearch}`,
      options
    );
    const result = await response.json();
    renderResult(result, (searchingGame = true));
  } catch (error) {
    console.log(error);
  }
}

function renderResult(result, searchingGame) {
  while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
  }
  if (searchingGame) {
    result.forEach((game) => {
      const { id, name, dist } = game;
      resultDiv.innerHTML += `
        <section class="result-container">
            <div class="custom-bg-white">
                <div class="p-4">
                    <p class="bold-font text-align-center"> ${name} </p>

                    <a 
                        class="custom-button"
                        href="#" target="_blank" rel="noopener noreferrer" 
                    >
                        See more
                    </a>
                </div>
            </div>
        </section>
    `;
    });
  } else {
    result.forEach((game) => {
      const {
        name,
        id,
        tier,
        topCriticScore,
        images: {
          box: { og },
        },
      } = game;

      resultDiv.innerHTML += `
                    <section class="result-container">
                        <div class="custom-bg-white">
                            <div class="p-4">
                            <p class="bold-font text-align-center"> ${name}  </p>
                                <p class="bold-font">  <span class="light-font"> Critic Score: </span> ${topCriticScore} </p>
                                <p class="bold-font"> <span class="light-font"> Tier: </span> ${tier}  </p>
                                <a 
                                    class="custom-button"
                                    href="${og}" target="_blank" rel="noopener noreferrer" 
                                >
                                    See more
                                </a>
                            </div>
                        </div>
                    </section>
                `;
    });
  }
}

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=e793d7a2-bb9e-4004-948e-55903014c199';

const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=e793d7a2-bb9e-4004-948e-55903014c199';

const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=e793d7a2-bb9e-4004-948e-55903014c199`;

const spanError = document.getElementById('error');

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
    console.log('Random')
    console.log(data)

    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
      const img1 = document.getElementById('img1');
      const img2 = document.getElementById('img2');
      const img3 = document.getElementById('img3');
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');
      const btn3 = document.getElementById('btn3');
      img1.src   = data[0].url;
      img2.src   = data[1].url;
      img3.src   = data[2].url;
      btn1.onclick = () => saveFavouritesMichis(data[0].id);
      btn2.onclick = () => saveFavouritesMichis(data[1].id);
      btn3.onclick = () => saveFavouritesMichis(data[2].id);
    } 
    // .then(res => res.json())
    // .then(data => {
    //   const img = document.querySelector('img');
    //   img.src   = data[0].url;
    // });
}

async function loadFavouritesMichis() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = await res.json();       
  console.log('Favoritos') 
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById('favouriteMichis')
    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al gato de favoritos');
    
      img.src = michi.image.url;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouritesMichis(id) {
  const res = await fetch(API_URL_FAVOURITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status != 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Gato guardado en Favoritos')
    loadFavouritesMichis();
  }
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: 'DELETE'
  });
  const data = await res.json();

  if (res.status != 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Gato eliminado de Favoritos')
  }
}


loadRandomMichis();
loadFavouritesMichis();
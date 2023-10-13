const myKey =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmZmNzEzOWM0MzAwMTg4MTQ1OWYiLCJpYXQiOjE2OTcxODU3ODMsImV4cCI6MTY5ODM5NTM4M30.tN9rQRnCwWw8V6se5_kTKth0SPiMYEXmDWjC8bsjQ_E';
const addressBarContent = new URLSearchParams(location.search);
const mod = addressBarContent.get('modId');
if (mod) {
}

const generateProductCards = (product) => {
	product.forEach((data) => {
		const mainRow = document.getElementById('row');
		const myColumn = document.createElement('col');
		myColumn.classList.add('col-4', 'my-3');

		const buttonsAdmin = `
		<a href="./backoffice.html?productId=${data._id}" class="btn btn-warning modify" id='modify'>Modify</a>
		<a href="./backoffice.html?productId=${data._id}&deleteId=deleteIt" class="btn btn-danger delete" id='delete'>delete</a>
		`;
		if (mod) {
			myColumn.innerHTML =
				`
      <div class="card">
      <div class="photo">
          <img src="${data.imageUrl}">
          <div class="photos">Game</div>
      </div>
      <div class="content">
          <p class="txt4">${data.name}</p>
          <p class="txt5">${data.brand}</p>
          <p class="txt2">${data.description}</p>
      </div>
      <div class="footer">
          <p><a class="waves-effect waves-light btn" href="#">Price:${data.price}</a><a id="heart"><span class="like"><ion-icon name="heart-outline"></ion-icon>Like</span></a></p>
          <p class="txt3"><a href="#" class="btn btn-primary "onclick='buy(event)'>Buy</a>` +
				`${buttonsAdmin}` +
				`</p>
      </div>
  </div>
    `;
		} else {
			myColumn.innerHTML =
				`
		<div class="card">
		<div class="photo">
				<img src="${data.imageUrl}">
				<div class="photos">Game</div>
		</div>
		<div class="content">
				<p class="txt4">${data.name}</p>
				<p class="txt5">${data.brand}</p>
				<p class="txt2">${data.description}</p>
		</div>
		<div class="footer">
				<p><a class="waves-effect waves-light btn" href="#">Price:${data.price}</a><a id="heart"><span class="like"><ion-icon name="heart-outline"></ion-icon>Like</span></a></p>
				<p class="txt3"><a href="#" class="btn btn-primary "onclick='buy(event)'>Buy</a>` +
				`<a href="./dettaglio.html?productId=${data._id}&deleteId=deleteIt" class="btn btn-info ms-1">Deteil</a></p>
		</div>
</div>
	`;
		}
		mainRow.appendChild(myColumn);
	});
};

const products = function () {
	fetch('https://striveschool-api.herokuapp.com/api/product', {
		headers: {
			Authorization: myKey,
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				if (res.status === 404) {
					throw new Error('404 - Not Found');
				} else if (res.status === 500) {
					throw new Error('500 - Internal Server Error');
				} else {
					throw new Error('Generic ERROR');
				}
			}
		})
		.then((products) => {
			console.log('Api', products);
			generateProductCards(products);
		})
		.catch((err) => {
			console.log('Si è verificato un errore:', err);
		});
};
products();

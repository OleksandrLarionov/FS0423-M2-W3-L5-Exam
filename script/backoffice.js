const myKey =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmZmNzEzOWM0MzAwMTg4MTQ1OWYiLCJpYXQiOjE2OTcxODU3ODMsImV4cCI6MTY5ODM5NTM4M30.tN9rQRnCwWw8V6se5_kTKth0SPiMYEXmDWjC8bsjQ_E';
const myUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const addressBarContent = new URLSearchParams(location.search);
const deleteId = addressBarContent.get('deleteId');
const productId = addressBarContent.get('productId');

// Formato

// const format = {
// 	name: 'Nokia 3310',
// 	description: 'Indistructible cellphone',
// 	brand: 'Nokia',
// 	imageUrl: 'https://example.com/3310.jpg',
// 	price: 99,
// 	_id: 'd318e1a8541744830bef139',
// 	uderId: '6385f782597b9d001545386b',
// 	createdAt: '2019-07-19T09:32:10.535Z',
// 	updatedAt: '2019-07-19T09:32:10.535Z',
// 	__v: 0,
// };

if (productId || deleteId) {
	fetch(myUrl + productId, {
		headers: {
			Authorization: myKey,
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error('ERRORE');
			}
		})
		.then((data) => {
			// inputs
			const productInput = document.getElementById('name');
			const descriptionInput = document.getElementById('description');
			const brandInput = document.getElementById('brand');
			const imageUrlInput = document.getElementById('imageUrl');
			const priceInput = document.getElementById('price');

			productInput.value = data.name;
			descriptionInput.value = data.description;
			brandInput.value = data.brand;
			imageUrlInput.value = data.imageUrl;
			priceInput.value = data.price;
		})
		.catch((err) => {
			console.log('errore', err);
		});
}
let btnText = 'Save';
let btnColor = 'primary';
let methodToUse = 'POST';
if (productId) {
	methodToUse = 'PUT';
	btnText = 'MODIFY';
	btnColor = 'warning';
}
if (deleteId) {
	methodToUse = 'DELETE';
	btnText = 'Delete';
	btnColor = 'danger';
}
let urlToUse = myUrl;
if (productId || deleteId) {
	urlToUse = myUrl + productId;
}

const container = document.getElementById('container');
container.innerHTML = `
<div class="row"></div>

<h1 class="text-center my-4">Admin Product Page</h1>
<div class="container">
  <div class="row justify-content-center" id="event-form">
    <div class="col col-12 col-lg-6">
      <!-- form! -->
      <form id="form">
        <div class="mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input class="form-control" id="name" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input class="form-control" id="description" required />
        </div>
        <div class="mb-3">
          <label for="brand" class="form-label">Brand</label>
          <input type="text" class="form-control" id="brand" required />
        </div>
        <div class="mb-3">
          <label for="imageUrl" class="form-label">ImageUrl</label>
          <input type="text" class="form-control" id="imageUrl" required />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="number" class="form-control" id="price" required />
        </div>

        <button type="submit" onclick='alert()' class="btn btn-${btnColor}">${btnText}</button>
        <button type="submit" class="btn btn-info" onclick='resetForm()'>Reset Camp</button>
        
				
        
				</form>
        
    </div>
  </div>
</div>
`;
const resetForm = () => {
	const productInput = document.getElementById('name');
	const descriptionInput = document.getElementById('description');
	const brandInput = document.getElementById('brand');
	const imageUrlInput = document.getElementById('imageUrl');
	const priceInput = document.getElementById('price');

	productInput.value = '';
	descriptionInput.value = '';
	brandInput.value = '';
	imageUrlInput.value = '';
	priceInput.value = '';
};

const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
	e.preventDefault();
	console.log("invio i dati all'API");

	// inputs
	const productInput = document.getElementById('name');
	const descriptionInput = document.getElementById('description');
	const brandInput = document.getElementById('brand');
	const imageUrlInput = document.getElementById('imageUrl');
	const priceInput = document.getElementById('price');
	// product value
	const newProduct = {
		name: productInput.value,
		description: descriptionInput.value,
		brand: brandInput.value,
		imageUrl: imageUrlInput.value,
		price: priceInput.value,
	};

	// get
	fetch(urlToUse, {
		method: methodToUse,
		body: JSON.stringify(newProduct),
		headers: {
			'Content-Type': 'application/json',
			Authorization: myKey,
		},
	})
		.then((res) => {
			if (res.ok) {
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

		.catch((err) => {
			console.log('Si è verificato un errore:', err);
		});
});

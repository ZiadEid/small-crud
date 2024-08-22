// CRUD
// C = Create 
// R = Display
// U = Update
// D = Display
// S = Search
// localStorage.clear();
var pName = document.getElementById('productName');
var pPrice = document.getElementById('productPrice');
var pCategory = document.getElementById('productCategory');
var pDescription = document.getElementById('productDescription');
var mainButton = document.getElementById('mainButton');
var tableBody = document.getElementById('body');
var pSearch = document.getElementById('productSearch');
var products;
if (localStorage.getItem('allProducts') === null) {
  products = [];
}
else {
  products = JSON.parse(localStorage.getItem("allProducts"));
  displayProduct(products);
}

function addProduct() {
    var product = {
      name: pName.value,
      price: pPrice.value,
      category: pCategory.value,
      description: pDescription.value
    }
    products.push(product);
    localStorage.setItem("allProducts", JSON.stringify(products));
    displayProduct(products);
    clearForm();
    mainButton.value = "add product";
}
mainButton.addEventListener('click', function () {
  addProduct();
})

function clearForm() {
  pName.value = "";
  pPrice.value = "";
  pCategory.value = "";
  pDescription.value = "";
}

function displayProduct(productsList) {
  box = ``;
  for (var i = 0; i < productsList.length; i++) {
    box +=
      `
      <tr>
        <td>${i + 1}</td>
        <td>${productsList[i].name}</td>
        <td>${productsList[i].price}</td>
        <td>${productsList[i].category}</td>
        <td>${productsList[i].description}</td>
        <td><button onclick="updateProduct(${i})" id="updateButton" class="btn btn-warning">update</button></td>
        <td><button onclick="deletProduct(${i})" id="deletButton" class="btn btn-danger">delet</button></td>
      </tr>
    `
  }
  tableBody.innerHTML = box;
}

function deletProduct(pIndex) {
  products.splice(pIndex, 1);
  localStorage.setItem("allProducts", JSON.stringify(products));
  displayProduct(products);
}

function updateProduct(pIndex) {
  var neededPriduct = JSON.parse(localStorage.getItem('allProducts'))[pIndex];
  pName.value = neededPriduct.name;
  pPrice.value = neededPriduct.price;
  pCategory.value = neededPriduct.category;
  pDescription.value = neededPriduct.description;
  mainButton.value = "update product";
  deletProduct(pIndex);
}

function searchProducts(term) {
  var serchProducts = [];
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(term.toLowerCase() ) === true) {
      serchProducts.push(products[i]);
    }
  }
  displayProduct(serchProducts);
}
pSearch.addEventListener('keyup', function() {
  searchProducts(this.value)
})
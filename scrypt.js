// variables
var navToggle = document.getElementsByClassName("cart-btn")[0];
var navMenu = document.getElementsByClassName("side-bare-nav")[0];
var items = document.getElementById("items");
var trash = document.getElementsByClassName("fa-trash-alt");
var newProduct = {
  product_id: null,
  product_name: null,
  product_qty: 0,
  product_price: 0.0,
};
var products = [];
var cart = [];
// show cart side-bare
navToggle.addEventListener("click", function () {
  navMenu.classList.toggle("side-bare-nav-oppen");
});

// add items to cart
var addToCart = (e) => {
  var ids = e.target.parentNode.dataset.id;
  var price = e.target.parentNode.dataset.price;
  var names = e.target.parentNode.dataset.name;
  var qty = e.target.parentNode.dataset.qty;
  toArray(ids, price, names, qty);
};

// add obejct to array
var toArray = (id, price, names, qty) => {
  newProduct.product_id = id;
  newProduct.product_price = price;
  newProduct.product_qty = qty;
  newProduct.product_name = names;
  products.push(Object.assign({}, newProduct));

  products.map((i) => {
    if (i.product_id == id) {
      var cartItem = null;

      cart.map((index) => {
        if (index.product.product_id == i.product_id) {
          cartItem = index;
            i.product_qty = parseInt(i.product_qty) + 1;
        }
      });

      if (cartItem == null) {
        var cartItem = {
          product: i,
        };
        incrementCart();
        cart.push(cartItem);
      }
    }
  });

  renderHtml();

  swal(
    "Product : " + id + "",
    "Smartwatch " + names + " Added to cart",
    "success"
  );
};

// html render

function renderHtml() {
  var html = "";
  var ele = document.getElementById("shoping-cart");
  ele.innerHTML = "";

  var GrandTotal = 0;
  for (var i = 0; i < cart.length; i++) {
    html +=
      '<div class="card-shoping" data-id="' +
      cart[i].product.product_id +
      '">';
    html += "";
    html +=
      '<div class="product-shoping">Product: ' +
      cart[i].product.product_id +
      ' <i class="fas fa-trash-alt" style="color:red" onclick="deleteItem(' +
      cart[i].product.product_id +
      ')"></i></div>';
    html += '<div class="shoping-content">';
    html +=
      '<div class="titel-shoping">Name : ' +
      cart[i].product.product_name +
      "</div>";
    html +=
      '<div class="quantity">Qty :  <i style="margin-left:5px; margin-right:5px; font-size:16px;" class="fas fa-plus" onclick="qtyAdd(' +
      cart[i].product.product_id +
      ')"></i>   ' +
      cart[i].product.product_qty +
      '   <i class="fas fa-minus" onclick="qtyRemove(' +
      cart[i].product.product_id +
      ')" style="margin-left:5px; margin-right:5px; font-size:16px;"></i></div>';
    html +=
      '<div class="product-price">Price : $ ' +
      parseFloat(cart[i].product.product_price) *
        parseInt(cart[i].product.product_qty) +
      "</div>";
    html += "</div>";
    html += "</div>";

    GrandTotal +=
      parseInt(cart[i].product.product_price) *
      parseInt(cart[i].product.product_qty);
  }
  calculeTotal(GrandTotal);
  ele.innerHTML = html;
}
//add Qty
var qtyAdd = (e) => {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].product.product_id == e) {
      cart[i].product.product_qty =
        parseInt(cart[i].product.product_qty) + 1;
      renderHtml();
    }
  }
};
//delete Qty

var qtyRemove = (e) => {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].product.product_id == e) {
      if (cart[i].product.product_qty == 1) {
        deleteItem(e);
      } else {
        cart[i].product.product_qty = cart[i].product.product_qty - 1;
        renderHtml();
      }
    }
  }
};
// Grand Total calc

var calculeTotal = (GrandTotal) => {
  
  var total = document.getElementById("grandTotal");
  var setTotal = total.setAttribute("data-item", GrandTotal);
  total.innerHTML = "$" + GrandTotal + "";
};

//delete element
var deleteItem = (e) => {
  swal({
    title: "Are you sure?",
    text: "You want to delete this iteme",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.product_id == e) {
          // delete products index 

          for(var k = 0; k < products.length; k++){
            if (products[k].product_id == e){
              // intialise products.product_qty to 0 
              products[k].product_qty = 1;
              products.splice(i, 1);
              
            }
            
          }
          cart.splice(i, 1);
          
        }
      }

      renderHtml();
      decrementCart();
      swal("Poof! item from shoping-cart has been deleted!", {
        icon: "success",
      });
    }
  });
};

// increment cart total
var incrementCart = () => {
  var dataItemValue = parseInt(items.getAttribute("data-item"));
  var itemsIncart = items.setAttribute("data-item", dataItemValue + 1);
  items.innerHTML = "(" + items.dataset.item + ")";
};

//decrement cart
var decrementCart = () => {
  var dataItemValue = parseInt(items.getAttribute("data-item"));
  var itemsIncart = items.setAttribute("data-item", dataItemValue - 1);
  items.innerHTML = "(" + items.dataset.item + ")";
};
// add to favorite
var addToFav = (e) => {
  var fav = document.getElementById("fav")[0];
 
  if (e.target.parentElement.classList.contains("add-to-fav")) {
    e.target.parentElement.classList.remove("add-to-fav");

    e.target.parentElement.classList.toggle("add-to-fav-add");
    swal("Good job!", "Your item  added to favorit!", "success");
  } else {
    e.target.parentElement.classList.remove("add-to-fav-add");

    e.target.parentElement.classList.toggle("add-to-fav");
  }
};

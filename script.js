let products = [

    { id:1,name:"White T-Shirt",price:499,category:"tshirt",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"},
    { id:2,name:"Black T-Shirt",price:599,category:"tshirt",img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1"},
    { id:3,name:"Red T-Shirt",price:549,category:"tshirt",img:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"},
    { id:4,name:"Blue T-Shirt",price:650,category:"tshirt",img:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad"},
    { id:5,name:"Printed T-Shirt",price:699,category:"tshirt",img:"https://images.unsplash.com/photo-1574180045827-681f8a1a9622"},

    { id:6,name:"Formal Shirt",price:899,category:"shirt",img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b"},
    { id:7,name:"Casual Shirt",price:799,category:"shirt",img:"https://images.unsplash.com/photo-1583743814966-8936f37f4678"},
    { id:8,name:"Checked Shirt",price:950,category:"shirt",img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"},

    { id:9,name:"Blue Jeans",price:1299,category:"jeans",img:"https://images.unsplash.com/photo-1542272604-787c3835535d"},
    { id:10,name:"Black Jeans",price:1399,category:"jeans",img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a"},

    { id:11,name:"Running Shoes",price:1999,category:"shoes",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"},
    { id:12,name:"Sneakers",price:1599,category:"shoes",img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


// 🌙 DARK MODE
function toggleDark() {
    document.body.classList.toggle("dark-mode");
}


// 🔐 LOGIN CHECK (ADDED)
function checkLogin(){
    if(localStorage.getItem("isLoggedIn") !== "true"){
        alert("Please Login First 🔐");
        window.location.href = "login.html";
        return false;
    }
    return true;
}


// HOME
function showCategories() {
    document.getElementById("products").innerHTML="";
    document.getElementById("backBtn").style.display="none";

    document.getElementById("categories").innerHTML=`
    <div class="col-md-3"><div class="card" onclick="showProducts('tshirt')"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" class="card-img-top"><div class="text-center">T-Shirts</div></div></div>

    <div class="col-md-3"><div class="card" onclick="showProducts('shirt')"><img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b" class="card-img-top"><div class="text-center">Shirts</div></div></div>

    <div class="col-md-3"><div class="card" onclick="showProducts('jeans')"><img src="https://images.unsplash.com/photo-1542272604-787c3835535d" class="card-img-top"><div class="text-center">Jeans</div></div></div>

    <div class="col-md-3"><div class="card" onclick="showProducts('shoes')"><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" class="card-img-top"><div class="text-center">Shoes</div></div></div>
    `;
}


// PRODUCTS
function showProducts(cat) {
    document.getElementById("categories").innerHTML="";
    document.getElementById("backBtn").style.display="block";

    let data = products.filter(p=>p.category===cat);
    let container = document.getElementById("products");
    container.innerHTML="";

    data.forEach(p=>{
        container.innerHTML+=`
        <div class="col-md-4 mb-4">
            <div class="card p-2">
                <img src="${p.img}" class="card-img-top">
                <div class="text-center">
                    <h5>${p.name}</h5>
                    <p>₹${p.price}</p>

                    <button class="btn-cart w-100 mb-2" onclick="addToCart(${p.id})">🛒 ADD TO CART</button>
                    <button class="btn-buy w-100 mb-2" onclick="buyNow(${p.id})">⚡ BUY NOW</button>
                    <button class="btn btn-outline-danger w-100" onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
                </div>
            </div>
        </div>`;
    });
}


// CART
function addToCart(id){

    if(!checkLogin()) return;   // ✅ ADDED

    let item=cart.find(i=>i.id===id);
    if(item) item.qty++;
    else{
        let p=products.find(p=>p.id===id);
        cart.push({...p,qty:1});
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
}

function displayCart(){
    let list=document.getElementById("cart");
    if(!list) return; // safe check

    list.innerHTML="";
    let total=0;

    cart.forEach(i=>{
        total+=i.price*i.qty;
        list.innerHTML+=`<li class="list-group-item d-flex justify-content-between">
        ${i.name} x ${i.qty}
        <span>₹${i.price*i.qty}</span></li>`;
    });

    let totalEl = document.getElementById("total");
    if(totalEl) totalEl.innerText=total;
}


// BUY NOW
function buyNow(id){

    if(!checkLogin()) return;   // ✅ ADDED

    addToCart(id);
    alert("Order Placed 🚀");
}


// WISHLIST
function addToWishlist(id){

    if(!checkLogin()) return;   // ✅ ADDED

    if(!wishlist.find(i=>i.id===id)){
        wishlist.push(products.find(p=>p.id===id));
        localStorage.setItem("wishlist",JSON.stringify(wishlist));
        displayWishlist();
    }
}

function displayWishlist(){
    let list=document.getElementById("wishlist");
    if(!list) return;

    list.innerHTML="";
    wishlist.forEach(i=>{
        list.innerHTML+=`<li class="list-group-item d-flex justify-content-between">
        ${i.name}<span>₹${i.price}</span></li>`;
    });
}


// LOAD
showCategories();
displayCart();
// displayWishlist();
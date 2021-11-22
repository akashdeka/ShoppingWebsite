window.onload = onpageload;
var loaderComponent = document.getElementById('loader');

var array= [];
function onpageload() {
    loaderComponent.style.display = 'block';
  }

fetch('https://fakestoreapi.com/products').then((data)=>{
   // console.log(data);
   return data.json();
}).then((completedata)=>{
    //console.log(completedata);
    let data1="";
    completedata.map((values)=>{
        data1+=` <div class="card">
        <input type="checkbox" value="${values.title}" id="${values.id}" onclick="addToCart(value,id)"><br>
        <label for="check">Add To Cart</label>
        <img src=${values.image} alt="img" class="images">
        <h1 class="title">${values.title}</h1>
        <p class="price">${values.price}  <p id="symbol">&#8377;</p></p>
        <p class= "rate">${values.rating.rate} <span class="fa fa-star checked"> </span>  & </p>
        <p class="count"> ${values.rating.count}viewers</p>
        <p class="description" >${values.description}</p>
        <p class="category">${values.category}</p>
         </div>`
     });
    
     document.getElementById("cards").innerHTML=data1;
     isCartEmpty();
}).catch((err)=>{
    console.log(err);
})

function addToCart( completedata,id){
    console.log('after fetch call add');
    console.log( completedata);
    var checkbox=document.getElementById(id);
    if(checkbox.checked==true){
        array.push(completedata);
    }else{
        removeItem(array, completedata);
    }
    showcart();
}

function showcart(){
  //  console.log(array);
    let data1=``;
    //console.log(array.length)
    let size=array.length;
    if(size == 0)
    {
        data1 +=`
        <div class="cart">
        <h3> Empty Cart</h3>
        </div>`;
    }
    else{
     for(i=0; i<size; i++){
        data1 +=`
        <div class="cart">
        ${(i+1)}--${array[i]} 
        </div>`;
    }
}
document.getElementById("target-id").innerHTML=data1;

}

function removeItem(array,item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}

function isCartEmpty(){
    let data1 =``;
    if(array.length==0)
    {
      data1 +=`
      <div class="cart"> 
         <h2>Empty Cart</h2>
      </div>`;          
    }
    document.getElementById("target-id").innerHTML = data1;
  }
  
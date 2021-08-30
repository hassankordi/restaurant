// some Declarations
let links = document.getElementsByClassName("nav-link");
let arrLinks = [...links];
let allData = [];
let singleData = {};
let searchInp = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let myAlert = document.getElementById("myAlert");

//recipeDetails
/***********************************************************************************/

// search 
// let word =this.value;


searchBtn.addEventListener("click",()=>{

    if(searchInp.value==""){

        console.log(allData.length)
        console.log(searchInp.value)

        myAlert.classList.remove("d-none")
    }
    else{
        myAlert.classList.add("d-none")
       
        let word = searchInp.value;
        console.log(word)
        search(word);
    }
   
}


)
async function search (word){
    let req = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${word}`);
    let resBody = await req.json();
    allData=resBody.recipes;
    displayRespice();
   



}
// get data from API

async function getAllRespice (term){
    let req = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${term}`);

    let resBody = await req.json();

    allData=resBody.recipes;

   // console.log(allData)
    displayRespice();
   // console.log(resBody.recipes);
}

//Put data on our site

function displayRespice(){
    var str = "";
    for(let i = 0;i < allData.length ; i++ ){
        str+=`<div class="col-sm-6 col-md-3 item">
        <img onclick='getSingleRecipes("${allData[i].recipe_id}")' data-toggle="modal" data-target="#exampleModal" class="w-100" src="${allData[i].image_url}" alt="">
        <h4>${allData[i].title}</h4>
        <h6> id = ${allData[i].recipe_id}</h6>
    </div>`
    }
    document.getElementById("rowData").innerHTML = str ;
}






// Putting data on our site according to the click
for(let i = 0 ;i < arrLinks.length ; i++ ){
    links
    arrLinks[i].addEventListener("click",function(e){

        let term = e.target.innerHTML;

        getAllRespice(term);
    })

}

// put pizza by defult .....

getAllRespice("pizza");




async function getSingleRecipes(id){
    let req = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);

    let resBody = await req.json();

  singleData=resBody.recipe;
 // console.log(singleData);

  displaySingleData();
}

//getSingleRecipes(47746);


function displaySingleData(){
    let lis ="";


for(let i = 0;i < singleData.ingredients.length;i++){
lis +=`<li>${singleData.ingredients[i]}</li>`
}




    let str =`
    <div class="overflow-hidden">
    <img src="${singleData.image_url}" alt="">
    <h4> title =>${singleData.title}</h4>
    <p>ingredients</p>
    <ul>
        ${lis}
    </ul>
</div>
    `
    document.getElementById("recipeDetails").innerHTML= str ;
}


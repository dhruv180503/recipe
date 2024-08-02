const quote = document.querySelector(".quote"),
generate = document.getElementById("generate"), 
category = document.getElementById("category"),
likeQuote = document.getElementById("likeQuote"),
likeList = document.getElementById("likeList"),
quoteArea = document.querySelector(".quoteArea");


function generateQuotes(){
    let div = document.createElement("div");
    quote.innerHTML = 'Loading New Quotes...<i class="fa-solid fa-sync fa-spin"></i>'
    generate.innerHTML="Generating..."
    fetch("https://api.api-ninjas.com/v1/quotes",{
        headers:{ "X-Api-key":"L0zkvpVBwW6sO0OG9k2Zzg==eatzRR5IqOw2ZuRO" }
    })
    .then((response)=> response.json())
    .then((data) => {
        console.log(data);
        generate.innerHTML="New Quote";

        quote.innerHTML = "";
        div.innerHTML+='<i class="fa-solid fa-quote-left"></i> &nbsp;';
        div.innerHTML += data[0].quote;
        div.innerHTML+='&nbsp; <i class="fa-solid fa-quote-right"></i> &nbsp;';

        div.innerHTML += `<div class="author"><span>__</span> ${data[0].author}`
        quote.append(div);

         category.innerHTML=data[0].category;
    });
}

function LikeQuote(){
    if(likeQuote.style.color == "red"){
        likeQuote.removeAttributee("class");
        likeQuote.setAttribute("class","fa-regular fa-heart");
        likeQuote.style.color = "black";
    
       favoriteListArr = favoriteListArr.filter(function(e){
           return e!== quote.innerHTML;
       })
        localStorage.setItem("favoriteListItems",JSON.stringify(favoriteListArr));

  } else {
    likeQuote.setAttribute("class", "fa-solid fa-heart");
    likeQuote.style.color = "red";
   favoriteListArr.push(quote.innerHTML);
   localStorage.setItem("favoriteListItems",JSON.stringify(favoriteListArr));
    }}

   /* if (favoriteListArr.length==0) {
        likeList.style.opacity ="0.6";
        likeList.style.pointerEvents ="none";
        } else {
        likeList.style.opacity= "1";
        likeList.style.pointerEvents= "auto";
    }


}

function CopyQuote() {}

likeList.addEventListener("click",() => {
    favoriteData.innerHTML-"";
    quoteArea.style.display = "none";
    favoriteList.style.display= "block";

    
    favoriteListArr.forEach((item) => {
        console.log(item);
        let li = document.createElement("li");
        li.innerHTML=item;
        favoriteData.append(li);
    });
});

function switchQuotes(){
    quoteArea.style.display = "block";
    favoriteList.style.display="none";
}*/
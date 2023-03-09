let responseDiv = document.querySelector("#responseDiv");
let coinNameInput = document.querySelector("#coinNameInput");
let search = document.querySelector("#search");
let errorMessage = document.querySelector("#errorMessage");
$("#errorMessage").hide();
let dropdownList = document.querySelector("#dropdownCoins");


let coins = [];

  $("#add").click(function(){
    if(coinNameInput.value == null || coinNameInput.value == ""){
      coinNameInput.focus();
      document.querySelector("#coinLabel").innerHTML = "Please enter a coin."
      document.querySelector("#coinLabel").style.color = "red";
      return;
    }

    document.querySelector("#coinLabel").attributeStyleMap.clear()
    coins.push(coinNameInput.value);
    
    const coin = document.createElement("li");
    coin.className = "list-group-item";
    coin.innerHTML = coinNameInput.value;
    dropdownList.appendChild(coin);

    console.log(coinNameInput.value);
    coinNameInput.value = "";
    coinNameInput.focus();

    

  });



  $(search).click(function(){
    //https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ccardano&vs_currencies=czk%2Cusd
    let url = "https:api.coingecko.com/api/v3/simple/price?ids=";
    if(coins.length == 0) url+="bitcoin"
    coins.forEach(coin =>{
      url += coin+"%2C";
    });
    
    url += "&vs_currencies=czk"

    $.ajax({
      type: "GET",
      url : url,
      success: function(response){
        $("#errorMessage").hide(150);
          coins.forEach(coin =>{
            console.log(coin + ":" +response[0].coin);
            responseDiv.innerHTML += coin + ":" +response[0].coin+"\n";
          });

      },
      error: function(){
        errorMessage.innerHTML = "Could not fetch information from server. Please try again later."
        $("#errorMessage").show(400);
          
      }
    });
  });

  document.querySelector("#table").style.display = "none";

    // $.ajax({
    //   type: "GET",
    //   url : "https://api.coingecko.com/api/v3/coins/list",
    //   success: function(response){
    //       response.forEach(element => {
              
    //       });

    //   },
    //   error: function(response){
    //       alert("Something went wrong");
    //   }
    // });

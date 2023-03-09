let responseDiv = document.querySelector("#responseDiv");
let coinNameInput = document.querySelector("#coinNameInput");
let search = document.querySelector("#search");
let errorMessage = document.querySelector("#errorMessage");
$("#errorMessage").hide();
let dropdownList = document.querySelector("#dropdownCoins");


let coins = [];

  $("#add").click(function(){

    let regex = new RegExp("\\s+");
    if(regex.test(coinNameInput.value)){
      document.querySelector("#coinLabel").innerHTML = "No spaces!."
      document.querySelector("#coinLabel").style.color = "red";
      return;
    }

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
    coin.id = "li-"+coinNameInput.value;
    coin.innerHTML = coinNameInput.value;
    
    const removeButton = document.createElement("button");
    removeButton.value = coinNameInput.value;
    removeButton.classList = "btn btn-danger btn-small";
    removeButton.id = "remove";
    removeButton.innerHTML = "X";
    $(removeButton).click(function(){
      let selector = "#li-";
      selector += this.value;
      document.querySelector(selector).remove();
    });

    coin.appendChild(removeButton);
    
    
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

          console.log(response);
          console.log(coins.length);
          for (const object in response) {

            let p = document.createElement("p");
            p.id ="price";
            p.innerHTML = response[object]["czk"] + "czk,-";

            document.querySelector("#li-"+object.toString());

            console.log(object.toString() + ":" + response[object]["czk"]);
          }

      },
      error: function(){
        errorMessage.innerHTML = "Could not fetch information from server. Please try again later."
        $("#errorMessage").show(400);
          
      }
    });
  });

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

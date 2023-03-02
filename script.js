let responseDiv = document.querySelector("#responseDiv");

  $("#price").click(function(){
      $.ajax({
        type: "GET",
        url : "https://api.coingecko.com/api/v3/coins/list",
        success: function(response){
            response.forEach(element => {
                
            });

        },
        error: function(response){
            alert("Something went wrong");
        }
      });

    });

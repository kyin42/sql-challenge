$(document).ready(function(){
    document.getElementById("demo").innerHTML = "";
    $(".searchbar form").submit(function(e){
        e.preventDefault();
      });
    $('#search').click(function(){
       var value = $("#githubAccount").val();
        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                var display = '<div class="row">' +
                    '<div class="col-sm-5 col-md-3">' +
                        '<img src="'+data.avatar_url+'">' +
                    '</div>' +
                    '<div class="col-sm-7 col-md-9">' +
                        '<h2>'+data.login+ ((data.name != null)?'<small> (' + data.name +')</small> ':'') + '</h2>' +
                        ((data.company)?'<p>Company: '+data.company+'<br/>':"") +
                        
                        'Public repos: '+data.public_repos+'<br/>' +
                        'Public gists: '+data.public_gists+'<br/>' +
                        'Followers: '+data.followers+'<br/>' +
                        'Following: '+data.following+'<br/>' +
                        '<a class="link btn btn-default" href="'+data.html_url+'">link</a>' +
                        '</p>' +
                    '</div>' +
                    '<div class="clearfix"></div>' +
                    ((data.bio != null)?
                    '<div class="row bio">' +
                        '<div class="col-sm-12">' +
                        data.bio +
                        '</div>' +
                    '</div>':"") +
                '</div>';

             document.getElementById("demo").innerHTML = display;
            } else if(this.readyState == 4){
                document.getElementById('demo').innerHTML = "unable to find user";
            }
          };
          console.log(value);
          xhttp.open("GET", "https://api.github.com/users/" + value, true);
          xhttp.send();
    });
});
$(document).ready(function(){
  $.ajaxSetup({xhrFields: { withCredentials: true } });
        // Gets an optional query string from our url (i.e. ?post_id=23)
        var url = window.location.search;
        var postId;
        // Sets a flag for whether or not we're updating a post to be false initially
        
      
        // If we have this section in our url, we pull out the post id from the url
        // In localhost:8080/cms?post_id=1, postId is 1
        if (url.indexOf("?post_id=") !== -1) {
          postId = url.split("=")[1];
          getUserData(postId);
        }
      
        /* let regForm = $("#userRegister")
        
        // Giving the postCategorySelect a default value
        
        let regForm = $("#userRegister")
    
        $(regForm).on("submit", function handleFormSubmit(event) {
          event.preventDefault();
           let userFirstName = $("#firstName").val().trim()
           let userLastName = $("#lastName").val().trim()
           let userEmail = $("#email").val().trim()
           let userPassword = $("#password").val().trim()
           let userMajor = $("#major").val().trim()
           let userOccupation = $("#occupation").val().trim()
           console.log("hi", userOccupation)
           
           
        
        
          // Wont submit the post if we are missing a body or a title
          if (!userFirstName || !userLastName || !userEmail || !userPassword || !userOccupation || !userMajor) {
            return;
          }
          // Constructing a newPost object to hand to the database
          var newUser = {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: userPassword,
            major: userMajor,
            occupation: userOccupation
          };
          // console.log('newUser');
          // console.log(newUser);
      
          // If we're updating a post run updatePost to update a post
          // Otherwise run submitPost to create a whole new post
            submitUserData(newUser);
            // console.log(newUser)
          }
        );
      
        // Submits a new post and brings user to blog page upon completion
        function submitUserData(User) {
          console.log(User)
          $.post("/api/Users", User , function() {
            window.location.href = "/login";
          });
        }
      }) */
        // Getting jQuery references to the post body, title, form, and category select
        let regForm = $("#userRegister")
        
        // Giving the postCategorySelect a default value
        
        // Adding an event listener for when the form is submitted
        $(regForm).on("submit", function handleFormSubmit(event) {
          event.preventDefault();
           let userFirstName = $("#firstName").val().trim()
           let userLastName = $("#lastName").val().trim()
           let userEmail = $("#email").val().trim()
           let userPassword = $("#password").val().trim()
           let userMajor = $("#major").val().trim()
           let userOccupation = $("#occupation").val().trim()
           console.log("hi", userOccupation)
           
           
        
        
          // Wont submit the post if we are missing a body or a title
          if (!userFirstName || !userLastName || !userEmail || !userPassword || !userOccupation || !userMajor) {
            return;
          }
          // Constructing a newPost object to hand to the database
          var newUser = {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: userPassword,
            major: userMajor,
            occupation: userOccupation
          };
          // console.log('newUser');
          // console.log(newUser);
      
          // If we're updating a post run updatePost to update a post
          // Otherwise run submitPost to create a whole new post
            submitUserData(newUser);
            
          }
        );
      
        // Submits a new post and brings user to blog page upon completion
        function submitUserData(User) {
          console.log(User)
          $.post("/signup", User , function(req,res) {
            window.location.href = req.url
          });
        }

      let signin = $("#signin")
        
        // Giving the postCategorySelect a default value
        
        // Adding an event listener for when the form is submitted
        $(signin).on("submit", function handleFormSubmit(event) {
          event.preventDefault();
           let signinEmail = $("#emailSignin").val()
           let signinPassword = $("#passwordSignin").val()
           console.log(signinEmail);
           
        
        
          // Wont submit the post if we are missing a body or a title
          if (!signinEmail || !signinPassword) {
            return;
          }
          // Constructing a newPost object to hand to the database
          var newSignin = {
            email: signinEmail,
            password: signinPassword,
          };
          console.log(newSignin);
          // console.log('newUser');
          // console.log(newUser);
      
          // If we're updating a post run updatePost to update a post
          // Otherwise run submitPost to create a whole new post
            submitUserSignin(newSignin);
            // console.log(newUser)
          }
        );
      
        // Submits a new post and brings user to blog page upon completion
        function submitUserSignin(checkSignin) {
          console.log(checkSignin)
          $.post("/signin", checkSignin , function(req, res) {
            window.location.href=req.url
          });
        }
      })
        // Gets post data for a post if we're editing
      if(window.location.href == '/console'){
        console.log("definitelyHere")
       $.get('/console', function(req, res){
         var session2 = req.datavalues.id;
         console.log("100xHere" , session2);
       })
      }
      let sendPost = $("#createPost")


      $(sendPost).on("submit", function handleFormSubmit(event){
        event.preventDefault();

        let postTitle = $("#postTitle").val().trim();
        let postTopic =$("#postTopic").val().trim();
        let postDescription =$("#postDescription").val().trim();
        let postBody = $("#postBody").val().trim();


        if(!postTitle || !postTopic || !postDescription || !postBody){
          return;
        }


        let newPost = {
          title: postTitle,
          topic: postTopic,
          description: postDescription,
          entry: postBody
        }
        console.log(newPost)
        submitNewPost(newPost)
        
      })
     

      function submitNewPost(Post){
        $.post("/api/Posts", Post, function(){
          window.location.href = "/profile"
        })
      }

      let postSearch = $("#postSearch")

      $(postSearch).on("submit",function handleFormSubmit(event){
        event.preventDefault();
        console.log("searching")
        $("#accordion").empty()

        let postTopic = $("#topicSearch").val()
        console.log(postTopic)
        if(!postTopic){
          return;
        }

        $.get("/api/posts/" + postTopic , function(data){
          // console.log(data)  
          // console.log(data[0].User.firstName + " " + data[0].User.lastName)
          
          let limit = 3;
          for(let i =0; i<limit; i++){
            let title = data[i].title
            console.log(data[i].title)
            let description = data[i].description
            let entry = data[i].entry;
            let user= data[i].User;
            let author = user.firstName + " " + user.lastName
            console.log(user);
            console.log(user.firstName);



         let myscript = '<div class="card text-left "><div class="card-header" id="headingOne">';
             myscript += '<h1 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne"';
             myscript += 'aria-expanded="true" aria-controls="collapseOne">'
             myscript +=            title + " "
             myscript +=           '<a href ="/profile2" class="text-dark" id="newProfile">'
             myscript +=             author
             myscript +=           '</a>'                     
             myscript +=          '</button>'
             myscript +=        '</h1>'
             myscript +=      '</div>'   
             myscript +=      '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">'
             myscript +=       ' <div class="card-body">'
             myscript +=         '<p class ="font-weight-bold">'
             myscript +=          description
             myscript +=            '</p>'
             myscript +=            '<p>'
             myscript +=            entry
             myscript +=           '</p>'
             myscript +=        '</div>'
             myscript +=       '</div>'
             myscript +=    '</div>'
             console.log(myscript)

             $("#accordion").append(myscript)
            
          }
        })


      })

      let editProfile = $("#editProfile")

      $(editProfile).on("submit", function handleFormSubmit(event){
        event.preventDefault();

        let profession = $("#professionInput").val()
        let school = $("#schoolInput").val()
        let interests = $("#interestsInput").val()

        let update = {
          profession: profession,
          school:school,
          interests:interests
        }

        updateprofile(update)

      })

      updateprofile = function(object){
        $.put("/api/users/", object, function(){

        })
      }
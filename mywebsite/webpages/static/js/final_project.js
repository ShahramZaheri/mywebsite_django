function logincheck(){
    var user_name=document.getElementById("UserName").value;
    var password=document.getElementById("password").value;
    var db=firebase.firestore();
    var docRef = db.collection("login info").doc("record");
    

    
    
    docRef.get().then(function(doc) {
        console.log(doc.data().username);
    if (user_name==doc.data().username && password==doc.data().password){
        window.location.href="home.html";
    } else {
        
        document.getElementById("login_error_alaram").innerHTML="Wrong login info! Please see the hints";
        }
    });
}
function contact_me_submit(){
    var first_name = document.getElementById("first_name");
    var last_name = document.getElementById("last_name");
    var phone_number = document.getElementById("phone_number");
    var email_address=document.getElementById("email_address");
    var text_area=document.getElementById("text_area");
    if (first_name.checkValidity() && last_name.checkValidity() && phone_number.checkValidity() && email_address.checkValidity() && text_area.checkValidity()){
        alert("Thanks for contacting me!");
    }else{
        alert("invalid input!");
    }
}
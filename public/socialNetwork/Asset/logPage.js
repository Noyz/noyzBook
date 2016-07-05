$(document).ready(function(){

var myCookie; 
	var user = {};

	/*** LAYOUT ***/
	$('.navbar-link').click(function(){
		localStorage.removeItem('noyzCookie');
	});


	/******** Main Page *********/
	$('.loginMain').click(function(){
		$('#login').show()
		$('#subscription').hide()
	});

	$('.subscriptionMain').click(function(){
		$('#login').hide();
		$('#subscription').show();
	});

	/**** Authentification Sub ****/
	$('#formSub').on('submit', function(event){
		event.preventDefault();
          $.ajax({
           type: "POST",
           url: "/sub", 
           data: $('#formSub').serialize(), 
           success: function(data)
           {	
               fct_Inscription(data);
           }
         });
      });


	var fct_Inscription = function(data){
		$('.errorMessage').text('');
		$('.errorSub').css('display','block');
		if(localStorage.getItem('noyzCookie') == null){
			localStorage.setItem("noyzCookie", Math.random());
		}
		user.username = $('input[name="usernameSub"]').val();
		user.password = $('input[name="passwordSub"]').val();
		user.dataCookie = localStorage.getItem('noyzCookie');
		if(data  == 'error'){
			$('.errorSub').text('Ce compte existe déjà');
			$('.errorSub').css('color','red');
		}else{
			$('.errorSub').css('color','green');
			$('.errorSub').text('Bienvenue ! ');
			$.ajax({
	           type: "POST",
	           url: "/connexionToProfilSub", 
	           data: user, 
	           success: function(data)
		           {
		               window.location.href = 'http://localhost:5050/myprofil';
		           }
	        });		
		}
	};


	/**** Authentification Log ****/

	$('#formLog').on('submit', function(event){
		event.preventDefault();
          $.ajax({
           type: "POST",
           url: "/connect", 
           data: $('#formLog').serialize(), 
           success: function(data)
           {
           	fct_Connexion(data);
           }
         });
     });
	


	var fct_Connexion = function(data){
		$('.errorLog').text('');
		$('.errorLog').css('display','block');
		if(localStorage.getItem('noyzCookie') == null){
			localStorage.setItem("noyzCookie", Math.random());
		}
		user.username = $('input[name="usernameLog"]').val();
		user.password = $('input[name="passwordLog"]').val();
		user.dataCookie = localStorage.getItem('noyzCookie');
		if(data == 'valid'){
			$('.errorLog').css('color','green');
			$('.errorLog').text('Bienvenue ! ');
				$.ajax({
		           type: "POST",
		           url: "/connexionToProfilLog",
		           data: user, 
		           success: function(data)
		           {
		             window.location.href = 'http://localhost:5050/myprofil';
		           }
		        });
		}else{
			$('.errorLog').css('color','red');
			$('.errorLog').text('Ce compte n\'existe pas');
		}
	};
});
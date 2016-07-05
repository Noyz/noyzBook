$(document).ready(function(){

	var profilLibrary = {
		userData: null,
		allUsers:null,
		setUserName : function(){
			var that = this;
			var changeContent = function(obj){
				$('.navbar-text strong').after('<img src='+ obj.actualUserInfo[0].profil +' class="titleImg"/>').text($('.navbar-text strong').text() + obj.actualUserInfo[0].username);
				$('.profilImg').attr('src', obj.actualUserInfo[0].profil);
				that.allUsers = obj;

				window.profilLibrary.changeProfilPicture();
			};
			$.ajax({
				type:"POST",
				url:"/loadProfil",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(data){
					that.userData = data;
	                changeContent(data);
	           }
			});
		},
		changeProfilPicture : function(){
			$('.formImgProfil').on('submit', function(event){
				  $.ajax({
					url:"/loadProfilPicture",
					type:"POST",
					data:{data:localStorage.getItem('noyzCookie')},
					success: function(data){
						console.log(data)
						$('.profilImg').attr('src', data.profil);
		 				window.location.href = 'http://localhost:5050/myprofil'
		            }
				});
			});
		},
		page_name:function(){
			var url = window.location.href;
			var pageName = url.substr(22, 34);
			$('#actionBar p').after(pageName);

		},
		createListMessage: function(){
			var that = this;
			var data = that.userData;
			var html = [];
						
			if(data.actualUserInfo[0].messagePublic != undefined){
				for(var i = 0; i < data.actualUserInfo[0].messagePublic.length; i++){
					if(data.actualUserInfo[0].messagePublic[i][2] != undefined){ // si une deuxième propriete au tableau existe "cad : nom"
						// Parcours le tableau de tout les utilisateurs et retourne un tableau avec les données des utilsiateurs concernées;
						var otherUserName = data.actualUserInfo[0].messagePublic[i][2];
						for(var j = 0;j < data.everyUser.length;j++){
							if(otherUserName == data.everyUser[j].username){
								var li = '<li><div class="articleUser"><img src='+ data.everyUser[j].profil +' class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].messagePublic[i][2] +'</p><p class="messages">'+ data.actualUserInfo[0].messagePublic[i][0] +'</p><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+'</p></div></li>'
							}
						}
					}else{
						if(data.actualUserInfo[0].messagePublic[i] != undefined){
							var li = '<li><div class="articleUser"><img src='+ data.actualUserInfo[0].profil +' class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].username +'</p><p class="messages">'+ data.actualUserInfo[0].messagePublic[i][0] +'</p><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+'</p></div></li>'
						}
					}
					html.push(li);	
				}
			};
			html = html.join('\n');
			$('ul.messageContainer').append(html);
		}
	}
	window.profilLibrary = profilLibrary;
});
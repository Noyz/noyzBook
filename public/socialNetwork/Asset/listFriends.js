$(document).ready(function(){
	var setListFriends = {
		arrayFriends : [],
		setList : function(){
		var that = this;
			$.ajax({
				type:"POST",
				url:"/loadListFriend",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(obj){
					var tabFriends = [];
	                	for(var i = 0;i<obj.dataToKeep.length;i++){
	                		tabFriends.push(obj.data[i].username)
	                	}
		                for(i = 0;i< obj.data.length;i++){
		                	if(obj.dataToKeep[i] == undefined){

		                	}else{
		                		// console.log(obj.data)
		                		var li = '<li><div class="contenuFriend"><div class="pictureFriend"><img src="'+ obj.picture[i] +'"/></div><div class="nameFriend">' + obj.dataToKeep[i] +'</div><div class="updateFriend"><p class="accessWallFriend">Accéder à son mur</p><p class="writingWallFriend">Ecrire sur son mur</p><p class="privateMessageFriend">Envoyé message privée</p><p class="chatFriend">Tchat</p></div></div></li>';
			                	that.arrayFriends.push(li);
			                	$('ul.contenuListFriends').append(li);
		                		
		                	}
		                }
	                that.arrayFriends = that.arrayFriends.join('\n');
	                window.setListFriends.handlerFriend();
	            }
			});
		},

		handlerFriend : function(){
			$('.accessWallFriend').click(function(){
				var name_friend = $(this).closest('.updateFriend').siblings('.nameFriend').text();
				$.ajax({
					type:"POST",
					url:"/loadWallFriend",
					data: {data:localStorage.getItem('noyzCookie'), name:name_friend},
					success: function(obj){
						window.location.href = 'http://localhost:5050/friendWall';
					}
				});
			});
			$('.writingWallFriend').click(function(){
				var name_friend = $(this).closest('.updateFriend').siblings('.nameFriend').text();
				$.ajax({
					type:"POST",
					url:"/writingOnWallFriend",
					data: {expediteur:localStorage.getItem('noyzCookie'), receveur:name_friend},
					success: function(obj){
						window.location.href = 'http://localhost:5050/editionFriendWall';
					}
				});

			});
			$('.privateMessageFriend').click(function(){
				var name_friend = $(this).closest('.updateFriend').siblings('.nameFriend').text();
				$.ajax({
					type:"POST",
					url:"/createPrivateMessage",
					data: {expediteur:localStorage.getItem('noyzCookie'), receveur:name_friend},
					success: function(obj){
						window.location.href = 'http://localhost:5050/privateMessageEditor';
					}
				});

			});
		}
	};
	window.setListFriends = setListFriends;
});
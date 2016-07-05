$(document).ready(function(){
	var setMessageOnFriendWall = {
		userData: null,
		arrayMessage : [],
		setMessagePublicFriend : function(){
		var that = this;
			$.ajax({
				type:"POST",
				url:"/loadMessageFriend",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(obj){
	             that.createListMessageFriend(obj);
	            }
			});
		},
		createListMessageFriend: function(data){
			var that = this;
			var html = [];
			for(var i = 0; i <= data.actualUserInfo[0].messagePublic.length -1; i++){
				if(data.actualUserInfo[0].messagePublic[i][2] != undefined){
					var otherUser = data.actualUserInfo[0].messagePublic[i][2];
					for(var j = 0;j < data.everyUser.length;j++){
						if(otherUser == data.everyUser[j].username){
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
			html = html.join('\n');
			$('.containerMessageFriend').append(html);
		}
	};
	window.setMessageOnFriendWall = setMessageOnFriendWall;
});
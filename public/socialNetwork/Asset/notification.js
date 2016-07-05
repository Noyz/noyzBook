$(document).ready(function(){
	setNotification = {
		that : this,
		loadNotification : function(){
			$.ajax({
				type:"POST",
				url:"/loadNotification",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(data){
					if(data.length != undefined){
		               	var that = this;
						var html = [];
						for(var i = 0; i < data.length; i++){
							if(data[i] != undefined ){
								var li = '<li><div class="notificationUser"><p class="pannelNotification">'+ data[i] +'</p><div class="actionNotification"></div></div></li>';
							}
							html.push(li);	
							window.setNotification.interactionNotification(li);
						}
						html = html.join('\n');
						$('ul.notificationContainer').append(html);
					} else{
						var noNotification = '<li><div class="notificationUser"><p class="pannelNotification">Vous n\'avez aucune nouvelle notifications.</p></div></li>';
						$('ul.notificationContainer').append(noNotification);
					}
	           	}
			});
		},
		interactionNotification : function(data){
				setTimeout(function(){
					$('li').each(function(){
						var patt = new RegExp("ami");
						var patt2 = new RegExp("mur");
						var res = patt.test($(this).html());
						var res2 = patt2.test($(this).html());
						if(res){
							$(this).find('.actionNotification').html('<a href="#" class="agreeFriend">Accepter</a><a href="#" class="refuseFriend">Refuser</a>');
						}else if(res2){
							$(this).find('.actionNotification').html('<a href="#" class="checkWallMessage">Accéder</a>');
						}else{
							//
						}
					})
					window.setNotification.friendshipHandler(data);
					window.setNotification.checkWallMessage();
				}, 0);
		},
		checkWallMessage : function(){
			$('.checkWallMessage').click(function(event){
				var thisMessage = $(this).closest('.actionNotification').siblings('p').text();
				event.preventDefault();
				$.ajax({
					type:"POST",
					url:"/accessNotificationWall",
					data: {data:localStorage.getItem('noyzCookie'), message:thisMessage},
					success: function(data){
						for(var i = 0 ;i < data.Notification.length;i++){
							var patt = new RegExp(thisMessage);
							var res = patt.test(data.Notification[i][0]);
							if(res){
								$.ajax({
									type:"POST",
									url:"/deleteThisNotificationWall",
									data: {data:localStorage.getItem('noyzCookie'), position:i},
									success: function(data){
										window.location.href = "http://localhost:5050/myprofil"
						           	}
								});
							}
						}
		           	}
	           	});
			});
		},
		friendshipHandler : function(data){
			$('.agreeFriend').bind('click', function(event){
				var this_notification = $(this).closest('div').siblings('p').text();
				event.preventDefault();
				var name_user = $(this).closest('div').siblings('p').text().substr(45);
				$.ajax({
					type:"POST",
					data: {data:localStorage.getItem('noyzCookie'), name_user},
					url:"/addThisFriend",
					success: function(data){
						for(var i = 0 ;i < data.Notification.length;i++){
							var patt = new RegExp(this_notification);
							var res = patt.test(data.Notification[i][0]);
							if(res){
								$.ajax({
									type:"POST",
									url:"/deleteNotificationFriend",
									data: {data:localStorage.getItem('noyzCookie'), position:i},
									success: function(data){
										console.log(data);
						           	}
								});
							}
						}
		           	}
				});
			});
			$('.refuseFriend').bind('click', function(event){
				var this_notification = $(this).closest('div').siblings('p').text();
				event.preventDefault();
				var name_user = $(this).closest('div').siblings('p').text().substr(45);
				$.ajax({
					type:"POST",
					url:"/deleteRequestThisFriend",
					data: {data:localStorage.getItem('noyzCookie'), name_user},
					success: function(data){
						console.log(data)
						for(var i = 0 ;i < data.Notification.length;i++){
							var patt = new RegExp(this_notification);
							var res = patt.test(data.Notification[i][0]);
							if(res){
								$.ajax({
									type:"POST",
									url:"/deleteNotificationFriend",
									data: {data:localStorage.getItem('noyzCookie'), position:i},
									success: function(data){
										console.log(data);
						           	}
								});
							}
						}
		           	}
				});
			});				
		}
	};
	window.setNotification = setNotification;
});
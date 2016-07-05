$(document).ready(function(){
	var setListUsers = {
		arrayUsers : [],
		setList : function(){
		var that = this;
			$.ajax({
				type:"POST",
				url:"/loadList",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(obj){
					var from = $('.navbar-text strong').text().substr(14);
					var tabUsers = [];
					console.log(obj)
	                	for(var i = 0;i<obj.data.length;i++){
	                		tabUsers.push(obj.data[i].username)
	                	}
		                for(i = 0;i< obj.data.length;i++){
		                	console.log(from)
		                	if(obj.data[i].username != obj.dataToDelete[0].username && obj.data[i].username != obj.dataToDelete[0].amis && obj.data[i].username && obj.data[i].username != from){
			                	var li = '<li><div class="contenuUser"><div class="pictureUser"><img src="'+ obj.data[i].profil +'"/></div><div class="nameUser">' + obj.data[i].username +'</div><div class="updateUser"><p class="addUser">Ajouter</p><p class="deleteUser">Supprimer</p></div></div></li>'
			                	that.arrayUsers.push(li);
			                	$('ul.contenuListUsers').append(li);
		                	}
		                }
	                that.arrayUsers = that.arrayUsers.join('\n');
					that.updateUsers(obj);
	           }
			});
		},
		updateUsers : function(list){
			$('.nameUser').each(function(){
				for(var i = 0;i < list.data.length;i++){
					if($(this).text() == list.dataToDelete[i]){
						$(this).closest('li').remove();
					}
				}
			});
			$('.addUser').click(function(){
				var name_user = $(this).closest('.updateUser').siblings('.nameUser').html();
				$.ajax({
					type:"POST",
					data: {data:localStorage.getItem('noyzCookie'), name_user:name_user},
					url:"/addThisUser",
					success: function(data){
		            	window.setListUsers.sendRequestUser(data);
		           	}
				});
			});
		},
		sendRequestUser : function(name){
			var from = $('.navbar-text strong').text().substr(14);
			$.ajax({
				type:"POST",
				url:"/requestThisUser",
				data: {from:from, to:name},
				success: function(data){
	            	console.log(data);
	           	}
			});
		}
	};
	window.setListUsers = setListUsers;
});
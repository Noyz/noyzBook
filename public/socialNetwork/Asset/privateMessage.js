$(document).ready(function(){

	var privateMessageLibrary = {
		userData: {},
		setContactList : function(){
			var that = this;
			$.ajax({
				type:"POST",
				url:"/loadContactPrivateMessageList",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(data){
					that.handleList(data);
	           }
			});
		},
		handleList : function(data){
			var html = [];
			if(data.length != undefined){
				console.log('j\'affiche la list');
			}
			console.log('je n\'affiche pas la liste')
			var li = '<li><div>Vous n\'avez pas de message.<br> Rendez-vous sur la <a href="listFriends">liste d\'amis</a> afin d\'envoyer un message à un de vos amis.</div></li>';
			html.push(li);
			html = html.join('\n');
			$('ul.containerContact').append(html);
		},
		sendPrivateMessage:function(){
			var that = this;
			$('#editorPrivateMessage').submit(function(event){
				event.preventDefault();
				that.userData.message = tinyMCE.activeEditor.getContent();		// contenu du message
				$.ajax({
					type:"POST",
					data: that.userData,
					url:"/sendPrivateMessage",
					success: function(data){
						// that.handleList(data);
		           	}
				});
			});
		}
	}
	window.privateMessageLibrary = privateMessageLibrary;
});
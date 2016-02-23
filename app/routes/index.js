
var Post = require('../models/post');
module.exports = function (app) {

	app.get('/api/post/create', function(req, res){
		var newPost = new Post();
		newPost.title = 'This is a title';
		newPost.description = 'This is a description for this post';
		newPost.content = 'Short content, just use for demo';
		newPost.creationDate = new Date();
		newPost.save(function(err, post) {
			if (err) {
				res.send(err); 
			}
			else {
				res.json(post);
			}
		});

	});


	app.get('/api/post/list', function(req, res){
		Post.find({}).sort({creationDate: -1}).exec(function(err, posts) {
			if (err) {
				res.send(err);
			}
			else {
				res.json(posts);
			}
		});
	});

	app.get('/api/post/detail/:post_id', function(req, res){
		Post.findById(req.params.post_id).exec(function(err, post){
			if (err) {
				res.send(err);
			}
			else {
				res.json(post);
			}
		});
	});

	
	app.get('/api/post/edit/:post_id', function(req, res){
		Post.findById(req.params.post_id, function(err, data){

			if(err) {
				res.send(err); 
			}
			else {
				data.title = 'Title after edit';
				data.description = 'Description has many changes';
				data.content = 'Content is here';
				data.save(function(err, post) {
					if (err) {
						res.send(err);
					}
					else {
						res.json(post); 
					}
				});
				//res.json(data);
			}
		});
	});

	app.get('/api/post/delete/:post_id', function(req, res) {
		Post.remove({_id : req.params.post_id}, function(err) {
			if (err) {
				res.send(err);
			}
			else {
				res.json({message: "Xóa thành công!"});
			}
		});
	}); 


 /* app.get('*', function(req, res){
    res.sendfile('public/index.html');
});*/
};


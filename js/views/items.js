var itemsDict = [
	{type: "home", route: "#phone", img: "images/Phone.png", title: "Phone"},
	{type: "home", route: "#music", img: "images/Music.png", title: "Music"},
	{type: "home", route: "#tv", img: "images/TV.png", title: "TV"},
	{type: "home", route: "", img: "images/PC.png", title: "PC"},

	{type: "phone", route: "skype:ivan_pavlov_1989?chat", img: "images/PersonThubnail.png", title: "John"},
	{type: "phone", route: "skype:ivan_pavlov_1989?chat", img: "images/PersonThubnail.png", title: "Alex"},
	{type: "phone", route: "skype:ivan_pavlov_1989?chat", img: "images/PersonThubnail.png", title: "Billy"},
	{type: "phone", route: "skype:ivan_pavlov_1989?chat", img: "images/PersonThubnail.png", title: "Michael"},

	{type: "tv", route: "https://www.youtube.com/watch?v=pJ_ekD5RIiw&list=PLG3_buLmppojQeCdi0koJc2hKSImoQuXI", img: "images/Fishing.png", title: "Fishing"},
	{type: "tv", route: "https://www.youtube.com/watch?v=3gOAqF8Vwd0&index=2&list=PLS3XGZxi7cBVNadbxDqZCUgISvabEpu-g", img: "images/BBC.png", title: "BBC News"},
	{type: "tv", route: "https://www.youtube.com/watch?v=mbWgN-BsIZU&list=PLPglX4LjfEak7jkHScWeEl6Zd8Ui6opOB", img: "images/Voice.png", title: "The Voice"},
	{type: "tv", route: "https://www.youtube.com/watch?v=fpLokB6MOr4&list=PLiCk2I6PXl5p27Bbwq4cj3phvHwwbABLr", img: "images/Discovery.png", title: "Discovery"},

	{type: "music", route: "https://www.youtube.com/watch?v=W-fFHeTX70Q&list=RDW-fFHeTX70Q#t=2", img: "images/Beethoven.png", title: "Beethoven"},
	{type: "music", route: "https://www.youtube.com/watch?v=xFrGuyw1V8s&list=PLIuMnu__lJkEAIjUjtV7pcGarsphLZ-Ru", img: "images/ABBA.png", title: "ABBA"},
	{type: "music", route: "https://www.youtube.com/watch?v=NCtzkaL2t_Y&list=UU4dqLAF7yT-_DqeYisQ001w", img: "images/Beatles.png", title: "The Beatles"},
	{type: "music", route: "https://www.youtube.com/watch?v=9f6V-QehbU4&list=RD9f6V-QehbU4#t=6", img: "images/Jazz.png", title: "Jazz"},
]

var ItemsView = Backbone.View.extend({
	el: $('#items'),

	events: {
		'click a.updateItems': 'setFilter'
	},

	initialize: function() {
		this.collection = new Items(itemsDict);
		this.render();

		this.on("change:filterType", this.filterByType, this);
		this.collection.on("reset", this.render, this);
	},

	render: function() {
		$('.item').remove();

        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderItem(item);
        }, this);
		this.$el.animate({'opacity': '1'}, 400)
	},


    renderItem: function (item) {
        var itemView = new ItemView({
            model: item
        });
        this.$el.append(itemView.render().el);
    },

	setFilter: function(e) {
		if (e.currentTarget.href.startsWith('#')) {
			this.filterType = e.currentTarget.href.split('#')[1];
		}
		// this.trigger('change:filterType');
	},

	filterByType: function() {
		this.$el.css({'opacity': '0'})

		this.collection.reset(itemsDict, { silent: true });

    	var filterType = this.filterType,
	        filtered = _.filter(this.collection.models, function (item) {
	            return item.get("type").toLowerCase() === filterType;
	        }); 

        this.collection.reset(filtered);
	},    
});
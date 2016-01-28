var ItemView = Backbone.View.extend({
	tagName: 'div',
	className: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 item',
	template: $('#item-tpl').html(),

	render: function() {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));
        return this;
	}
});
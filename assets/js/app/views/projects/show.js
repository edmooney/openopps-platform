define([
  'jquery',
  'underscore',
  'backbone',
  '../../collections/tasks',       
  'text!../../../../templates/projects/show.html',
  '../../views/comments/form',
  '../../collections/comments'
], function ($, _, Backbone, TaskCollection, projectShowTemplate, CommentFormView, CommentsCollection) {
  'use strict';

  var ProjectShowView = Backbone.View.extend({

    el: $("#container"),

    initialize: function (data) {
      this.isRendered = false;
      this.render(data);
    },

    render: function (data) {
      if (this.isRendered) return;
      this.isRendered = true;
      
      var compiledTemplate, 
      id = parseInt($(".project-id").text());

      this.tasks = new TaskCollection({ id: id });
      this.tasks.fetch();

      this.comments = new CommentsCollection({ id: id })
      this.comments.fetch();

      compiledTemplate = _.template(projectShowTemplate, data);
      this.$el.html(compiledTemplate).hide().fadeIn();

      new CommentFormView().render();
    }

      
  });

  return ProjectShowView;
});
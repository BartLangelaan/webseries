Handlebars.registerHelper("documentTitle", function(title) {
    if(title) {
        document.title = title;
    } else {
        document.title = "Webseries Database";
    }
});
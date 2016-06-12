var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;


    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(id, newWidget) {
        switch(newWidget.type) {
            case "HEADING":
                return Widget.update(
                    {_id: id},
                    {$set :
                    {
                        type: newWidget.type,
                        text: newWidget.text,
                        size: newWidget.size
                    }
                    }
                );
                break;
            case "IMAGE":
                return Widget.update(
                    {_id: id},
                    {$set :
                    {
                        type: newWidget.type,
                        url: newWidget.url
                    }
                    }
                );
                break;

            case "YOUTUBE":
                return Widget.update(
                    {_id: id},
                    {$set :
                    {
                        type: newWidget.type,
                        url: newWidget.url
                    }
                    }
                );
                break;
        }
    }

    function deleteWidget(id) {
        return Widget.remove({_id: id});
    }
};

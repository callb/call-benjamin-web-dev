module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    app.post ("/api/page/:pageId/widget", createWidget);
    app.get ("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get ("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/page/:widgetId", deleteWidget);



    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                switch(widgets[i].widgetType) {
                    case "HEADER":
                        widgets[i].text = widget.text;
                        widgets[i].size = widget.size;
                        break;
                    case "IMAGE":
                        widgets[i].url = widget.url;
                        break;
                    case "YOUTUBE":
                        widgets[i].url = widget.url;
                        break;
                }
                res.send(200);
                return;
            }
        }

        res.status(400).send("Unable to find widget");
    }
    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                delete widgets[i];
                res.send(200);
                return;
            }
        }

        res.status(400).send("Unable to find widget");
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for(var i in widgets) {
            if(widgets[i].pageId === pageId) {
                result.push(widgets[i]);
            }
        }
        res.send(result);
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.status(404).send("Widget not found");
    }


    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/"+filename;
            }
        }

        res.redirect("/assignment/#/user/:uid/website/:wid/page/:pid/widget/345");
    }
}
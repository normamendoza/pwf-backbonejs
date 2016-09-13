/**
 * Este metodo carga de descargar el html del template definido por el atirubto
 * templateURL y lo añade al atributo template.
 * @function
 */
Backbone.View.prototype.loadTemplate = function (callback) {
    var thiz = this;
    //si no existe en memoria se realiza el request
    $.get(this.templateURL, {
        "_": $.now() //cache false
    }, function (data) {
        thiz.template = data;
        callback();
    }).error(function (err) {
        alert("Error al obtener el template");
    });
}

/**
 * Define el enrutador de la aplicación se encarga de instanciar los views 
 * correspondientes a cada cambio de página.
 * 
 * @class
 * @author maxibaezpy
 */
var AppRouter = Backbone.Router.extend({
    /**
     * Define el mapeo de rutas a handlers
     * @type Object
     * @field
     */
    routes: {
        "contactos/": "home",
        "contactos/:id" : "contactDetails"
    },
    /**
     * @constructor
     */
    initialize: function () {
        this.collection = new ContactoCollection();
    },

    /**
     * Se encarga de manejar el listado y alta de personas.
     */
    home: function () {
        var view = new ListaContactoView({
            collection: this.collection,
            el: $("#lista-contacto")
        });
        //se inicializa el formulario de alta de personas
        var model = new ContactoModel();
        var form = new FormularioContactoView({
            collection: this.collection,
            data : model,
            el: $("#formulario-contacto")
        });
    },
    contactDetails: function(id) {
        var model = this.collection.get(id);
        var form = new FormularioContactoView({
            collection: this.collection,
            data : model,
            el: $("#formulario-contacto")
        });
    },
    /**
     * Handler por defecto.
     * @function
     */
    error: function (action) {
        alert("Opción " + action + " no válida.");
    }
});

/**
 * Constructor / Entrypoint
 * @constructor
 */
$(function () {
    var route = new AppRouter();
    Backbone.history.start();
});

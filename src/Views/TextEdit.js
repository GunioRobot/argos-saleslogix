define('Mobile/SalesLogix/Views/TextEdit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TextEdit', [Sage.Platform.Mobile.Edit], {
        //View Properties
        id: 'text_edit',
        expose: false,
        titleText: 'Text',
        isHorizontalSlide: false,

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: '',
                name: 'Notes',
                type: 'textarea'
            }]);
        }
    });
});
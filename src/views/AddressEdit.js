Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.AddressEdit = Ext.extend(Sage.Platform.Mobile.Edit, {
    isPrimaryText: 'primary',
    isMailingText: 'shipping',
    address1Text: 'address 1',
    address2Text: 'address 2',
    address3Text: 'address 3',
    cityText: 'city',
    stateText: 'state',
    postalCodeText: 'postal',
    countryText: 'country',
    constructor: function(o) {
        Mobile.SalesLogix.AddressEdit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'address_edit',
            expose: false
        });

        this.layout = [
            {name: 'IsPrimary', label: this.isPrimaryText, type: 'boolean'},
            {name: 'IsMailing', label: this.isMailingText, type: 'boolean'},
            {name: 'Address1', label: this.address1Text, type: 'text'},
            {name: 'Address2', label: this.address2Text, type: 'text'},
            {name: 'Address3', label: this.address3Text, type: 'text'},
            {name: 'City', label: this.cityText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "City"', title: 'City'},
            {name: 'State', label: this.stateText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "State"', title: 'State'},
            {name: 'PostalCode', label: this.postalCodeText, type: 'text'},
            {name: 'Country', label: this.countryText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Country"', title: 'Country'},
            {name: 'Description', type: 'hidden'},
            {name: 'EntityId', type: 'hidden'}
        ];
    }
});

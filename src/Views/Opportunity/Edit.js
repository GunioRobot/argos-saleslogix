/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/Opportunity/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    var U = Sage.Platform.Mobile.Utility;

    return dojo.declare('Mobile.SalesLogix.Views.Opportunity.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        importSourceText: 'lead source',
        opportunityProbabilityTitleText: 'Opportunity Probability',
        opportunityStatusTitleText: 'Opportunity Status',
        opportunityText: 'opportunity',
        opportunityTypeTitleText: 'Opportunity Type', // TODO: is this still in use?
        ownerText: 'owner',
        potentialText: 'sales potential',
        probabilityText: 'close prob',
        resellerText: 'reseller',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunity_edit',
        resourceKind: 'opportunities',
        insertSecurity: 'Entities/Opportunity/Add',
        updateSecurity: 'Entities/Opportunity/Edit',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'CloseProbability',
            'Contacts',
            'Description',
            'EstimatedClose',
            'LeadSource/Description',
            'Owner/OwnerDescription',
            'Reseller/AccountName',
            'SalesPotential',
            'Stage',
            'Status',
            'Type',
            'Weighted'
        ],

        show: function(options) {
            this.inherited(arguments);

            if (options.insert === true) this.applyContext();
        },
        applyContext: function() {
            var found = App.queryNavigationContext(function(o) {
                return /^(accounts|contacts)$/.test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext
            };

            if (found && lookup[found.resourceKind])
                lookup[found.resourceKind].call(this, found);
            else
                this.applyDefaultContext();
        },
        applyDefaultContext: function() {
            this.fields['AccountManager'].setValue(App.context.user);
            this.fields['Owner'].setValue(App.context['defaultOwner']);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(entry);
            this.fields['AccountManager'].setValue(U.getValue(entry, 'AccountManager'));
            this.fields['Owner'].setValue(U.getValue(entry, 'Owner'));
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(U.getValue(entry, 'Account'));
            this.fields['AccountManager'].setValue(U.getValue(entry, 'AccountManager'));
            this.fields['Owner'].setValue(U.getValue(entry, 'Owner'));
            this.fields['Contacts.$resources[0].Contact.$key'].setValue(entry.$key);
        },
        init: function() {
            this.inherited(arguments);

            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
        },
        onAccountChange: function(value, field) {
            var selection = field.getSelection();

            // todo: match behavior in web client; if the account manager (AM) is explicitly set, it should stay, otherwise
            // it should be set to the AM for the selected account (and change each time).
            if (selection && this.insert)
            {
                this.fields['AccountManager'].setValue(U.getValue(selection, 'AccountManager'));
            }   
        },
        createLayout: function() {
            // todo: add account on change handling

            return this.layout || (this.layout = [
                {
                    label: this.opportunityText,
                    name: 'Description',
                    property: 'Description',
                    type: 'text',
                    maxTextLength: 64,
                    validator: [
                        Mobile.SalesLogix.Validator.hasText,
                        Mobile.SalesLogix.Validator.exceedsMaxTextLength
                    ]
                },
                {
                    label: this.accountText,
                    name: 'Account',
                    property: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'account_related'
                },
                {
                    label: this.acctMgrText,
                    name: 'AccountManager',
                    property: 'AccountManager',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    label: this.resellerText,
                    name: 'Reseller',
                    property: 'Reseller',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    view: 'account_related'
                },
                {
                    label: this.estCloseText,
                    name: 'EstimatedClose',
                    property: 'EstimatedClose',
                    type: 'date',
                    validator: Mobile.SalesLogix.Validator.exists
                },
                {
                    label: this.potentialText,
                    name: 'SalesPotential',
                    property: 'SalesPotential',
                    precision: 2,
                    type: 'decimal',
                    validationTrigger: 'keyup',
                    validator: Mobile.SalesLogix.Validator.isCurrency
                },
                {
                    label: this.typeText,
                    name: 'Type',
                    property: 'Type',
                    picklist: 'Opportunity Type',
                    title: 'Opportunity Type',
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },
                {
                    label: this.statusText,
                    name: 'Status',
                    property: 'Status',
                    picklist: 'Opportunity Status',
                    requireSelection: true,
                    title: this.opportunityStatusTitleText,
                    type: 'picklist'
                },
                {
                    label: this.importSourceText,
                    name: 'LeadSource',
                    property: 'LeadSource',
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'leadsource_list'
                },
                {
                    label: this.ownerText,
                    name: 'Owner',
                    property: 'Owner',
                    keyProperty: '$key',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'owner_list'
                },
                {
                    label: this.probabilityText,
                    name: 'CloseProbability',
                    property: 'CloseProbability',
                    picklist: 'Opportunity Probability',
                    title: this.opportunityProbabilityTitleText,
                    type: 'picklist',
                    validator: [
                        Mobile.SalesLogix.Validator.isInt32,
                        Mobile.SalesLogix.Validator.isInteger
                    ]
                },
                {
                    name: 'Contacts.$resources[0].Contact.$key',
                    property: 'Contacts.$resources[0].Contact.$key',
                    type: 'hidden'
                }
            ]);
        }
    });
});
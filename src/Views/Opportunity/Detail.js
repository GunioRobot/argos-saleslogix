/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/Opportunity/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Opportunity.Detail', [Sage.Platform.Mobile.Detail], {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        importSourceText: 'lead source',
        opportunityText: 'opportunity',
        ownerText: 'owner',
        actionsText: 'Quick Actions',
        potentialText: 'sales potential',
        probabilityText: 'close prob',
        relatedActivitiesText: 'Activities',
        relatedContactsText: 'Contacts',
        relatedHistoriesText: 'Notes/History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        relatedProductsText: 'Products',
        resellerText: 'reseller',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        moreDetailsText: 'More Details',

        //View Properties
        id: 'opportunity_detail',
        editView: 'opportunity_edit',
        noteEditView: 'history_edit',
        security: 'Entities/Opportunity/View',
        querySelect: [
            'Account/AccountName',
            'Account/WebAddress',
            'Account/MainPhone',
            'Account/Fax',
            'Account/Address/*',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'CloseProbability',
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
        resourceKind: 'opportunities',

        scheduleActivity: function() {
            App.navigateToActivityInsertView();
        },
        addNote: function() {
            var view = App.getView(this.noteEditView);
            if (view)
            {
                view.show({
                    template: {},
                    insert: true
                });
            }
        },
        formatAccountRelatedQuery: function(entry, fmt) {
            return dojo.string.substitute(fmt, [entry['Account']['$key']]);
        },                
        createLayout: function() {
            return this.layout || (this.layout = [{
                list: true,
                title: this.actionsText,
                cls: 'action-list',
                name: 'QuickActionsSection',
                children: [{
                    name: 'ScheduleActivityAction',
                    property: 'Description',
                    label: this.scheduleActivityText,
                    icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                    action: 'scheduleActivity'
                },{
                    name: 'AddNoteAction',
                    property: 'Description',
                    label: this.addNoteText,
                    icon: 'content/images/icons/New_Note_24x24.png',
                    action: 'addNote'
                }]
            },{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    label: this.opportunityText,
                    name: 'Description',
                    property: 'Description'
                },{
                    label: this.accountText,
                    key: 'Account.$key',
                    name: 'Account.AccountName',
                    property: 'Account.AccountName',
                    view: 'account_detail'
                },{
                    label: this.resellerText,
                    key: 'Reseller.$key',
                    name: 'Reseller.AccountName',
                    property: 'Reseller.AccountName',
                    view: 'account_detail'
                },{
                    label: this.estCloseText,
                    name: 'EstimatedClose',
                    property: 'EstimatedClose',
                    renderer: Mobile.SalesLogix.Format.date
                },{
                    label: this.potentialText,
                    name: 'SalesPotential',
                    property: 'SalesPotential',
                    renderer: Mobile.SalesLogix.Format.currency
                },{
                    label: this.statusText,
                    name: 'Status',
                    property: 'Status'
                },{
                    label: this.typeText,
                    name: 'Type',
                    property: 'Type'
                },{
                    label: this.probabilityText,
                    name: 'CloseProbability',
                    property: 'CloseProbability'
                }]
            },{
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
                    label: this.acctMgrText,
                    name: 'AccountManager.UserInfo',
                    property: 'AccountManager.UserInfo',
                    renderer: Mobile.SalesLogix.Format.nameLF
                },{
                    label: this.importSourceText,
                    name: 'LeadSource.Description',
                    property: 'LeadSource.Description'
                }]
            },{
                list: true,
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    name: 'OpportunityRelated',
                    icon: 'content/images/icons/product_24.png',
                    label: this.relatedProductsText,
                    view: 'opportunityproduct_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Opportunity.Id eq "${0}"')
                },{
                    name: 'ActivityRelated',
                    icon: 'content/images/icons/To_Do_24x24.png',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}"')
                },{
                    name: 'ContactRelated',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    label: this.relatedContactsText,
                    view: 'contact_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Opportunities.Opportunity.Id eq "${0}"')
                },{
                    name: 'HistoryRelated',
                    icon: 'content/images/icons/journal_24.png',
                    label: this.relatedHistoriesText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'OpportunityId eq "${0}" and Type ne "atDatabaseChange"'),
                    view: 'history_related'
                }]
            }]);
        }        
    });
});
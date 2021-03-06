/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/LeadSource/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.LeadSource.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>',
            '<h4>{%: $.Status %}</h4>'
        ]),

        //Localization
        titleText: 'Lead Sources',

        //View Properties
        icon: 'content/images/Accounts_24x24.gif',
        id: 'leadsource_list',
        security: 'Entities/LeadSource/View',
        queryOrderBy: 'Description',
        querySelect: [
            'Description',
            'Status'
        ],
        resourceKind: 'leadsources',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('upper(Description) like "${0}%"', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
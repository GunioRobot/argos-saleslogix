/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.ActivityTypesLookup = {
        'atQuestion': 'Question',
        'atEMail': 'E-mail'
    };
    
    Mobile.SalesLogix.History.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.StartDate) %}, {%: $.AccountName %}</h3>',
            '<h4>{%: Mobile.SalesLogix.Activity.ActivityTypesLookup[$.Type] ||',
                 ' Mobile.SalesLogix.History.ActivityTypesLookup[$.Type] || $.Type %}, ',
                '{%: $.Description %}</h4>'
        ]),

        //Localization
        titleText: 'History',

        //View Properties
        detailView: 'history_detail',
        icon: 'content/images/icons/journal_24.png',
        id: 'history_related',
        insertView: 'history_edit',
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'StartDate',
            'AccountName',
            'Type',
            'Description'
        ],
        resourceKind: 'history',

        init: function() {
            Mobile.SalesLogix.History.List.superclass.init.apply(this, arguments);

            this.tools.tbar = [];
        },
        formatSearchQuery: function(query) {
            return String.format('Description like "%{0}%"', query);
        }
    });
})();
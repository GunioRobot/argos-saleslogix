/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Event/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Event.List', [Sage.Platform.Mobile.List], {
        // Localization
        titleText: 'Events',
        eventDateFormatText: 'M/d/yyyy',
        eventText: 'Event',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%= $.Description %}</h3>',
            '<h4>',
                '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.eventDateFormatText) %}',
                '&nbsp;-&nbsp;',
                '{%: Mobile.SalesLogix.Format.date($.EndDate, $$.eventDateFormatText) %}',
            '</h4>'
        ]),

        //View Properties
        id: 'event_list',
        security: null, //'Entities/Event/View',
        icon: 'content/images/icons/Holiday_schemes_24.png',
        detailView: 'event_detail',
        insertView: 'event_edit',
        queryOrderBy: 'StartDate asc',
        queryWhere: null,
        querySelect: [
            'Description',
            'StartDate',
            'EndDate',
            'UserId',
            'Type'
        ],
        resourceKind: 'events',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});

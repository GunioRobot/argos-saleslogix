/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

(function() {
    Mobile.SalesLogix.Return.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        titleText: 'Return',
        returnIdText: 'return id',
        priorityText: 'priority',
        typeText: 'type',
        regDateText: 'reg date',
        returnedByText: 'returned by',
        constructor: function(o) {
            Mobile.SalesLogix.Return.Edit.superclass.constructor.call(this);

            Ext.apply(this, o, {
                id: 'return_edit',
                title: this.titleText,
                resourceKind: 'returns',
                entityName: 'Return'
            });

            this.layout = [
                {name: 'ReturnNumber', label: this.returnIdText, type: 'text'},
                {name: 'Priority', label: this.priorityText, type: 'text'},
                {name: 'ReturnType', label: this.typeText, type: 'text'},
                {name: 'ExpectedDate', label: this.regDateText, renderer: Mobile.SalesLogix.Format.date, type: 'text'},
                {name: 'ReturnedBy.NameLF', label: this.returnedByText, type: 'text'},

            ];
        },
        init: function() {
            Mobile.SalesLogix.Return.Edit.superclass.init.call(this);
        },
        createRequest: function() {
            return Mobile.SalesLogix.Return.Edit.superclass.createRequest.call(this)
                .setResourceKind(this.resourceKind)
                .setQueryArgs({
                    'include': 'ReturnedBy',
                    'select': [
                        'ReturnNumber',
                        'Priority',
                        'ReturnType',
                        'ExpectedDate',
                        'ReturnedBy/FullName'
                      ].join(',')
                })
        }
    });
})();
/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Settings', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Settings', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3 data-action="{%= $.action %}">',
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '<span>{%: $.title %}</span>',
            '</h3>'
        ]),

        //Localization
        clearLocalStorageTitleText: 'Clear Storage',
        clearAuthenticationTitleText: 'Clear Saved Credentials',
        errorLogTitleText: 'View Error Logs',
        localStorageClearedText: 'Local storage cleared successfully.',
        credentialsClearedText: 'Saved credentials cleared successfully.',
        titleText: 'Settings',

        //View Properties
        id: 'settings',
        icon: 'content/images/icons/settings_24.png',
        expose: false,
        enableSearch: false,
        selectionOnly: true,
        allowSelection: false,
        actions: null,
        actionOrder: [
            'clearAuthentication',
            'clearLocalStorage',
            'viewErrorLogs'
        ],
        createActions : function(){
            this.actions = {
                'clearLocalStorage': {
                    title: this.clearLocalStorageTitleText,
                    icon: 'content/images/icons/database_24.png'
                },
                'clearAuthentication': {
                    title: this.clearAuthenticationTitleText,
                    icon: 'content/images/icons/security_24.png'
                },
                'viewErrorLogs':{
                    title: this.errorLogTitleText,
                    icon: 'content/images/icons/Ticket_24x24.png'
                }
            };
        },
        viewErrorLogs: function(){
            var view = App.getView('errorlog_list');
            view.show();
        },
        clearLocalStorage: function() {
            if (window.localStorage)
                window.localStorage.clear();

            alert(this.localStorageClearedText);
        },
        clearAuthentication: function() {
            if (window.localStorage)
                window.localStorage.removeItem('credentials');

            alert(this.credentialsClearedText);
        },
        hasMoreData: function() {
            return false;
        },
        requestData: function() {
            var list = [];

            for (var i = 0; i < this.actionOrder.length; i++)
            {
                var action = this.actions[this.actionOrder[i]];
                if (action)
                {
                    list.push({
                        action: this.actionOrder[i],
                        title: action.title,
                        icon: action.icon
                    });
                }
            }

            this.processFeed({'$resources': list});
        },
        init: function() {
            this.inherited(arguments);
            this.createActions();
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: []
            });
        }
    });
});
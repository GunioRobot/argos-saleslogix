/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/Ticket/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Ticket.Detail', [Sage.Platform.Mobile.Detail], {
        //Localization
        accountText: 'account',
        areaText: 'area',
        assignedDateText: 'assigned date',
        assignedToText: 'assigned to',
        categoryText: 'category',
        contactText: 'contact',
        contractText: 'contract',
        descriptionText: 'desc',
        issueText: 'issue',
        needByText: 'needed date',
        notesText: 'comments',
        phoneText: 'phone',
        actionsText: 'Quick Actions',
        relatedActivitiesText: 'Activities',
        relatedItemsText: 'Related Items',
        resolutionText: 'resolution',
        sourceText: 'source',
        statusText: 'status',
        subjectText: 'subject',
        ticketIdText: 'ticket number',
        titleText: 'Ticket',
        urgencyText: 'urgency',
        scheduleActivityText: 'Schedule activity',        
        moreDetailsText: 'More Details',
        relatedTicketActivitiesText: 'Ticket Activities',

        //View Properties
        id: 'ticket_detail',
        editView: 'ticket_edit',
        security: 'Entities/Ticket/View',
        querySelect: [
            'Account/AccountName',
            'Area',
            'AssignedDate',
            'AssignedTo/OwnerDescription',
            'Category',
            'Contact/NameLF',
            'Contract/ReferenceNumber',
            'Issue',
            'NeededByDate',
            'Notes',
            'ViaCode',
            'StatusCode',
            'Status',
            'UrgencyCode',
            'Subject',
            'TicketNumber',
            'TicketProblem/Notes',
            'TicketSolution/Notes',
            'Urgency/Description',
            'Urgency/UrgencyCode'
        ],
        resourceKind: 'tickets',

        requestPickList: function(predicate) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
                .setResourceKind('picklists')
                .setContractName('system');
            var uri = request.getUri();

            uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
            uri.setCollectionPredicate(predicate);

            request.allowCacheUse = true;

            return request;
        },
        scheduleActivity: function() {
            App.navigateToActivityInsertView();
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                list: true,
                title: this.actionsText,
                cls: 'action-list',
                name: 'QuickActionsSection',
                children: [{
                    name: 'ScheduleActivityAction',
                    property: 'TicketNumber',
                    label: this.scheduleActivityText,
                    icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                    action: 'scheduleActivity'
                }]
            },{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'Account.AccountName',
                    property: 'Account.AccountName',
                    descriptor: 'Account.AccountName',
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'Account.$key'
                },{
                    name: 'Contact.NameLF',
                    property: 'Contact.NameLF',
                    descriptor: 'Contact.NameLF',
                    label: this.contactText,
                    view: 'contact_detail',
                    key: 'Contact.$key'
                },{
                    label: this.areaText,
                    name: 'Area',
                    property: 'Area'
                },{
                    label: this.categoryText,
                    name: 'Category',
                    property: 'Category'
                },{
                    label: this.issueText,
                    name: 'Issue',
                    property: 'Issue'
                },{
                    label: this.subjectText,
                    name: 'Subject',
                    property: 'Subject'
                },{
                    label: this.descriptionText,
                    name: 'TicketProblem.Notes',
                    property: 'TicketProblem.Notes'
                },{
                    label: this.statusText,
                    name: 'Status',
                    property: 'Status'
                },{
                    label: this.urgencyText,
                    name: 'Urgency.Description',
                    property: 'Urgency.Description'
                },{
                    label: this.needByText,
                    name: 'NeededByDate',
                    property: 'NeededByDate',
                    renderer: Mobile.SalesLogix.Format.date
                },{
                    label: this.assignedToText,
                    name: 'AssignedTo.OwnerDescription',
                    property: 'AssignedTo.OwnerDescription'
                }]
            },{
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
                    label: this.contractText,
                    name: 'Contract.ReferenceNumber',
                    property: 'Contract.ReferenceNumber'
                },{
                    label: this.sourceText,
                    name: 'ViaCode',
                    property: 'ViaCode'
                },{
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    renderer: Mobile.SalesLogix.Format.date
                },{
                    label: this.resolutionText,
                    name: 'TicketSolution.Notes',
                    property: 'TicketSolution.Notes'
                },{
                    label: this.notesText,
                    name: 'Notes',
                    property: 'Notes'
                }]
            },{
                list: true,
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    name: 'ActivityRelated',
                    icon: 'content/images/icons/To_Do_24x24.png',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'TicketId eq "${0}"')
                }/*,{
                    name: 'TicketActivityRelated',
                    icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                    label: this.relatedTicketActivitiesText,
                    view: 'ticket_activity_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Ticket.Id eq "${0}"')
                }*/]
            }]);
        }
    });
});
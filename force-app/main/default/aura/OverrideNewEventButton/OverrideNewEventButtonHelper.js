({
    checkAndRemoveNoOverride: function(component) {
        var url = new URL(window.location.href);
        if (url.searchParams.has('nooverride')) {
            url.searchParams.delete('nooverride');
            window.history.replaceState({}, document.title, url.toString());
        }

        var flow = component.find("flowData");
        flow.startFlow("Event_Override_Flow_for_Calendar_Note_Only");
    }
})
sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'DraftEnableTesting/FioriApp/test/integration/FirstJourney',
		'DraftEnableTesting/FioriApp/test/integration/pages/SrvAuthorsObjectPage',
		'DraftEnableTesting/FioriApp/test/integration/pages/SrvBooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, SrvAuthorsObjectPage, SrvBooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('DraftEnableTesting/FioriApp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSrvAuthorsObjectPage: SrvAuthorsObjectPage,
					onTheSrvBooksObjectPage: SrvBooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);
using { DraftEnableTesting as my } from '../db/schema';

using DraftEnableTesting from '../db/schema';

@path : 'service/DraftEnableTesting'
service DraftEnableTestingService
{
    @odata.draft.enabled
    entity SrvAuthors as
        projection on my.Authors;

    @odata.draft.enabled
    entity SrvBooks as
        projection on my.Books;
}

annotate DraftEnableTestingService with @requires :
[
    'authenticated-user'
];

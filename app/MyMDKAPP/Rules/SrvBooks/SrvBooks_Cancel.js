export default function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MyMDKAPP/Services/service1.service').isDraftEnabled('SrvBooks')) {
        return clientAPI.executeAction({
            'Name': '/MyMDKAPP/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'SrvBooks'
                },
                'OnSuccess': '/MyMDKAPP/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyMDKAPP/Actions/CloseModalPage_Cancel.action');
    }
}
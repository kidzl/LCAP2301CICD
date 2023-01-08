export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyMDKAPP/Services/service1.service').isDraftEnabled('SrvBooks')) {
        return clientAPI.executeAction({
            'Name': '/MyMDKAPP/Actions/SrvBooks/SrvBooks_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MyMDKAPP/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'SrvBooks'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyMDKAPP/Actions/SrvBooks/SrvBooks_UpdateEntity.action');
    }
}
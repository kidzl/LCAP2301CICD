export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MyMDKAPP/Services/service1.service').isDraftEnabled('SrvBooks')) {
        return clientAPI.executeAction({
            'Name': '/MyMDKAPP/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'SrvBooks'
                },
                'OnSuccess': '/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Edit.action');
    }
}
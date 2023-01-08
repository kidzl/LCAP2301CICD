(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MyMDKAPP/i18n/i18n.properties":
/*!*********************************************************!*\
  !*** ./build.definitions/MyMDKAPP/i18n/i18n.properties ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = "Draft_DraftAdministrativeData=Draft_DraftAdministrativeData\nDraft_DraftUUID=Draft_DraftUUID\nDraft_CreationDateTime=Draft_CreationDateTime\nDraft_CreatedByUser=Draft_CreatedByUser\nDraft_DraftIsCreatedByMe=Draft_DraftIsCreatedByMe\nDraft_LastChangeDateTime=Draft_LastChangeDateTime\nDraft_LastChangedByUser=Draft_LastChangedByUser\nDraft_InProcessByUser=Draft_InProcessByUser\nDraft_DraftIsProcessedByMe=Draft_DraftIsProcessedByMe\n"

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/AppUpdateFailure.js":
/*!**************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/AppUpdateFailure.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MyMDKAPP/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/AppUpdateSuccess.js":
/*!**************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/AppUpdateSuccess.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MyMDKAPP/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MyMDKAPP/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/OnWillUpdate.js":
/*!**********************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/OnWillUpdate.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MyMDKAPP/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/ResetAppSettingsAndLogout.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/ResetAppSettingsAndLogout.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/MyMDKAPP/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/SrvBooks/NavToSrvBooks_Edit.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/SrvBooks/NavToSrvBooks_Edit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_Cancel.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_Cancel.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_CreateEntity.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_CreateEntity.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyMDKAPP/Services/service1.service').isDraftEnabled('SrvBooks')) {
        return clientAPI.executeAction({
            'Name': '/MyMDKAPP/Actions/SrvBooks/SrvBooks_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MyMDKAPP/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'SrvBooks',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyMDKAPP/Actions/SrvBooks/SrvBooks_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_DeleteConfirmation.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_DeleteConfirmation.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MyMDKAPP/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MyMDKAPP/Actions/SrvBooks/SrvBooks_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_UpdateEntity.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_UpdateEntity.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Styles/Styles.json":
/*!*******************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Styles/Styles.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MyMDKAPP/jsconfig.json":
/*!**************************************************!*\
  !*** ./build.definitions/MyMDKAPP/jsconfig.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mymdkapp_actions_appupdate_action = __webpack_require__(/*! ./MyMDKAPP/Actions/AppUpdate.action */ "./build.definitions/MyMDKAPP/Actions/AppUpdate.action")
let mymdkapp_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MyMDKAPP/Actions/AppUpdateFailureMessage.action")
let mymdkapp_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MyMDKAPP/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MyMDKAPP/Actions/AppUpdateProgressBanner.action")
let mymdkapp_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MyMDKAPP/Actions/AppUpdateSuccessMessage.action")
let mymdkapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MyMDKAPP/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MyMDKAPP/Actions/CloseModalPage_Cancel.action")
let mymdkapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MyMDKAPP/Actions/CloseModalPage_Complete.action */ "./build.definitions/MyMDKAPP/Actions/CloseModalPage_Complete.action")
let mymdkapp_actions_closepage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/ClosePage.action */ "./build.definitions/MyMDKAPP/Actions/ClosePage.action")
let mymdkapp_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MyMDKAPP/Actions/CreateEntityFailureMessage.action")
let mymdkapp_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MyMDKAPP/Actions/CreateEntitySuccessMessage.action")
let mymdkapp_actions_deleteconfirmation_action = __webpack_require__(/*! ./MyMDKAPP/Actions/DeleteConfirmation.action */ "./build.definitions/MyMDKAPP/Actions/DeleteConfirmation.action")
let mymdkapp_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MyMDKAPP/Actions/DeleteEntityFailureMessage.action")
let mymdkapp_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MyMDKAPP/Actions/DeleteEntitySuccessMessage.action")
let mymdkapp_actions_draftdiscardentity_action = __webpack_require__(/*! ./MyMDKAPP/Actions/DraftDiscardEntity.action */ "./build.definitions/MyMDKAPP/Actions/DraftDiscardEntity.action")
let mymdkapp_actions_drafteditentity_action = __webpack_require__(/*! ./MyMDKAPP/Actions/DraftEditEntity.action */ "./build.definitions/MyMDKAPP/Actions/DraftEditEntity.action")
let mymdkapp_actions_draftsaveentity_action = __webpack_require__(/*! ./MyMDKAPP/Actions/DraftSaveEntity.action */ "./build.definitions/MyMDKAPP/Actions/DraftSaveEntity.action")
let mymdkapp_actions_logout_action = __webpack_require__(/*! ./MyMDKAPP/Actions/Logout.action */ "./build.definitions/MyMDKAPP/Actions/Logout.action")
let mymdkapp_actions_logoutmessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/LogoutMessage.action */ "./build.definitions/MyMDKAPP/Actions/LogoutMessage.action")
let mymdkapp_actions_onwillupdate_action = __webpack_require__(/*! ./MyMDKAPP/Actions/OnWillUpdate.action */ "./build.definitions/MyMDKAPP/Actions/OnWillUpdate.action")
let mymdkapp_actions_service_initializeonline_action = __webpack_require__(/*! ./MyMDKAPP/Actions/Service/InitializeOnline.action */ "./build.definitions/MyMDKAPP/Actions/Service/InitializeOnline.action")
let mymdkapp_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/MyMDKAPP/Actions/Service/InitializeOnlineFailureMessage.action")
let mymdkapp_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/MyMDKAPP/Actions/Service/InitializeOnlineSuccessMessage.action")
let mymdkapp_actions_srvbooks_navtosrvbooks_create_action = __webpack_require__(/*! ./MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Create.action */ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Create.action")
let mymdkapp_actions_srvbooks_navtosrvbooks_detail_action = __webpack_require__(/*! ./MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Detail.action */ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Detail.action")
let mymdkapp_actions_srvbooks_navtosrvbooks_edit_action = __webpack_require__(/*! ./MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Edit.action */ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Edit.action")
let mymdkapp_actions_srvbooks_navtosrvbooks_list_action = __webpack_require__(/*! ./MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_List.action */ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_List.action")
let mymdkapp_actions_srvbooks_srvbooks_createentity_action = __webpack_require__(/*! ./MyMDKAPP/Actions/SrvBooks/SrvBooks_CreateEntity.action */ "./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_CreateEntity.action")
let mymdkapp_actions_srvbooks_srvbooks_deleteentity_action = __webpack_require__(/*! ./MyMDKAPP/Actions/SrvBooks/SrvBooks_DeleteEntity.action */ "./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_DeleteEntity.action")
let mymdkapp_actions_srvbooks_srvbooks_updateentity_action = __webpack_require__(/*! ./MyMDKAPP/Actions/SrvBooks/SrvBooks_UpdateEntity.action */ "./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_UpdateEntity.action")
let mymdkapp_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MyMDKAPP/Actions/UpdateEntityFailureMessage.action")
let mymdkapp_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MyMDKAPP/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MyMDKAPP/Actions/UpdateEntitySuccessMessage.action")
let mymdkapp_globals_appdefinition_version_global = __webpack_require__(/*! ./MyMDKAPP/Globals/AppDefinition_Version.global */ "./build.definitions/MyMDKAPP/Globals/AppDefinition_Version.global")
let mymdkapp_i18n_i18n_properties = __webpack_require__(/*! ./MyMDKAPP/i18n/i18n.properties */ "./build.definitions/MyMDKAPP/i18n/i18n.properties")
let mymdkapp_jsconfig_json = __webpack_require__(/*! ./MyMDKAPP/jsconfig.json */ "./build.definitions/MyMDKAPP/jsconfig.json")
let mymdkapp_pages_srvbooks_srvbooks_create_page = __webpack_require__(/*! ./MyMDKAPP/Pages/SrvBooks/SrvBooks_Create.page */ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Create.page")
let mymdkapp_pages_srvbooks_srvbooks_detail_page = __webpack_require__(/*! ./MyMDKAPP/Pages/SrvBooks/SrvBooks_Detail.page */ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Detail.page")
let mymdkapp_pages_srvbooks_srvbooks_edit_page = __webpack_require__(/*! ./MyMDKAPP/Pages/SrvBooks/SrvBooks_Edit.page */ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Edit.page")
let mymdkapp_pages_srvbooks_srvbooks_list_page = __webpack_require__(/*! ./MyMDKAPP/Pages/SrvBooks/SrvBooks_List.page */ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_List.page")
let mymdkapp_rules_appupdatefailure_js = __webpack_require__(/*! ./MyMDKAPP/Rules/AppUpdateFailure.js */ "./build.definitions/MyMDKAPP/Rules/AppUpdateFailure.js")
let mymdkapp_rules_appupdatesuccess_js = __webpack_require__(/*! ./MyMDKAPP/Rules/AppUpdateSuccess.js */ "./build.definitions/MyMDKAPP/Rules/AppUpdateSuccess.js")
let mymdkapp_rules_onwillupdate_js = __webpack_require__(/*! ./MyMDKAPP/Rules/OnWillUpdate.js */ "./build.definitions/MyMDKAPP/Rules/OnWillUpdate.js")
let mymdkapp_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MyMDKAPP/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MyMDKAPP/Rules/ResetAppSettingsAndLogout.js")
let mymdkapp_rules_srvbooks_navtosrvbooks_edit_js = __webpack_require__(/*! ./MyMDKAPP/Rules/SrvBooks/NavToSrvBooks_Edit.js */ "./build.definitions/MyMDKAPP/Rules/SrvBooks/NavToSrvBooks_Edit.js")
let mymdkapp_rules_srvbooks_srvbooks_cancel_js = __webpack_require__(/*! ./MyMDKAPP/Rules/SrvBooks/SrvBooks_Cancel.js */ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_Cancel.js")
let mymdkapp_rules_srvbooks_srvbooks_createentity_js = __webpack_require__(/*! ./MyMDKAPP/Rules/SrvBooks/SrvBooks_CreateEntity.js */ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_CreateEntity.js")
let mymdkapp_rules_srvbooks_srvbooks_deleteconfirmation_js = __webpack_require__(/*! ./MyMDKAPP/Rules/SrvBooks/SrvBooks_DeleteConfirmation.js */ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_DeleteConfirmation.js")
let mymdkapp_rules_srvbooks_srvbooks_updateentity_js = __webpack_require__(/*! ./MyMDKAPP/Rules/SrvBooks/SrvBooks_UpdateEntity.js */ "./build.definitions/MyMDKAPP/Rules/SrvBooks/SrvBooks_UpdateEntity.js")
let mymdkapp_services_service1_service = __webpack_require__(/*! ./MyMDKAPP/Services/service1.service */ "./build.definitions/MyMDKAPP/Services/service1.service")
let mymdkapp_styles_styles_css = __webpack_require__(/*! ./MyMDKAPP/Styles/Styles.css */ "./build.definitions/MyMDKAPP/Styles/Styles.css")
let mymdkapp_styles_styles_json = __webpack_require__(/*! ./MyMDKAPP/Styles/Styles.json */ "./build.definitions/MyMDKAPP/Styles/Styles.json")
let mymdkapp_styles_styles_less = __webpack_require__(/*! ./MyMDKAPP/Styles/Styles.less */ "./build.definitions/MyMDKAPP/Styles/Styles.less")
let mymdkapp_styles_styles_nss = __webpack_require__(/*! ./MyMDKAPP/Styles/Styles.nss */ "./build.definitions/MyMDKAPP/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mymdkapp_actions_appupdate_action : mymdkapp_actions_appupdate_action,
	mymdkapp_actions_appupdatefailuremessage_action : mymdkapp_actions_appupdatefailuremessage_action,
	mymdkapp_actions_appupdateprogressbanner_action : mymdkapp_actions_appupdateprogressbanner_action,
	mymdkapp_actions_appupdatesuccessmessage_action : mymdkapp_actions_appupdatesuccessmessage_action,
	mymdkapp_actions_closemodalpage_cancel_action : mymdkapp_actions_closemodalpage_cancel_action,
	mymdkapp_actions_closemodalpage_complete_action : mymdkapp_actions_closemodalpage_complete_action,
	mymdkapp_actions_closepage_action : mymdkapp_actions_closepage_action,
	mymdkapp_actions_createentityfailuremessage_action : mymdkapp_actions_createentityfailuremessage_action,
	mymdkapp_actions_createentitysuccessmessage_action : mymdkapp_actions_createentitysuccessmessage_action,
	mymdkapp_actions_deleteconfirmation_action : mymdkapp_actions_deleteconfirmation_action,
	mymdkapp_actions_deleteentityfailuremessage_action : mymdkapp_actions_deleteentityfailuremessage_action,
	mymdkapp_actions_deleteentitysuccessmessage_action : mymdkapp_actions_deleteentitysuccessmessage_action,
	mymdkapp_actions_draftdiscardentity_action : mymdkapp_actions_draftdiscardentity_action,
	mymdkapp_actions_drafteditentity_action : mymdkapp_actions_drafteditentity_action,
	mymdkapp_actions_draftsaveentity_action : mymdkapp_actions_draftsaveentity_action,
	mymdkapp_actions_logout_action : mymdkapp_actions_logout_action,
	mymdkapp_actions_logoutmessage_action : mymdkapp_actions_logoutmessage_action,
	mymdkapp_actions_onwillupdate_action : mymdkapp_actions_onwillupdate_action,
	mymdkapp_actions_service_initializeonline_action : mymdkapp_actions_service_initializeonline_action,
	mymdkapp_actions_service_initializeonlinefailuremessage_action : mymdkapp_actions_service_initializeonlinefailuremessage_action,
	mymdkapp_actions_service_initializeonlinesuccessmessage_action : mymdkapp_actions_service_initializeonlinesuccessmessage_action,
	mymdkapp_actions_srvbooks_navtosrvbooks_create_action : mymdkapp_actions_srvbooks_navtosrvbooks_create_action,
	mymdkapp_actions_srvbooks_navtosrvbooks_detail_action : mymdkapp_actions_srvbooks_navtosrvbooks_detail_action,
	mymdkapp_actions_srvbooks_navtosrvbooks_edit_action : mymdkapp_actions_srvbooks_navtosrvbooks_edit_action,
	mymdkapp_actions_srvbooks_navtosrvbooks_list_action : mymdkapp_actions_srvbooks_navtosrvbooks_list_action,
	mymdkapp_actions_srvbooks_srvbooks_createentity_action : mymdkapp_actions_srvbooks_srvbooks_createentity_action,
	mymdkapp_actions_srvbooks_srvbooks_deleteentity_action : mymdkapp_actions_srvbooks_srvbooks_deleteentity_action,
	mymdkapp_actions_srvbooks_srvbooks_updateentity_action : mymdkapp_actions_srvbooks_srvbooks_updateentity_action,
	mymdkapp_actions_updateentityfailuremessage_action : mymdkapp_actions_updateentityfailuremessage_action,
	mymdkapp_actions_updateentitysuccessmessage_action : mymdkapp_actions_updateentitysuccessmessage_action,
	mymdkapp_globals_appdefinition_version_global : mymdkapp_globals_appdefinition_version_global,
	mymdkapp_i18n_i18n_properties : mymdkapp_i18n_i18n_properties,
	mymdkapp_jsconfig_json : mymdkapp_jsconfig_json,
	mymdkapp_pages_srvbooks_srvbooks_create_page : mymdkapp_pages_srvbooks_srvbooks_create_page,
	mymdkapp_pages_srvbooks_srvbooks_detail_page : mymdkapp_pages_srvbooks_srvbooks_detail_page,
	mymdkapp_pages_srvbooks_srvbooks_edit_page : mymdkapp_pages_srvbooks_srvbooks_edit_page,
	mymdkapp_pages_srvbooks_srvbooks_list_page : mymdkapp_pages_srvbooks_srvbooks_list_page,
	mymdkapp_rules_appupdatefailure_js : mymdkapp_rules_appupdatefailure_js,
	mymdkapp_rules_appupdatesuccess_js : mymdkapp_rules_appupdatesuccess_js,
	mymdkapp_rules_onwillupdate_js : mymdkapp_rules_onwillupdate_js,
	mymdkapp_rules_resetappsettingsandlogout_js : mymdkapp_rules_resetappsettingsandlogout_js,
	mymdkapp_rules_srvbooks_navtosrvbooks_edit_js : mymdkapp_rules_srvbooks_navtosrvbooks_edit_js,
	mymdkapp_rules_srvbooks_srvbooks_cancel_js : mymdkapp_rules_srvbooks_srvbooks_cancel_js,
	mymdkapp_rules_srvbooks_srvbooks_createentity_js : mymdkapp_rules_srvbooks_srvbooks_createentity_js,
	mymdkapp_rules_srvbooks_srvbooks_deleteconfirmation_js : mymdkapp_rules_srvbooks_srvbooks_deleteconfirmation_js,
	mymdkapp_rules_srvbooks_srvbooks_updateentity_js : mymdkapp_rules_srvbooks_srvbooks_updateentity_js,
	mymdkapp_services_service1_service : mymdkapp_services_service1_service,
	mymdkapp_styles_styles_css : mymdkapp_styles_styles_css,
	mymdkapp_styles_styles_json : mymdkapp_styles_styles_json,
	mymdkapp_styles_styles_less : mymdkapp_styles_styles_less,
	mymdkapp_styles_styles_nss : mymdkapp_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Styles/Styles.css":
/*!******************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Styles/Styles.css ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MyMDKAPP/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MyMDKAPP/Styles/Styles.less":
/*!*******************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Styles/Styles.less ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MyMDKAPP/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MyMDKAPP/Styles/Styles.nss":
/*!******************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Styles/Styles.nss ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/cssWithMappingToString.js":
/*!*********************************************************************!*\
  !*** ../../../../css-loader/dist/runtime/cssWithMappingToString.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Create.page":
/*!************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Create.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MyMDKAPP/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MyMDKAPP/Rules/SrvBooks/SrvBooks_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create SrvBooks Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"title","_Name":"title","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"stock","KeyboardType":"Number","_Name":"stock","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"price","KeyboardType":"Number","_Name":"price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"currency","_Name":"currency","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SrvBooks_Create"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Detail.page":
/*!************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Detail.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SrvBooks Detail","DesignTimeTarget":{"Service":"/MyMDKAPP/Services/service1.service","EntitySet":"SrvBooks","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MyMDKAPP/Rules/SrvBooks/NavToSrvBooks_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MyMDKAPP/Rules/SrvBooks/SrvBooks_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{title}","Subhead":"{stock}","BodyText":"","Footnote":"{currency}","Description":"{price}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"title","Value":"{title}"},{"KeyName":"stock","Value":"{stock}"},{"KeyName":"price","Value":"{price}"},{"KeyName":"currency","Value":"{currency}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SrvBooks_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Edit.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_Edit.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update SrvBooks Detail","DesignTimeTarget":{"Service":"/MyMDKAPP/Services/service1.service","EntitySet":"SrvBooks","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/MyMDKAPP/Rules/SrvBooks/SrvBooks_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/MyMDKAPP/Rules/SrvBooks/SrvBooks_UpdateEntity.js"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"title","_Name":"title","Value":"{title}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"stock","_Name":"stock","Value":"{stock}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"price","_Name":"price","Value":"{price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"currency","_Name":"currency","Value":"{currency}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"SrvBooks_Edit"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_List.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Pages/SrvBooks/SrvBooks_List.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SrvBooks","ActionBar":{"Items":[{"OnPress":"/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{price}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Detail.action","StatusImage":"","Title":"{title}","Footnote":"{currency}","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{stock}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SrvBooks","Service":"/MyMDKAPP/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MyMDKAPP/Actions/Logout.action"}]},"_Name":"SrvBooks_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MyMDKAPP","Version":"/MyMDKAPP/Globals/AppDefinition_Version.global","MainPage":"/MyMDKAPP/Pages/SrvBooks/SrvBooks_List.page","OnLaunch":["/MyMDKAPP/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/MyMDKAPP/Rules/OnWillUpdate.js","OnDidUpdate":"/MyMDKAPP/Actions/Service/InitializeOnline.action","Styles":"/MyMDKAPP/Styles/Styles.less","Localization":"/MyMDKAPP/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/MyMDKAPP/Styles/Styles.css","ios":"/MyMDKAPP/Styles/Styles.nss","android":"/MyMDKAPP/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/AppUpdate.action":
/*!*************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/AppUpdate.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MyMDKAPP/Rules/AppUpdateFailure.js","OnSuccess":"/MyMDKAPP/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/AppUpdateFailureMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/AppUpdateFailureMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/AppUpdateProgressBanner.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/AppUpdateProgressBanner.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MyMDKAPP/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/AppUpdateSuccessMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/AppUpdateSuccessMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/CloseModalPage_Cancel.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/CloseModalPage_Cancel.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/CloseModalPage_Complete.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/CloseModalPage_Complete.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/ClosePage.action":
/*!*************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/ClosePage.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/CreateEntityFailureMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/CreateEntityFailureMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/CreateEntitySuccessMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/CreateEntitySuccessMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MyMDKAPP/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/DeleteConfirmation.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/DeleteConfirmation.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/DeleteEntityFailureMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/DeleteEntityFailureMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/DeleteEntitySuccessMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/DeleteEntitySuccessMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MyMDKAPP/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/DraftDiscardEntity.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/DraftDiscardEntity.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/MyMDKAPP/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MyMDKAPP/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/MyMDKAPP/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/DraftEditEntity.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/DraftEditEntity.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/MyMDKAPP/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MyMDKAPP/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/MyMDKAPP/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/DraftSaveEntity.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/DraftSaveEntity.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/MyMDKAPP/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MyMDKAPP/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/MyMDKAPP/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/Logout.action":
/*!**********************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/Logout.action ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/LogoutMessage.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/LogoutMessage.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MyMDKAPP/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/OnWillUpdate.action":
/*!****************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/OnWillUpdate.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/Service/InitializeOnline.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/Service/InitializeOnline.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MyMDKAPP/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/MyMDKAPP/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/MyMDKAPP/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/Service/InitializeOnlineFailureMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Create.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Create.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MyMDKAPP/Pages/SrvBooks/SrvBooks_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Detail.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Detail.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyMDKAPP/Pages/SrvBooks/SrvBooks_Detail.page"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Edit.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_Edit.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MyMDKAPP/Pages/SrvBooks/SrvBooks_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_List.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/SrvBooks/NavToSrvBooks_List.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyMDKAPP/Pages/SrvBooks/SrvBooks_List.page"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_CreateEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_CreateEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MyMDKAPP/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MyMDKAPP/Actions/CreateEntitySuccessMessage.action","Properties":{"title":"#Control:title/#Value","stock":"#Control:stock/#Value","price":"#Control:price/#Value","currency":"#Control:currency/#Value"},"Target":{"EntitySet":"SrvBooks","Service":"/MyMDKAPP/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_DeleteEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_DeleteEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SrvBooks","Service":"/MyMDKAPP/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MyMDKAPP/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MyMDKAPP/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_UpdateEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/SrvBooks/SrvBooks_UpdateEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SrvBooks","Service":"/MyMDKAPP/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"title":"#Control:title/#Value","stock":"#Control:stock/#Value","price":"#Control:price/#Value","currency":"#Control:currency/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MyMDKAPP/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MyMDKAPP/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/UpdateEntityFailureMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/UpdateEntityFailureMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Actions/UpdateEntitySuccessMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Actions/UpdateEntitySuccessMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MyMDKAPP/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Globals/AppDefinition_Version.global":
/*!*************************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Globals/AppDefinition_Version.global ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MyMDKAPP/Services/service1.service":
/*!**************************************************************!*\
  !*** ./build.definitions/MyMDKAPP/Services/service1.service ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/DraftEnableTesting/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map
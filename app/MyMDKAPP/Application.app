{
	"_Name": "MyMDKAPP",
	"Version": "/MyMDKAPP/Globals/AppDefinition_Version.global",
	"MainPage": "/MyMDKAPP/Pages/SrvBooks/SrvBooks_List.page",
	"OnLaunch": [
		"/MyMDKAPP/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/MyMDKAPP/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MyMDKAPP/Actions/Service/InitializeOnline.action",
	"Styles": "/MyMDKAPP/Styles/Styles.less",
	"Localization": "/MyMDKAPP/i18n/i18n.properties",
	"_SchemaVersion": "6.3"
}
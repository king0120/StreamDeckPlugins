/* global $CC, Utils, $SD */
$SD.on('connected', (jsonObj) => connected(jsonObj));

function connected(jsn) {
    // Subscribe to the willAppear and other events
    $SD.on('com.jamieking.webhooks.action.willAppear', (jsonObj) => action.onWillAppear(jsonObj));
    $SD.on('com.jamieking.webhooks.action.keyUp', (jsonObj) => action.onKeyUp(jsonObj));
    $SD.on('com.jamieking.webhooks.action.sendToPlugin', (jsonObj) => action.onSendToPlugin(jsonObj));
    $SD.on('com.jamieking.webhooks.action.didReceiveSettings', (jsonObj) => action.onDidReceiveSettings(jsonObj));
    $SD.on('com.jamieking.webhooks.action.propertyInspectorDidAppear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js]propertyInspectorDidAppear:');
    });
    $SD.on('com.jamieking.webhooks.action.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js]propertyInspectorDidDisappear:');
    });
}

// ACTIONS

const action = {
    settings: {},

    /**
     * The 'willAppear' event is the first event a key will receive, right before it gets
     * shown on your Stream Deck and/or in Stream Deck software.
     * This event is a good place to setup your plugin and look at current settings (if any),
     * which are embedded in the events payload.
     */

    onWillAppear: function (jsn) {
        console.log(`[onWillAppear] ${JSON.stringify(jsn)}`);

    },

    onKeyUp: function (jsn) {
        console.log(`[onKeyUp] ${JSON.stringify(jsn)}`)
        if (!jsn.payload.settings || !jsn.payload.settings.webhookUrl) {
            $SD.api.showAlert(jsn.context)
            return
        }
        fetch(jsn.payload.settings.webhookUrl, {
            method: jsn.payload.settings.webhookMethod,
            body: jsn.payload.settings.webhookMethod === "GET"  ? undefined : jsn.payload.settings.webhookPayload,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => $SD.api.showOk(jsn.context)
            , err => {
            console.log(err)
                $SD.api.showAlert(jsn.context)
            }
        )
    },

    onSendToPlugin: function (jsn) {
        console.log(`[onSendToPlugin] ${JSON.stringify(jsn)}`);
        if (jsn.payload) {
            $SD.api.setSettings(jsn.context, jsn.payload);
        }
    },
};


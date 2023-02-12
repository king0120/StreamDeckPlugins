/* global addDynamicStyles, $SD, Utils */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-else-return */


$SD.on('connected', (jsn) => {
    console.log("connected");
    console.log(jsn)
    if (jsn.hasOwnProperty("actionInfo")) {
        let settings = Utils.getProp(jsn, "actionInfo.payload.settings", {});
        document.getElementById("webhookUrl").value = settings.webhookUrl || "https://"
        document.getElementById("webhookMethodoo").value = settings.webhookMethod || "GET"
        document.getElementById("webhookPayload").value = settings.webhookPayload || "{}"
    }
});

const save = function() {
    if ($SD) {
        var payload = {
            webhookUrl: document.getElementById("webhookUrl").value,
            webhookMethod: document.getElementById("webhookMethod").value,
            webhookPayload: document.getElementById("webhookPayload").value
        }
        $SD.api.sendToPlugin($SD.uuid, $SD.actionInfo['action'], payload)
    }
}
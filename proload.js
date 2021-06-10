const { ipcRenderer, contextBridge } = require("electron")

// contextBridge.exposeInMainWorld("notificationApi", {
//     sendNotification(message){
//         ipcRenderer.send("notify",message);
//     }
// })

contextBridge.exposeInMainWorld("electron", {
    notificationApi: {
        sendNotification(message) {
            ipcRenderer.send("notify", message);
        }
    },
    batteryApi: {

    },
    fileApi: {

    }

})



// window.sendNotification = (message) => {
//   

// }
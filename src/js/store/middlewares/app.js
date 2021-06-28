import Notifications from "../../utils/notifications";


export default store => next => action => {
    switch (action.type) {
        case 'APP_IS_ONLINE':
        case 'APP_IS_OFFLINE':
            Notifications.show({
                title: "Connection Status:",
                body: action.isOnline ? "Online" : "Offline"
            })

    }


    next(action);
}

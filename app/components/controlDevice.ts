import deviceOperationType from "../types/deviceOperationType";
import {onMessage} from "../utils/websocket";
import deviceControDirect from '../enums/DeviceControDirect'

export default function controlDevice() {
    onMessage(function (date: deviceOperationType) {
        switch (date.type) {
            case deviceControDirect.trunoffcemera:

                break;
            case deviceControDirect.trunoncemera:

                break;
            case deviceControDirect.trunonaudio:

                break;
            case deviceControDirect.trunoffaudio:

                break
        }
    })
}
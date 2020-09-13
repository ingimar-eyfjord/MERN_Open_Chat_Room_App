"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMmessage = void 0;
function processMmessage(payload) {
    try {
        return JSON.parse(payload);
    }
    catch (error) {
        return null;
    }
}
exports.processMmessage = processMmessage;

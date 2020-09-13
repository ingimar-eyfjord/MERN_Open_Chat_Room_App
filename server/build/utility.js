"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_TOKEN = exports.processMessage = void 0;
function processMessage(payload) {
    try {
        return JSON.parse(payload);
    }
    catch (error) {
        return null;
    }
}
exports.processMessage = processMessage;
exports.JWT_SECRET_TOKEN = 'KzBj24t3H+Gy@9&sZa6T!^pD&83@Z3RznEPQXGbfN7zLU43k8Q-^Z#%rBTYfFXn24-7e=B?B37ksy256?8DtZ@Z9Xs@AxspWLw@TT?G7x@gZCSLbmbkhK7h@xJzaK?&gyRAhwvqhB$r3yHwGa-mVV+cUKYcxAu9?g6-9X6^ak_NUwc*uv2R%bTeZkESP8VgS%exf%BD4&t@pS=neQbwJ4BK3!+Qw+UXAk7*D&PvRx3KC$!ks8fM+m+j-XEDM+Gn7';

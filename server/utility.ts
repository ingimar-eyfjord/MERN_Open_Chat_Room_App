export function processMmessage(payload: string) {
    try {
        return JSON.parse(payload)
    } catch (error) {
        return null
    }
}
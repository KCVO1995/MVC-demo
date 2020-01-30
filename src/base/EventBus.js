import $ from 'jquery'
// 偷梁换柱
class EventBus {
    constructor() {
         this._eventBus = $({})
    }
    on(eventName, fn) {
        return this._eventBus.on(eventName, fn)
    }
    trigger(eventName, data) {
        return this._eventBus.trigger(eventName, data)
    }
    off(eventName, fn) {
        return this._eventBus.off(eventName, fn)
    }
}

export default EventBus


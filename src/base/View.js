import $ from 'jquery'
import EventBus from "./EventBus.js"


class View extends EventBus {
    // constructor({el, html, render, data, eventBus, events}){
    constructor(options){
        super() // EventBus#constructor
        Object.assign(this, options)
        this.el = $(this.el)
        this.render(this.data) // view = render(data)
        this.autoBindEvents()
        this.on('m:update', () => {
            this.render(this.data)
        })
    }
    autoBindEvents() {
        for ( let key in this.events) {
            if ( this.events.hasOwnProperty(key) ) {
                const spaceIndex = key.indexOf(' ')
                const part1 = key.slice(0, spaceIndex)
                const part2 = key.slice(spaceIndex + 1)
                const value = this[this.events[key]]
                this.el.on(part1, part2, value)
            }
        }
    }
}

export default View
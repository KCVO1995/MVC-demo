import './app3.css'
import  $ from 'jquery'
import Model from "./base/Model"

const localKey = 'app3.active2'
const eventBus = $({})

const m = new Model({
    data: {
        bool: localStorage.getItem(localKey) || 'no'
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem(localKey, data.bool)
    }
})

const view = {
    init(container){
        view.el = $(container)
        view.render(m.data.bool) // view = render(data)
        view.autoBindEvents()
        eventBus.on('m:update', () => {
            view.render(m.data.bool)
        })
    },
    el: null,
    html: (bool) => {
        return   `
            <div>
                <div class="${bool === 'no' ? 'square active2' : 'square' }"></div>
            </div>
        ` },
    render(bool) {
        if (view.el.children().length !== 0) view.el.empty()
        $(view.html(bool)).appendTo(view.el)
    },
    events:{
        'click .square': 'move'
    },
    move() {
        const bool = m.data.bool === 'no' ? 'yes' : 'no'
        m.update({bool : bool})
    },
    autoBindEvents() {
        for ( let key in view.events) {
            if ( view.events.hasOwnProperty(key) ) {
                const spaceIndex = key.indexOf(' ')
                const part1 = key.slice(0, spaceIndex)
                const part2 = key.slice(spaceIndex + 1)
                const value = view[view.events[key]]
                view.el.on(part1, part2, value)
            }
        }
    }
}

export default view



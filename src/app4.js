import './app4.css'
import $ from 'jquery'

const localKey = 'app3.active2'
const eventBus = $({})

const m = {
    data: {
        bool: localStorage.getItem(localKey) || 'no'
    },
    creat() {},
    delete() {},
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem(localKey, data.bool)
    },
    get() {}
}

const v = {
    el: null,
    html: (bool) => {
        return   `
    <div>
        <div class="circle"></div>
    </div>
` },
    init(container){
        v.el  = $(container)
    },
    render(bool) {
        if (v.el.children().length !== 0) v.el.empty()
        $(v.html(bool)).appendTo(v.el)
    }
}

const c = {
    init(container){
        v.init(container)
        v.render(m.data.bool) // view = render(data)
        c.autoBindEvents()
        eventBus.on('m:update', () => {
            v.render(m.data.bool)
        })
    },
    events:{
        'mouseenter .circle': 'change'
    },
    change() {
        console.log(m.data.bool)
        const bool = m.data.bool === 'no' ? 'yes' : 'no'
        m.update({bool : bool})
    },
    autoBindEvents() {
        for ( let key in c.events) {
            if ( c.events.hasOwnProperty(key) ) {
                const spaceIndex = key.indexOf(' ')
                const part1 = key.slice(0, spaceIndex)
                const part2 = key.slice(spaceIndex + 1)
                const value = c[c.events[key]]
                v.el.on(part1, part2, value)
            }
        }
    }
}

export default c





import  './app2.css'
import $ from 'jquery'
import Model from "./base/Model"
const localKey =  'app2.index'
const eventBus = $({})

const m = new Model({
    data: {
        index: parseInt(localStorage.getItem(localKey) || 0)
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem(localKey, data.index)
    }
})


const view = {
    init(container){
        view.el  = $(container)
        view.render(m.data.index) // view = render(data)
        view.autoBindEvents()
        eventBus.on('m:update', () => {
            view.render(m.data.index)
        })
    },
    el: null,
    html: (index) => {
        return   `
    <div>
        <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ' ' }" data-index = '0'>1</li>
            <li class="${index === 1 ? 'selected' : ' ' }" data-index = '1'>2</li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ' '}">内容1</li>
            <li class="${index === 1 ? 'active' : ' '}">内容2</li>
        </ol>
    </div>
    ` },
    render(index) {
        if (view.el.children().length !== 0) view.el.empty()
        $(view.html(index)).appendTo(view.el)
    },
    events:{
        'click .tab-bar li': 'tabBar'
    },
    tabBar(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index : index})
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





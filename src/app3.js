import './app3.css'
import  $ from 'jquery'
import Model from "./base/Model"
import View from "./base/View"

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

const init = el => {
    new View({
        el: el,
        eventBus: eventBus,
        data: m.data,
        html: (bool) => {
            return   `
            <div>
                <div class="${bool === 'no' ? 'square active2' : 'square' }"></div>
            </div>
        ` },
        render(data) {
            if (this.el.children().length !== 0) this.el.empty()
            $(this.html(data.bool)).appendTo(this.el)
        },
        events:{
            'click .square': 'move'
        },
        move() {
            const bool = m.data.bool === 'no' ? 'yes' : 'no'
            m.update({bool : bool})
        }
    })
}

export default init



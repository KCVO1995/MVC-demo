import  './app2.css'
import $ from 'jquery'
import Model from "./base/Model"
import View from "./base/View"
const localKey =  'app2.index'

const m = new Model({
    data: {
        index: parseInt(localStorage.getItem(localKey) || 0)
    },
    update(data) {
        Object.assign(m.data, data)
        this.trigger('m:update')
        localStorage.setItem(localKey, data.index)
    }
})

const init = (el) => {
    new View ({
        el: el,
        data: m.data,
        html: (index) => {
            return   `
            <div>
                <ol class="tab-bar">
                    <li class="${index === 0 ? 'selected' : ' '}" data-index = '0'>1</li>
                    <li class="${index === 1 ? 'selected' : ' ' }" data-index = '1'>2</li>
                </ol>
                <ol class="tab-content">
                    <li class="${index === 0 ? 'active' : ' '}">内容1</li>
                    <li class="${index === 1 ? 'active' : ' '}">内容2</li>
                </ol>
            </div>
            ` },
        render(data) {
            if (this.el.children().length !== 0) this.el.empty()
            $(this.html(data.index)).appendTo(this.el)
        },
        events:{
            'click .tab-bar li': 'tabBar'
        },
        tabBar(e) {
            const index = parseInt(e.currentTarget.dataset.index)
            m.update({index : index})
        }
    })
}

export default init





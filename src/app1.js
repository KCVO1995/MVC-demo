import './app1.css'
import $ from 'jquery'
import Model from "./base/Model.js"

const eventBus = $({})

// m-数据
const m = new Model({
    data: {
        n: parseInt(localStorage.getItem('number'))
    },
    update: function (data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem('number', data.n)
    }
})
console.dir(m)
// v-视图

// c-其他
const view = {
    init(container) {
        view.el = $(container)
        view.render(m.data.n) // view = render(data)
        view.autoBindEvents()
        eventBus.on('m:update', () => {
            view.render(m.data.n)
        })
    },
    el: null,
    html: `
    <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div class="action">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">*2</button>
            <button id="divide2">÷2</button>
        </div>
    </div>
    ` ,
    render(n) {
        if (view.el.children().length !== 0) view.el.empty()
        $(view.html.replace('{{n}}', n)).appendTo(view.el)
    },
    events:{
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'divide',
    },
    add(){
        m.update({n: m.data.n + 1})
    },
    minus(){
        m.update({n: m.data.n - 1})
    },
    mul(){
        m.update({n: m.data.n * 2})
    },
    divide(){
        m.update({n: m.data.n / 2})
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
// 第一次渲染html
export default view



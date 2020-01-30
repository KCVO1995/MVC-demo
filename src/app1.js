import './app1.css'
import $ from 'jquery'
import Model from "./base/Model.js"
import View from "./base/View"


// m-数据
const m = new Model({
    data: {
        n: parseFloat(localStorage.getItem('number'))
    },
    update: function (data) {
        Object.assign(m.data, data)
        this.trigger('m:update')
        localStorage.setItem('number', data.n)
    }
})
// v-视图

// c-其他


const init = (el) => {
    new View ({
        el: el,
        data: m.data,
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
        render(data) {
            if (this.el.children().length !== 0) this.el.empty()
            $(this.html.replace('{{n}}', data.n)).appendTo(this.el)
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
    })
}
// 第一次渲染html
export default init



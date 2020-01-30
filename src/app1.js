import './app1.css'
import Vue from 'vue'


// m-数据
// v-视图
// c-其他


const init = (el) => {
    new Vue ({
        el: el,
        data: { n: parseFloat(localStorage.getItem('n')) },
        methods: {
            add() {
                this.n += 1
            },
            minus() {
                this.n -= 1
            },
            mul() {
                this.n *= 2
            },
            div() {
                this.n /= 2
            }
        },
        watch: { // 监听
            n(){
                localStorage.setItem('n', this.n)
            }
        },
        template: `
        <section id="app1">
            <div class="output">
                <span id="number">{{n}}</span>
            </div>
            <div class="action">
                <button @click="add">+1</button>
                <button @click="minus">-1</button>
                <button @click="mul">*2</button>
                <button @click="div">÷2</button>
            </div>
        </section>
        ` ,
    })
}
// 第一次渲染html
export default init



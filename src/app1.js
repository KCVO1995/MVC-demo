import './app1.css'
import $ from 'jquery'

const cale = {
    init() {
        cale.input(cale.ui.n)
        cale.bindEvent()
    },
    ui: {
        $number: $('#number'),
        n : localStorage.getItem('number')
    },
    events:  {
        '#add1' : 'add1',
        '#minus1' : 'minus1',
        '#mul2' : 'mul2',
        '#divide2' : 'divide2'
    },
    bindEvent() {
        for (let key in cale.events){
            if ( cale.events.hasOwnProperty(key) ) {
                const value = cale.events[key]
                $(key).on('click', cale[value])
            }
        }
    },
    Num: () => { cale.ui.n = parseInt(cale.ui.$number.text())},
    input: (text) =>  cale.ui.$number.text(text),
    add1() {
        cale.Num()
        cale.ui.n+= 1
        cale.input(cale.ui.n)
    },
    minus1() {
        cale.Num()
        cale.ui.n-= 1
        cale.input(cale.ui.n)
    },
    mul2() {
        cale.Num()
        cale.ui.n*= 2
        cale.input(cale.ui.n)
    },
    divide2() {
        cale.Num()
        cale.ui.n/= 2
        cale.input(cale.ui.n)
    }
}

cale.init()
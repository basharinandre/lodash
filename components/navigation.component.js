import Component from '../core/component.js'

export class NavigationComponent extends Component{
    constructor(id) {
        super(id)
        this.tabs = []
    }

    init() {
        this.$el.addEventListener('click', clickHandler.bind(this))
        this.registrationTab()
    }

    registrationTab(tabs) {
       this.tabs = tabs
    }
}

function clickHandler(e) {
    Array.from( this.$el.querySelectorAll('.tab-js') ).forEach(t => {
        t.classList.remove('active')
    })
    e.target.classList.add('active')

    this.tabs.forEach(page => {
        page.component.hide()
    })
    let currentComponent =this.tabs.find(t => t.name === e.target.dataset.tab)
    currentComponent.component.show()
}

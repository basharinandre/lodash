export default class Component{
    constructor(id) {
        this.$el = document.getElementById(id)
        this.init()
    }

    init() {}

    onShow() {}

    onHide() {}

    hide() {
        this.$el.classList.add('hide-js')
        this.onHide()
    }

    show() {
        this.$el.classList.remove('hide-js')
        this.onShow()
    }
}
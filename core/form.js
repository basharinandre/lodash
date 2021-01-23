export class Form {
    constructor(form, controls){
        this.form = form
        this.controls = controls
        this.controlsNode = {}
    }

    registerControllsNode() {       
        let controlsNode = {}

        Array.from( this.form.querySelectorAll('[data-control]')).forEach(nodeControl => {
            controlsNode[nodeControl.name] = nodeControl
        })
        this.controlsNode = controlsNode
    }

    value() {
        this.registerControllsNode()
        let value = {}

        Object.keys(this.controls).forEach(key => {
            value[key] = this.controlsNode[key].value             
        })

        return value
    }

    isValid() {
        this.registerControllsNode()
        let isFormValid = true

        Object.keys(this.controls).forEach(control => {
            let validator = this.controls[control].length ?
                            this.controls[control][0] : null

            let isValid = true
            isValid = validator(this.controlsNode[control].value)

            isValid ? clearError.call(this, control) : errorField.call(this, control)

            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }

    clear() {
        Object.keys(this.controls).forEach(control => {
            this.controlsNode[control].value = ''
            this.controlsNode.type.value = 'default'
        })
    }

}

function errorField($control) {
    let invalidControl = this.form.querySelector(`[name='${$control}']`)
    invalidControl.nextSibling.textContent = ''

    let errorMessage = '<p class="paragraph-error">Введите корректное значение</p>'
    this.controlsNode[$control].insertAdjacentHTML('afterend', errorMessage)
}

function clearError($control) {
    let invalidControl = this.form.querySelector(`[name='${$control}']`)
    invalidControl.nextSibling.textContent = ''
}
import Component from '../core/component.js'
import {Form} from '../core/form.js'
import {Validator} from '../validator/validator.js'

export class CreateComponent extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))
        this.form = new Form(this.$el, {
            title: [Validator.required],
            link: [Validator.maxLength(2)],
            type: [Validator.select],
            example: [Validator.maxLength(2)],
            polyfill: [Validator.default],
            comment: [Validator.default]
        })
    }   
}

function submitHandler(e) {
    e.preventDefault()

    if (this.form.isValid()) {
        let dataObj = {
            id: Math.floor( Math.random() * 10000 ),
            isFinished: false,
            ...this.form.value() 
        }

        // Отправляем в localStrorage
        let dataForm = JSON.parse(localStorage.getItem('posts')) || []
        dataForm.push(dataObj)
        localStorage.setItem('posts', JSON.stringify(dataForm))

        this.form.clear()
    }
}

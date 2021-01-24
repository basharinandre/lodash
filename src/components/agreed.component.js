import Component from '../core/component.js'
import { singlePost } from '../components/singlepost.component.js'

export class AgreedComponent extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        this.boxAgreed = this.$el.querySelector('.agreed--js')  
        this.clickPostHandler()
    }

    onShow() {
        renderPosts.call(this)
    }

    clickPostHandler() {
        this.$el.addEventListener('click', e => {
            let el = e.target
            let btn = el.dataset.btn

            if (btn) {
                let id = el.getAttribute('id')
                singlePost.searchPost(id, renderPosts, this)
            }
        })
    }

}


function renderPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')).reverse()

    posts = posts.map(post => {
        let status = post.isFinished ? 
            `<span class="badge bg-success">Решена</span>` : 
            `<span class="badge bg-danger">Не решена</span>`

        if( post.isFinished ) {
            return `
                <div class="card border-secondary mb-3" style="min-width: 320px;">
                    <!-- <div class="card-header">Array</div> -->
                    <div class="card-body text-secondary">
                        Тип: <span class="badge bg-primary">${post.type}</span> <br>
                        Статус: ${status}
                        <a target="_blank" href="${post.link}" class="card-text">
                            <h5 class="card-title">${post.title}</h5>
                        </a>

                        <button data-btn="true" id=${post.id} type="button" class="btn btn-dark">Подробнее</button>
                    </div>
                </div>
            `}
    }).join(' ')

    this.boxAgreed.innerHTML = ''
    this.boxAgreed.insertAdjacentHTML('afterbegin', posts)
}
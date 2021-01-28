import Component from '../core/component.js'
import { singlePost } from '../components/singlepost.component.js'

export class PostsComponent extends Component{
    constructor(id) {
        super(id)
    }

    onShow() {
       renderPosts.call(this)
       this.refreshCounter()
    }

    init() {
        this.clickPostHandler()
        this.cnt = this.$el.querySelector('.cnt--js')
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

    refreshCounter() {
        let totalCnt = this.cnt.querySelector('.total--js')
        let currentCnt = this.cnt.querySelector('.current-cnt--js')
        
        totalCnt.innerHTML = this.posts.length

        const solutionsTasck = this.posts.filter(post => post.isFinished ? 1 : 0).length; 
        currentCnt.innerHTML = solutionsTasck
    }
}

function renderPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')).reverse()

    this.posts = posts
    posts = this.posts.map(post => {
        let status = post.isFinished ? 
            `<span class="badge bg-success">Решена</span>` : 
            `<span class="badge bg-danger">Не решена</span>`

        return `
            <div class="card border-secondary mb-3" >
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
        `
    }).join(' ')

    let boxPost = this.$el.querySelector('.posts--js')
    boxPost.innerHTML = ''
    boxPost.insertAdjacentHTML('afterbegin', posts)
    this.refreshCounter()
}
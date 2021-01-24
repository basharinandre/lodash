
class SinglePost{
    constructor() {
        this.body = document.querySelector('body')
    }

    searchPost(id, renderPosts, PostsComponent) {
        let posts = JSON.parse(localStorage.getItem('posts')) || []
        let post = posts.find(p => p.id === +id)

        if(post) {
            this.body.insertAdjacentHTML('afterbegin', renderSinglePost(post))
        }

        this.mountedElementInDOM(id, renderPosts, PostsComponent)
    }

    mountedElementInDOM(id, renderPosts, PostsComponent) {
        let close = document.querySelector('.close-js')
        let input = document.querySelector('.input--js')

        close.addEventListener('click', e => {
            clickCloseHandler(e, renderPosts, PostsComponent)
        })

        input.addEventListener('input', () => {
            toggleFinishedTasck(id, renderPosts, PostsComponent)
        })
    }
}

function renderSinglePost(post) {
    return `
        <div data-id=${post.id} id="card--js" class="card--js card text-white bg-primary" 
            style="z-index: 10 ;
            position: fixed; 
            top: 0; 
            bottom: 0;
            right: 0; 
            left: 0;
            overflow-y: scroll">
                <div class="card-header"></div>
                <span class="btn btn-danger close-js" style="width: max-content; margin-left: auto">Закрыть</span>
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <span class="badge rounded-pill bg-warning text-dark">${post.type}</span>
                    <br><br>
                    <a href="${post.link}" target="_blanck" style="color: white">Ссылка на Lodash </a>

                    <br><br>
                    <h3>Пример Lodash'a </h3>
                    <textarea
                    style="width: 100%; 
                        height: 200px;
                        background: #171717;
                        color: #fff"
                    >${post.example}</textarea>

                    ${post.polyfill ? 
                        `<br><br>
                        <h3>Мой полифилл</h3>
                        <textarea 
                            style="width: 100%; 
                            height: 200px;
                            background: #171717;
                            color: #fff" 
                        >${post.polyfill}</textarea>` :
                        '' 
                    }                  

                    ${post.comment ? 
                        `<br><br>
                        <h3>Комментарий</h3>
                        <p class="card-text">
                            ${post.comment}
                        </p>` :
                        ''
                    }

                    <label style="background: white; cursor: pointer;">
                        <p style="color: black">Статус: Решена / Не решена </p>
                        <input class="input--js" type="checkbox" ${post.isFinished ? 'checked' : ''}/>
                    </label>
                    </div>        
                </div>
    `
}

function clickCloseHandler(e, renderPosts, PostsComponent) {
    let el = e.target

    let boxCard = el.closest('.card--js')
    boxCard.classList.add('hide-js')

    renderPosts.call(PostsComponent)
}

function toggleFinishedTasck(id, renderPosts, PostsComponent) {
    let posts = JSON.parse(localStorage.getItem('posts'))

    posts.find(post => {
        if (post.id === +id) {
            return post.isFinished = !post.isFinished
        }
    })

    localStorage.setItem('posts', JSON.stringify(posts))
}

export const singlePost = new SinglePost()
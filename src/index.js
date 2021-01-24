import { AgreedComponent } from './components/agreed.component.js'
import { PostsComponent } from './components/posts.component.js'
import { CreateComponent } from './components/create.component.js'
import { NavigationComponent } from './components/navigation.component.js'

//Imports Webpack
import '../src/index.css'
import '../src/sass/index.sass'

const navigation = new NavigationComponent('navigation')

const create = new CreateComponent('create-post')
const agreed = new AgreedComponent('agreed')
const posts = new PostsComponent('posts')

navigation.registrationTab([
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name: 'agreed', component: agreed}
])
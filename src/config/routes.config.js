import Home from '../components/home/main'
import Painel from '../components/home/painel'
import Signup from '../components/signup/main.signup'
import BookCase from '../components/bookcase/main.bookcase'
import EditProfile from '../components/profile/edit.profile'
import Login from '../components/login/main.login'
import Forgot from '../components/login/forgot.login'
import Write from '../components/write/main.write.vue'

export const routes = [
    { path: '/home/student', alias: '/home/aluno', name: 'home-student', component: Home, meta: {requiresAuth: true} },
    { path: '/home/professor', alias: '/home/professor', name: 'home-professor', component: Painel, meta: {requiresAuth: true} },
    { path: '/books', alias: '/livros', name: 'books', component: BookCase, meta: {requiresAuth: true} },
    { path: '/profile/student/edit', alias: '/perfil/aluno/editar', name: 'edit-student-profile', component: EditProfile, meta: {requiresAuth: true} },
    { path: '/signup', alias: '/cadastrar', name: 'signup', component: Signup },
    { path: '/login', alias: '/entrar', name: 'login', component: Login },
    { path: '/forgot', alias: '/recuperar', name: 'forgot', component: Forgot },
    { path: '/write', alias: '/escrever', name: 'write', component: Write, meta: {requiresAuth: true} },
    { path: '/write/new/:book_id/', alias: '/escrever/novo/:book_id/', name: 'write-new-book', component: Write, meta: {requiresAuth: true} },
    { path: '/write/new/:chapter_id/', alias: '/escrever/editar/:chapter_id/', name: 'write-new-chapter', component: Write, meta: {requiresAuth: true} }
]

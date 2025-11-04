<template>
    <div class="container-sidebar">
    <form @submit.prevent="login">
        <img src="../assets/img/ifware-completo-png.png" alt="IFWare" />
        <hr />
        <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            v-model="user.email"
            required
        />
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            v-model="user.password"
            required
        />
            <button type="submit" class="btn-entrar">Entrar</button>
            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <a class="link-esqueci" href="#">Esqueceu a senha?</a>
    </form>
    </div>
  
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import http from '@/services/http.js'
import { setToken, setUserProfile, clearUserProfile } from '@/services/auth.js'

const user = reactive({
    email: '',
    password: '',
})

const router = useRouter()
const route = useRoute()
const errorMsg = ref('')

async function login() {
    try {
        errorMsg.value = ''
        // Backend expõe POST /api/v1/login (via baseURL já em VITE_API_BASE_URL)
        const { data } = await http.post('/v1/login', user)
        const token = data?.token || data?.access_token || data?.plainTextToken || data?.data?.token
        if (token) setToken(token)
        if (data?.user || data?.data?.user) {
            setUserProfile(data.user || data.data.user)
        } else {
            clearUserProfile()
        }
        const target = route.query?.redirect ? decodeURIComponent(route.query.redirect) : '/'
        router.push(target || '/')
    } catch (error) {
        const msg = error?.response?.data?.message || 'Falha no login. Verifique suas credenciais.'
        errorMsg.value = msg
    }
}
</script>

<style scoped>
.container-sidebar{
    width: 100%;
    height: 96vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 50%;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
}


img {
    width: 300px;
    height: auto;
    margin: 10px
}

input {
    width: 80%;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
    height: 40px;
}
input:focus {
    outline: none;
    border-color: #213547;
    box-shadow: 0 0 5px rgba(33, 53, 71, 0.5);
}
button {
    width: 200px;
    height: 30px;
    margin: 10px auto;
    border-radius: 5px;
    border: 1px solid var(--azul-escuro);
    color: #213547;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
}

button:hover {
    background-color: var(--azul-escuro);
    color: var(--branco);
}

hr {
    width: 80%;
    margin-bottom: 20px;
}
.link-esqueci {
    margin-bottom: 10px;
    color: #213547;
    text-decoration: none;
}
.link-esqueci:hover {
    text-decoration: underline;
}
.btn-entrar { text-decoration: none; }
.error { color: #c0392b; margin-top: 8px; }

</style>

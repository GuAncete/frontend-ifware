<template>
    <nav class="sidebar">
        <div class="perfil-logado">
            <img src="../assets/img/ifware-completo-png.png" alt="Logo IfWare">
            <div class="dados-perfil">
                <p class="nome-perfil">{{ displayName }}</p>
                <p class="cargo-perfil">{{ displaySubtitle }}</p>
            </div>
        </div>
        <ul>
            <li>
                <i class="fas fa-home"></i>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <i class="fa-solid fa-folder"></i>
                <router-link to="/projetos">Projetos</router-link>
            </li>
            <li>
                <i class="fa-solid fa-list-check"></i>
                <router-link to="/tarefas">Tarefas</router-link>
            </li>
            <li>
                <i class="fa-solid fa-users"></i>
                <router-link to="/colaboradores">Colaboradores</router-link>
            </li>
        </ul>
        <button class="btn-logout" @click="logout">Sair</button>
    </nav>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/services/http.js'
import { clearToken, clearUserProfile, getUserProfile } from '@/services/auth.js'

const router = useRouter()
const user = ref(getUserProfile())

const displayName = computed(() => user.value?.name || 'Usuário')
const displaySubtitle = computed(() => user.value?.role || user.value?.email || 'Perfil não definido')

onMounted(() => {
    user.value = getUserProfile()
})

async function logout() {
    try {
        // tenta informar o backend, mas não bloqueia se falhar
        await http.post('/v1/logout').catch(() => {})
    } finally {
        clearToken()
        clearUserProfile()
        user.value = null
        router.push('/login')
    }
}
</script>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, var(--azul-profundo) 0%, var(--azul-escuro) 100%);
    padding: 16px 12px;
    width: 240px;
    color: var(--texto-invertido);
    box-shadow: 4px 0 18px rgba(0, 0, 0, 0.15);
    height: 100vh;
    position: fixed;
    top: 0;
    align-self: flex-start;
    overflow: auto;
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 24px 0;
}

.sidebar li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.sidebar li:hover {
    background-color: rgba(74, 176, 217, 0.18);
}

.sidebar a {
    text-decoration: none;
    color: var(--branco);
    font-weight: 500;
    flex: 1;
}

.sidebar a:hover {
    color: var(--azul-claro);
}

.btn-logout {
    margin-top: auto;
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: transparent;
    color: var(--branco);
    border-radius: 6px;
    cursor: pointer;
}
.btn-logout:hover {
    background: rgba(255, 255, 255, 0.12);
    color: var(--branco);
}
.perfil-logado {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.perfil-logado img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid var(--azul-claro);
        object-fit: cover;
}
.dados-perfil {
    display: flex;
    flex-direction: column;
    color: var(--branco);
}
.nome-perfil {
    font-size: 16px;
    font-weight: 600;
}
.cargo-perfil {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
}
.sidebar li i {
    width: 20px;
    text-align: center;
}

@media (max-width: 1024px) {
    .sidebar {
        width: 200px;
    }
}

@media (max-width: 768px) {
    .sidebar {
        position: static;
        width: 100%;
        height: auto;
        flex-direction: row;
        align-items: center;
        padding: 12px;
    }

    .sidebar ul {
        display: flex;
        gap: 8px;
        margin: 0 12px;
    }

    .sidebar li {
        border-radius: 6px;
    }

    .btn-logout {
        margin-top: 0;
        margin-left: auto;
    }
}
</style>
<template>
    <section class="projects-crud">
        <header class="header-row">
            <h1>Projetos</h1>
            <div>
                <button class="btn" @click="openCreate">Novo Projeto</button>
            </div>
        </header>
        <section class="list-projects">
            <div v-if="loading" class="loading">Carregando projetos...</div>

            <div v-else>
                <div v-for="p in projects" :key="p.id">
                    <article>
                        <h3>{{ p.nomeProjeto }}</h3>
                        <p>{{ p.descricaoProjeto }}</p>
                    </article>
                </div>

                <div v-if="projects.length === 0" class="empty">Nenhum projeto encontrado.</div>
            </div>

            <!-- Form (create / edit) -->
            <div v-if="showForm" class="form-panel">
                <h2>{{ editingClient ? 'Editar Projeto' : 'Novo Projeto' }}</h2>
                <form @submit.prevent="save">
                    <label>
                        Nome
                        <input v-model="form.nomeProjeto" required />
                    </label>

                    <label for="">
                        Descricão
                        <textarea v-model="form.descricaoProjeto"></textarea>
                    </label>
                    <div>
                        <span>Selecionar Cliente</span>
                        <div v-for="c in clients" :key="c.id">
                            <label :for="`client-${c.id}`">
                                <input type="checkbox" :id="`client-${c.id}`" :value="c.id" v-model="form.clientIds">
                                {{ c.nomeCliente }}
                            </label>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button class="btn" type="submit">Salvar</button>
                        <button class="btn" type="button" @click="closeForm">Cancelar</button>
                    </div>

                    <div v-if="formError" class="error">{{ formError }}</div>
                </form>
            </div>

            <!-- Delete confirmation -->
            <div v-if="deletingClient" class="confirm">
                <p>Tem certeza que deseja excluir <strong>{{ deletingClient.nomeProjeto }}</strong>?</p>
                <div>
                    <button class="btn danger" @click="removeClient">Sim, excluir</button>
                    <button class="btn" @click="deletingClient = null">Cancelar</button>
                </div>
            </div>
        </section>

    </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import projectsApi from '@/services/projects.js'
import clientsApi from '@/services/clients.js'

const projects = ref([])
const clients = ref([])
const loading = ref(false)
const showForm = ref(false)
const editingClient = ref(null)
const deletingClient = ref(null)
const formError = ref(null)

const form = reactive({
    nomeProjeto: '',
    descricaoProjeto: '',
    statusProjeto: 1,
    clientIds: [],
})

async function loadprojects() {
    loading.value = true
    try {
        const res = await projectsApi.list()
        projects.value = res?.data?.data || res?.data || []
    } catch (e) {
        console.error(e)
        projects.value = []
    } finally {
        loading.value = false
    }
}

async function loadClients() {
    try {
        const res = await clientsApi.list({ per_page: 100 })
        clients.value = res?.data?.data || res?.data || []
    } catch (e) {
        console.error(e)
        clients.value = []
    }
}

function openCreate() {
    resetForm()
    editingClient.value = null
    showForm.value = true
}

function startEdit(c) {
    editingClient.value = c
    form.nomeProjeto = c.nomeProjeto || c.name || ''
    form.descricaoProjeto = c.descricaoProjeto || ''
    form.statusProjeto = Number(c.statusProjeto ?? 1)
    form.clientIds = Array.isArray(c.clientIds) ? [...c.clientIds] : []
    formError.value = null
    showForm.value = true
}

function resetForm() {
    form.nomeProjeto = ''
    form.descricaoProjeto = ''
    form.statusProjeto = 1
    form.clientIds = []
    formError.value = null
}

function closeForm() {
    showForm.value = false
    resetForm()
}

async function save() {
    formError.value = null
    
    try {
        if (editingClient.value) {
            const id = editingClient.value.id
            await projectsApi.update(id, { ...form })
        } else {
            await projectsApi.create({ ...form })
        }
        await loadprojects()
        closeForm()
    } catch (e) {
        console.error(e)
        formError.value = e?.response?.data?.message || 'Erro ao salvar Projeto.'
    }
}

function confirmDelete(c) {
    deletingClient.value = c
}

async function removeClient() {
    if (!deletingClient.value) return
    try {
        await projectsApi.remove(deletingClient.value.id)
        deletingClient.value = null
        await loadprojects()
    } catch (e) {
        console.error(e)
        // keep confirmation open and show error
    }
}

onMounted(() => {
    loadprojects()
    loadClients()
})

</script>

<style scoped>
.projects-crud {
    padding: 16px;
}

header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border: 2px solid var(--azul-profundo);
    border-radius: 8px;
}

header a {
    text-decoration: none;
    background-color: var(--azul-profundo);
    color: var(--branco);
    padding: 8px 16px;
    border-radius: 8px;
}

header a:hover {
    background-color: var(--azul-escuro);
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px
}

.projects-table {
    width: 100%;
    border-collapse: collapse;
}

.projects-table th,
.projects-table td {
    padding: 8px 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06)
}

.actions {
    display: flex;
    gap: 8px
}

.btn {
    background: var(--azul-claro);
    color: var(--branco);
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer
}

.btn.small {
    padding: 6px 8px;
    font-size: 13px
}

.btn.danger {
    background: #e74c3c
}

.loading,
.empty {
    padding: 12px 0;
    color: rgba(0, 0, 0, 0.6)
}

.form-panel {
    margin-top: 16px;
    padding: 12px;
    border: 1px solid var(--borda);
    border-radius: 8px;
    background: var(--fundo-secundario)
}

.form-panel label {
    display: block;
    margin-bottom: 8px
}

.form-panel input,
.form-panel textarea,
.form-panel select {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid var(--borda);
    border-radius: 6px
}

.form-actions {
    display: flex;
    gap: 8px;
    margin-top: 10px
}

.error {
    color: #c0392b;
    margin-top: 8px
}

.confirm {
    margin-top: 12px;
    padding: 12px;
    border-radius: 8px;
    background: #fff3f3;
    border: 1px solid #f5c6c6
}
</style>

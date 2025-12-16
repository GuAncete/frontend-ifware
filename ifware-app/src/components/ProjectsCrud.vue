<template>
    <section class="projects-crud">
        <header class="header-row">
            <h1>Projetos</h1>
            <div>
                <button class="btn" @click="openCreate">Novo Projeto</button>
                <button class="btn" @click="openCreateTypeProject">Novo Tipo de Projeto</button>
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

            <div v-if="showFormNew" class="form-painel modal-overlay">
                <section class="modal-content">
                    <section class="header-form">
                        <h2>{{ editingClient ? 'Editar Projeto' : 'Novo Projeto' }}</h2>
                        <div>
                            <i class="fa-solid fa-xmark" @click="closeFormNew"></i>
                        </div>

                    </section>
                    <hr>
                    <form @submit.prevent="saveProject">
                        <label>
                            Nome
                            <input v-model="form.nomeProjeto" required />
                        </label>

                        <label>
                            Descrição
                            <textarea v-model="form.descricaoProjeto"></textarea>
                        </label>

                        <label>
                            Tipo
                            <select v-model="form.tipoProjetoId" required>
                                <option disabled value="">Selecione um tipo</option>
                                <option v-for="pt in projectTypes" :key="pt.id" :value="pt.id">
                                    {{ pt.nomeTipoProjeto }}
                                </option>
                            </select>
                        </label>
                       

                        <label>
                            Cliente
                            <select v-model="form.clienteId" required>
                                <option disabled value="">Selecione um cliente</option>
                                <option v-for="c in clients" :key="c.id" :value="c.id">
                                    {{ c.nomeCliente }}
                                </option>
                            </select>
                        </label>

                        <div class="form-actions">
                            <button class="btn" type="submit">Salvar</button>
                            <button class="btn" type="button" @click="closeFormNew">Cancelar</button>
                        </div>

                        <div v-if="formError" class="error">{{ formError }}</div>
                    </form>
                </section>
            </div>
            <div v-if="showFormNewType" class="modal-overlay form-painel">
                <section class="modal-content">
                    <section class="header-form">
                        <h2>{{ editingClient ? 'Editar Tipo de Projeto' : 'Novo Tipo de Projeto' }}</h2>
                        <div>
                            <i class="fa-solid fa-xmark" @click="closeFormNewType"></i>
                        </div>

                    </section>
                    <hr>
                    <form @submit.prevent="saveTypeProject">
                        <label>
                            Nome
                            <input v-model="form.nomeTipoProjeto" required />
                        </label>

                        <div class="form-actions">
                            <button class="btn" type="submit">Salvar</button>
                            <button class="btn" type="button" @click="closeFormNewType">Cancelar</button>
                        </div>

                        <div v-if="formError" class="error">{{ formError }}</div>
                    </form>
                </section>
            </div>


        </section>
         <div v-if="deletingClient" class="confirm">
        <p>Tem certeza que deseja excluir <strong>{{ deletingClient.nomeProjeto }}</strong>?</p>
        <div>
            <button class="btn danger" @click="removeClient">Sim, excluir</button>
            <button class="btn" @click="deletingClient = null">Cancelar</button>
        </div>
    </div>
    </section>
   
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import projectsApi from '@/services/projects.js'
import projectTypesApi from '@/services/project_types.js'
import clientsApi from '@/services/clients.js'

const projects = ref([])
const projectTypes = ref([])
const clients = ref([])
const loading = ref(false)
const showFormNew = ref(false)
const showFormNewType = ref(false)
const editingClient = ref(null)
const deletingClient = ref(null)
const formError = ref(null)

const form = reactive({
    nomeProjeto: '',
    descricaoProjeto: '',
    tipoProjetoId: 1,
    clienteId: '',
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
async function loadProjectTypes() {
    try {
        const res = await projectTypesApi.list()
        projectTypes.value = res?.data?.data || res?.data || []
    } catch (e) {
        console.error(e)
        projectTypes.value = []
    } finally {
        loading.value = false
    }
}
async function loadClients() {
    try {
        const res = await clientsApi.list()
        clients.value = res?.data?.data || res?.data || []
    } catch (e) {
        console.error(e)
        clients.value = []
    } finally {
        loading.value = false
    }
}

function openCreate() {
    resetForm()
    editingClient.value = null
    showFormNew.value = true
}
function openCreateTypeProject() {
    resetForm()
    editingClient.value = null
    showFormNewType.value = true
}

function startEdit(c) {
    editingClient.value = c
    form.nomeProjeto = c.nomeProjeto || c.name || ''
    form.descricaoProjeto = c.descricaoProjeto || ''
    form.tipoProjetoId = Number(c.tipoProjetoId ?? 1)
    form.clienteId = c.clienteId != null ? String(c.clienteId) : ''
    formError.value = null
    showForm.value = true
}

function resetForm() {
    form.nomeProjeto = ''
    form.descricaoProjeto = ''
    form.tipoProjetoId = 1
    form.clienteId = ''
    formError.value = null
}

function closeFormNew() {
    showFormNew.value = false
    resetForm()
}
function closeFormNewType() {
    showFormNewType.value = false
    resetForm()
}

async function saveProject() {
    formError.value = null

    try {
        if (!form.clienteId) {
            formError.value = 'Selecione um cliente.'
            return
        }

        const payload = {
            ...form,
            tipoProjetoId: Number(form.tipoProjetoId),
            clienteId: Number(form.clienteId),

        }
        if (editingClient.value) {
            const id = editingClient.value.id
            await projectsApi.update(id, payload)
        } else {
            await projectsApi.create(payload)
        }
        await loadprojects()
        closeFormNew()
    } catch (e) {
        console.error(e)
        formError.value = e?.response?.data?.message || 'Erro ao salvar Projeto.'
    }
}
async function saveTypeProject() {
    formError.value = null

    try {
        const payload = {
            nomeTipoProjeto: form.nomeTipoProjeto,
        }
        if (editingClient.value) {
            const id = editingClient.value.id
            await projectTypesApi.update(id, payload)
        } else {
            await projectTypesApi.create(payload)
        }
        await loadprojects()
        closeFormNewType()
    } catch (e) {
        console.error(e)
        formError.value = e?.response?.data?.message || 'Erro ao salvar Tipo de Projeto.'
    }
}  


function confirmDelete(c){
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
    loadProjectTypes()
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

.form-painel {
    margin-top: 16px;
    padding: 12px;
    border: 1px solid var(--borda);
    border-radius: 8px;
    background: var(--fundo-secundario)
}

.form-painel label,
.header-form h2 {
    display: block;
    margin-bottom: 8px
}

.form-painel input,
.form-painel textarea,
.form-painel select {
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

.header-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.header-form div {
    width: 24px;
}

.header-form i {
    width: 100%;
}


.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    width: min(480px, 90vw);
    background: #fff;
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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

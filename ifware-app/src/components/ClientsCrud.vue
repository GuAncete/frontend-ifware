<template>
    <section class="clients-crud">
        <header class="header-row">
            <h1>Clientes</h1>
            <div>
                <button class="btn" @click="openCreate">Novo Cliente</button>
            </div>
        </header>

        <div v-if="loading" class="loading">Carregando clientes...</div>

        <div v-else>
            <table class="clients-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="c in clients" :key="c.id">
                        <td>{{ c.nomeCliente || c.name }}</td>
                        <td>{{ c.emailCliente || c.email }}</td>
                        <td>{{ c.telefoneCliente || '-' }}</td>
                        <td>{{ c.statusCliente === 1 ? 'Ativo' : 'Inativo' }}</td>
                        <td class="actions">
                            <button class="btn small" @click="startEdit(c)">Editar</button>
                            <button class="btn small danger" @click="confirmDelete(c)">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="clients.length === 0" class="empty">Nenhum cliente encontrado.</div>
        </div>

        <!-- Form (create / edit) -->
        <div v-if="showForm" class="form-panel">
            <h2>{{ editingClient ? 'Editar Cliente' : 'Novo Cliente' }}</h2>
            <form @submit.prevent="save">
                <label>
                    Nome
                    <input v-model="form.nomeCliente" required />
                </label>

                <label>
                    E-mail
                    <input v-model="form.emailCliente" type="email" required />
                </label>

                <label>
                    Telefone
                    <input v-model="form.telefoneCliente" />
                </label>

                <label>
                    Descrição
                    <textarea v-model="form.descricaoCliente" rows="3"></textarea>
                </label>

                <label>
                    Status
                    <select v-model.number="form.statusCliente">
                        <option :value="1">Ativo</option>
                        <option :value="0">Inativo</option>
                    </select>
                </label>

                <div class="form-actions">
                    <button class="btn" type="submit">Salvar</button>
                    <button class="btn" type="button" @click="closeForm">Cancelar</button>
                </div>

                <div v-if="formError" class="error">{{ formError }}</div>
            </form>
        </div>

        <!-- Delete confirmation -->
        <div v-if="deletingClient" class="confirm">
            <p>Tem certeza que deseja excluir <strong>{{ deletingClient.nomeCliente }}</strong>?</p>
            <div>
                <button class="btn danger" @click="removeClient">Sim, excluir</button>
                <button class="btn" @click="deletingClient = null">Cancelar</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import clientsApi from '@/services/clients.js'

const clients = ref([])
const loading = ref(false)
const showForm = ref(false)
const editingClient = ref(null)
const deletingClient = ref(null)
const formError = ref(null)

const form = reactive({
    nomeCliente: '',
    emailCliente: '',
    telefoneCliente: '',
    descricaoCliente: '',
    statusCliente: 1,
})

async function loadClients() {
    loading.value = true
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
    showForm.value = true
}

function startEdit(c) {
    editingClient.value = c
    form.nomeCliente = c.nomeCliente || c.name || ''
    form.emailCliente = c.emailCliente || c.email || ''
    form.telefoneCliente = c.telefoneCliente || ''
    form.descricaoCliente = c.descricaoCliente || ''
    form.statusCliente = Number(c.statusCliente ?? 1)
    formError.value = null
    showForm.value = true
}

function resetForm() {
    form.nomeCliente = ''
    form.emailCliente = ''
    form.telefoneCliente = ''
    form.descricaoCliente = ''
    form.statusCliente = 1
    formError.value = null
}

function closeForm() {
    showForm.value = false
    resetForm()
}

async function save() {
    formError.value = null
    // basic client-side validation
    if (!form.nomeCliente || !form.emailCliente) {
        formError.value = 'Nome e e-mail são obrigatórios.'
        return
    }

    try {
        if (editingClient.value) {
            const id = editingClient.value.id
            await clientsApi.update(id, { ...form })
        } else {
            await clientsApi.create({ ...form })
        }
        await loadClients()
        closeForm()
    } catch (e) {
        console.error(e)
        formError.value = e?.response?.data?.message || 'Erro ao salvar cliente.'
    }
}

function confirmDelete(c) {
    deletingClient.value = c
}

async function removeClient() {
    if (!deletingClient.value) return
    try {
        await clientsApi.remove(deletingClient.value.id)
        deletingClient.value = null
        await loadClients()
    } catch (e) {
        console.error(e)
        // keep confirmation open and show error
    }
}

onMounted(() => {
    loadClients()
})
</script>

<style scoped>
.clients-crud {
    padding: 16px;
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px
}

.clients-table {
    width: 100%;
    border-collapse: collapse;
}

.clients-table th,
.clients-table td {
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

<template>
    <div class="card">
        <h2>[Titulo]</h2>
        <p>[Descrição]</p>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .card {
        background-color: var(--branco);
        border: 1px solid var(--azul-escuro);
        border-radius: 8px;
        padding: 16px;
        width: 300px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: 0.3s ease 
    }
    .card:hover{
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
</style>
<template>
  <div class="app-shell">
    <div class="content" :class="{ 'no-sidebar': !showSidebar }">
  <SideBar v-if="showSidebar" />
      <main class="page">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
  
</template>
<script>
import Footer from './components/Footer.vue';
import SideBar from './components/Sidebar.vue';
export default {
  name: 'App',
  components: {
    Footer,
    SideBar,
  },
  computed: {
    showSidebar() {
      return !(this.$route?.meta?.hideSideBar === true)
    },
  },
};
</script>
<style>
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  /* === Cores principais === */
  --azul-claro: #4AB0D9; /* Destaques, botões ativos, ícones interativos */
  --azul-medio: #1F7DB0; /* Cor principal da marca, menus, links */
  --azul-escuro: #0D4F78; /* Títulos, textos sobre fundo claro */
  --azul-profundo: #092C47; /* Fundo principal ou seções de destaque */
  --branco: #FFFFFF; /* Fundo neutro, textos em fundo escuro */
  --preto: #000000; /* Textos escuros sobre fundo claro */

  /* === Cores de texto === */
  --texto-principal: var(--azul-profundo);
  --texto-secundario: var(--azul-escuro);
  --texto-invertido: var(--branco);

  /* === Fundos === */
  --fundo-principal: var(--branco);
  --fundo-secundario: #F5F9FC; /* tom suave para seções alternadas */
  --fundo-escuro: var(--azul-profundo);

  /* === Botões === */
  --botao-primario: var(--azul-claro);
  --botao-hover: var(--azul-medio);
  --botao-texto: var(--branco);

  /* === Bordas e sombras === */
  --borda: #D0E2EC;
  --sombra: rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  min-height: 100vh;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--fundo-principal);
}

.content {
  flex: 1;
  display: grid;
  grid-template-columns: 260px 1fr;
  align-items: start;
  min-height: 0; /* evita overflow em alguns navegadores */
}

.content.no-sidebar {
  grid-template-columns: 1fr;
}

.page {
  min-width: 0; /* permite o conteúdo reduzir sem overflow horizontal */
  padding: 16px;
}

body {
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--branco);
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr; /* empilha conteúdo no mobile */
  }
}
</style>
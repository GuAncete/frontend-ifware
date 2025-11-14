<template>
  <div class="app-shell">
    <div class="content" :class="{ 'no-sidebar': !showSidebar }">
      <SideBar v-if="showSidebar" />
      <main class="page">
        <router-view />
      </main>
    </div>


    <footer>
      <p>&copy; Copyright 2025 - Todos os direitos reservados. Desenvolvido por IFWare</p>
    </footer>
  </div>

</template>
<script>
import SideBar from './components/Sidebar.vue';
export default {
  name: 'App',
  components: {
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
  --azul-claro: #4AB0D9;
  /* Destaques, botões ativos, ícones interativos */
  --azul-medio: #1F7DB0;
  /* Cor principal da marca, menus, links */
  --azul-escuro: #0D4F78;
  /* Títulos, textos sobre fundo claro */
  --azul-profundo: #092C47;
  /* Fundo principal ou seções de destaque */
  --branco: #FFFFFF;
  /* Fundo neutro, textos em fundo escuro */
  --preto: #000000;
  /* Textos escuros sobre fundo claro */

  /* === Cores de texto === */
  --texto-principal: var(--azul-profundo);
  --texto-secundario: var(--azul-escuro);
  --texto-invertido: var(--branco);

  /* === Fundos === */
  --fundo-principal: var(--branco);
  --fundo-secundario: #F5F9FC;
  /* tom suave para seções alternadas */
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
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
}
.page{
  flex: 1;
  padding: 16px;
  width: 100%;
  height: 100%;
}

.content.no-sidebar {
  flex-direction: column;
}

footer {
  width: 100%;
  text-align: center;
  padding: 12px 16px;
  background-color: var(--azul-profundo);
  margin-top: auto;
}

footer p {
  color: var(--branco);
  font-size: 14px;
  margin: 0;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
    /* empilha conteúdo no mobile */
  }
}
</style>
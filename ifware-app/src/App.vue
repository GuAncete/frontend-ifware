<template>
  <router-view />
  <SideBar v-if="!$route.meta || !$route.meta.hideSideBar" />
  <Footer />
</template>
<script >
import Footer from './components/Footer.vue';
import SideBar from './components/Sidebar.vue';
export default {
  name: 'App',
  components: {
    Footer,
    SideBar,
  },

  methods:{
    onClick($evt){
      console.log("clicou", $evt);
    }
  },
};
</script>
<style >

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;


  /* === Cores principais === */
  --azul-claro: #4AB0D9;    /* Destaques, botões ativos, ícones interativos */
  --azul-medio: #1F7DB0;    /* Cor principal da marca, menus, links */
  --azul-escuro: #0D4F78;   /* Títulos, textos sobre fundo claro */
  --azul-profundo: #092C47; /* Fundo principal ou seções de destaque */
  --branco: #FFFFFF;        /* Fundo neutro, textos em fundo escuro */
  --preto:#000000;         /* Textos escuros sobre fundo claro */

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

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app{
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center; 
  align-items: center; 
}
body {
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--branco);
}

</style>
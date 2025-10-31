<template>
    <nav class="SideBar">
        <div class="perfil-logado">
            <img src="../assets/img/ifware-completo-png.png" alt="">
            <div class="dados-perfil">
            <p class="nome-perfil">[Nome do Perfil]</p>
            <p class="cargo-perfil">[Cargo do Perfil]</p></div>
        </div>
        <hr>
        <ul>
            <li><i class="fas fa-home"></i><router-link to="/">Home</router-link></li>
            <li><i class="fa-solid fa-folder"></i><router-link to="/projetos">Projetos</router-link></li>
            <li><i class="fa-solid fa-list-check"></i><router-link to="/tarefas">Tarefas</router-link></li>
            <li><i class="fa-solid fa-users"></i><router-link to="/colaboradores">Colaboradores</router-link></li>
        </ul>
    </nav>

</template>

<script>
export default {

}
</script>

<style>
nav {
    display: flex;
    flex-direction: column;
    background-color: var(--azul-claro);
    padding: 0.5em;
    position: fixed;
    float: left;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 20%;
    transition: 0.3s ease;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav li {
    margin: 10px 0;
}

nav a {
    text-decoration: none;
    color: #333;
}

nav a:hover {
    text-decoration: underline;
}
.perfil-logado {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid var(--preto);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
}
.perfil-logado img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 1px solid var(--azul-claro);
}
.dados-perfil {
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: center;
}
.nome-perfil {
    font-size: 15px;
    font-weight: bold;
}
.cargo-perfil {
    font-size: 14px;
    color: #666;
}
hr {
    margin-top:10px;
    margin-bottom:10px;
    width: 100%;
}
li{
    display: flex;
    align-items: center;
    gap: 10px;

}
li i{
    width:20%;
}
li router-link{
    width:80%;
}
</style>
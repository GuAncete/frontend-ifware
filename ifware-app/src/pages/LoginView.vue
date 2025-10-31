<template>
    <form action="">
        <img src="../assets/img/ifware-completo-png.png" alt="">
        <hr>
        <input type="text" id="username" name="username" placeholder="Usuário" />
        <input type="password" id="password" name="password" placeholder="Senha" />
        <button type="button"><router-link to="/" class="btn-entrar">Entrar</router-link></button>
        <a class="link-esqueci" href="">Esqueceu a senha?</a>
    </form>
</template>
    
<script>
export default {
    name: 'LoginView',
    components:{
    }
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
.btn-entrar {
    text-decoration: none;
    color: var(--azul-escuro);
}
.btn-entrar:hover {
    color: var(--branco);
}

</style>

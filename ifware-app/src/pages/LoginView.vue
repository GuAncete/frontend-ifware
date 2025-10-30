<template>
    <form action="">
        <img src="../assets/img/ifware-completo-png.png" alt="">
        <hr>
        <input type="text" id="username" name="username" placeholder="Usuário" />
        <input type="password" id="password" name="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <a href="">Esqueceu a senha?</a>
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
    height: auto;
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
    height: 25px;
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
    border: none;
    background-color: #213547;
    color: white;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
}

button:hover {
    background-color: #2c3e50;
}

hr {
    width: 80%;
    margin-bottom: 20px;
}
a {
    margin-bottom: 10px;
    color: #213547;
    text-decoration: none;
    align-items: start;
}

a:hover {
    text-decoration: underline;
}
</style>

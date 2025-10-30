<template>
  <nav>
    <RouterLink to="/"></RouterLink>
    <RouterLink to="/home"></RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<script>
export default {
  name: 'App',
  
} 
</script>
<style>
</style>
<template>
    <div>
<div class="container">
        <nav class="center">
         <div class="nav-wrapper">
          <ul id="nav-mobile">
           <router-link tag="li" active-class="active" to="/about">
           <a href="">О платформе</a></router-link>
          <router-link tag="li" active-class="active" to="/download">
          <a href="">Загрузка пользователей</a> </router-link>
          <router-link  tag="li" exact active-class="active" to="/list">
          <a href="">Список пользователей</a></router-link>
          <router-link tag="li" active-class="active" to="/help" class="help">
          <a href="">Техподдержка</a></router-link>
           </ul>
         </div>
        </nav>
      <router-view/>
    </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>
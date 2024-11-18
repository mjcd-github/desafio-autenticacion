<script>
import { onAuthStateChanged, signOut, auth } from "@/auth";
import { useRouter } from 'vue-router'
export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false,
      isAuthChecked: false
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.isAuthenticated = !!user;
      this.isAuthChecked = true;
    })
  },
  setup() {
    const router = useRouter()
    const logout = async () => {
      try {

        await signOut(auth)
        router.push('/login')

      } catch (error) {
        console.error('Error al cerrar sesión:', error);

      }
    }
    return { logout }
  }
}

</script>

<template>    
 <div v-if="isAuthChecked"> 
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Desafio Autenticación</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        
        <li class="nav-item">
          
          <router-link class="link" to="/" v-if="isAuthenticated" exact-active-class="disabled-link">Home</router-link>
        </li>
        <li class="nav-item">
          
          <router-link class="link" to="Login" v-if="!isAuthenticated" exact-active-class="disabled-link">login</router-link>
        </li>
        <li class="nav-item">          
          <router-link class="link" to="Register" v-if="!isAuthenticated" exact-active-class="disabled-link">Registro</router-link>
        </li>
      </ul>
      <ul class="navbar-nav logout" >
        <li class="nav-item" id="logout">
          <a href="#" class="link " @click.prevent="logout" v-if="isAuthenticated" exact-active-class="disabled-link">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
    
  </div>
</nav>
</div>
<div v-else>
      <p>Cargando...</p>
    </div>

<div><router-view></router-view></div>
 
</template>

<style scoped>
.navbar{
  width: 100%;
      
}

.nav-item{
  margin-right: 10px;
}

.disabled-link {
  pointer-events: none; /* Deshabilita clics */
  color: gray; /* Indica visualmente que está inactivo */
  text-decoration: none; /* Opcional, quita subrayado */
  
}

.link{
  text-decoration: none;
}

.navbar-nav.logout{
  width: 100% !important;
  justify-content: flex-end; 
  
}
</style>

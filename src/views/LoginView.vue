<script>
import { signInWithEmailAndPassword, auth } from '@/auth'
//import { errorMessages } from 'vue/compiler-sfc';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessages: ''
        }
    },
    
    methods: {        
        async signIn() {
            try {
                const { email, password } = this
                const { user } = await signInWithEmailAndPassword(auth, email, password)
                // alert(`Bienvenido ${user.email}`)               
                this.$router.push('/')
            } catch (error) {
                console.error('Error al iniciar sesión', error)
                this.errorMessages = "Email o contrataseña incorrecta"
            }
        }
        
    }
}
</script>

<template>
<div class="contenedor">
    <h3>Iniciar Sesión</h3>
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="email">
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" >Password</label>
    <input type="password" class="form-control" placeholder="Password" v-model="password" >
  </div>
  
  <button class="btn btn-primary" @click.prevent="signIn">Ingresar</button>
</form>

<div class="alert alert-danger" role="alert" v-if="errorMessages">
  {{errorMessages}}
</div>

</div>   
   
</template>

<style scoped>

.contenedor{
    margin-top: 50px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

}
form{
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
}
.alert {
    margin-top: 10px;
}

</style>
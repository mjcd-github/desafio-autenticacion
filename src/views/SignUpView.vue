<script>
import { createUserWithEmailAndPassword, auth, signOut } from '@/auth'
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessages: ''
        }
    },
    methods: {
        async register() {
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password)
                //const user = userCredentials.user
                await signOut(auth)
                alert('asuario creado con exito')
                this.$router.push({name:'login'})
            } catch (error) {
                console.error('Error al registrar el usuario', error)
                this.errorMessages = "Usuario ya registrado intente con otro email"
            }
        }
        
    }
}
</script>

<template>
<div class="contenedor">
    <h3>Registro de Usuario</h3>
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="email">
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" >Password</label>
    <input type="password" class="form-control" placeholder="Password" v-model="password" >
  </div>
  
  <button class="btn btn-primary" @click.prevent="register">Registrar</button>
</form>
<div class="alert alert-warning" role="warning" v-if="errorMessages">
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
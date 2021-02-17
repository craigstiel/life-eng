<template>
    <v-row>
        <v-col md="1"></v-col>
        <v-col cols="12" md="8" sm="10">
            <p class="register-text">
                Вход
            </p>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-col cols="12" md="12">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field v-model="password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                    :rules="[passwordRules.required, passwordRules.min]"
                                    :type="show1 ? 'text' : 'password'" name="input-10-1"
                                    label="Пароль"
                                    counter @click:append="show1 = !show1"></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-btn :disabled="!valid" color="success" block depressed class="mr-4" @click="login">
                        Войти
                    </v-btn>
                    <a @click="$router.push({name: 'restore_password'})">Забыли пароль?</a>
                </v-col>
            </v-form>
        </v-col>
        <v-col md="1"></v-col>
    </v-row>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                valid: true,
                show1: false,
                show2: true,
                passwordRules: {
                    required: value => !!value || 'Password is required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        methods: {
            login() {
                var app = this;
                if (this.$refs.form.validate()) {
                    this.$auth.login({
                        params: {
                            email: app.email,
                            password: app.password
                        },
                        success: function (response) {
                            app.$bus.$emit("GetAdmin");
                        },
                        error: function (error) {
                            if (error.response.status === 400) {
                                app.$bus.$emit("alert", "E-mail не был верифицирован!", "error");
                            }
                            if (error.response.status === 500) {
                                app.$bus.$emit("alert", "Аккаунта с этим e-mail адресом не существует", "error");
                            }
                            if (error.response.status === 401) {
                                app.$bus.$emit("alert", "Вы ввели неправильный пароль", "error");
                            }
                        },
                        rememberMe: true,
                        redirect: '/',
                        fetchUser: true,
                    });
                }
            },
        }
    }
</script>
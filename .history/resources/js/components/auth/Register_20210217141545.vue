<template>
    <v-row>
        <v-col md="1"></v-col>
        <v-col cols="12" md="10">
            <p class="register-text">
                Регистрация
            </p>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-col cols="12" md="12">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field v-model="new_password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                    :rules="[passwordRules.required, passwordRules.min]"
                                    :type="show1 ? 'text' : 'password'" name="input-10-1"
                                    label="Пароль"
                                    counter @click:append="show1 = !show1"></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-text-field v-model="confirm_new_password" :append-icon="show2 ? 'visibility' : 'visibility_off'"
                                    :rules="[passwordRules.required, passwordRules.min]"
                                    :type="show2 ? 'text' : 'password'" name="input-10-1"
                                    label="Подтвердите пароль"
                                    counter @click:append="show2 = !show2"></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-btn :disabled="!valid" block depressed color="success" class="mr-4" @click="register">
                        Зарегистрироваться
                    </v-btn>
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
                confirm_new_password: '',
                new_password: '',
                valid: true,
                show1: false,
                show2: false,
                passwordRules: {
                    required: value => !!value || 'Password is required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            };
        },
        watch: {
            confirm_new_password: function () {
                if (this.new_password === this.confirm_new_password) {
                    this.password = this.new_password;
                }
            },
            new_password: function () {
                if (this.new_password === this.confirm_new_password) {
                    this.password = this.new_password;
                }
            },
        },
        methods: {
            register() {
                let app = this;
                if (this.$refs.form.validate()) {
                    if (app.password === app.confirm_new_password && app.password === app.new_password) {
                        this.$auth.register({
                            data: {
                                email: app.email,
                                password: app.password,
                            },
                            error: function (error) {
                                if (error.response.status === 500) {
                                    app.$bus.$emit("alert", "Этот e-mail уже был зарегистрирован", "error");
                                }
                            },
                        });
                    } else {
                        app.$bus.$emit("alert", "Пароли не совпадают", "error");
                    }
                }
            }
        }
    }
</script>
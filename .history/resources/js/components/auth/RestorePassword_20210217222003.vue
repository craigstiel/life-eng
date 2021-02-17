<template>
    <v-row>
        <v-col md="1"></v-col>
        <v-col cols="12" md="10" sm="12">
            <p class="register-text">
                Восстановление пароля
            </p>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-col cols="12" md="12">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                    <v-btn :disabled="!valid" color="success" block depressed @click="send_mail">
                        Отправить письмо для восстановления пароля
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
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        methods: {
            send_mail: function() {
                let _this = this;
                if (this.$refs.form.validate()) {
                    let data = {
                        email: _this.email,
                    };
                    axios.post('/auth/restore', data)
                        .catch(function (error) {
                            if (error.response.status === 401) {
                                _this.$bus.$emit("alert", "E-mail не был верифицирован!", "error");
                            }
                            if (error.response.status === 400) {
                                _this.$bus.$emit("alert", "Такого аккаунта не существует!", "error");
                            }
                        });
                }
            },
        }
    }
</script>

<template>
    <v-row>
        <v-col md="2" sm="1"></v-col>
        <v-col cols="12" md="8" sm="10">
            <v-card class="mx-auto mycontent-left">
                <v-form ref="form" v-model="valid" lazy-validation style="padding: 20px;">
                    <v-row>
                        <v-col cols="12" md="6" sm="6" key=9>
                            <v-text-field v-model="new_password"
                                          :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                          :rules="[passwordRules.required, passwordRules.min]"
                                          :type="show1 ? 'text' : 'password'" name="input-10-1"
                                          :label="$ml.with('VueJS').get('new_pass')"
                                          hint="At least 8 characters" counter
                                          @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6" key=10>
                            <v-text-field v-model="confirm_new_password"
                                          :append-icon="show3 ? 'visibility' : 'visibility_off'"
                                          :rules="[passwordRules.required, passwordRules.min]"
                                          :type="show3 ? 'text' : 'password'" name="input-10-1"
                                          :label="$ml.with('VueJS').get('confirm_new_pass')"
                                          hint="At least 8 characters" counter
                                          @click:append="show3 = !show3"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn @click="change_password()">{{ $ml.with('VueJS').get('change') }}</v-btn>
                </v-form>
            </v-card>
        </v-col>
        <v-col md="2" sm="1"></v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
            token: {
                required: true
            },
        },
        data() {
            return {
                new_password: '',
                confirm_new_password: '',
                password: '',
                show1: false,
                show3: false,
                passwordRules: {
                    required: value => !!value || 'Password is required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                },
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
            change_password: function () {
                var _this = this;
                if (this.$refs.form.validate()) {
                    if (_this.password === _this.confirm_new_password && _this.password === _this.new_password) {
                        let data = {
                            password: _this.password,
                            token: _this.token,
                        };
                        axios.put('/auth/reset/', data)
                            .then(function () {
                                _this.$router.push({name: 'login'});
                            })
                            .catch(function (error) {
                                if (error.response.status === 400) {
                                    _this.$bus.$emit("alert", _this.$ml.with('VueJS').get('try_again'), "error");
                                }
                            });
                    } else {
                        _this.$bus.$emit("alert", _this.$ml.with('VueJS').get('not_match'), "error");
                    }
                }
            }
        }
    }
</script>
<template>
    <v-row>
        <v-col md="2"></v-col>
        <v-col cols="12" md="8">
            <v-card height="120" class="mx-auto mycontent-left">
                <v-card-text></v-card-text>
                <v-card-text style="font-size: 20px; font-family: 'Roboto', sans-serif; text-align: center; text-transform: uppercase;">{{ $ml.with('VueJS').get('reg_rule') }}</v-card-text>
            </v-card>
        </v-col>
        <v-col md="2"></v-col>
    </v-row>
</template>
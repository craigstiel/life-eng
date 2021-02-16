<template>
  <v-app id="eng-home">
    <v-app-bar app color="#9ebc9a" flat>
      <v-container v-if="$auth.check()" class="py-0 fill-height">
        <v-avatar class="mr-10" color="#4e7852" size="38"></v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn text>Выход</v-btn>
      </v-container>
      <v-container v-else class="py-0 fill-height">
        <v-spacer></v-spacer>
        <div v-for="link in auth" :key="link.name">
          <v-btn @click="$router.push({name: link.name})" text>
          {{ link.text }}
        </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="second-color">
      <v-container>
        <v-row>
          <v-col cols="2" v-if="$auth.check()">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet max-width="10vh" min-height="70vh" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Уроки", "Профиль", "Конструктор уроков", "Ученики", "Связь"],
    auth_links: ["Вход", "Регистрация"],
    user: [
      { icon: "contacts", text: "Уроки", name: "contacts" },
      { icon: "settings", text: "Профиль", name: "management" },
      { icon: "chat_bubble", text: "Связь", name: "history" },
    ],
    teacher: [
      { icon: "contacts", text: "Конструктор уроков", name: "contacts" },
      { icon: "settings", text: "Ученики", name: "management" },
    ],
    auth: [
      { icon: "fas fa-user-plus", text: "Регистрация", name: "register" },
      { icon: "fas fa-sign-in-alt", text: "Вход", name: "login" },
    ],
  }),
};
</script>
<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create an account</h1>
              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for
                free.</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-header class="bg-transparent">
              <div class="text-muted text-center mt-2 mb-4">
                Sign up
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-circle-08"
                              placeholder="ID"
                              name="ID"
                              :rules="{required: true}"
                              v-model="user.id">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="user.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="password"
                              type="password"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              v-model="user.password">
                  </base-input>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Create account</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { registerUser } from '@/api/index';

export default {
  name: 'register',
  data() {
    return {
      user: {
        id: '',
        email: '',
        password: '',
        // agree: false
      }
    }
  },
  methods: {
    onSubmit() {
      const userInfo = {
        id: this.user.id,
        email: this.user.email,
        password: this.user.password
      };

      // 회원가입 api
      registerUser(userInfo).then((res) => {
        if (res.data.data) {
          alert('회원가입이 완료되었습니다!');
          // init
          this.initUserInfo();
          // route
          this.$router.push('/login');
        } else {
          alert('이미 존재하는 아이디입니다.');
        }
      })
      .catch((err) => {
        alert('에러가 발생했습니다.');
      });
    },
    initUserInfo() {
      this.user = {
        id: '',
        email: '',
        password: '',
      };
    },
  },
};
</script>
<style></style>

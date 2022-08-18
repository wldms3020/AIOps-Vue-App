<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
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
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent">
              <div class="text-muted text-center mt-2 mb-3">
                Login
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="ID"
                              :rules="{required: true, min: 4}"
                              prepend-icon="ni ni-circle-08"
                              placeholder="ID"
                              v-model="user.id">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="user.password">
                  </base-input>

                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">Sign in</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { login } from '@/api/index'
import { setCookie } from '@/util/cookie'

export default {
  data() {
    return {
      user: {
        id: '',
        password: '',
      }
    };
  },
  methods: {
    onSubmit() {
      const userInfo = {
        id: this.user.id,
        password: this.user.password
      };

      // 로그인 api
      login(userInfo).then((res) => {
        if (res.data.data) {
          // user 정보
          setCookie('userId', userInfo.id);
          // init
          this.initUserInfo();
          // route
          this.$router.push('/dashboard');
        } else {
          alert('아이디와 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch((err) => {
        alert('에러가 발생했습니다.');
      });
    },
    initUserInfo() {
      this.user = {
        id: '',
        password: '',
      };
    },
  }
};
</script>

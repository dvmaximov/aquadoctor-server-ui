<template>
  <q-card bordered class="panel">
    <q-card-section class="text-center">
      <div class="text-h6">{{ $t('signin-title') }}</div>
    </q-card-section>

    <q-separator inset />

    <q-form
      @submit.prevent.stop="submit"
      @reset.prevent.stop="reset"
      class="q-gutter-md"
    >
      <q-card-section>
        <q-input
          class="input"
          standout
          v-model="email"
          :label="$t('email') + '*'"
          :rules="[
            (val: string) => !!val || $t('required'),
            (val: string) => val.match(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) || $t('email-failed'),
          ]"
        />
        <q-input
          class="input"
          standout
          v-model="password"
          :label="$t('password') + '*'"
          :type="!isShowPassword ? 'password' : 'text'"
          :rules="[
            (val: string) => !!val || $t('required'),
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="!isShowPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isShowPassword = !isShowPassword"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-separator inset />

      <q-card-actions>
        <q-btn flat type="submit" :label="$t('signin')"></q-btn>
        <!-- <q-btn flat @click="reset">sign in</q-btn> -->
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';

const store = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const isShowPassword = ref<boolean>(false);

const submit = async () => {
  await store.signIn(email.value, password.value);
};
const reset = () => {
  //
};
</script>

<style scoped lang="scss">
.input {
  margin-top: 5px;
}
</style>

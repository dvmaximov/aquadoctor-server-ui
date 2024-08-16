<template>
  <q-card bordered class="panel">
    <q-card-section class="text-center">
      <div class="text-h6">{{ $t('signup-title') }}</div>
    </q-card-section>

    <q-separator inset />

    <q-form
      @submit.prevent.stop="submit"
      @reset.prevent.stop="reset"
      class="q-gutter-md"
    >
      <q-card-section>
        <q-input
          autofocus
          standout
          v-model="email"
          :label="$t('email') + '*'"
          :rules="[
            (val: string) => !!val || $t('required'),
            (val: string) => val.match(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) || $t('email-failed'),
          ]"
        />
        <q-input
          standout
          v-model="password"
          :label="$t('create-password') + '*'"
          :type="!isShowPassword ? 'password' : 'text'"
          :rules="[(val: string) => !!val || $t('required')]"
        >
          <template v-slot:append>
            <q-icon
              :name="!isShowPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isShowPassword = !isShowPassword"
            />
          </template>
        </q-input>
        <q-input
          standout
          v-model="firstName"
          :label="$t('firstname') + '*'"
          :rules="[
            (val: string) => !!val || $t('required'),
          ]"
        />
        <q-input
          standout
          v-model="lastName"
          :label="$t('lastname') + '*'"
          :rules="[
            (val: string) => !!val || $t('required'),
          ]"
        />
        <q-select
          class="select choice"
          v-model="gender"
          :label="$t('gender')"
          :options="genderOptions"
          item-aligned
          standout
        />
        <q-input filled v-model="birthDay" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="birthDay">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-separator inset />

      <q-card-actions>
        <q-btn flat type="submit" :label="$t('signup')" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { date } from 'quasar';

import { useAuthStore } from 'src/stores/auth.store';
import { User } from 'src/stores/entities/users.entity';

const { formatDate, extractDate } = date;
const store = useAuthStore();
const router = useRouter();

const email = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');
const password = ref<string>('');
const birthDay = ref<string>(formatDate(Date.now(), 'YYYY/MM/DD'));
const gender = ref<'male' | 'female'>('male');
const isShowPassword = ref<boolean>(false);
const genderOptions = ['male', 'female'];

const submit = async () => {
  const newUser = new User();
  newUser.email = email.value;
  newUser.firstName = firstName.value;
  newUser.lastName = lastName.value;
  newUser.password = password.value;
  newUser.birthday = extractDate(birthDay.value, 'YYYY/MM/DD').getTime();
  newUser.gender = gender.value;
  const res = await store.signUp(newUser);
  if (res) {
    router.push('/profile');
  }
};
const reset = () => {
  //
};
</script>

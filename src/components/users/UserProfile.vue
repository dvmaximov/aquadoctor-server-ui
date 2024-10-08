<template>
  <q-form
    class="q-gutter-md q-mt-lg"
    :class="{ 'table-desktop': $q.screen.gt.sm }"
    @submit.prevent.stop="submit"
  >
    <q-field borderless>
      <div class="self-center no-outline label">
        <span>E-mail: </span> {{ userEdit!.email }}
        <q-btn
          :disable="!modified"
          outline
          class="q-ml-xl"
          color="primary"
          type="submit"
          :label="$t('save')"
        />
      </div>
    </q-field>

    <q-separator inset />

    <div class="row input">
      <q-input
        autofocus
        class="col-10"
        :class="{ 'col-12': $q.screen.lt.md }"
        outlined
        :label="$t('firstname') + ' *'"
        v-model="userEdit!.firstName"
        @update:model-value="modified = true"
        :rules="[
            (val: string) => !!val || $t('required'),
          ]"
      ></q-input>
    </div>

    <div class="row input">
      <q-input
        class="col-10"
        :class="{ 'col-12': $q.screen.lt.md }"
        outlined
        :label="$t('middlename')"
        v-model="userEdit!.middleName"
        @update:model-value="modified = true"
        :rules="[
            (val: string) => true,
          ]"
      ></q-input>
    </div>

    <div class="row input">
      <q-input
        class="col-10"
        :class="{ 'col-12': $q.screen.lt.md }"
        outlined
        :label="$t('lastname') + ' *'"
        v-model="userEdit!.lastName"
        @update:model-value="modified = true"
        :rules="[
            (val: string) => !!val || $t('required'),
          ]"
      ></q-input>
    </div>

    <div class="row input">
      <q-input
        outlined
        v-model="birthday"
        mask="date"
        @update:model-value="modified = true"
        :rules="['date']"
        :label="$t('birthday') + ' *'"
        class="col-10"
        :class="{ 'col-12': $q.screen.lt.md }"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="birthday"
                :title="birthday"
                :subtitle="$t('birthday')"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    :label="$t('close')"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <q-separator inset />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar, date } from 'quasar';
const { formatDate, extractDate } = date;
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';
import { useUsersStore } from 'src/stores/users.store';
import { storeToRefs } from 'pinia';
import { User } from 'src/stores/entities/users.entity';

interface Props {
  userId?: number;
  current?: boolean;
}

const $q = useQuasar();

const props = withDefaults(defineProps<Props>(), {
  userId: 0,
  current: false,
});

const route = useRoute();
const authStore = useAuthStore();
const usersStore = useUsersStore();
const { user } = storeToRefs(authStore);
const modified = ref(false);

const userEdit = ref<User | null>(null);
const id = route.params.userId ? +route.params.userId : props.userId;

userEdit.value = route.params.userId ? usersStore.getUser(id) : user.value;

const birthday = ref(formatDate(userEdit.value?.birthday, 'YYYY/MM/DD'));

const submit = async () => {
  const userToSave = { ...userEdit.value } as User;
  userToSave.birthday = extractDate(birthday.value, 'YYYY/MM/DD').getTime();

  await usersStore.save(userToSave);
  authStore.save(userToSave);
  modified.value = false;
};
</script>

<style lang="scss" scoped>
.label {
  font-size: 18px;
  color: $light-text;
  margin-right: 5px;
}

.input {
  margin-top: 5px;
}
</style>

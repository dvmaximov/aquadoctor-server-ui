import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

export const useMessageStore = defineStore('message', () => {
  const $q = useQuasar();

  const error = (message: string) => {
    $q.notify({
      type: 'negative',
      message,
      timeout: 2000,
    });
  };

  const success = (message: string) => {
    $q.notify({
      type: 'positive',
      message,
      timeout: 2000,
    });
  };
  return { error, success };
});

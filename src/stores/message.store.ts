import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import eventBus, { EventType } from 'src/services/event.bus';

export const useMessageStore = defineStore('message', {
  state: () => {
    const q = useQuasar();
    const { t } = useI18n();

    eventBus.getData().subscribe((event) => {
      if (event.type == EventType.EVENT_MESSAGE_ERROR) {
        q.notify({
          type: 'negative',
          message: t(event.data.message),
          timeout: event.data.timeout || 2000,
        });
      }
      if (event.type == EventType.EVENT_MESSAGE_SUCCESS) {
        q.notify({
          type: 'positive',
          message: t(event.data.message),
          timeout: event.data.timeout || 2000,
        });
      }
    });
    return {
      q,
      t,
    };
  },
  actions: {
    error(message: string, timeout = 2000) {
      this.q.notify({
        type: 'negative',
        message: this.t(message),
        timeout,
      });
    },
    success(message: string, timeout = 2000) {
      this.q.notify({
        type: 'positive',
        message: this.t(message),
        timeout,
      });
    },
  },
});

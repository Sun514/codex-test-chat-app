import { config } from '@vue/test-utils';

config.global.stubs = {
  Transition: false,
  'primevue/message': {
    template: '<div><slot /></div>'
  },
  Button: {
    template: '<button><slot /></button>'
  }
};

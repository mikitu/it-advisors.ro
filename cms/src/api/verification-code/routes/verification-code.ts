export default {
  routes: [
    {
      method: 'POST',
      path: '/verification-codes/send',
      handler: 'verification-code.sendCode',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/verification-codes/verify',
      handler: 'verification-code.verifyCode',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/verification-codes/orders',
      handler: 'verification-code.getOrders',
      config: {
        auth: false, // We handle auth via JWT in the controller
        policies: [],
        middlewares: [],
      },
    },
  ],
};


const admin = require("firebase-admin");
// path to service account

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "crm-indusianassist",
    "private_key_id": "08bc4ff888acfd14b8bcb6cc16325ad44e60b54f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJnDOZ8NcsMIjt\nvIbo8pXq0gTgI4oWhC0b/IKo/AtP908bNYYa+/pAGqOpOW2GpJoOsoq8bojVrLFj\nWE0k3EjfC13Q2Rqw81ZqMo1g0fbxrqdy4Xgi5d21tYOnzSaUheK7dMbYFvIdcJL9\nzVK0bMkd5HF3An5fb+ux0oI6CVtG7JAaDn11xt3/FrkAbMkklJCHvRH4IN0pZtSd\nZY5JwvO2i/85+0M747wq86ca+/AmLXjXmg8O6iKnFs+x6WNArkjXaIpaKa0ZFrp/\nKOZlTT6T40eRyOD8/2/5q4hDvkfM+v4RzuyC7Zo7OIy8n1HAo+cJ4fqueS/sWwZl\nIQftfImhAgMBAAECggEACmmiL2KlTVmoH821cs9xI2CzmmMxgwhSd1whQDKsz6Vu\ncTGAbrE6D4CkuGUwOUST9Zt+b30evXjy7DZrvRIwxA7Pao2E+7PEsD1SSJhtinXW\nnYgEOzqvqs5wOVzez8vSrhN53+AfAvrdB6VYrruB32SsoMy428thMyTj/5T7QTBY\nBeb+QacKGI8JVUA3PxqvK/IAtKJY1dROSyuXREqf3X5VpKkGJRopUT6bbvFiu6PQ\nztcDONwA/O1XirlN/YzKWSINPgge8w87mZM4ba5Ydtdwycm3JgFuwC0Ewqa45L1U\nkP7d6AsAhhlE6umfKx6z+47que7t+yjzpGgieru8UQKBgQDquySlH9PUs2hbXNij\nbhj4qdff4D4zlyX3bBpXIAURZz3VnxKWh44Hgak0vj7skEpRFBJJkvHi8lDBGOG9\n6GQOQRM7Z2KOYhuqb1k22vdvaKImZsqAx3jyMO79U4wLfVFenRdNC6soI6OPTS7Q\n1ZDWnqk+7ploF39a/zFOSzs2UQKBgQDb4MghKvHDzlqKaQf5H1tA/mFViRHCgJjJ\nTZuZHYakVavx/Nbxt+/uGfbpdbv0vto/tpKzRXghYgkj406tK2tBL+vDk3MIaJpO\n1i3bT3QylRz+++JV2YW8C27XJym/S2CO5Do7h580BhRTGTAMsQSLZAyE6KRkcIhb\nYrN899I6UQKBgG4gDMo3i2+AGFa80ZqjPa30KSaMk0IrCJHzMsxrZlVK5ZTCg7sB\nr93PtC3dj7H25Bbz3ryL51X9L2vYm5g4XjDd0QMOtwtr9eTZRrbYtjubkG+JzDns\n285srMNHHi4JxlIoS1VHQy6awdKqeGtbtw8p8udmk6xlUcfEcEJ2QzpxAoGAFyO7\nzAnJ8bJYwvI0vZn4L4nV0nufW9nOunipZF7AGbFObCQQttWFsYgX/Q+/3QzsyQG8\nxJMOBm1byuQUFpNYMT8Kz8VHuN3RR3Sw1MCy2NPqfkch1akTsut9GbVsZk5XdhI8\nsqEeNwpgvzIKZXuHn+fCjYYyLsPNBdkITKGEBVECgYANIhw72y8KPwNmvGuqPfhV\nldjfn5pGliPNJyuHP3bs0qdmMQ1z617ue4aajNvDCR3Ezdt82/xm8uTRGTbHH9W0\n27dqqv08vLQwPPJNsoPFbxaXx/K6/Q+aPdoktFc/ujfslnC9YZyiokMnCPMFirKy\nfmgHo8xX+B9DkG3kVujzFQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-6h4fn@crm-indusianassist.iam.gserviceaccount.com",
    "client_id": "115584325939248250836",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6h4fn%40crm-indusianassist.iam.gserviceaccount.com"
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;

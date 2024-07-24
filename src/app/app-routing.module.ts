import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: '',
    redirectTo: 'user-register',
    pathMatch: 'full'
  },
  {
    path: 'user-register',
    loadChildren: () => import('./user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'popup-model',
    loadChildren: () => import('./popup-model/popup-model.module').then( m => m.PopupModelPageModule)
  },
  {
    path: 'date-list',
    loadChildren: () => import('./date-list/date-list.module').then( m => m.DateListPageModule)
  },
  {
    path: 'start-screen',
    loadChildren: () => import('./start-screen/start-screen.module').then( m => m.StartScreenPageModule)
  },
  {
    path: 'bio-model',
    loadChildren: () => import('./bio-model/bio-model.module').then( m => m.BioModelPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const Constants = {
  // live (1) url's
  apiOAuthEndpoint: "https://public.visitchecklist.com/o/token/",
  apiEndpoint_: "http://admin.groceries.lk/api/",
  // apiEndpoint: 'https://public.visitchecklist.com/api/',
  // apiEndpoint: 'http://wasd.com:7788/api/',

  webClientId: "1061674504137-0teq8r3fmkhplt4f72ud4inuheim9fvb.apps.googleusercontent.com",

  ACCESS_TOKEN: "LOGIN_ACCESS_TOKEN",
  REFRESH_TOKEN: "LOGIN_REFRESH_TOKEN",
  DEV_TOKEN: "DEV_TOKEN",

  USER_TP_NUMBER: "USER_TP_NUMBER",

  PRIMARY_COLOR: "PRIMARY_COLOR",

  LAST_PAGE: "LAST_PAGE",

  SELECTED_TENANT: "SELECTED_TENANT",
  SELECTED_USER_NAME: "SELECTED_USER_NAME",
  USER_FIRST_NAME: "USER_FIRST_NAME",
  SELECTED_TENANT_URL: "SELECTED_TENANT_URL",
  SELECTED_TENANT_OBJ: "SELECTED_TENANT_OBJ",
  MEDIA_ROOT: "https://cbts-assets.s3.amazonaws.com",
  RUN_SERVER: "RUN_SERVER",

  DEFAULT_PRIMARY_COLOR: {
    color_1: "#b679b2",
    color_2: "#A372AE",
    color_3: "#9A6EAD",
    color_4: "#976AAE",
    color_5: "#7560A6",
    color_6: "#7560A6",
    color_7: "#6359A3",
    color_8: "#5a56a2",
  },

  NOTIFICATION_DETAILS: {
    NOTIFICATION_ID: "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
    TRANSTIONS_ENTER: "1",
    NOTIFICATION_TITLE: "You have arrived to ",
    NOTIFICATION_BODY: "Please open application to view your visit checklist",
  },

  USER_TYPES: {
    DOC: "DOCTOR",
    PATIENT: "PATIENT",
  },

  USER_TYPE: "USER_TYPE",
  PIN_OBJ: "PIN_OBJ",

  EVENT_REFRESH: "EVENT_REFRESH",
  SELECTED_USER: "SELECTED_USER",

  // -----------------------local server -----------------------

  HTTP: "http://",
  // CLIENT_SECRET: "0S5Qk95JuKPdL4LbCYkK79lwaUJnPlBuFulS0yXrYjNnyY6JblvvGzDBR9HmkNuUN46L5fj9vIQ6q9im9O8oCTBDcmaZUAfgQeesPhhkK0YLd3uKHQXjB5jeu0UBJCee",
  // CLIENT_ID: "5jwLBDXdeznOuUy42QbobCCCdmfiKYWsXdwFB8oo",
  apiEndpoint_local: "http://vcl.mtechlanka.com:8055/api/",

  // ----------------------- live server -----------------------

  HTTPS: "https://",
  CLIENT_SECRET:
    "ZlbjSNy8CQlZmNV0FJRWTaZmZWXNTie58WmaOXn3hRGtvBycfuOq9VovqY7UoFnvKtHKmkiJ5v4eRsMbdNgKsNa507NIdbORWcofJ0TeHNJVo5Vf6oOI8qOjmrEpuGGc",
  CLIENT_ID: "5jwLBDXdeznOuUy42QbobCCCdmfiKYWsXdwFB8oo",
  apiEndpoint: "https://public.visitchecklist.com/api/",

  B64fortset:
    "ckpvYVFvMVFVaVhia2MxTnQzSmVOeVhMUkc1TEtjSGtvVDR5T0cyVDp6YXMwRlNrVUxZUEwyak1KcmJJNUpFS2lwTU9Fd0dJajRDdkZ6akJrN2VxMFFtZVV3Z2EwbmVxTVFNSzQ4WXppT3pnZEpzVVJvWGJMc3hnWUdkYTc1SnU0cGJNdUMxMXRZQVVOa2Rwb1hzeGJrZktVMFhRNlpOUWxBV1p1QkxSMA==",

  COMMON_LOADING: "COMMON_LOADING",

  // request methods list
  METHODS: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
  },

  // request content Types
  CONTENT_TYPES: {
    APPLICATION_FORM: "application/x-www-form-urlencoded",
    APPLICATION_JSON: "application/json",
    X_SKIP_INTERCEPTOR: "X-Skip-Interceptor",
  },

  PAGE: {
    LIMIT: 20,
  },
};

import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Contacts } from './contacts/contacts';
import { Political } from './political/political';
import { Sport } from './sport/sport';
import { It } from './it/it';
import { Settings } from './settings/settings';
import { Business } from './business/business';

export const routes: Routes = [
     {
    path: '',
    component: Homepage,
  },
    {
    path: 'contacts',
    component: Contacts,
  },
    {
    path: 'political',
    component: Political,
  },
    {
    path: 'sport',
    component: Sport,
  },
    {
    path: 'it',
    component: It,
  },
      {
    path: 'settings',
    component: Settings,
  },
      {
    path: 'business',
    component: Business,
  }
  
];

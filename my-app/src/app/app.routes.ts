import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Update } from './update/update';
import { Contacts } from './contacts/contacts';
import { Political } from './political/political';
import { Sport } from './sport/sport';
import { It } from './it/it';

export const routes: Routes = [
     {
    path: '',
    component: Homepage,
  },
  {
    path: 'update',
    component: Update,
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
  }
  
];

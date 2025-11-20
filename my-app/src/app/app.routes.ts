import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Update } from './update/update';
import { Contacts } from './contacts/contacts';

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
  }
];

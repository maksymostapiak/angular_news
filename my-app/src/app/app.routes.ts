import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Contacts } from './contacts/contacts';
import { Settings } from './settings/settings';
import { Category_news } from './category-news/category-news';
import { NotFound } from './not-found/not-found';

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
    path: 'settings',
    component: Settings,
  },
      {
    path: 'category-news/:type',
    component: Category_news,
  },
  { path: '**', component: NotFound }
  
];

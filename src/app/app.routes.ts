// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { FichaListComponent } from './pages/ficha-list/ficha-list';
import { FichaComponent } from './pages/ficha/ficha';
import { ProgrammingComponent } from './pages/programming/programming';
import { DatabasesComponent } from './pages/databases/databases';
import { TerminalComponent } from './pages/terminal/terminal';

import { AboutComponent } from './pages/about/about';
import { CategoriesComponent } from './pages/categories/categories';
import { SnippetsComponent } from './pages/snippets/snippets';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { UserComponent } from './pages/user/user';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/programming', component: ProgrammingComponent },
  { path: 'categories/databases', component: DatabasesComponent },
  { path: 'categories/terminal', component: TerminalComponent },
  { path: 'chuletas', component: FichaListComponent },
  { path: 'chuletas/:id', component: FichaComponent },

  { path: 'snippets', component: SnippetsComponent },
  { path: 'about', component: AboutComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'user', component: UserComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' },
];

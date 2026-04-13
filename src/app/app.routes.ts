import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  
  // These map the paths to your generated components
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  
  // A catch-all route just in case someone types a wrong URL
  { path: '**', redirectTo: '/home' }
];

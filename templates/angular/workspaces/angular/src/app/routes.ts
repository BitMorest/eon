import { Route } from "@angular/router";
import { SidebarLayoutComponent } from "@bitmorest/eon-angular";

export const routes: Route[] = [
    // Using bellow for layout out without sidebar
    // {
    // 	path: '',
    // 	component: FramelessLayoutComponent,
    // 	children: [{path: 'active', component: SettingsComponent}],
    // },

    // Using bellow for layout with sidebar
    {
        path: '',
        component: SidebarLayoutComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: '/home'},
            {path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
            {path: 'settings', loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)},
            {path: 'examples', loadChildren: () => import('./components/examples/examples.module').then(m => m.ExamplesModule)},
            {path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule)},
        ],
    },
    
]
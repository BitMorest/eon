import { Route } from "@angular/router";
import { SidebarLayoutComponent } from "@bitmorest/eon-angular";
import { AboutComponent } from "./components/about/about.component";
import { ExamplesComponent } from "./components/examples/examples.component";
import { HomeComponent } from "./components/home/home.component";
import { SettingsComponent } from "./components/settings/settings.component";

export const routes: Route[] = [
    {
        path: '',
        component: SidebarLayoutComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: '/home'},
            {path: 'home', component: HomeComponent},
            {path: 'settings', component: SettingsComponent},
            {path: 'examples', component: ExamplesComponent},
            {path: 'about', component: AboutComponent},
        ],
    },
    // Using bellow for layout out without sidebar
    // {
    // 	path: '',
    // 	component: FramelessLayoutComponent,
    // 	children: [{path: 'active', component: SettingsComponent}],
    // },
]
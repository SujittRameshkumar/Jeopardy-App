import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PopularComponent } from './popular/popular.component';
import { RandomComponent } from './random/random.component';
import { HomeComponent } from './home/home.component';
import { CluePageComponent } from './clue-page/clue-page.component';


const appRoutes: Routes = [
{path: 'about', component: AboutComponent},
{path: 'popular', component: PopularComponent},
{path: 'random', component: RandomComponent},
{path: 'home', component: HomeComponent},
{path: 'clue-component', component: CluePageComponent},
{path: '', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
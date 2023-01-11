import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./shared/auth-util/auth.guard";
import {MainComponent} from "./main-page/main/main.component";
import {AuthComponent} from "./login-page/auth/auth.component";

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true, enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

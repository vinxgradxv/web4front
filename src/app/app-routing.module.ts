import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserFormComponent} from "./login-page/user-form/user-form.component";
import {AuthGuard} from "./shared/auth-util/auth.guard";
import {MainComponent} from "./main-page/main/main.component";

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

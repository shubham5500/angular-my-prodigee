//Modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatSnackBarModule,
         MatInputModule,
         MatProgressBarModule,
         MatDialogModule,
         MatSelectModule,
         MatOptionModule} from '@angular/material';
import { RouterModule , Routes } from '@angular/router';
import * as Chart from 'chart.js';
import * as $ from 'jquery';
// Services
import { LoginService } from './services/login.service';
import { UserServices } from './services/user.services'
import { LoginGuardGuard } from './login-guard.guard';
//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { QuizTestComponent } from './quiz-test/quiz-test.component';
import { LoginComponent } from './login/login.component';
import { SubmoduleComponent } from './submodule/submodule.component';
import { FirstSlideComponent } from './first-slide/first-slide.component';
import { SecondSlideComponent } from './second-slide/second-slide.component';
import { CategoryComponent } from './category/category.component';
import { VideosComponent } from './videos/videos.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { ReadingMaterialComponent } from './reading-material/reading-material.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { MainDialogComponent } from './main-dialog/main-dialog.component';
import { KnowMoreComponent } from './know-more/know-more.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ArticleComponent } from './article/article.component';

const routes = [
  {
      path: '' ,
      component: LoginComponent,
      pathMatch: 'full'
  },
  {
      path: 'login' ,
      component: LoginComponent
  },
  {
      path : 'dashboard' ,
      canActivate: [LoginGuardGuard],
      component : DashboardComponent
  },
  {
    path : 'submodule/:id',
    canActivate: [LoginGuardGuard],
    component : SubmoduleComponent
  },
  {
    path : 'category/:submoduleId',
    canActivate: [LoginGuardGuard],
    component : CategoryComponent
  },
  {
    path : 'video/:submoduleId/:classId',
    canActivate: [LoginGuardGuard],
    component: VideosComponent
  },
  {
    path : 'quiz/:submoduleId/:classId',
    canActivate: [LoginGuardGuard],
    component: QuizComponent
  },
  {
    path : 'activities/:submoduleId/:classId',
    canActivate: [LoginGuardGuard],
    component: ActivitiesComponent
  },
  {
    path : 'assignment/:submoduleId/:classId',
    canActivate: [LoginGuardGuard],
    component: AssignmentComponent
  },
  {
    path : 'reading-material/:submoduleId/:classId',
    canActivate: [LoginGuardGuard],
    component: ReadingMaterialComponent
  },
  {
    path : 'article/:submoduleId/:classId',
    canActivate: [LoginGuardGuard],
    component: ArticleComponent
  },
  {
    path : 'know-more/:submoduleId/:classId',
    component : KnowMoreComponent,
    canActivate : [LoginGuardGuard]
  },
  {
    path : 'quiz-test/:quizId',
    canActivate: [LoginGuardGuard],
    component : QuizTestComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    QuizComponent,
    QuizTestComponent,
    LoginComponent,
    SubmoduleComponent,
    FirstSlideComponent,
    SecondSlideComponent,
    CategoryComponent,
    VideosComponent,
    ActivitiesComponent,
    AssignmentComponent,
    ReadingMaterialComponent,
    VideoDialogComponent,
    MainDialogComponent,
    KnowMoreComponent,
    ForgotPasswordComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    Ng2CarouselamosModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    HttpModule,
    MatSelectModule,
    MatOptionModule,
    RouterModule.forRoot(
      routes
    )
  ],
  entryComponents: [VideoDialogComponent , MainDialogComponent],
  providers: [
    LoginService,
    UserServices,
    LoginGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

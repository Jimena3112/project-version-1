import { Routes } from '@angular/router';
import { ChatComponent } from "./public/pages/chat/chat.component";
import { InspectorsComponent } from "./public/pages/inspectors/inspectors.component";
import { ReviewsComponent } from "./public/pages/reviews/reviews.component";
import { HomeComponent } from "./public/pages/home/home.component";
import { RestaurantsComponent } from "./public/pages/restaurants/restaurants.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { IssueManagementComponent } from "./issue-resolutions/pages/issue-management/issue-management.component";

export const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'inspectors', component: InspectorsComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'issue-resolutions/issues', component: IssueManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

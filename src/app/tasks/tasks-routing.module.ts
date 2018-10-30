import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent, TaskFormComponent } from './components';

const metaTags = [
  {
    name: 'description',
    content: 'Task Manager Application. This is an ASP application'
  },
  {
    name: 'keywords',
    content: 'Angular 7 tutorial, SPA Application, Routing'
  },
  {
    name: 'twitter:title',
    content: 'Angular 7 tutorial, SPA Application, Routing'
  },
  {
    name: 'twitter:image',
    content:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'
  },
  {
    name: 'twitter:url',
    content: 'https://my-site.my-hosting.com'
  },
  {
    name: 'twitter:description',
    content: 'Task Manager Application. This is an ASP application'
  },
  {
    name: 'twitter:card',
    content: 'summary'
  },
  {
    name: 'twitter:site',
    content: '@Tutor'
  }
];

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    data: {
      title: 'Task Manager',
      meta: metaTags
    }
  },
  {
    path: 'add',
    component: TaskFormComponent
  },
  {
    path: 'edit/:taskID',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}

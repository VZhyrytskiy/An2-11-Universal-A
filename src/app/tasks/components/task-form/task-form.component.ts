import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Title,
  Meta,
  TransferState,
  makeStateKey
} from '@angular/platform-browser';

// rxjs
import { switchMap, tap } from 'rxjs/operators';

import { TaskModel } from './../../models/task.model';
import { TaskPromiseService } from './../../services';
import { of } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: any,
    private transferState: TransferState
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();

    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          // edit form
          if (params.has('taskID')) {
            const taskId = params.get('taskID');
            const transferKey = makeStateKey<TaskModel>(`task-${taskId}`);

            // if there is something in transfer state use it
            if (this.transferState.hasKey(transferKey)) {
              // take it. second param is a default value
              const task = this.transferState.get<TaskModel>(transferKey, null);
              // remove it from transfer state
              this.transferState.remove(transferKey);
              // return result
              return of(task);
            }
            // if there is nothing in transfer state call server api
            else {
              return this.taskPromiseService
                .getTask(+params.get('taskID'))
                .then(task => {
                  // if platform is server, additianally save data to transfer state
                  if (isPlatformServer(this.platformId)) {
                    this.transferState.set(transferKey, task);
                  }

                  return task;
                });
            }
          }

          // add form
          else {
            return Promise.resolve(null);
          }
        })
      )
      .subscribe(
        // when Promise.resolve(null) => task = null => {...null} => {}
        task => {
          this.task = { ...task };
          this.titleService.setTitle(`Task: ${this.task.action}`);
          this.metaService.addTag({
            name: 'description',
            content: `Task: ${this.task.action}, hours: ${this.task.estHours}`
          });
        },
        err => console.log(err)
      );
  }

  onSaveTask() {
    const task = { ...this.task };

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}

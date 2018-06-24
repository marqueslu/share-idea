import { Component, AfterViewInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoaderService } from './services/loader-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements AfterViewInit {
  
  @BlockUI() blockUI: NgBlockUI;
  isCollapsed: boolean = true;
  
  constructor(private loader: LoaderService) {
  }

  ngAfterViewInit(): void {
    this.loader.carregarConfirmado.subscribe(res => {
      this.blockUI.start(res);
    });

    this.loader.pararConfirmado.subscribe(res => {
      this.blockUI.stop();
    });
  }
}

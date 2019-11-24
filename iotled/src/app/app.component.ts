import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from './led';
import { LedService } from './led.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '智能灯控';
  leds$: Observable<Device[]>;

  constructor(private ledService: LedService) {

  }

  ngOnInit(): void {
    this.leds$ = <Observable<Device[]>>
      this.ledService.getLeds();
  }

  changeLed(led: Device) {
    this.ledService.
      changeLed(led.id, led.customer_status === 0 ? 1 : 0).
      subscribe((value: any) => {
        if (value.succ) {
          alert('修改成功！');
        }
      });
  }
}

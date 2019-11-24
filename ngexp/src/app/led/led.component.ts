import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Observable, timer } from 'rxjs';
import { Device } from '../led';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css']
})
export class LedComponent implements OnInit {
  leds$: Observable<Device[]>;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.leds$ = <Observable<Device[]>>this.deviceService.getLeds();
  }

  changeLed(led: Device) {
    this.deviceService.changeLed(led.id, led.customer_status === 0 ? 1 : 0).subscribe(
      (value: any) => {
        if (value.succ) {
          timer(2000).subscribe(
            () => {
              this.leds$ = <Observable<Device[]>>this.deviceService.getLeds();
            }
          );
        }
      }
    );

    return false;
  }
}

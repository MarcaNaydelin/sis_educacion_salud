import { Component , OnInit} from '@angular/core';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor(private _sessionService: SessionService) {}

  ngOnInit() {
    this._sessionService.loadSession();
  }
}

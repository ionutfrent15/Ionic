import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() username: string;
  @Input() password: string;
  token: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.username, this.password)
        .subscribe(
            (response) => {
              this.token = localStorage.getItem('token');
              localStorage.setItem('user', this.username);
              this.router.navigate(['']);
            },
            (error) => console.log(error)
        );

  }
}

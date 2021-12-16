import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario =  {
    email: "",
    password: ""
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  IngresarGoogle() {
    const {email, password} = this.usuario;
    this.authService.loginGoogle(email, password).then(res => {
        console.log("Usuario Registrado: ", res)
    });
  }

  CerrarSesion() {
    this.authService.logout()
  }
}
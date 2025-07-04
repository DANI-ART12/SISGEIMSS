import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './registro-funcionarios.component.html'
})
export class RegistroFuncionariosComponent implements OnInit {
  datos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/pliegos/funcionarios.json').subscribe(data => {
      this.datos = data;
    });
  }
}

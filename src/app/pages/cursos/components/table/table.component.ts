import { Component } from '@angular/core';
import { CursoService } from 'src/app/services/curso/curso.service';
import { Curso } from 'src/app/models/curso/curso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cursos-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  public cursos: Curso[] = [];
  //cols!: any[];

  public formularioCurso: FormGroup;
  public accion: string = 'Editar';
  public flag: boolean = false;
  public cursoSeleccionado?: Curso;

  constructor(fb: FormBuilder, private cursoService: CursoService) {
    this.formularioCurso = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['$', Validators.required]
    })
  }

  ngOnInit() {
    this.cursoService.cursos.subscribe(resp => {
      this.cursos = resp;
    })

    // this.cols = [
    //   { field: 'id', header: 'Codigo' },
    //   { field: 'nombre', header: 'Nombre' },
    //   { field: 'precio', header: 'Precio' },
    //   { field: 'descripcion', header: 'Descripción' }
    // ];
  }

  update(cursoSelecionado: Curso) {
    this.cursoSeleccionado = cursoSelecionado;
    this.accion = 'Editar';
    this.flag = true;

    this.formularioCurso.setValue({
      nombre: cursoSelecionado.nombre,
      descripcion: cursoSelecionado.descripcion,
      precio: cursoSelecionado.precio
    })
  }

  delete(id: string) {
    this.cursoService.deleteCurso(id).then(() => {
      alert('Curso eliminado')
    });
  }
}
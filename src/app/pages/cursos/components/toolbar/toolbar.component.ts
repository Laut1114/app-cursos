import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso/curso';
import { CursoService } from 'src/app/services/curso/curso.service';


@Component({
  selector: 'cursos-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public formularioCurso: FormGroup;
  public cursos: Curso[] = [];
  public accion: string = 'Agregar';
  public flag: boolean = false;
  public cursoSeleccionado?: Curso;


  // private fb: FormBuilder, private cursoService: CursoService
  constructor(fb: FormBuilder, private cursoService: CursoService) {
    this.formularioCurso = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['$', Validators.required]
    })
  }

  ngOnInit() {
    
  }

  guardarCurso() {
    if (this.flag == true) {
      alert("Quiero Editar");
      this.cursoService.updateCurso(this.cursoSeleccionado!.id, this.formularioCurso.value);
    }
    else {
      console.log(this.formularioCurso.value);
      if (!this.formularioCurso.invalid) {

        this.cursoService.crearCurso(this.formularioCurso.value);
        this.formularioCurso.reset;

        console.log("Curso Creado")

      }
      else {
        alert('EL FORMULARIO ES INVALIDO \n *por favor complete los datos')
      }
    }
    // const curso: any = {
    //   nombre: this.formularioCurso.value.nombre,
    //   descripcion: this.formularioCurso.value.descripcion,
    //   precio: this.formularioCurso.value.precio,
    //   fechaCreacion: new Date()
    // }

    // this.cursoService.crearCurso(curso).then(() => {
    //   console.log("Curso creado")
    // })
  }
}
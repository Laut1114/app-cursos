import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  public cursos!: Observable<Curso[]>; //Colección de Cursos
  private cursoCollection!: AngularFirestoreCollection<Curso>;//Referencia a firestore
  public pathImage: string = '';
  constructor(private firestore: AngularFirestore) {
    this.cursoCollection = firestore.collection<Curso>('cursos');
    console.log(this.cursoCollection);
    this.obtenerCursos();
  }

  //Obtener productos
  obtenerCursos() {
    this.cursos =  this.cursoCollection!.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as Curso))
    )
  }

  /**
   * Recibimos un producto y lo agregamos a la base de datos
   * @param curso  
   * @returns Promesa 
   */

  public crearCurso(curso: Curso): Promise<void> {
    return new Promise(async(resolve, reject) => {
      try {
        const id = this.firestore.createId();
        curso.id = id;

        const result = await this.cursoCollection?.doc(id).set(curso);
        console.log(result)
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })
  }

  // crearCurso(curso:any) : Promise<any>{
  //   return this.firestore.collection('cursos').add(curso)
  // }

  public getProductoById(prodId: string) {
    return this.firestore.collection('cursos').doc(prodId).snapshotChanges();
  }


  public updateCurso(prodId: string, data: any) {
    return this.firestore.collection('cursos').doc(prodId).update(data);
  }


  public deleteCurso(proId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.cursoCollection?.doc(proId).delete();
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}

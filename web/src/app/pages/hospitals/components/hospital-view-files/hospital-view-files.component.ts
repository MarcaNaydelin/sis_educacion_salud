import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HospitalService } from '../../services/hospital.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-view-files',
  templateUrl: './hospital-view-files.component.html',
  styleUrls: ['./hospital-view-files.component.scss']
})
export class HospitalViewFilesComponent implements OnInit{

  @Input() hospital_id: number;

  carousel_images;

  constructor(
    public bsModalRef: BsModalRef,
    private _hospitalService: HospitalService,
    private _toastrService: ToastrService
  ){}

  ngOnInit(): void {
    this.getListOfImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['carousel_images']) {
      console.log('Imágenes cambiadas:', this.carousel_images);
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
  getListOfImages() {
    this._hospitalService.listImages(this.hospital_id).subscribe({
      next: (resp:any) => {
        this.carousel_images = resp.data;
      },
      error: (error) => {
        this._toastrService.error(error["messages"], "Error!");
      },
      complete:() =>{

      },
    })
  }

  deleteImage(image) {
    Swal.fire({
      title:'Estas seguro de eliminar el registro?',
      text: 'No se revertira esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si eliminar!',
      cancelButtonText: 'No cancelar'
    }).then(result =>{
      if(result.value) {
        this._hospitalService.destroyImage(image.id).subscribe({
          next: (resp:any) => {
            this._toastrService.success(resp["message"]);
          },
          error: (error) => {
            this._toastrService.error(error["messages"], "Error!");
          },
          complete:() =>{

          },
        })
      }
    });

  }
}

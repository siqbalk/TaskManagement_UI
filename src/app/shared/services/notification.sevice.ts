import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

   success(msg: string) {
    return Swal.fire({
      title: 'Success!',
      text: msg,
      icon: 'success',
      timer: 3000,
      confirmButtonText: '  Ok  ',
      confirmButtonColor: '#5BAB54',
    })
  }

  error(msg: string) {
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      timer: 3000,
      confirmButtonText: '  Ok  ',
      confirmButtonColor: '#F15E5E',
    })
  }

  delete(msg?: string) {
    return Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete this record? \n This process cannot be undone.`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#F15E5E',
    })
  }
  warning(msg?: string) {
    return Swal.fire({
      title: 'Are you sure?',
      text: msg,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#F15E5E',
    })
  }
}

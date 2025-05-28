import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userGuardGuard: CanActivateFn = () => {

  const router=inject(Router)
  if (sessionStorage.getItem('token')&&sessionStorage.getItem('user')){

    let user=JSON.parse(sessionStorage.getItem('user')||'')

    if(user.role=="User"){
      return true
    }
    else{
      router.navigateByUrl('/login')
      return false
    }

  }
  else{
    router.navigateByUrl('/login')
    return false
  }
};

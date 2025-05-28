import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const adminGuardGuard: CanActivateFn = () => {
  const router=inject(Router)
  if (sessionStorage.getItem('token')&&sessionStorage.getItem('user')){

    let user=JSON.parse(sessionStorage.getItem('user')||'')

    if(user.role=="Admin"){
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

<?php

namespace App\Http\Middleware;
use Closure;

class ManagersMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = 'user')
    {
        $user = auth()->guard($guard)->user();
        if(!auth()->guard($guard)->check()){
            return redirect('/vadmin/login');
        }

        if(auth()->guard($guard)->user()->status == 0){
            return redirect('/vadmin/login')->with('message','Su usuario está inactivo');
        };
        
        if($user->role == '1' || $user->role == '2' || $user->role == '4')
        {
            return $next($request);
        } 
        else
        {
            return redirect('/')->with('message', 'Acceso no autorizado');
        }
       
    }
}

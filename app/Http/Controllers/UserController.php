<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function index(){

//        $users=User::paginate(2);
//        $users=User::with('pictures')->paginate(2);
        $users=User::with('pictures')->get();
//        $users=User::all();

        return inertia('Users/Index',[
            'users'=>$users,
        ]);

    }

    public function edit(Request $request){


//        dd($request->id);
        $user=User::find($request->id);
//        dd($user);

        return inertia('Users/Edit',[
            'user'=>$user
        ]);
    }

    public function update(Request $request, $id){

//        dd($id);
//        dd($request->password);
//        dd($request->email);
        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'password'=>'required|min:8'
        ],[
            'name'=>'Vardą įvesti būtina',
            'email'=>'El.paštą įvesti būtina',
            'password.required'=>'Slaptažodį įvesti būtina',
            'password.min'=>'Būtina min 8 simboliai',
        ]);
        $user = User::find($id);
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=password_hash($request->password,PASSWORD_DEFAULT) ;
        $user->save();
//        dd($user);

        if (Auth::user()->type==1) {
            return to_route('users.index');
        }
        if (Auth::user()->type==0) {
            return to_route('users.myProfile');
        }

    }

    public function destroy(Request $request, $id)
    {
        $user = User::find($id);
//        dd($user);
//        $tasks = $user->tasks;
//        dd($tasks);
        $pictures=$user->pictures;
//        dd($pictures[1]);

        foreach ($pictures as $picture) {
            unlink(storage_path() . "/app/public/users/" . $picture->name);
            $picture->delete();
        }

//        foreach ($tasks as $task) {
//            $task->users()->detach($id);
//        }

        $user->delete();
        return redirect()->route("users.index");

    }

    public function myProfile(){

//        dd(Auth::user()->id);
        $id=Auth::user()->id;
//        $user=User::find($id)->with('pictures');
//        $users=User::with('pictures')->get();
//        $users=User::all();
//        dd($users);
        $user = User::find($id);
        $pictures = $user->pictures;
        return inertia('Users/MyProfile',[
            'user'=>$user,
            'pictures'=>$pictures
        ]);

    }


}

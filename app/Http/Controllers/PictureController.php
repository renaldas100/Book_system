<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
//        dd($request->id);
//        dd($request->file());
//        dd($request->file('picture')->getClientOriginalName());
        $request->file('picture')->store('/public/users');
//        dd($request->file('picture')->hashName());
        $picture=new Picture();
        $picture->name=$request->file('picture')->hashName();
        $picture->user_id=$request->id;
//        dd($picture);
        $picture->save();


        if (Auth::user()->type==1) {
            return to_route('users.index');
        }
        if (Auth::user()->type==0) {
            return to_route('users.myProfile');
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Picture $picture)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Picture $picture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Picture $picture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Picture $picture, $id)
    {
//        dd($id);
        $picture=Picture::find($id);
//        dd($picture);
        unlink(storage_path()."/app/public/users/".$picture->name);
        $picture->delete();

        if (Auth::user()->type==1) {
            return to_route('users.index');
        }
        if (Auth::user()->type==0) {
            return to_route('users.myProfile');
        }


    }

    public function addPicture(Request $request){
//        dd($request->id);
        $user=User::find($request->id);
//        dd($user);

        return inertia('Pictures/AddPicture',[
            'user'=>$user
        ]);
    }

}

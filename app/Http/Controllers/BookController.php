<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Books/Index', [
            "books"=>Book::with("user","category")->get()
//            "books"=>Book::all()
//            "hotels"=>Hotel::with("country","users")->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Books/Create',[
            'categorys'=>Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'summary'=>'required',
            'isbn'=>'required',
            'pages'=>'required',
            'category_id'=>'required'
        ],[
            'name'=>'Pavadinimą įvesti būtina',
            'summary'=>'Santrauką įvesti būtina',
            'isbn'=>'ISBN įvesti būtina',
            'pages'=>'Puslapių skaičių įvesti būtina',
            'category_id'=>'Kategoriją įvesti būtina',
        ]);

        $request->file('picture')->store('/public/books');

        $book=new Book();
        $book->name=$request->name;
        $book->summary=$request->summary;
        $book->isbn=$request->isbn;
        $book->picture=$request->file('picture')->hashName();
        $book->pages=$request->pages;
        $book->category_id=$request->category_id;
        $book->save();

        return to_route('books.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return inertia('Books/Edit', [
            'book'=>$book,
            'categorys'=>Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
//        dd($request->name);

        $request->validate([
            'name'=>'required',
            'summary'=>'required',
            'isbn'=>'required',
            'pages'=>'required',
            'category_id'=>'required'
        ],[
            'name'=>'Vardą įvesti būtina',
            'summary'=>'Santrauką įvesti būtina',
            'isbn'=>'ISBN įvesti būtina',
            'pages'=>'Puslapių skaičių įvesti būtina',
            'category_id'=>'Kategoriją įvesti būtina',
        ]);

        $book->name=$request->name;
        $book->summary=$request->summary;
        $book->isbn=$request->isbn;

        if($request->file('picture')!=null) {
            if($book->picture!=null) {
                unlink(storage_path() . "/app/public/books/" . $book->picture);
            }
            $request->file('picture')->store('/public/books');
            $book->picture=$request->file('picture')->hashName();
        }

        $book->pages=$request->pages;
        $book->category_id=$request->category_id;
        $book->save();

        return to_route('books.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {

        if($book->picture!=null) {
            unlink(storage_path() . "/app/public/books/" . $book->picture);
        }

        $book->delete();
        return to_route('books.index');
    }

    public function storeUser($id, Request $request){

//        dd($id);
//        dd(Auth::user()->id);
        $user_id=Auth::user()->id;
//dd($user_id);
        $book=Book::find($id);
//        dd($book);
        $book->user_id=Auth::user()->id;
        $book->save();
//
//        $hotel=Hotel::find($id);
//        $hotel->users()->detach($user_id);
//        $hotel->users()->attach($user_id);
        return to_route("books.index");
    }
}

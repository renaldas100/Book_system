<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Categories/Index', [
            "categories"=>Category::all()

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Categories/Create',[
            "categories"=>Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

//        dd($request);
        $request->validate([
            'name'=>'required',
        ],[
            'name'=>'Pavadinimą įvesti būtina',
        ]);
        $category=new Category();
        $category->name=$request->name;
        $category->save();

        return to_route('categories.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('Categories/Edit', [
            'category'=>$category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name'=>'required',
        ],[
            'name'=>'Pavadinimą įvesti būtina',
        ]);

        $category->name=$request->name;
        $category->save();

        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $books = $category->books;
        if(count($books) > 0){
            foreach ($books as $book) {
                $book->delete();
            }
        }
        $category->delete();
        return to_route('categories.index');
    }
}

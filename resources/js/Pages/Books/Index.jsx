import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import '/resources/css/my.css';


export default function Index({books, auth}) {
    console.log(auth);
    console.log(books);





    const booksList=[];
    books.forEach((book)=>{
        if(auth.user.type==1 || book.user_id==0 || book.user_id==null || book.user_id==auth.user.id)
        booksList.push(
            <tr key={book.id}>
                <td>
                    {book.name}
                </td>
                <td>
                    {book.picture && (
                        <img height="100px" src={"/storage/books/" + book.picture} />
                    )}
                </td>
                <td>
                    {book.summary}
                </td>
                <td>
                    {book.isbn}
                </td>
                <td>
                    {book.pages}
                </td>
                <td>
                    {book.category.name}
                </td>
                { (auth.user!=null && auth.user.type==1) ?
                    <td>
                        {book.user!=null &&
                            <td>
                                <div>{book.user.name}</div>
                                <div>{book.user.email}</div>
                            </td>
                        }
                    </td>
                :""}
                <td>
                    { (auth.user!=null && auth.user.type==1) ?
                        <div>
                            <Link className="btn btn-warning "  href={ route("books.edit",book.id)} >Redaguoti</Link> &nbsp;
                            <button className="btn btn-danger "  onClick={ ()=>{ router.delete(route("books.destroy",book.id)); } }  >Ištrinti</button> &nbsp;
                        </div>
                        :
                       ""
                    }


                    { (auth.user!=null && auth.user.type==0 && book.user_id!=auth.user.id) ?
                        <div>
                            <Link className="btn btn-warning "  href={ route("books.storeUser",book.id)} >Pasirinkti</Link> &nbsp;
                        </div>
                        :
                        ""
                    }


                    { (auth.user.type==0 && book.user_id==auth.user.id) ?
                        <div>
                            <strong style={{color:"red"}}>JAU PASIRINKOTE</strong>
                        </div>
                        :
                        ""
                    }

                </td>
            </tr>)
    });
    return (
        <AppLayout>
            <div className={"col-md-12 mt-5"}>
                <div className={"card"}>
                    <div className={"card-header"}>Knygų sąrašas</div>
                    <div className={"card-body"}>
                        { (auth.user!=null && auth.user.type==1) ?
                        <Link className="btn btn-primary "  href={ route("books.create")} >Pridėti knygą</Link>
                        : "" }
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th>Pavadinimas</th>
                                <th>Nuotrauka</th>
                                <th>Santrauka</th>
                                <th>ISBN</th>
                                <th>Puslapių skaičius</th>
                                <th>Kategorija</th>
                                { (auth.user!=null && auth.user.type==1) ?
                                    <th>
                                    Rezervavęs <br /> skaitytojas
                                    </th>
                                    :""}
                                <th>Veiksmai</th>
                            </tr>
                            </thead>
                            <tbody>
                            {booksList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

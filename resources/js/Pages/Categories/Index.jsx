import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import '/resources/css/my.css';


export default function Index({categories, auth}) {
    console.log(auth);
    console.log(categories);


    const categoriesList=[];
    categories.forEach((category)=>{

        categoriesList.push(
            <tr key={category.id}>
                <td>
                    {category.name}
                </td>
                <td>
                    { (auth.user!=null && auth.user.type==1) ?
                        <div>
                            <Link className="btn btn-warning "  href={ route("categories.edit",category.id)} >Redaguoti</Link> &nbsp;
                            <button className="btn btn-danger "  onClick={ ()=>{ router.delete(route("categories.destroy",category.id)); } }  >Ištrinti</button> &nbsp;
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
                    <div className={"card-header"}>Kategorijų sąrašas</div>
                    <div className={"card-body"}>
                        { (auth.user!=null && auth.user.type==1) ?
                        <Link className="btn btn-primary "  href={ route("categories.create")} >Pridėti kategoriją</Link>
                        : "" }
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th>Pavadinimas</th>
                                <th>Veiksmai</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoriesList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

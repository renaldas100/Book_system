import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";


export default function AppLayout({children}){

    const {auth}=usePage().props;
    const user=auth.user;
    const isLogin=auth.user!=null;
    const userAdmin=auth.user!=null && auth.user.type==1;
    const userSimple=auth.user!=null && auth.user.type==0;

    return(
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="Layouts#">Knygų sistema</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {isLogin &&
                                <li className="nav-item">
                                    <Link href={route('books.index')} className="nav-link active">Visos knygos</Link>
                                </li>
                                }
                                {userAdmin &&
                                <li className="nav-item">
                                    <Link href={route('users.index')} className="nav-link active">Visi vartotojai</Link>
                                </li>
                                }
                                {userAdmin &&
                                    <li className="nav-item">
                                        <Link href={route('categories.index')} className="nav-link active">Knygų kategorijos</Link>
                                    </li>
                                }
                                {userSimple &&
                                <li className="nav-item">
                                    <Link href={route('users.myProfile')} className="nav-link active">Mano profilis</Link>
                                </li>
                                }
                            </ul>
                        </div>
                            {user==null ?
                                <div className="float-end">

                                    <Link className="btn btn-primary mr-3 "  href={ route("login")} >Prisijungti</Link>
                                    &nbsp;


                                    <Link className="btn btn-info "  href={ route("register")} >Registruotis</Link>

                                </div>
                                :
                                <div className="float-end">
                                    <span >Jūs esate prisijungęs kaip: <b>{user.name} ({user.type==1?"administratorius":"vartotojas"})</b> </span>
                                    <Link className="btn btn-warning " href={route('logout')} method="post" >Atsijungti</Link>

                                </div>
                            }

                    </div>
                </nav>
                {children}
            </div>

        </div>
    )

}

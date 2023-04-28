import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import '/resources/css/my.css';



export default function Index(props){



    const adminType=props.auth.user!=null && props.auth.user.type==1;
    const userType=props.auth.user!=null && props.auth.user.type==0;
    // console.log(props.users.data[1].id);
    // console.log(props.users);


    const handleDelete=(event)=>{
        // console.log(event.target.value)
        router.delete( route('users.destroy', event.target.value) );
    };


    const handlePictureDelete=(event)=>{
        console.log(event.target.value)
        router.delete( route('pictures.destroy', event.target.value) );
    };


    const usersList=[];
    props.users.forEach((user)=>{
        usersList.push(
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                {adminType && (
                    <td>
                        <div className="d-flex flex-wrap mx-2">
                            {user.pictures.map((picture, index) => (
                                <div className="mx-1 d-flex flex-column align-items-center" key={picture.id}>
                                    {/*<img src={`/storage/users/${picture.name}`} style={{ height: '100px' }} />*/}
                                    {<img height="100px" src={ "/storage/users/"+picture.name } />}
                                    <button className="btn btn-danger deleteButton" onClick={handlePictureDelete} value={picture.id}>Ištrinti</button>
                                </div>
                            ))}
                        </div>

                    </td>
                )}
                {adminType &&
                <td className="col-md-1">
                    <a href={ route("pictures.addPicture", user.id) } className="btn btn-success">Pridėti
                        nuotrauką</a>
                </td>
                }
                {adminType &&
                <td className="text-center">
                    <Link className="btn btn-primary" href={route('users.edit',user.id)}>Redaguoti profilį</Link>
                </td>
                }
                {adminType && user.id !== props.auth.user.id ?
                    <td className="text-center">
                        <button className="btn btn-danger" onClick={handleDelete} value={user.id}>Ištrinti vartotoją</button>
                    </td>
                    :
                    ""
                }

                {/*<td className="text-center">*/}
                {/*    <Link className="btn btn-primary" href={route('users.edit',users.id)}>Registruotis</Link>*/}
                {/*</td>*/}

            </tr>)
    });




    return(
        <AppLayout
            // user={user}
        >
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Vartotojų sąrašas
                    </div>
                    <div className="card-body">
                        {/*{adminType &&*/}
                        {/*    <Link className="btn btn-success float-end" href={route("users.create")}>Pridėti naują vartotoją</Link>*/}
                        {/*}*/}
                        {!adminType && <div className="float-end" ><i>Mygtukas tik admin</i></div>}
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Vardas</th>
                                <th>El.paštas</th>
                                <th>Paveiksliukai</th>
                            </tr>
                            </thead>
                            <tbody>
                            { usersList }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </AppLayout>
    )
}

import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import '/resources/css/my.css';



export default function Index(props){



    const adminType=props.auth.user!=null && props.auth.user.type==1;
    const userType=props.auth.user!=null && props.auth.user.type==0;
    // console.log(props.users.data[1].id);
    console.log(props.user);
    console.log(props.pictures);
    console.log(adminType);
    console.log(userType);


    const handleDelete=(event)=>{
        // console.log(event.target.value)
        router.delete( route('users.destroy', event.target.value) );
    };


    const handlePictureDelete=(event)=>{
        console.log(event.target.value)
        router.delete( route('pictures.destroy', event.target.value) );
    };


    return(
        <AppLayout
            // user={user}
        >
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Mano paskyra
                    </div>
                    <div className="card-body">

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Vardas</th>
                                <th>El.paštas</th>
                                <th colSpan="3">Veiksmai</th>
                            </tr>
                            </thead>
                            <tbody>
                           <tr>
                               <td>{props.user.name}</td>
                               <td>{props.user.email}</td>

                               <td className="col-md-1">
                                   <a href={ route("pictures.addPicture", props.user.id) } className="btn btn-success">Pridėti
                                       nuotrauką</a>
                               </td>
                               <td className="text-center">
                                   <Link className="btn btn-primary" href={route('users.edit',props.user.id)}>Redaguoti profilį</Link>
                               </td>
                               <td className="text-center">
                                   <button className="btn btn-danger" onClick={handleDelete} value={props.user.id}>Ištrinti paskyrą</button>
                               </td>

                           </tr>
                            <tr className="">
                                <td colSpan="5">
                                    <div className="d-flex flex-wrap mx-2">
                                        {props.pictures.map((picture, index) => (
                                            <div className="mx-1 d-flex flex-column align-items-center" key={picture.id}>
                                                {/*<img src={`/storage/users/${picture.name}`} style={{ height: '100px' }} />*/}
                                                {<img height="200px" src={ "/storage/users/"+picture.name } />}
                                                <button className="btn btn-danger deleteButton" onClick={handlePictureDelete} value={picture.id}>Ištrinti</button>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </AppLayout>
    )
}

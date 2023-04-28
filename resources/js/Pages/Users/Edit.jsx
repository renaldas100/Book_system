import {useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Edit(props){

    console.log(props.user);


    const {data, setData, errors, put}=useForm(props.user)

    console.log(data.id);
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value

        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        put( route('users.update', data.id),data);

    }




    return(
        <AppLayout>
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Redaguoti vartotoją
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Vardas</label>
                                <input className={"form-control "+(errors.name!=null?" is-invalid":"")} type="text" id="name" onChange={handleChange} value={data.name} />
                                <div className="invalid-feedback">{errors.name}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">El.paštas</label>
                                <input className={"form-control "+(errors.email!=null?" is-invalid":"")} type="text" id="email" onChange={handleChange} value={data.email} />
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Įrašykite naują slaptažodį</label>
                                <input className={"form-control "+(errors.password!=null?" is-invalid":"")} type="password" id="password" onChange={handleChange} value={data.password} />
                                <div className="invalid-feedback">{errors.password}</div>
                            </div>

                            {/*<div className="mb-3">*/}
                            {/*    <label className="form-label">Kategorija</label>*/}
                                {/*<input className="form-control" type="text" id="category" onChange={handleChange} value={values.category} />*/}
                                {/*<select className="form-select" id="category_id" onChange={handleChange}>*/}

                                {/*    {categoriesList}*/}

                                {/*</select>*/}
                            {/*</div>*/}
                            <button className="btn btn-success">Išsaugoti pakeitimus</button>
                        </form>

                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

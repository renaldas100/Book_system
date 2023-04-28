import {useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Create(props){
    // const user=props.auth.user;

    console.log(props.user.id);
    const userId=props.user.id;

    const {data, setData, post, errors, progress}=useForm({
        name:'',

    })


    console.log(errors);
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value

        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        post( route('pictures.store', userId));
        // setValues({
        //     name:"",
        //     priority:"",
        // })

        // console.log(values);
    }




    return(
        <AppLayout
            // user={user}
        >
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Pridėti paveikslą
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Paveikslas</label>
                                <input className="form-control" type="file" id="picture" name="picture" onChange={(event)=>{
                                    setData({
                                        ...data,
                                        picture:event.target.files[0]
                                    });
                                }} />
                            </div>
                            <div className="mb-3">
                                {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                )}
                            </div>
                            <div className="mb-3">
                                {progress && <span>{progress.percentage} % </span> }
                            </div>

                            <button className="btn btn-success">Pridėti</button>
                        </form>

                    </div>
                </div>
            </div>

        </AppLayout>
    )
}


import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import '/resources/css/my.css';

export default function Create({category}) {

    // console.log(props.categorys);
    // console.log(props.book);

    const {data, setData, post, errors}=useForm({
        ...category,
        _method: 'put'
    });



    const handleChange=(event)=>{
        console.log(event);
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        post(route("categories.update", data.id));
    }

    return (
        <AppLayout>
                <div className={"col-md-12 mt-5"}>
                    <div className={"card"}>
                        <div className={"card-header"}>Redaguoti knygą</div>
                        <div className={"card-body"}>
                            <form onSubmit={handleSubmit}>
                                <div className={"mb-3"}>
                                    <label className={"form-label"}>Pavadinimas</label>
                                    <input type={"text"} className={"form-control "+(errors.name!=null?" is-invalid":"")} id={"name"} onChange={handleChange} value={data.name}/>
                                    <div className={"invalid-feedback"}>{errors.name}</div>
                                </div>


                                <button type={"submit"} className={"btn btn-success"}>Išsaugoti</button>
                            </form>
                        </div>
                    </div>
                </div>
        </AppLayout>
    );
}

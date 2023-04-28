import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import '/resources/css/my.css';

export default function Create({categories}) {

    console.log(categories);


    const {data, setData, post, errors}=useForm({
        name:"",

    });



    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        post(route("categories.store"));
    }

    return (
        <AppLayout>
                <div className={"col-md-12 mt-5"}>
                    <div className={"card"}>
                        <div className={"card-header"}>Pridėti naują kategoriją</div>
                        <div className={"card-body"}>
                            <form onSubmit={handleSubmit}>
                                <div className={"mb-3"}>
                                    <label className={"form-label"}>Pavadinimas</label>
                                    <input type={"text"} className={"form-control "+(errors.name!=null?" is-invalid":"")} id={"name"} onChange={handleChange}/>
                                    <div className={"invalid-feedback"}>{errors.name}</div>
                                </div>

                                <button type={"submit"} className={"btn btn-success"}>Pridėti</button>
                            </form>
                        </div>
                    </div>
                </div>
        </AppLayout>
    );
}

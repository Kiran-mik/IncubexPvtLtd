import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { commonAPI } from "../redux/actions";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import swal from 'sweetalert';

const AddUser = ({ commonAPI, ...props }) => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        id: "",
        edit: false
    })
    const { register, handleSubmit, errors } = useForm();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }


    // get listing in initial render
    useEffect(() => {
        let url = props.location.search;
        let params = queryString.parse(url);
        if (params && params.slug) {
            async function getUserDetails() {
                let response = await commonAPI(`https://jsonplaceholder.typicode.com/users/${params.slug}`, '', 'get')
                if (response) {
                    let { email, name, username,id } = response
                    setFormData({
                        ...formData, email, first_name: name, last_name: username, edit: true,id
                    })
                }
            }
            getUserDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //add or edit delete record
    const addRecord = async () => {
        let { email, first_name, last_name,id } = formData;
        let request = {
            email, first_name, last_name
        }
        if(edit){
            request['id']=id
        }
        let endpoint=edit?`https://jsonplaceholder.typicode.com/users/${id}`:`https://jsonplaceholder.typicode.com/users`
        let response = await commonAPI(endpoint, request, edit?'put':'post')
        if (response) {
            swal(`User ${edit?'updated':'added'} successfully`, "", "success");
            props.history.push("/");
        }
    };

    let { email, first_name, last_name, edit } = formData
    return (
        <React.Fragment>
            <div className="modal-dialog modal-lg modal-dialog-centered" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" >{edit ? 'Update' : 'Add'} User</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.history.push("/")}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        ref={register({
                                            required: true, pattern: /^(([^<>()+*[\]\\.,;:\s@"]+(\.[^<>()+*[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        })}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {errors.email && <p className="error-msg">Email Required</p>}

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input className="form-control"
                                        type="text"
                                        placeholder="Enter firstname"
                                        name="first_name"
                                        value={first_name}
                                        ref={register({ required: true })}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {errors.first_name && <p className="error-msg">Firstname Required</p>}

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input className="form-control"
                                        type="text"
                                        placeholder="Enter lastname"
                                        name="last_name"
                                        value={last_name}
                                        ref={register({ required: true })}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {errors.last_name && <p className="error-msg">Lastname Required</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => props.history.push("/")}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit(addRecord)}>
                            {edit ? 'Update' : 'Add'} User
                         </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default connect(null, { commonAPI })(AddUser)



import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { commonAPI } from "../redux/actions";
import swal from 'sweetalert';
const DashBoard = ({ commonAPI, ...props }) => {
  const [formData, setFormData] = useState({
    listing: [],
    newList: [],
    searchVal: ''

  })

  // get listing in initial render
  useEffect(() => {
    async function getUsersList() {
      let response = await commonAPI('https://jsonplaceholder.typicode.com/users', '', 'get')
      if (response) {
        setFormData({
          ...formData, listing: response
        })
      }
    }
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // delete user
  const deleteUser = async (id) => {
    swal({ title: 'Are you sure to delete?', icon: 'warning', buttons: true, dangerMode: true }).then(async (willDelete) => {
      if (willDelete) {
        let response = await commonAPI(`https://jsonplaceholder.typicode.com/users/${id}`, '', 'delete')
        if (response) {
          swal("User deleted successfully ", "", "success");
        }
      }
    })
  }


   //sorting
  const sorting = (key) => {
    var list_ing = formData.listing.sort(function (a, b) {
      let fa = key!=='address'?a[key].toLowerCase():a[key]['city'].toLowerCase(),
        fb = key!=='address'?b[key].toLowerCase():b[key]['city'].toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    })
    setFormData({ listing: list_ing })
  }



  let { listing } = formData
  return (
    <React.Fragment>
      <section className="table-block">
        <div className="container">
          <h2 className="main-title">Users Listing</h2>
          <div className="search-part">
            <button type="button" className="btn btn-primary" onClick={() => props.history.push('/addRecord')}>Add User</button>
            {/* <button type="button" className="btn btn-primary" onClick={() => props.history.push('/responsive')}>Responsive</button> */}
          </div>
          <table className="w-100 table">
            <thead>
              <tr>
                <th onClick={()=>sorting('username')}>Username</th>
                <th onClick={()=>sorting('email')}>Email</th>
                <th onClick={()=>sorting('website')}>Website</th>
                <th onClick={()=>sorting('address')}>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listing.length != 0 ? <React.Fragment>
                {listing.map((user, id) => {
                  return (
                    <tr key={id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.website}</td>
                      <td>{user.address.city}</td>
                      <td>
                        <button type='button' onClick={() => props.history.push(`/editRecord?slug=${user.id}`)}>Edit</button>
                        <button type='button' onClick={() => deleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })}</React.Fragment> : <tr><td>No records found</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </React.Fragment>
  );
};

export default connect(null, { commonAPI })(DashBoard)



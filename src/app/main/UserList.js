import React,{useState,useMemo} from 'react'
import {  useSelector,useDispatch } from 'react-redux'
import { addUserList,updateUserList,deleteUserList } from '../store/reducers/User';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Modal } from 'antd';
const UserList = () => {
  const dispatch=useDispatch();
    const userList=useSelector((state)=>state.users.allUserList)
    const [open, setOpen] = useState(false);
    const [val, setVal] = useState();
    const[filter,setFilter]=useState({
        college:[],
        batch:[],
        button:0
    })
    //console.log(userList)
    const [columnDefs] = useState([
      {  field: "id",pinned:"left",width:80 },
      { field: "name",width:80 },
      {field:"email",width:80},
      {  field: "father_name",width:80 },
      { field: "mother_name",width:80 },
      {  field: "address",width:80 },
      {field:"college",width:105},
      {field:"degree",width:80},
      {field:"year",width:80},
      {field:"batch",width:80},
      {field:"Edit",width:80,cellRenderer:({data})=>{
        return (<div><button onClick={() => {
          showModal();
          handleEdit(data);
          setFilter((prevFilter) => ({
            ...prevFilter,
            button: 1,
        }));
      }} className="border border-black px-3 bg-blue-500 rounded-md">Edit</button></div>)
       }},
       {field:"Delete",width:80,cellRenderer:({data})=>{
        return (<div><button onClick={() => { showModaldel(); setVal(data.id) }}className="border border-black px-3 bg-red-500 rounded-md">Delete</button></div>)
       }}
    ])
    const defaultColDef = useMemo(() => {
      return {
        sortable: true,
        editable:true,
        resizable: true,
        
      };
    }, []);
    const[intern,setIntern]=useState({
      id:'',
      name:'',
      email:'',
      father_name:'',
      mother_name:'',
      address:'',
      college:'',
      degree:'',
      year:'',
      batch:''
  })
  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntern((prev) => ({
        ...prev,
        [name]: value,
    }));
};
  // Generate a unique ID
  const generateID = () => {
    const maxID = userList.reduce((max, item) => (item?.id > max ? item?.id : max), 0);
    return maxID + 1;
};
//handleSubmit
const handleSubmit = () => {
  const idVal = generateID();
  
  const detail={
      id:idVal,
  name:intern.name,
  email:intern.email,
  father_name:intern.father_name,
  mother_name:intern.mother_name,
  address:intern.address,
  college:intern.college,
  degree:intern.degree,
  year:intern.year,
  batch:Number(intern.batch)
  }
  dispatch(addUserList(detail))
  setIntern({
      id:'',
      name:'',
      email:'',
      father_name:'',
      mother_name:'',
      address:'',
      college:'',
      degree:'',
      year:'',
      batch:''
  });
  
};
const handleOk = () => {
  setOpen(false);
};

const handleCancel = () => {
  setOpen(false);
};
const showModal = () => {
  setIntern({
      id:'',
  name:'',
  email:'',
  father_name:'',
  mother_name:'',
  address:'',
  college:'',
  degree:'',
  year:'',
  batch:''
  });
  setOpen(true);
};
const handleOkdel = () => {
  setFilter({...filter,loading:false});
};

const handleCancel1 = () => {
  setFilter({...filter,loading:false});
};
// handleEditOk
const handleEditOk = (id) => {
  //const index = UserList.findIndex((item) => item?.id === id);
 
  const detail = {
    id:id,
    name:intern.name,
    email:intern.email,
father_name:intern.father_name,
mother_name:intern.mother_name,
address:intern.address,
college:intern.college,
degree:intern.degree,
year:intern.year,
batch:Number(intern.batch)
};
dispatch(updateUserList(detail))
}
 // handleDelete
 const handleDelete = (iid) => {
  dispatch(deleteUserList(iid))

 }
//handleEdit
const handleEdit = (index) => {
  setIntern({
      id:index.id,
          name:index.name,
          email:index.email,
          father_name:index.father_name,
          mother_name:index.mother_name,
          address:index.address,
          college:index.college,
          degree:index.degree,
          year:index.year,
          batch:Number(index.batch)
  });
  setVal(index.id);
};
const showModaldel = () => {
  setFilter((prevFilter) => ({
      ...prevFilter,
      loading: true,
  }));
};

  return (
    
     <div>
    {/* {userList?.length?userList.map((x)=>{
        return(
       <div> <h4>{x.id}</h4>
        <h4>{x.name}</h4></div>)
    }):''} */}
       <Button type="primary" 
         onClick={()=>{showModal();setFilter({...filter,button:0});}}
          >
                                Add Intern Data
                            </Button> 
                            <Modal
                       open={open}
                        title="Enter the Intern Details"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}
                            >
                                Cancel
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                onClick={filter.button === 0 ? () => {
                                    handleOk();
                                    handleSubmit();
                                } : () => {
                                    setFilter({...filter,button:0});
                                    handleOk();
                                    handleEditOk(val);
                                }}
                                disabled={!(intern.name?.length !== 0 && intern.email?.length !== 0 && intern.father_name?.length !== 0 &&
                                  intern.mother_name?.length !== 0 && intern.address?.length !== 0&& intern.college?.length !== 0
                                  && intern.degree?.length !== 0&& intern.year?.length !== 0&& intern.batch?.length !== 0)} 
                            >
                          {filter.button === 0 ? 'Add Detail' : 'Save changes'}
                            </Button>
                        ]}
                    >
                        <h3>Enter your Name:</h3>
                        <input name="name" value={intern.name} onChange={handleChange} className="border border-black" />
                        <h3>Enter your Email:</h3>
                        <input name="email" value={intern.email} onChange={handleChange} className="border border-black" />
                        <h3>Enter Father's Name:</h3>
                        <input name="father_name" value={intern.father_name} onChange={handleChange} className="border border-black"/>
                        <h3>Enter Mother's Name:</h3>
                        <input name="mother_name" value={intern.mother_name} onChange={handleChange} className="border border-black"/>
                        <h3>Enter the Address:</h3>
                        <input name="address" value={intern.address} onChange={handleChange} className="border border-black"/>
                        <h3>Enter the college:</h3>
                        <input name="college" value={intern.college} onChange={handleChange} className="border border-black"/>
                        <h3>Enter the Degree:</h3>
                        <input name="degree" value={intern.degree} onChange={handleChange} className="border border-black"/>
                        <h3>Enter the year:</h3>
                        <input name="year" value={intern.year} onChange={handleChange} className="border border-black"/>
                        <h3>Enter the Batch:</h3>
                        <input name="batch" value={intern.batch} onChange={handleChange} className="border border-black"/>
                    </Modal>
 <div className="ag-theme-alpine" style={{ height: 650 }}>
    <AgGridReact rowData={userList} 
      columnDefs={columnDefs} 
      defaultColDef={defaultColDef}
       domLayout='autoHeight'></AgGridReact>
       </div>
       <Modal
                        title="Are you sure you want to delete this field"
                        open={filter.loading}
                        onOk={() => {
                            handleOkdel();
                             handleDelete(val);
                        }}
                        onCancel={handleCancel1}
                    ></Modal>
    </div>
  )
}

export default UserList
import {getUserById,updateUser} from "../../api/userApi"
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect ,useContext} from "react";
import { BasicButton } from './../../styledComponents/shardButton';
import { AuthContext } from "../../context/Auth/AuthContext";
import {
  FormWrapper,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  ButtonWrapper,
  StyledButton,
} from "./UserFormStyled";

export function UserForm() {
  const {register}=useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

    // const[isEdit,setisEdit]=useState(true)
  const [DataById, setDataById] = useState({
    userName: "",
    email: "",
    role: "",
    password: "" ,
  });

  const getdataById = async () => {
    console.log("here");
    try {
      const getByID = await getUserById(id)
      if (getByID.status === 200) {
        setDataById(getByID.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDataById((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await updateUser(id,DataById);
    if (res.status == 200) {
      navigate("/dashboard/user");
    }
    console.log(res);

    console.log(DataById);
  };

  useEffect(() => {
    if (id) {
      getdataById();
    }

    console.log(DataById);
  }, []);
  // {user,onChange,onSubmit,isEdit}
  return (
   <> {DataById && ( <div className=" w-50 mt-3 ms-4"> <h2 className="underline" style={{ color: "oklch(68.1% 0.162 75.834)" }} > {id ? "Edit User" : "Add New User"} </h2> <Form onSubmit={async (e) => {e.preventDefault(); id ? handleUpdate(e) : await register(DataById.name,DataById. email,DataById.userName,DataById.password, DataById.role)}} className="border border-oklch(70.4% 0.04 256.788) p-5 rounded-3" > <Form.Group className="mb-3"> <Form.Label>Email</Form.Label> <Form.Control type="email" placeholder="Enter your email" name="email" required value={DataById.email || ""} onChange={handleChange} /> </Form.Group> <Form.Group className="mb-3"> <Form.Label>UserName</Form.Label> <Form.Control type="text" placeholder="Enter userName" name="userName" required value={DataById.userName || ""} onChange={handleChange} /> </Form.Group> {!id && ( <Form.Group className="mb-3" controlId="formGroupPassword"> <Form.Label>Password</Form.Label> <Form.Control type="password" placeholder="Password" name="password" required value={DataById.password} onChange={handleChange} /> </Form.Group> )} <Form.Group className="mb-3"> <Form.Label>Role</Form.Label> <Form.Select name="role" value={DataById.role || ""} onChange={handleChange} required > <option value="">Select Role</option> <option value="admin">Admin</option> <option value="cashier">Cashier</option> </Form.Select> </Form.Group> <div className=" flex-row mt-5 justify-self-end"> <BasicButton > {id ? "Update User" : "Add User"} </BasicButton> </div> </Form> </div> )} </> ); }
import { getUserById, updateUser } from "../../api/userApi";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BasicButton } from "./../../styledComponents/shardButton";
import { AuthContext } from "../../context/Auth/AuthContext";
import {
  FormWrapper,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  ButtonWrapper,
  // StyledButton,
} from "./UserFormStyled";

export function UserForm() {
  const { register } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);

  // const[isEdit,setisEdit]=useState(true)
  const [DataById, setDataById] = useState({
    userName: "",
    email: "",
    role: "",
    password: "",
  });

  const getdataById = async () => {
    console.log("here");
    try {
      const getByID = await getUserById(id);
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
    const res = await updateUser(id, DataById);
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
    <>
      {DataById && (
        <FormWrapper>
          <h2>{id ? "Edit User" : "Add New User"}</h2>
          <StyledForm
            onSubmit={async (e) => {
              e.preventDefault();
              if (id) {
                handleUpdate(e);
              } else {
                await register(
                  // DataById.name,
                  DataById.email,
                  DataById.role,
                  DataById.userName,
                  DataById.password
                );

                navigate("/dashboard/user");
              }
            }}
          >
            <Form.Group className="mb-3">
              <StyledLabel>Email</StyledLabel>
              <StyledInput
                type="email"
                placeholder="Enter your email"
                name="email"
                required
                value={DataById.email || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <StyledLabel>UserName</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Enter userName"
                name="userName"
                required
                value={DataById.userName || ""}
                onChange={handleChange}
              />
            </Form.Group>
            {!id && (
              <Form.Group controlId="formGroupPassword">
                {" "}
                <StyledLabel>Password</StyledLabel>
                <StyledInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={DataById.password}
                  onChange={handleChange}
                />{" "}
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <StyledLabel>Role</StyledLabel>
              <StyledSelect
                name="role"
                value={DataById.role || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
              </StyledSelect>
            </Form.Group>
            <ButtonWrapper className=" flex-row mt-5 justify-self-end">
              <BasicButton>{id ? "Update User" : "Add User"}</BasicButton>
            </ButtonWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </>
  );
}

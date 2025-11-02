import { useState, useEffect } from "react";
import { GetbyID, updateMenu, addMenu } from "../../api/menuApi";
import { getALL } from "../../api/menus";
import { Form, Button } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { GetEndpoint } from "../../utils/getEndPoint";
import { useTranslation } from "../../hooks/useTranslation";
import {
  FormWrapper,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  ButtonWrapper,
  // StyledButton,
} from "./UserFormStyled";

export default function SimpleForm() {
  const {  language  } =useTranslation();
  const [menu, setMenu] = useState({
    name: "",
    description: "",
    price: "",
    menuID: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  
  const location = useLocation();
  const edPoint = GetEndpoint();
  const resource = location.pathname.split("/")[2];
  const [menus, setMenus] = useState([]);


  const getitemBYID = async () => {
    try {
      console.log("here");
      
      //  console.log(res.data.data);
      if (edPoint === "menuItem") {
        const res = await GetbyID(edPoint, id);
        const typeMenu = await getALL("menu");
        console.log(res);
        console.log(typeMenu);
        setMenu(res.data.data);
        setMenus(typeMenu.data);
      }else{
        const x = await GetbyID(edPoint, id);
        setMenu(x.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMenus = async () => {
    try {
      const getMenuType = await getALL("menu");
      console.log(getMenuType.data);
      setMenus(getMenuType.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getitemBYID();
    }

    getMenus();
  }, [id, edPoint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prev) => ({ ...prev, [name]: value }));
  };

  //  Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("menu after update", menu);

      const res = await updateMenu(id, edPoint, menu);
      if (res.status == 200) {
        alert("menu updated successfully!");
        navigate(`/dashboard/${resource}`);
      }
      console.log(res.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      console.log(menu);

      const res = await addMenu(menu, edPoint);
      console.log(res);

      if (res.status == 201) {
        navigate(`/dashboard/${edPoint}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormWrapper className=" ">
      <h3>
        {id ? "Edit" : "Add"} {edPoint}
      </h3>
      <Form onSubmit={id ? handleUpdate : handleAdd}>
        <Form.Group className="mb-3">
          <Form.Label>{id ? "Edit" : "Add"} Name </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={menu.name[language] || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{id ? "Edit" : "Add"} discription</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={menu.description[language]  || ""}
            onChange={handleChange}
          />
        </Form.Group>
        {resource === "menuItem" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>{id ? "Edit" : "Add"}Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={menu.price || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Menu Name</Form.Label>
              <Form.Select
                name="menuID"
                value={menu.menuID || ""}
                onChange={handleChange}
                required
              >
                <option disabled selected value={""}>
                  Select Menu
                </option>
                {Array.isArray(menus) &&
                  menus.map((menu) => {
                    return (
                      <option key={menu._id} value={menu._id}>
                        {" "}
                        {menu.name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
          </>
        )}

        <Button style={{ backgroundColor: "#d08700", border: 0 }} type="submit">
          {id ? "Update" : "Add"}
        </Button>
      </Form>
    </FormWrapper>
  );
}

//   )
// }

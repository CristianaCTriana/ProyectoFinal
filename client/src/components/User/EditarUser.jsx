import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../scss/components/_user.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser } from "../../redux/actions";

const EditarUser = () => {
  const { user, isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.allUsers);

  const email = user && user.email;

  const userFilterbyId =
    infoUser && infoUser.filter((el) => el.email === email);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    id_document: "",
    password: "",
    image: "",
  });

  function handleChangeInput(e) {
    e.preventDefault();
    setInput({
      fullName: userFilterbyId[0] && userFilterbyId[0].fullName,
      email: userFilterbyId[0] && userFilterbyId[0].email,
      id_document: e.target.value,
      password: userFilterbyId[0] && userFilterbyId[0].password,
      image: userFilterbyId[0] && userFilterbyId[0].image,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(input));
    alert("Documento guardado con exito");
    dispatch(getAllUsers());
    window.location();
  }

  return (
    <div>
      {userFilterbyId[0] ? (
        <>
          <img className="img" src={userFilterbyId[0].image} alt="" />
          <h3>User: {userFilterbyId[0].fullName}</h3>
          <h3>Email: {userFilterbyId[0].email}</h3>

          {userFilterbyId[0].id_document ? (
            <div>Document: {userFilterbyId[0].id_document}</div>
          ) : (
            <>
              <input
                type="text"
                placeholder="ingresa documento"
                name="id_document"
                value={input.id_document}
                onChange={(e) => handleChangeInput(e)}
              />
              <button onClick={(e) => handleSubmit(e, input)}>save</button>
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default EditarUser;

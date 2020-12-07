import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  ERROR_NOTIFICATION,
  LOGIN,
  SUCCSESS_NOTIFICATION,
  WARNING_NOTIFICATION,
} from "../../redux/types";
const validationErrorMessages = {
  errorEmptyRequired: "Los campos requeridos estan vacios",
};

const doLogin = async (login) => {
  try {
    const resLogin = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      login
    );
    const token = resLogin.data.token;
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const resUser = await axios.get(
      process.env.REACT_APP_BASE_URL + "/profile",
      headers
    );

    const user = {
      name: resUser.data.name,
      lastName: resUser.data.lastName,
      email: resUser.data.email,
      address: resUser.data.address,
      roleId: resUser.data.roleId,
      token: token,
    };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    throw err;
  }
};

const validateAndSend = async (props, object) => {
  try {
    if (object.password === "" || object.email === "") {
      props.dispatch({
        type: WARNING_NOTIFICATION,
        payload: {
          notification: {
            title: "Advertencia",
            msg: validationErrorMessages.errorEmptyRequired,
          },
          show: true,
        },
      });
    } else {
      return await doLogin(object);
    }
  } catch (err) {
    props.dispatch({
      type: ERROR_NOTIFICATION,
      payload: {
        notification: {
          title: "Login failed",
          status: err.response.status,
          msg: err.response.data.trace,
        },
        show: true,
      },
    });
    throw err;
  }
};

function Login(props) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const eventHandler = (ev) => {
    setLogin({ ...login, [ev.target.name]: ev.target.value });
  };

  const history = useHistory();

  return (
    <div className="loginForm">
      <label>
        * Email:
        <input
          type="text"
          name="email"
          required
          onChange={eventHandler}
          placeholder="some@mail.com"
        />
      </label>
      <label>
        * Contraseña:
        <input
          type="password"
          name="password"
          required
          onChange={eventHandler}
          placeholder="password"
        />
      </label>
      <button
        className="turqButton"
        onClick={async () => {
          try {
            const data = await validateAndSend(props, login);
            if (data) {
              props.dispatch({
                type: SUCCSESS_NOTIFICATION,
                payload: {
                  notification: {
                    title: "Login correcto",
                    msg: `Bienvenido ${data.name}`,
                  },
                  show: true,
                },
              });
              setTimeout(() => {
                props.handleClose();
                props.dispatch({ type: LOGIN, payload: data });
                history.push("/dashboard");
              }, 1500);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {" "}
        Login{" "}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    errorNotification: state.errorNotification,
    warningNotification: state.warningNotification,
    successNotification: state.successNotification,
    infoNotification: state.infoNotification,
  };
};

export default connect(mapStateToProps)(Login);

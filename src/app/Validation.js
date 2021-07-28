import React, { useState } from "react";
import Utils from "./Func";
import { Icon, IconButton, Grid, TextField } from "@material-ui/core";

const FormValidation = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    friends: []
  });

  const [errors, setErrors] = useState({
    username: {},
    email: {},
    friends: []
  });

  const validateField = (name, value) => {
    let errs = {};
    switch (name) {
      case "email":
        errs = {
          ...errs,
          [name]: {
            valid: Utils.validateEmail(value) ? "" : `${name} is not valid`,
            required: value.length > 0 ? "" : `${name} is required`
          }
        };
        break;
      case "username":
        errs = {
          ...errs,
          [name]: {
            required: value.length > 0 ? "" : `${name} is required`
          }
        };
        break;
      default:
        break;
    }
    setErrors(errs);
  };

  const validateFriendField = (name, value, i) => {
    let errs = { friends: [] };
    switch (name) {
      case "email":
        errs = {
          ...errs,
          [name]: {
            valid: Utils.validateEmail(value) ? "" : `${name} is not valid`,
            required: value.length > 0 ? "" : `${name} is required`
          }
        };
        break;
      case "name":
        errs.friends[i] = {
          [name]: {
            required: value.length > 0 ? "" : `${name} is required`
          }
        };
        errs = {
          ...errs
        };
        break;
      default:
        break;
    }
    setErrors(errs);
  };

  const addFriend = () => {
    const newFriend = { name: "" };
    setForm({
      ...form,
      friends: [...form.friends, newFriend]
    });
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleFriendChange = (i) => (event) => {
    const nextFriends = [...form.friends];
    nextFriends[i][event.target.name] = event.target.value;
    setForm({
      ...form,
      friends: nextFriends
    });
  };

  console.log(errors, "errors");

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} className="border">
        <form>
          <TextField
            label="Username"
            style={{ marginBottom: "1rem" }}
            name="username"
            value={form.username}
            onChange={handleChange}
            onKeyUp={() => validateField("username", form.username)}
            helperText={errors?.username?.required}
            fullWidth
          />
          <TextField
            label="Email"
            style={{ marginBottom: "1rem" }}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onKeyUp={() => validateField("email", form.email)}
            helperText={errors?.email?.required || errors?.email?.valid}
            fullWidth
          />
          <div>
            <IconButton onClick={addFriend}>
              <Icon>add</Icon>
            </IconButton>
            {form.friends.map((f, i) => (
              <TextField
                key={i}
                label="Friend"
                style={{ marginBottom: "1rem" }}
                name="name"
                value={f.name}
                onChange={handleFriendChange(i)}
                onKeyUp={() => validateFriendField("name", f.name, i)}
                helperText={
                  errors.friends.length > 0 &&
                  (errors?.friends[i].name.required ||
                    errors?.friends[i].name.valid)
                }
                fullWidth
              />
            ))}
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default FormValidation;

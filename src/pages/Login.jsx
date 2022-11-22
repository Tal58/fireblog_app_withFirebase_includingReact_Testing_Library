import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle} from "react-icons/fc"
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Button} from "@mui/material";
import * as yup from "yup";
import useAuthCall from "../hooks/useAuthCall";
import { useEffect } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import Icon from "./Images";


const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please  enter an email"),
  password: yup
    .string()
    .required("Please enter a password ")
    .min(8, "Password must have min 8 chars")
    .max(16, "Password must have max 16 chars")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have an uppercase")
    .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char"),
});

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state?.auth);
  const { login, signInWithGoogle } = useAuthCall();
  const { displayName } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
      toastSuccessNotify(`${displayName === null ? "User" : displayName} Welcome to application`);
    }
  }, [currentUser]);

  useEffect(() => {
    error && toastErrorNotify("Sign in failed");
  }, [error]);

  return (
    <Container maxWidth="lg" data-testid={"trial"}>
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center" style={{fontFamily: 'Rubik Distressed'}}>
            Fire Blog App
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
              navigate("/home");
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                   data-testid={"password"}
                    label="Password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                    style={{
                      backgroundColor: "#21b6ae"
                  }} 
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
              
            )}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}  data-testid={"email"}>
          <Button  style={{
            backgroundColor: "#21b6ae"
        }} variant="contained" onClick={signInWithGoogle}>Sign In with Google  <FcGoogle /></Button>
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Don't you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={5} md={4} >
          <Container >
            <Icon />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

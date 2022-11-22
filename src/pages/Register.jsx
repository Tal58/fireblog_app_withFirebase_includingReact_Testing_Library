import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAuthCall from "../hooks/useAuthCall";
import Icon from "./Images";


const registerSchema = yup.object().shape({
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

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.auth);
  const {register} = useAuthCall()
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
      toastSuccessNotify("Register Performed");
      console.log(currentUser)
    }
  }, [currentUser]);
  console.log(currentUser)
  useEffect(() => {
    error && toastErrorNotify("Register could not be performed");
  }, [error]);

  return (
    <Container maxWidth="lg" data-testid={"trial"}>
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
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
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={(values, actions) => {
            register(values);
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
                data-testid={"email"}
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
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={5} md={4}>
          <Container>
          <Icon />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;

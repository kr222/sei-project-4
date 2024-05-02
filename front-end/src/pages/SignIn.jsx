import { useState, useRef, useContext } from "react";
import UserContext from "../context/user";
// mui imports
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

const defaultTheme = createTheme();

export default function SignIn() {
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  // input refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const [jwt, setJwt] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginDetails = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const result = await fetchData("/auth/login", "POST", loginDetails);
    if (result.ok) {
      console.log(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      userCtx.setAccessToken(result.data.access);
      userCtx.setRefreshToken(result.data.refresh);

      const decoded = jwtDecode(result.data.access);
      userCtx.setUserId(decoded.id);
      userCtx.setUsername(decoded.username);
      userCtx.setRole(decoded.role);
      if (userCtx.role) {
        console.log(
          `user id: ${userCtx.userId} username: ${userCtx.username} role: ${userCtx.role}`
        );
      }
      navigate("/");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={passwordRef}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button onClick={() => console.log(userCtx)}>test</Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

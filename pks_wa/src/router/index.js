import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../views/Home/HomeView";
import Login from "../views/Login/LoginView";
import Register from "../views/Register/RegisterView";
import LuminaryView from "../views/LuminaryDetail/LuminaryView";
import CreateLuminary from "../views/CreateAssets/CreateLuminaryView";
import CreatePost from "../views/CreateAssets/CreatePostView";
import EditLuminaryView from "../views/UpdateAssets/EditLuminaryView";
import EditPostView from "../views/UpdateAssets/EditPostView";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import MeetingRoomSharpIcon from "@material-ui/icons/MeetingRoomSharp";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import { useHistory, Link } from "react-router-dom";
import "../index.css";
import { useState } from 'react';

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "BLACK",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AppRouter() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();


  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function cerrarSesion() {
    localStorage.setItem("LoggedId", "");
    localStorage.setItem("LoggedAdmin", "");
    localStorage.setItem("LoggedId", "");
    
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            {/*<img src="logo.svg" width="60px" alt="logo" className="p-1"></img>*/}
            <Typography variant="h6" noWrap>
              Sistema de Información Alumbrado Público San José del Guaviare
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {localStorage.getItem("LoggedId") ? (
              <Link
                to={"/Inicio"}
                style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem button key="login">
                  <ListItemIcon>
                    <HomeSharpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItem>
              </Link>
            ) : null}
            {localStorage.getItem("LoggedAdmin") === "true" ? (
              <Link
                to={"/CreateLuminary"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem button key={localStorage.getItem("LoggedId")}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Registrar Luminaria" />
                </ListItem>
              </Link>

            ) : null}

            {localStorage.getItem("LoggedAdmin") === "true" ? (
              <Link
                to={"/CreatePost"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem button key={localStorage.getItem("LoggedId")}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Registrar Poste" />
                </ListItem>
              </Link>

            ) : null}

            {localStorage.getItem("LoggedId") ? (
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem button key={localStorage.getItem("LoggedId")} onClick={cerrarSesion}>
                  <ListItemIcon>
                    <CloseSharpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar Sesion" />
                </ListItem>
              </Link>
            ) :
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem button key={localStorage.getItem("LoggedId")} onClick={cerrarSesion}>
                  <ListItemIcon>
                    <MeetingRoomSharpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicia Sesion" />
                </ListItem>
              </Link>
            }

          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route path="/Inicio" component={Home} />
            <Route exact path="/" component={Login} />
            <Route path="/SignUp" component={Register} />
            <Route path="/CreateLuminary" component={CreateLuminary} />
            <Route path="/CreatePost" component={CreatePost} />
            <Route path="/LuminaryView/:id" component={LuminaryView} />
            <Route path="/EditLuminary/:id" component={EditLuminaryView} />
            <Route path="/EditPost/:id" component={EditPostView} />
          </Switch>

        </main>
      </div>
    </Router>
  );
}

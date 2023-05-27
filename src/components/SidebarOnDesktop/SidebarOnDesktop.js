import React, { useEffect, useState } from "react";
import "./SidebarOnDesktop.css";
import "boxicons";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/system";
import { Alert, Divider, ListSubheader, Popover } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { getPostsFromDb } from "../../utils/firebase";

const SidebarOnDesktop = ({ isAuth, signUserOut }) => {
  const [state, setState] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postLists, setPostList] = useState([]);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const getPosts = async () => {
      const data = await getPostsFromDb();
      setPostList(data);
      console.log(postLists);
    };

    getPosts();
  }, []);

  const toggleSidebarOnDesktop = () => {
    setState(!state);
  };

  return (
    <div className={`SidebarOnDesktop active`}>
      <div className="logo_content">
        <div className="logo">
          <div
            className="logoname"
            style={{
              marginLeft: "5px",
              fontSize: "1.8rem",
              marginTop: ".5rem",
            }}
          >
            <b>BLOGWEET</b>
          </div>
        </div>
        <i
          className="bx bxl-twitter bx-tada"
          id="btn"
          style={{ fontSize: "25px" }}
          onClick={toggleSidebarOnDesktop}
        />
      </div>
      <ul className="nav_list">
        <li onClick={toggleSidebarOnDesktop}>
          <Link to="/">
            <i className="bx bxs-home-heart"></i>
            <span className="link_names">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li onClick={toggleSidebarOnDesktop}>
          <Link to="/about">
            <i class="bx bxs-info-circle"></i>
            <span className="link_names">About</span>
          </Link>
</li>

        </li>   
        <li>
          <Link to="/contact">
            <i class='bx bxs-info-circle'></i>
            <span className="link_names">Contact Us</span>
          </Link>
        </li>  
        {isAuth && (
          <li onClick={toggleSidebarOnDesktop}>
            <Link to="/createpost">
              <i className="bx bxs-pencil"></i>
              <span className="link_names">Create Post</span>
            </Link>
            <span className="tooltip">Create Post</span>
          </li>
        )}
        <li onClick={toggleSidebarOnDesktop}>
          <Link to="/">
            <Box className="bx" margin={"15px"} marginRight={"10px"}>
              <NotificationsIcon />
            </Box>
            <span onClick={handleClick} className="link_names">
              Notifications
            </span>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box className="list-container" bgcolor={"#ffffff"}>
                <List
                  subheader={
                    <ListSubheader component="div">
                      Latest Notifications
                    </ListSubheader>
                  }
                >
                  {postLists.slice(0, 9).map((post) => (
                    <ListItem disablePadding>
                      <ListItemButton sx={{ justifyContent: "center" }}>
                        <Alert
                          onClick={() => {
                            navigate(
                              `/${post.author.name.replaceAll(" ", "-")}/${
                                post.id
                              }`,
                              { state: post }
                            );
                          }}
                          sx={{ width: "25em" }}
                          severity="info"
                        >
                          {post.author.name} Made a new post, Check it Out.
                        </Alert>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            </Popover>
          </Link>
        </li>
        {/* other list items */}
      </ul>
      {!isAuth && (
        <li>
          <Link to="login" id="log_in">
            <i
              className="bx bx-log-in bx-fade-left"
              id="log_in"
              onClick={toggleSidebarOnDesktop}
            />
            <span
              className="link_names"
              style={{ left: "2.5rem", position: "relative", bottom: ".1rem" }}
            >
              Log in
            </span>
          </Link>
        </li>
      )}
      {isAuth && (
        <div className="profile_content" id="profile">
          <div className="profile">
            <div className="profile_details">
              {auth.currentUser != null && (
                <img src={auth.currentUser.photoURL} alt="" />
              )}
              <div className="name_job">
                {auth.currentUser != null && (
                  <div className="name">{auth.currentUser.displayName}</div>
                )}
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out" onClick={signUserOut} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarOnDesktop;

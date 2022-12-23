import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { HeadsetMicRounded } from "@mui/icons-material";
function Header({ fetchData, refreshData }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" className="nav-bar" sx={{ bgcolor: "teal" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontSize: "2rem",
              flexGrow: 1,
            }}
          >
            Total Items : {fetchData && fetchData.length}
          </Typography>
          <Button
            onClick={refreshData}
            variant="contained"
            style={{ color: "teal", background: "white" }}
            endIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

HeadsetMicRounded.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;

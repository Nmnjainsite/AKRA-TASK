import "./App.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { Container } from "@mui/system";
function App() {
  const [spinner, setSpinner] = useState(false);
  const [fetchData, setFetchData] = useState();

  async function fetchProducts() {
    try {
      setSpinner(true);
      await axios
        .get("https://randomuser.me/api/?results=50")
        .then((response) => {
          localStorage.setItem("data", JSON.stringify(response.data.results));
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const getItem = localStorage.getItem("data");
    if (getItem !== null) {
      setFetchData(getItem ? JSON.parse(getItem) : []);
      setSpinner(false);
    }
  }, []);

  const refreshData = async () => {
    try {
      setSpinner(true);
      await axios
        .get("https://randomuser.me/api/?results=50")
        .then((response) => {
          setSpinner(false);
          localStorage.setItem("data", JSON.stringify(response.data.results));
          const getItem = localStorage.getItem("data");
          setFetchData(getItem ? JSON.parse(getItem) : []);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (email) => {
    setFetchData((fetchData) => fetchData.filter((el) => el.email !== email));
    localStorage.setItem("data", JSON.stringify(fetchData.slice(1)));
  };

  return (
    <Container className="App">
      <Header fetchData={fetchData} refreshData={refreshData} />

      {spinner && (
        <p style={{ textAlign: "center" }}>
          <CircularProgress />
          <p>Refresh Your Page</p>
        </p>
      )}

      <div className="card-container">
        {fetchData &&
          fetchData.map((data) => (
            <div key={data.login.uuid}>
              <Card className="card-box">
                <CardMedia
                  sx={{ height: 200, width: 200 }}
                  image={data.picture.large}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h7" component="div">
                    {data.name.first} {data.name.last}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => deleteData(data.email)}
                    fullWidth
                    style={{ background: "teal" }}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
    </Container>
  );
}

export default App;

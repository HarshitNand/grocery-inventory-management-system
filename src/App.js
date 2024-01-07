// ... (import statements)
import React, { useState } from 'react';
// import { Box, Button, Grid, styled, Typography } from "@mui/material";
import {
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled
} from '@mui/material';


function App() {

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "40px",
    color: "rgba(4, 13, 27, 0.97)",
    fontWeight: "500",
    fontFamily: "Gordita, sans-serif",
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
    },
  }));
  const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: "30px",
    fontWeight: "400",
    fontFamily: "Gordita, sans-serif",
    lineHeight: "7px",
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  }));
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addItem = () => {
    if (!name) {
      alert('Please enter a name for the item.');
      return;
    }

    if (editItemId !== '') {
      // If editItemId is set, update the existing item
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.id === editItemId ? { ...item, title: name } : item
        )
      );
      setEditItemId('');
    } else {
      // If editItemId is not set, add a new item
      const newItem = { id: Math.random().toString(), title: name, completed: false };
      setInventory((prevInventory) => [...prevInventory, newItem]);
    }

    setName('');
  };

  const editItem = (id) => {
    setName(inventory.find((item) => item.id === id).title);
    setEditItemId(id);
  };

  const deleteItem = (id) => {
    setInventory((prevInventory) => prevInventory.filter((item) => item.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      <Title variant="h1" sx={{fontWeight:"500",color:"#ce2121"}}>
      Grocery Inventory Management
              </Title>
     
      <div  style={{ margin: '20px',display: "inline-flex",width:"70%" ,marginLeft:'220px'}}>
        <TextField
          label="Item Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px',width:"70%"}}
        />
        <Button  style={{ display: "inline-flex" }} variant="contained" color="primary" onClick={addItem}>
          {editItemId !== '' ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
     
      
      <SubTitle variant="h2" sx={{fontWeight:"500",color:"black"}}>
      Inventory Item 
              </SubTitle>
      {/* Inventory Item  */}
      <TableContainer component={Paper} style={{ border: '0px solid black' }}>
        <Table>
          <TableHead  >
            <TableRow >
              <TableCell sx={{fontWeight:"500", fontSize: "18px"}}>S.NO</TableCell>
              <TableCell sx={{fontWeight:"500", fontSize: "18px"}} >Item Name</TableCell>
              <TableCell  sx={{fontWeight:"500", fontSize: "18px"}}>Actions</TableCell>
              <TableCell sx={{fontWeight:"500", fontSize: "18px"}}>
                <TextField
               
                  label="Search item"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </TableCell>
              {/* <TableCell></TableCell> */}
            </TableRow>
            <TableRow>
             
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item,index) => (
              <TableRow key={item.id} style={{ backgroundColor: '#f0f8ff' }}>
                <TableCell sx={{fontWeight:"500", fontSize: "14px"}}>{index + 1}</TableCell>
                <TableCell sx={{fontWeight:"500", fontSize: "16px"}}>{item.title}</TableCell>
                
                {/* <TableCell>{item.completed ? 'Completed' : 'Not Completed'}</TableCell> */}
                <TableCell>
                  <Button color="primary" onClick={() => editItem(item.id)} sx={{fontWeight:"500", fontSize: "14px"}}>
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => deleteItem(item.id)} sx={{fontWeight:"500", fontSize: "14px"}}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;

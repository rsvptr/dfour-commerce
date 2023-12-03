
import React from 'react'
import { PieChart, Pie,  } from 'recharts';
import mongoose from 'mongoose'
import {data_all,data_elec,data_lap} from './Data'


// This Function Screen Displays the Inventory of store, Inventory  the Laptops and Electronics of the store.


async function run() {
    const uri = "mongodb+srv://fosablanca:group33%40d4c@cluster0.9pxa8.mongodb.net/d4comm?retryWrites=true&w=majority";
    mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});}



export const InventoryScreen = () => {
   
    const renderCustomizedLabel = ({
        x, y, name
      }) => {
        return (
          <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="right">
            {name}
          </text>
        );
      };

      const renderCustomizedLabel2 = ({
        x, y, name
      }) => {
        return (
          <text x={x} y={y} fill="black" textAnchor="left" dominantBaseline="left">
            {name}
          </text>
        );
      };
      

    return (
        <>
        
        <h1>Current Inventory</h1>
    
        <PieChart width={700} height={700}>
            
        <Pie data={data_all} dataKey="value" outerRadius={250}  fill="pink"  label={renderCustomizedLabel} labelLine={true}/>
      </PieChart>

      <h3>1. Electronics </h3>
    
        <PieChart width={500} height={500}>
            
        <Pie data={data_elec} dataKey="value" outerRadius={140}  fill="blue"  label={renderCustomizedLabel} labelLine={true}/>
      </PieChart>

      <h3>2. Laptops </h3>
    
    <PieChart width={800} height={700}>
        
    <Pie data={data_lap} dataKey="value" outerRadius={140}  fill="cyan"  label={renderCustomizedLabel2} labelLine={true}/>
  </PieChart>

        
        </>
        

      
    )
}

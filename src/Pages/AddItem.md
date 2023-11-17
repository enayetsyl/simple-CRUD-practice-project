This file will describe full details of how to add an item in the database.

PART 1  HTML AND DESIGN

Following is a format of form using react hook form. It will be explained after it. 

 <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-3 pb-5'>
        <label htmlFor="" className='font-bold'>Product Name</label>
      <input type="text" placeholder="Enter Product Name" {...register("ProductName", {required: true})} className='border border-solid border-black p-2' />
      </div>
      <label htmlFor="" className='font-bold'>Product Color</label>
      <select {...register("Color", { required: true })} className='border border-solid border-black p-2'>
        <option value="Red">Red</option>
        <option value=" Green"> Green</option>
        <option value=" Yellow"> Yellow</option>
        <option value=" Blue"> Blue</option>
      </select>
      </div>
      <div className='flex flex-col gap-3 pb-5'>
      <label htmlFor="" className='font-bold'>Available Full Year?</label>
      <input type="checkbox" placeholder="availableAllYear" {...register("availableAllYear", {required: true})} className='text-2xl'/>
      </div>
      <input type="submit" className='w-full py-5 bg-green-600 text-white text-2xl' />
    </form>

In line 7 you have to write onSubmit name as it is. this will later be used for event handler function.

You can design div, label and input tag as you wish available in line 7,8 & 9. 

Inside all the input tag there is an attribute ...register. you have to keep it and inside ()within "" you have write the name of value that will be sent to database. e.g. coude be name, email, password, productName, phoneNumber etc. 

If you want to make the field required then after name give , and write {required: true}.

In the above example there are text field, select field and checkbox. You can add other field as you wish. Just make sure to give each field a ...register name. 

In the line 24 there is is an input type submit, on clicking it will send data to the server. 


PART 2 EVENT HANDLER 

    You have to install axios, react-hook form and sweetalert for following function to work

npm install sweetalert --save
npm install react-hook-form
npm install axios

    Following line should be written at the top of the file to import necessary packages

import axios from 'axios';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

    Following line should be used before return to make data submission work.

 const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    
    axios.post('http://localhost:5000/addproduct', data)
    .then((res) => {
      if(res.data.insertedId){
        swal("Congratulation!", "You successfully added a product!", "success");
      }
      
    })
    .catch ((error) => {
      console.log('axios post error', error)
    })
  };
   console.log(errors);

Line 56 is used useForm hook to get some required data.

Line 57 is onSubmit handler. It takes one parameters "data". data is an object and contains ...register field name and their value in a key value pair. 

Line 59 is axios post method that hit a route in the server and post the data object to the server.

Line 60 collect response from the server.

Line 61 check if response received from server has a data object and that data object has insertedId property. 

Line 62 show a alert when condition in line 61 fulfils. 

Line 66 catch any error in the post process by axios and console it in following line.

Line 70 console error if there is any problem in sending data using react-hook-form.


PART 3 SERVER SIDE CODE

At the server side following should be written after middleware.

async function run() {
  try {
 
    await client.connect();

    const productsCollection = client.db("crudPracticeDB").collection("products")


    app.post('/addproduct', async(req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

Line 93 is the starting of function to connect and send data to the mongoDB.

Line 94 is the try block.

Line 95 connect to the mongoDB server.

Line 98 is the variable which contains database name in "crudPracticeDB" and inside that database the collection name "products" where the data will be stored. 

Line 101 define that it is a post route. give the route link and start and async callback function.

Line 102 store data received from the frontend through req.body to the product variable. You can change the variable name as par your requirement.

Line 103 insert the product variable in the productsCollection variable and store response from the mongoDb in the result variable. 

Line 104 send the result variable to the frontend using res.send.

Line 107-114 are common line given by mongoDB for database connection and catching error etc.
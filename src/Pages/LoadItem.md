This file will describe how to load data from mongoDB to the frontend and some display of data.

tanstack query, axios is used to load data in the following example. 


PART 1 SET UP TANSTACT QUERY

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
   <AuthProvider>
   <RouterProvider router={router}/>
   </AuthProvider>
   </QueryClientProvider>
  </React.StrictMode>,
)


Line 8 imports relevant file from tanstact query.

Line 13 call QueryClient function and hold it in queryClient variable.

Line 17 and 21 wrap the full application using QueryClientProvider. 


PART 2 LOAD DATA IN THE USER COMPONENT

import {
  useQuery
} from '@tanstack/react-query'
import axios from 'axios';
import swal from 'sweetalert';

const ManageProduct = () => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      axios.get('http://localhost:5000/allproducts')
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log('axios get error', error);
          throw error;
        }),
  });

  return (
    <div>
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Number</th>
        <th>Product Name</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        isLoading ? (<p>Your item is loading</p>) :
        (
          data.map((product, idx) => (
            <tr key={product._id}>
          <th>{idx + 1}</th>
          <td>{product.ProductName}</td>
          <td><Link to={`/updateproduct/${product._id}`}>
          <FaEdit/>
          </Link></td>
          <td onClick={() => handleDelete(product._id)}><FaTrash/></td>
        </tr>
          ))
        )
      }
  
    </tbody>
  </table>
</div>
    </div>
  );
};

Line 35-39 imports tanstack query, axios and sweetalert for later use in the component.

Line 41 is the main function of the component.

Line 42 is the starting of tanstack useQuery hook.

Line 43 is the queryKey. Make sure to give an unique name.

Line 44 is the starting query function.

Line 45 is axiso get function which will hit a get route in the server to load data.

Line 46 show the response received from the server.

Line 49 catch any error received from the server by axios.

Line 55 is the starting point for writing jsx.

Line 71 is taking isLoading state from line 42 of tanstack query and starting conditional redering.

Line 72 will render if isLoading become false and map data array received from line 42 and display in the UI. 



PART 3 SERVER SIDE CODE TO LOAD DATA

async function run() {
  try {
 
    await client.connect();

    const productsCollection = client.db("crudPracticeDB").collection("products")

    app.get('/allproducts', async(req,res) => {
      const result = await productsCollection.find().toArray()
      res.send(result)
    })

    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


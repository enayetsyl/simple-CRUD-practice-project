import {
  useQuery
} from '@tanstack/react-query'
import axios from 'axios';
import {  FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import useAxiosSecure from '../hook/useAxiosSecure';

const ManageProduct = () => {
  const axiosSecure = useAxiosSecure()
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      axiosSecure.get('/allproducts')
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log('axios get error', error);
          throw error;
        }),
  });
// console.log(data)
  const handleDelete = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
          const res = await axiosSecure.delete(`/allproducts/${id}`);
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
              // refetch to update the ui
              refetch();
             
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });

          }


      }
      else {
        swal("Your imaginary file is safe!");
      }
  });
  }

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
          data?.map((product, idx) => (
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

export default ManageProduct;
import axios from 'axios';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import useAxiosSecure from '../hook/useAxiosSecure';

const AddProduct = () => {
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
    axiosSecure.post('/addproduct', data)
    .then((res) => {
      if(res.data.insertedId){
        swal("Congratulation!", "You successfully added a product!", "success");
      }
      console.log('axios response', res)
    })
    .catch ((error) => {
      console.log('axios post error', error)
    })
  };
  // console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-3 pb-5'>
        <label htmlFor="" className='font-bold'>Product Name</label>
      <input type="text" placeholder="Enter Product Name" {...register("ProductName", {required: true})} className='border border-solid border-black p-2' />
      </div>
      <div className='flex flex-col gap-3 pb-5'>
      <label htmlFor="" className='font-bold'>Product Size</label>
      <select {...register("Size", { required: true })} className='border border-solid border-black p-2'>
        <option value="Large">Large</option>
        <option value=" Medium"> Medium</option>
        <option value=" Small"> Small</option>
      </select>
      </div>
      <div className='flex flex-col gap-3 pb-5'>
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
    </div>
  );
};

export default AddProduct;
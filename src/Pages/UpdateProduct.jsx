import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import swal from 'sweetalert';
const UpdateProduct = () => {
  const {ProductName, _id, Size, Color} = useLoaderData()

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
   
    const updateRes = await axios.patch(`http://localhost:5000/allproducts/${_id}`, data)
    {
      if(updateRes.data.modifiedCount > 0){
        swal("Congratulation!", "Your product updated successfully!", "success");
      }
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-3 pb-5'>
        <label htmlFor="" className='font-bold'>Product Name</label>
      <input type="text" placeholder="Enter Product Name" {...register("ProductName", {required: true})} className='border border-solid border-black p-2' 
      defaultValue={ProductName}
      />
      </div>
      <div className='flex flex-col gap-3 pb-5'>
      <label htmlFor="" className='font-bold'>Product Size</label>
      <select {...register("Size", { required: true })} className='border border-solid border-black p-2'
      defaultValue={Size}
      >
        <option value="Large">Large</option>
        <option value=" Medium"> Medium</option>
        <option value=" Small"> Small</option>
      </select>
      </div>
      <div className='flex flex-col gap-3 pb-5'>
      <label htmlFor="" className='font-bold'>Product Color</label>
      <select {...register("Color", { required: true })} className='border border-solid border-black p-2'
      defaultValue={Color}
      >
        <option value="Red">Red</option>
        <option value=" Green"> Green</option>
        <option value=" Yellow"> Yellow</option>
        <option value=" Blue"> Blue</option>
      </select>
      </div>
      <div className='flex flex-col gap-3 pb-5'>
      <label htmlFor="" className='font-bold'>Available Full Year?</label>
      <input type="checkbox" placeholder="Available All Year" {...register("availableAllYear", {required: true})} className='text-2xl'/>
      </div>
      <input type="submit" className='w-full py-5 bg-green-600 text-white text-2xl' />
    </form>
    </div>
  );
};

export default UpdateProduct;
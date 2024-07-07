import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css';
import Image from "next/image";

const SingleProduct = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="avatar" fill/>
                </div>
                Iphone 12
            </div>
            <div className={styles.formContainer}>
                <form action='' className={styles.form}>
                    <label>Title</label>
                    <input type='text' name="username" placeholder="Your name"/>
                    <label>Price</label>
                    <input type='email' name="email" placeholder="Email"/>
                    <label>Stock</label>
                    <input type='password' name="password" placeholder="Password"/>
                    <label>Color</label>
                    <input type='number' name="phone" placeholder="Contact no"/>
                    <label>Price</label>
                    <input type='text' name="address" placeholder="Address"/>
                    <label>Is Admin?</label>
                    <select name='cat' id='cat'>
                        <option value='kitchen'>Kitchen</option>
                        <option value='computer'>Computer</option>
                    </select>
                    <label>Desc</label>
                    <textarea name="desc" id='desc' rows="5" placeholder='description'></textarea>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
}

export default SingleProduct;
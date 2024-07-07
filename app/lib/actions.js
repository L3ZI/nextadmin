"use server";
import {connectToDB} from "@/app/lib/utils";
import {Product, User} from "@/app/lib/models";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";
import products from "@/app/ui/dashboard/products/products";

export const addUser = async (formData) =>{
    const {username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);

    try{
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
            isActive,
        });
        await newUser.save();
    }catch (err){
        console.log(err);
        throw new Error('Fail to create user');
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
 }

export const updateUser = async (formData) =>{
    const {id, username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);

    try{
        connectToDB();
        const updateFields = {
            username,
            email,
            password,
            phone,
            address,
            isAdmin,
            isActive,
        };

        Object.keys(updateFields).forEach(
            (key) => (
                updateFields[key] === "" || undefined) && delete updateFields[key]
        );
        await User.findByIdAndUpdate(id, updateFields);
    }catch (err){
        console.log(err);
        throw new Error('Fail to update user');
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}


export const addProduct = async (formData) =>{
    const {title, desc, price, stock, color, size} = Object.fromEntries(formData);

    try{
        connectToDB();

        const newUser = new Product({
            title,
            desc,
            price,
            stock,
            color,
            size,
        });
        await newUser.save();
    }catch (err){
        console.log(err);
        throw new Error('Fail to add product');
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

export const deleteProduct = async (formData) =>{
    const {id} = Object.fromEntries(formData);

    try{
        connectToDB();
        await Product.findByIdAndDelete(id);
    }catch (err){
        console.log(err);
        throw new Error('Fail to delete product');
    }

    revalidatePath("/dashboard/products");
}

export const updateProduct = async (formData) =>{
    const {id, title, desc, price, stock, color, size} = Object.fromEntries(formData);

    try{
        connectToDB();
        const updateFields = {
            title,
            desc,
            price,
            stock,
            color,
            size,
        };

        Object.keys(updateFields).forEach(
            (key) => (
                updateFields[key] === "" || undefined) && delete updateFields[key]
        );
        await Product.findByIdAndUpdate(id, updateFields);
    }catch (err){
        console.log(err);
        throw new Error('Fail to update product');
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}


export const deleteUser = async (formData) =>{
    const {id} = Object.fromEntries(formData);

    try{
        connectToDB();
        await User.findByIdAndDelete(id);
    }catch (err){
        console.log(err);
        throw new Error('Fail to delete user');
    }

    revalidatePath("/dashboard/users");
}
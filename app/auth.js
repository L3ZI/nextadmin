import NextAuth from "next-auth";
import {authConfig} from "@/app/authconfig";
import CredentialProvider from "next-auth/providers/credentials";
import {connectToDB} from "@/app/lib/utils";
import {User} from "@/app/lib/models";
import bcrypt from "bcrypt";


const login = async (credentials) => {
    try {
        connectToDB();
        console.log("connected");
        const user = await User.findOne({ username: credentials.username });

        if (!user) throw new Error("Wrong credentials!");

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login!");
    }
};

export const {signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers:[
        CredentialProvider({
            async authorize(credentials){
                try{
                    const user = await login(credentials);
                    if (!user) {
                        throw new Error('No user found');
                    }
                    return user;
                }catch (err){
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user}){
            if(user){
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        }
    }
})
export const authconfig ={
    pages:{
        signin: "/login",
    },
    callbacks:{
        authorized({auth, request}){
            const isLoggedIn = auth?.user;
            const isOnDashboard = request.nextUrl.startsWith("/dashboard");
            if(isOnDashboard) {
                if(isLoggedIn) return true;
                return false;
            }else if(isLoggedIn){
                return Response.redirect(new URL("/dashboard", request.nextUrl));
            }
            return true;
        },
    },
};
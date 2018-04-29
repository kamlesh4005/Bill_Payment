export class User {

    email: string;
    password?: string;
    mobileNumber?: number;
    firstName?: string;
    lastName?: string;
    role?: string; 
    id?:string;

constructor(email: string,
    password?: string,
    mobileNumber?: number,
    firstName?: string,
    lastName?: string,
    role?: string, id?:string){
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.firstName =firstName;
        this.lastName = lastName;
        this.role = role;
        this.id = id;
}
    
}
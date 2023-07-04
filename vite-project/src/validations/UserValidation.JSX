import * as yup from 'yup';



export const userSchema=yup.object().shape({
    username:yup.string().min(3).required("enter username"),
    email:yup.string().email().required("enter email"),
    password:yup.string().min(6).required("enter password")
})
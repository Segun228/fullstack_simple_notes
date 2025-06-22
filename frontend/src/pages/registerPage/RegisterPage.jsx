import Form from "../../components/form/Form";

const RegisterPage = () => {
    return ( 
    <>
        <Form route="/api/user/register/" method="register" />
    </> 
    );
}

export default RegisterPage;
import Form from "../../components/form/Form";

const LoginPage = () => {
    return (<>
        <Form route="/api/token/" method="login"/>
    </>);
}

export default LoginPage;
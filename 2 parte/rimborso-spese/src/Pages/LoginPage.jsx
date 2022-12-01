import LoginForm from "../Components/LoginPageComponents/LoginForm";

export default function LoginPage({handleUsernameChange, login}){
    return (
        <LoginForm handleUsernameChange={handleUsernameChange} login={login}/>
    )
}
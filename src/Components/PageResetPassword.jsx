import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ContainerRegister = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  padding: 20px;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputField = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.input`
  height: 40px;
  font-size: 15px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
    background-color: #fff;
    color: #000;
    border: none;
  }
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 40px;
  left: 40px;
  font-size: 2rem;
  color: #000;
  &:hover {
    transform: scale(1.2);
  }
`;
function PageResetPassword() {
  return (
    <ContainerRegister>
      <RegisterContainer>
        <Title>
          <h1>Mot de passe oublié</h1>
        </Title>
        <BackLink to="/">
          <IoMdArrowRoundBack />
        </BackLink>
        <RegisterForm>
          <label htmlFor="email">Email :</label>
          <InputField type="text" id="email" placeholder="Email" />

          <SubmitButton type="submit" value="Envoyer" />
        </RegisterForm>
      </RegisterContainer>
    </ContainerRegister>
  );
}

export default PageResetPassword;

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles/utils/Button';

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  height: 50%;
  padding: 10px;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const ButtonModal = ({
  giverText,
  helperText,
  setIsSignInOpen,
  setIsSignUpOpen,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleButton = (e) => {
    const text = e.target.innerText.split(' ');
    // 회원가입
    if (text[1] === '회원가입' && text[0] === 'giver') {
      setIsSignUpOpen(false);
      navigate('/signup/giver');
    } else if (text[1] === '회원가입' && text[0] === 'helper') {
      setIsSignUpOpen(false);
      navigate('/signup/helper');
    }
    // 로그인
    if (text[1] === '로그인' && text[0] === 'giver') {
      setIsSignInOpen(false);
      user.who = 'giver';
      navigate('/signin');
    } else if (text[1] === '로그인' && text[0] === 'helper') {
      setIsSignInOpen(false);
      user.who = 'helper';
      navigate('/signin');
    }
  };

  return (
    <ModalBackground>
      <ButtonContainer>
        <Button onClick={handleButton}>{giverText}</Button>
        <Button onClick={handleButton}>{helperText}</Button>
      </ButtonContainer>
    </ModalBackground>
  );
};

export default ButtonModal;
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login, logout, setWho, userSelector } from '../redux/user/userSlice';
import {
  setIsModalOpen,
  setNextPage,
  utilSelector,
} from '../redux/util/utilSlice';
import Modal from '../component/Modal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { isAllOf } from '@reduxjs/toolkit';
import Loader from '../component/Loader';

// 아래 styled 먹인 것들은 추후 수정예정
// 임시로 기능 확인 위해서 설정해 놓은 것
const Container = styled.div`
  /* color: ${(props) => props.theme.color.main}; */
  // color: ${({ theme }) => theme.color.main};
  padding: 0 20px; // 이 값은 HEADER 값과 동일해야함!!
`;

const Button = styled.div`
  width: 10%;
  border-bottom: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    color: ${(props) => props.theme.color.main};
  }
`;

const Wrapper = styled.div``;

const Div = styled.div`
  font-size: 100px;
`;

const Home = () => {
  // isLoading 값 일단은 수동으로 true/false 값 관리
  const [isLoading, setIsLoading] = useState(false);

  const userState = useSelector(userSelector);
  const utilState = useSelector(utilSelector);
  const dispatch = useDispatch();
  // console.log(userState);

  const handleSignInButton = () => {
    if (userState.isLoggedIn) {
      // 로그아웃
      dispatch(logout());
    } else {
      // 로그인
      dispatch(setNextPage('/signin'));
      dispatch(setIsModalOpen());
    }
  };

  const handleSignUpButton = () => {
    dispatch(setNextPage('/signup'));
    dispatch(setIsModalOpen());
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Wrapper>
            <Button onClick={handleSignInButton}>
              {userState.isLoggedIn ? '로그아웃' : '로그인'}
            </Button>
            {userState.isLoggedIn ? (
              <Link to="/mypage">
                <Button>마이페이지</Button>
              </Link>
            ) : (
              <Button onClick={handleSignUpButton}>회원가입</Button>
            )}
            <Modal
              content={'hi'}
              buttonList={['Giver', 'Helper']}
              nextPage={utilState.nextPage}
              buttonEndPoint={utilState.nextPage === '/signup' ? true : false}
              callback={setWho}
            />
            <Div>TEST</Div>
            <Div>TEST</Div>
            <Div>TEST</Div>
            <Div>TEST</Div>
            <Div>TEST</Div>
            <Div>TEST</Div>
            <Div>TEST</Div>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default Home;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setInfo, setTextStyle } from '../redux/gifticon/gifticonSlice';

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

const ModalFrame = styled.div`
  text-align: center;
  align-items: center;
  width: 30%;
  height: 50%;
  padding: 10px;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const Button = styled.div`
  width: 100%;
  padding: 10px 0;
  border: 1px solid black;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const btnList = [
  { id: 1, name: '사용함' },
  { id: 2, name: '수락함' },
  { id: 3, name: '확인중' },
  { id: 4, name: '거절됨' },
  { id: 5, name: '만료됨' },
];

const GifticonStatusModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const who = useSelector((state) => state.user.user.who);
  const { status, id, textStyle } = useSelector((state) => state.gifticon);

  const token = localStorage.getItem('token');
  const printList = btnList.filter((x) => x.name !== status);
  const handleButton = async (e) => {
    try {
      const { data } = await axios.put(
        `/gifticon/detail/${id}`,
        {
          status: e.target.innerText,
        },
        {
          headers: { authorization: token },
        },
      );
      if (data.status === 'used') {
        dispatch(setInfo({ ...setInfo, status: '사용함', textStyle: 1 }));
      } else if (data.status === 'accepted') {
        dispatch(setInfo({ ...setInfo, status: '수락함', textStyle: 1 }));
      } else if (data.status === 'checking') {
        dispatch(setInfo({ ...setInfo, status: '확인중', textStyle: 1 }));
      } else if (data.status === 'rejected') {
        dispatch(setInfo({ ...setInfo, status: '확인중', textStyle: 2 }));
      } else if (data.status === 'expired') {
        dispatch(setInfo({ ...setInfo, status: '만료됨', textStyle: 2 }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalBackground onClick={handleModal}>
      <ModalFrame>
        <ButtonContainer>
          {printList.map((x) => (
            <Button key={x.id} onClick={handleButton}>
              {x.name}
            </Button>
          ))}
        </ButtonContainer>
      </ModalFrame>
    </ModalBackground>
  );
};

export default GifticonStatusModal;

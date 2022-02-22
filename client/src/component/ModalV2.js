import {
  ModalBackground,
  ModalFrame,
  Title,
  SubTitle,
  MesaageTitle,
  MessageArea,
} from '../styles/utils/Modal';
import { Btn, ButtonContainer } from '../styles/ButtonModalStyle';
import { useState, useRef } from 'react';

const ModalV2 = ({ title, subtitle, isMessage, callback }) => {
  const [textMessage, setTextMessage] = useState('');
  const close = useRef();

  //!! callback 작성예시
  /* callback = {(e) => {
  if (e.target.textContent === '예') {
    예를 눌렀을 때 하고싶은 기능
  } else {
    아니오를 눌렀을 때 하고 싶은 기능
  }
  공통 기능
  }} */

  const buttonYes = (e) => {
    if (isMessage) {
      callback(e, textMessage);
    } else {
      callback(e);
    }
  };

  const buttonNo = (e) => {
    if (close.current === e.target) {
      callback(e);
    }
  };

  return (
    <ModalBackground ref={close} onClick={buttonNo}>
      <ModalFrame>
        <Title>{title}</Title>
        <SubTitle>{subtitle ? subtitle : ''}</SubTitle>
        {isMessage ? (
          <>
            <MesaageTitle></MesaageTitle>
            <MessageArea onChange={(e) => setTextMessage(e.target.value)} />
          </>
        ) : null}
        <ButtonContainer>
          <Btn onClick={buttonYes}>네</Btn>
          <Btn ref={close} onClick={buttonNo}>
            아니오
          </Btn>
        </ButtonContainer>
      </ModalFrame>
    </ModalBackground>
  );
};

export default ModalV2;

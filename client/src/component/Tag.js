import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const TagContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const TagStyle = styled.div`
  margin: 15px;
  padding-top: 5px;
  width: 130px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.main};
  border: solid;
  border-width: thin;
  align-items: center;
  text-align: center;
`;

const RemoveButton = styled.button`
  width: 15px;
  height: 15px;
  padding-top: 1px;
  background-color: white;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
  align-items: center;
  text-align: center;
`;

const TagAdder = styled.div`
  border: solid;
  display: flex;
  flex-direction: column;
  z-index: 1px;
`;

const Tag = ({ tagList = [], targetTagList = [], callback }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  console.log(tagList);
  return (
    <Container
      onClick={() => {
        setIsEditMode(true);
      }}
    >
      <TagContent
        onDragEnter={() => {
          setIsEnter(true);
        }}
        onDragExit={() => {
          console.log('false');
          setIsEnter(false);
        }}
      >
        {targetTagList.map((tag, idx) => (
          <TagStyle key={idx}>
            {tagList[tag - 1]}
            {isEditMode ? (
              <RemoveButton
                name={tag}
                onClick={(e) => {
                  callback.delete(e.target.name);
                }}
              >
                x
              </RemoveButton>
            ) : null}
          </TagStyle>
        ))}
      </TagContent>
      {isEditMode ? (
        <TagAdder>
          <RemoveButton
            onClick={() => {
              console.log('hi');
              setIsEditMode(false);
            }}
          >
            x
          </RemoveButton>
          {tagList
            .filter((__, idx) => !targetTagList.includes(idx + 1))
            .map((tag, idx) => (
              <TagStyle
                key={idx}
                draggable
                onDragEnd={(e) => {
                  if (isEnter) {
                    callback.create(tagList.indexOf(e.target.textContent) + 1);
                  }
                  setIsEnter(false);
                }}
              >
                {tag}
              </TagStyle>
            ))}
        </TagAdder>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Tag;

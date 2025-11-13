import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Button from "../../../components/Button"
import VoiceRecord from "../components/VoiceRecord"

export default function UploadVoiceRecord() {
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current.click() // 숨겨진 input 클릭
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "audio/mpeg") {
      setSelectedFile(file)
    } else {
      setSelectedFile(file)
      alert("mp3 파일만 업로드 가능합니다.")
    }
  }

  return (
    <Container>
      {!selectedFile ? (
        <Wrapper>
          <Text>
            본인의 목소리만 담긴 <Highlight>30초 이상</Highlight> 분량의 mp3 파일을 업로드 해주세요
          </Text>
          <Button text="파일 업로드" width="24.5rem" icon={true} onClick={handleUploadClick} />
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="audio/mpeg"
            onChange={handleFileChange}
          />
        </Wrapper>
      ) : (
        <VoiceRecord file={selectedFile} />
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2.75rem;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  padding: 1.875rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  align-self: stretch;
  box-sizing: border-box;

  border-radius: 1.25rem;
  border: 1px solid var(--5, #E9E9E9);
  background: var(--Lightgrey, #F8F8F8);
`

const Text = styled.div`
  color: var(--80, #0E0E0E);
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`

const Highlight = styled.span`
  color: var(--80, #0E0E0E);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`

const HiddenInput = styled.input`
  display: none;
`
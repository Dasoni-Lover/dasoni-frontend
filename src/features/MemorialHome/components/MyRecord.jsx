// src/features/MemorialHome/components/MyRecord.jsx
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { UnderlineButton } from './UnderlineButtton'
import FoldableButton from './FoldableButton'
import VisitorList from "../components/VisitorList"

import { getRequestList, getVisitorList } from "../../../api/visitor"

import upicon from "../assets/up-icon.svg"
import downicon from "../assets/dropdown-icon.png"

export default function MyRecord({ hallId }) {
  const [openAll, setOpenAll] = useState(false)
  const [activeTab, setActiveTab] = useState('request')

  // 🔥 상태 분리
  const [requestList, setRequestList] = useState([])
  const [visitorList, setVisitorList] = useState([])

  // 현재 화면에 표시될 데이터
  const [data, setData] = useState([])

  // 🔥 activeTab 변경될 때마다 API 호출 + 상태 분리
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'request') {
          const res = await getRequestList(hallId)

          const list = res.requests?.map(r => ({
            requestId: r.requestId ?? r.userId,
            name: r.name,
            relation: r.relation,
            natures: r.natures,
            review: r.review,
            detail: r.detail,
          })) ?? []

          setRequestList(list)
          setData(list)
        } else {
          const res = await getVisitorList(hallId)

          const list = res.visitors?.map(v => ({
            visitorId: v.visitorId ?? v.userId,
            name: v.name,
            relation: v.relation,
            natures: v.natures,
            review: v.review,
            detail: v.detail,
          })) ?? []

          setVisitorList(list)
          setData(list)
        }

      } catch (err) {
        console.error("데이터 불러오기 실패:", err)
      }
    }

    fetchData()
  }, [activeTab, hallId])

  return (
    <Wrapper>
      <Container>
        <ButtonWrapper>
          <UnderlineButton
            text="입장 요청"
            count={requestList.length}   // 🔥 request 전용 count
            type={activeTab === 'request' ? 'click' : 'false'}
            onClick={() => setActiveTab('request')}
          />
          <UnderlineButton
            text="추모객 명단"
            count={visitorList.length}    // 🔥 visitor 전용 count
            type={activeTab === 'visitor' ? 'click' : 'false'}
            onClick={() => setActiveTab('visitor')}
          />
        </ButtonWrapper>

        <DropDownWrapper>
          <FoldableButton text="모두 접기" src={upicon} onClick={() => setOpenAll(false)} />
          <FoldableButton text="모두 펼치기" src={downicon} onClick={() => setOpenAll(true)} />
        </DropDownWrapper>
      </Container>

      <VisitorList data={data} openAll={openAll} type={activeTab} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 36.8rem;
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 2rem;
  border-bottom: 1px solid var(--5, #E9E9E9);
  margin-bottom: 0.75rem;
`

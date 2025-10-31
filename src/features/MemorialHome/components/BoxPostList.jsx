import React, { useEffect, useRef, useState } from 'react'
import BoxPostListItem from './BoxPostListItem'
import styled from 'styled-components'

const BoxPostList = () => {
  const wrapperRef = useRef(null)
  const [isLastRowPartial, setIsLastRowPartial] = useState(false)

  useEffect(() => {
    const checkLastRow = () => {
      if (!wrapperRef.current) return
      const children = Array.from(wrapperRef.current.children)
      if (children.length < 2) return setIsLastRowPartial(true)

      // 각 요소의 top 위치 비교
      const tops = children.map((el) => el.getBoundingClientRect().top)
      const lastTop = tops[tops.length - 1]
      const lastRowItems = tops.filter((t) => Math.abs(t - lastTop) < 2).length

      // 한 줄의 최대 개수 계산
      const firstRowTop = tops[0]
      const maxPerRow = tops.filter((t) => Math.abs(t - firstRowTop) < 2).length

      // 마지막 줄이 꽉 찼는지 확인
      setIsLastRowPartial(lastRowItems < maxPerRow)
    }

    checkLastRow()
    window.addEventListener('resize', checkLastRow)
    return () => window.removeEventListener('resize', checkLastRow)
  }, [])

  return (
    <Wrapper ref={wrapperRef} $isLastRowPartial={isLastRowPartial}>
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
      <BoxPostListItem />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 293px;
  flex-wrap: wrap;
  justify-content: ${({ $isLastRowPartial }) =>
    $isLastRowPartial ? 'flex-start' : 'space-between'};
  row-gap: 20px;
  transition: justify-content 0.2s ease;
`

export default BoxPostList

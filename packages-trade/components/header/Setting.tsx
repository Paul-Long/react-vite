import {db} from '@rx/db';
import {useCallback, useState} from 'react';
import {styled} from 'styled-components';

const StyledWrap = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;

export function Setting() {
  const [count, setCount] = useState<number>(0);
  const handleClick = useCallback(async () => {
    console.log(count);
    if (count < 3) {
      setCount(count + 1);
      return;
    }
    db.delete()
      .then(() => {
        console.log('数据库已删除！');
        window.location.reload();
      })
      .catch((error) => {
        console.error('删除数据库时出错：', error);
      });
    setCount(0);
  }, [count]);
  return (
    <StyledWrap className="cp T1" onClick={handleClick}>
      <i className="iconfont font-size-28px">&#xe649;</i>
    </StyledWrap>
  );
}

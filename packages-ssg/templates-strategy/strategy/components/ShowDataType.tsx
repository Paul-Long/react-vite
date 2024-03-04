import {RadioButtonGroup} from '@rx/widgets';
import React, {useCallback} from 'react';
import {showType$} from '../streams';

export function ShowDataType({value = 'card'}) {
  const genOptions = useCallback(() => {
    return [
      {text: <i className="iconfont font-size-24px">&#xe6cb;</i>, value: 'card'},
      {
        text: <i className="iconfont font-size-24px">&#xe6e4;</i>,
        value: 'list',
      },
    ];
  }, []);

  const handleChange = useCallback((v: any) => {
    showType$.next(v);
  }, []);
  return (
    <div className="dib">
      <RadioButtonGroup size="small" options={genOptions()} value={value} onChange={handleChange} />
    </div>
  );
}

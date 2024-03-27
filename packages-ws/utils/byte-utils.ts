export const objToByte = (obj: Record<string, unknown>): Uint8Array => {
  const data = JSON.stringify(obj);
  return strToByte(data);
};

export const strToByte = (data: string): Uint8Array => {
  return new TextEncoder().encode(data);
};

export const addDataViewByte = (dv1: DataView, offset: number, intView: Uint8Array): DataView => {
  for (let i = 0; i < intView.length; i++) {
    dv1.setUint8(offset + i, intView[i]);
  }
  return dv1;
};

export const getStr = (dv1: DataView, offset: number, byteLength: number): string => {
  const intView = new Uint8Array(byteLength);
  const end = offset + byteLength;
  let index = 0;
  for (let i = offset; i < end; i++) {
    intView[index] = dv1.getUint8(i);
    index += 1;
  }
  let data = String.fromCharCode.apply(null, Array.from(intView));
  data = decodeURIComponent(escape(data));
  return data;
};

export const getObj = (dv1: DataView, offset: number, byteLength: number): Uint8Array => {
  const intView = new Uint8Array(byteLength);
  const end = offset + byteLength;
  let index = 0;
  for (let i = offset; i < end; i++) {
    intView[index] = dv1.getUint8(i);
    index += 1;
  }
  return intView;
};

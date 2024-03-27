import {addDataViewByte, getStr, objToByte, strToByte} from './byte-utils';
import * as GZip from './gzip';
import WSEnum from './ws-const';

const {protoKey, protoCmd, protoFormat, dataType} = WSEnum;

const HEADER_LENGTH = 20;
let seqCount = 0;

interface IProto {
  cmd: number;
  format: number;
  seq: number;
  sessionId?: string;
  body?: Uint8Array;
}

export const getSeq = (): number => {
  seqCount = (seqCount + 1) % Number.MAX_SAFE_INTEGER;
  return seqCount;
};

const requestByte = (proto: IProto): ArrayBuffer => {
  const sidByte = proto.sessionId ? strToByte(proto.sessionId) : new Uint8Array();
  let len = HEADER_LENGTH + sidByte.byteLength + (proto.body?.length || 0);
  let buffer = new ArrayBuffer(len);
  let dv1 = new DataView(buffer);
  dv1.setInt32(0, len);
  dv1.setInt16(4, HEADER_LENGTH);
  dv1.setInt32(6, proto.cmd);
  dv1.setInt16(10, proto.format);
  dv1.setInt32(12, proto.seq);
  dv1.setInt32(16, sidByte.byteLength);

  let offset = HEADER_LENGTH;
  if (proto.sessionId) {
    dv1 = addDataViewByte(dv1, offset, sidByte);
    offset += sidByte.byteLength;
  }
  if (proto.body) {
    addDataViewByte(dv1, offset, proto.body);
  }
  return buffer;
};

export const generateConnect = (sid: string, data: object, formatType: string): ArrayBuffer => {
  let bodyB = objToByte(data as any);
  if (formatType === dataType.t_gzip) {
    bodyB = GZip.zip(bodyB);
  }
  let proto: IProto = {
    cmd: protoCmd.CONNECT,
    format: protoFormat.REQUEST,
    seq: getSeq(),
    sessionId: sid,
    body: bodyB,
  };
  return requestByte(proto);
};

export const generateHeartbeat = (sid: string): ArrayBuffer => {
  let proto: IProto = {
    cmd: protoCmd.HEARTBEAT,
    format: protoFormat.SEND,
    seq: getSeq(),
    sessionId: sid,
  };
  return requestByte(proto);
};

export const generateRequest = (
  sid: string,
  serverName: string,
  method: string,
  content: object,
  formatType: string
): ArrayBuffer => {
  const seq = getSeq();
  return generateSeqRequest(sid, serverName, method, content, seq, formatType);
};

export const generateSeqRequest = (
  sid: string,
  serverName: string,
  method: string,
  content: object,
  seq: number,
  formatType: string
): ArrayBuffer => {
  let hm = {
    serverName,
    method,
    content,
  };

  let body = objToByte(hm);
  if (formatType === dataType.t_gzip) {
    body = GZip.zip(body);
  }
  let proto: IProto = {
    cmd: protoCmd.SEND,
    format: protoFormat.REQUEST,
    seq,
    sessionId: sid,
    body,
  };
  return requestByte(proto);
};

export const byteToProto = (eventData: ArrayBuffer, formatType: string): any => {
  let data: any = {};
  if (eventData) {
    let dv1 = new DataView(eventData);
    const len = dv1.getInt32(0);
    const headerLen = dv1.getInt16(4);
    const cmd = dv1.getInt32(6);
    const format = dv1.getInt16(10);
    const seq = dv1.getInt32(12);
    const byteLength = dv1.getInt32(16);
    data.cmd = cmd;
    data.format = format;
    data.seq = seq;
    let offset = HEADER_LENGTH;
    if (byteLength > 0) {
      data.sid = getStr(dv1, offset, byteLength);
      offset += byteLength;
    }
    const bodySize = len - headerLen - byteLength;
    if (bodySize > 0) {
      let bodyStr;
      if (formatType == dataType.t_gzip) {
        bodyStr = GZip.unzip(new Uint8Array(eventData, offset, bodySize));
        // bodyStr = String.fromCharCode.apply(null, new Uint8Array(bodyStr));
        // bodyStr = decodeURIComponent(escape(bodyStr));
        data.body = JSON.parse(bodyStr as string);
      } else {
        bodyStr = getStr(dv1, offset, bodySize);
        data.body = JSON.parse(bodyStr);
      }
    }
  }
  return data;
};

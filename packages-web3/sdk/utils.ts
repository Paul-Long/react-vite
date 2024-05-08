import {PublicKey} from '@solana/web3.js';

export function getMarginMarketPda(marginIndex: number): any {
  return {
    0: new PublicKey('3rXubG8SSHxkFTQUEB1nMrv6VPq77grGCr9qk5AC5qHq'),
    1: new PublicKey('FVgvwqwQL2pPSosuAhMioH9Gr7h8m3MTeXEvqQ7MjmQf'),
    3: new PublicKey('99GA3XhP2UXEmgVJwxV5ZLUQBzQK3qXi9uhMqjwUB6cB'),
  }[marginIndex];
}

export function getMarginMarketVaultPda(marginIndex: number): any {
  return {
    1: new PublicKey('8MM9xcx9VzTE9h3rZe9zePZRwx6AL38gjWNYveCvcEy4'),
    3: new PublicKey('2bzQpzcXu3uJGtbdtv7GMgCpCcCpbFmvtCpdngmkWaVr'),
  }[marginIndex];
}

export function getMintAccountPda(marginIndex: number): any {
  return {
    1: new PublicKey('6w58sdgsLcxa9UD43GHKVxtfXMe7su5r7UqMJcPwZpp8'),
    3: new PublicKey('6ATaSXxpiiFCGfQMv3hKYmnVYEaBLYmXstuJjqCXXXJg'),
  }[marginIndex];
}

export function getFaucetConfigPda(marginIndex: number): any {
  return {
    1: new PublicKey('HALSfZXvKUFEAVA74CQxNG8umP18hJCMu3EHS9XgKybr'),
    3: new PublicKey('2rgQosahMCugsB21H8wfpDKvFy4wCQtFCpfTgfwagnUu'),
  }[marginIndex];
}

export function getPerpMarketPda(marketIndex: number): any {
  return {
    0: new PublicKey('Dz2FqfaXMtQ7ZVG3Sg5hFi3bnecjZGbJjNU1yGTr3MFJ'),
    2: new PublicKey('EcPPGQbrUrJYFEgCyp2vAKdKiM88kUm6RQF45LpsFs9g'),
    4: new PublicKey('CsrEbQpqk1LBYok9JsPTY8YKuTWwznV464TtHxLWaAw7'),
    6: new PublicKey('3csQhSdsSdcfVQg9WVyjc18iBeRBvfewwR7ioJnjfLvE'),
    8: new PublicKey('BtQhEYiKrH5JitVQPo1vRc1LePDgDFai2ADxs4kAxaDT'),
    9: new PublicKey('8qWg2CjJARrXimFciXBG8FNaygC3qGmN4rBWZ7MMV31w'),
    10: new PublicKey('Gz4jtNCUxbXhWqQhG84quqqyP9XtFWMApBZXJ5Hfa1QB'),
  }[marketIndex];
}

export function getOraclePda(marketIndex: number): any {
  return {
    0: new PublicKey('FQXkMKt1v7g1WgBS4D9BrXYXeZV2fYHMSAjTUEQvxvi5'),
    2: new PublicKey('FQXkMKt1v7g1WgBS4D9BrXYXeZV2fYHMSAjTUEQvxvi5'),
    8: new PublicKey('FQXkMKt1v7g1WgBS4D9BrXYXeZV2fYHMSAjTUEQvxvi5'),
    9: new PublicKey('FQXkMKt1v7g1WgBS4D9BrXYXeZV2fYHMSAjTUEQvxvi5'),
    4: new PublicKey('344UyqjAxyWYPijYXkzRmhyaXLz25x2rt9G5bUu7zWqb'),
    6: new PublicKey('344UyqjAxyWYPijYXkzRmhyaXLz25x2rt9G5bUu7zWqb'),
    10: new PublicKey('344UyqjAxyWYPijYXkzRmhyaXLz25x2rt9G5bUu7zWqb'),
  }[marketIndex];
}

export function getQuoteAssetVaultPda(marketIndex: number): any {
  return {
    0: new PublicKey('7JqK4ns4sHzmaSPVG1Dqa4JcwbkUhYXJFveFhdkD8C75'),
    2: new PublicKey('5PMZ6NmGAcvkaQxDrArifHdYoMBPwtr1CYFErqH9TXt4'),
    4: new PublicKey('4pNU2FVNgtuivtmhRE86CTXZk1EbKok5nqQT2EHXeK7B'),
    6: new PublicKey('9URc5i434WqrWGKBbPiKm7kXpbgumGz8LqMcrFrvhRzb'),
    8: new PublicKey('3KGGr4YQKTQvDZ2GAqhzG2wpSKK6CPefqD3oeDk7crTp'),
    9: new PublicKey('7PCnem6kSVrLRifzLgrxwCGnzfXNJ6NZEKxzxza85PF6'),
    10: new PublicKey('2m8U2KNHz4NWkfoQ2jhd4cAsxrD6Cr2ZAQLweL93tXf1'),
  }[marketIndex];
}

export function getBaseAssetVaultPda(marketIndex: number): any {
  return {
    0: new PublicKey('E2gMJDFHTrYr3mmqiP4fM3XQ5DJMJoTiYVUbN2yUFvdd'),
    2: new PublicKey('ENgBTs8QupH2NQhptQn9ChhpERRqijBsGMLUXA8jsDVN'),
    4: new PublicKey('6CwdDGb737GGCkbdnyt75Zk2ScgBZr9BFD4LYeZ8Z46x'),
    6: new PublicKey('HKjLNdPZDMpSQJCZccKGjYS4nzaWXX96nBTG7jQLfq74'),
    8: new PublicKey('6Ns3zJCkcvMKEYWVjDDUXStKU3R3xHn3dYyXbAihS8aG'),
    9: new PublicKey('DQuUr6xkPSTKovmJn5ouDxMKMHGck949hWL9DMQ2Gbpf'),
    10: new PublicKey('2iZd7nuf6UNtz1gx5sRmab5qxzFzEEeV7LJJHvnGp7QN'),
  }[marketIndex];
}

export function getTokenVaultAPda(marketIndex: number): any {
  return {
    0: new PublicKey('3kJMUjJ9pxP99FBtHLtztAza4pLxyAwSqDBUVxWcZnP4'),
    2: new PublicKey('4diyiebgYXCaa5xNiCq1AVbb8vBL2ASjjNwxsQVC3iHW'),
    4: new PublicKey('GeAv8hRmfCsCJbrXzPTnExuop9qyupAA4kuhBn2TQePd'),
    6: new PublicKey('4Ktko9f9y3zzQgqGLT3tjwGwGU8L2GPomxvAPsqn6ehw'),
    8: new PublicKey('5PNrc7aE3W5ZagtwcSXLSqDg7BXTvNhGc9m3vmZv9d7A'),
    9: new PublicKey('EkPMroLYMwfQnU7tQ6VDJYB1iHW85xvTqi8MNN9wbp25'),
    10: new PublicKey('A6bwtgRC4ndF7ysQMpHVcKx8VXyqFgY25LdaPkEXSSXu'),
  }[marketIndex];
}

export function getTokenVaultBPda(marketIndex: number): any {
  return {
    0: new PublicKey('GsXWHGd1j3K2YHLbcee97PK7HxSgcmVjrjuMyiT1qfRw'),
    2: new PublicKey('951Hs2KLgmMf4vZT8GtanpyDBi1wfEykZaCcHi8JZmBJ'),
    4: new PublicKey('57mbqb5c47sHnRPjUUq96VhZPEAcgzvoBdCYbSnCGMW7'),
    6: new PublicKey('vmK12WPJ43xZxAB2tiMAbFXTb5Stw9TDiTsDd9mej6E'),
    8: new PublicKey('6WXgooJKYuhmkwaAs4KcoB6HTHbdjgTDPjrWSoa3vTMB'),
    9: new PublicKey('FrhSsGi7Jvr5hWKPcD6xrpXe52NeHrk6UsM9GdzZjYpt'),
    10: new PublicKey('7HbBSsvNYWX5DmAUVM68YsQXgTJfFHJ19zvGTQNcuiuF'),
  }[marketIndex];
}

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('3f6D7mMM2vYba2kRNJ8SN3nc3RekPNUNRnhrViZBdbaL'),
    2: new PublicKey('4Tf3Hp32YY3N1dnL3BiMmyWWVxqvwqiUJcXPTPumbi4u'),
    4: new PublicKey('9tUSCYnPjfsHwU3pcvHrEfSY7PL9um6buYRLT2a4N8Fc'),
    6: new PublicKey('344UyqjAxyWYPijYXkzRmhyaXLz25x2rt9G5bUu7zWqb'),
    8: new PublicKey('2A7FM2ZuGnhMWSCwefHqGSikydwCrxjDUsJqxLUCX32X'),
    9: new PublicKey('Bx2w1b3PXntUBXKLYRuRUDymTN6DPGHDLGzyCuVv3TvT'),
    10: new PublicKey('2dWkYfL99hBj1aFZ1gy2ZHZ3ogfajYQALV4yABbqJidy'),
  }[marketIndex];
}

export function getTokenMintAPda(marketIndex: number): any {
  return {
    0: new PublicKey('7LagK2Vtt1j1jCAPjAATMRRYe4Xft61ViiHyUir1e3or'),
    2: new PublicKey('7o6uANUb4JBST6dmbyGaLBu9M4cjrkNeChdKkfS362rQ'),
    4: new PublicKey('NuByya82ZKCWrWWhQARSwDWnPVwRj9z9b3RJjv52bCM'),
    6: new PublicKey('2U2Sb7DHAA2SAxaCED7mnqk4hLheg7p25tFtXokJui5u'),
    8: new PublicKey('HQBW5Nf8PFikHWTPuHN175KHi3sptRAcDsmYCTUN1qt'),
    9: new PublicKey('CWFh946EycCHoQmHuhvJdxcazG6M3AKRDQMmbundK1U5'),
    10: new PublicKey('6SN411ktoNSairCvra16tRJz5yjuu2gDT7r6qgfjGDMW'),
  }[marketIndex];
}

export function getTokenMintBPda(marketIndex: number): any {
  return {
    0: new PublicKey('9HRLQi3MfRSEkNCabwFefQ6T67m8unACj2ZBWDZDh5go'),
    2: new PublicKey('CpCA19NdUC9PCcgWkaxUXoZdKk34eAestef9WNhhLjeV'),
    4: new PublicKey('36VCCEtq4TvzBML13R9jrD9tvFuPJjQkgRqGmmMGBcPD'),
    6: new PublicKey('3tcVwg8UT7h8U9UhF9KMukKHL26e2u1zQoFu3ZMa3Z3A'),
    8: new PublicKey('6V9LEeaRZmsjfo9y4yhA3p2kgtbiG1UgqwdwyrT6HTMA'),
    9: new PublicKey('GFfgHjy9eXY8uLiVALSDWn6XFP8Pkrfn4R5mmwec98MV'),
    10: new PublicKey('BTbUZ3E3dp2i9HSxjzc37fg6VzQZJkfzHaCvyauK923G'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return {
    0: 1,
    2: 1,
    8: 1,
    9: 1,
    4: 1,
    6: 1,
    10: 1,
  }[marketIndex] as number;
}

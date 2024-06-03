export type RatexContracts = {
  "version": "0.1.0",
  "name": "ratex_contracts",
  "instructions": [
    {
      "name": "initializeUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "subAccountId",
          "type": "u16"
        },
        {
          "name": "isIsolated",
          "type": "bool"
        }
      ]
    },
    {
      "name": "deleteUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeLp",
      "accounts": [
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "subAccountId",
          "type": "u16"
        }
      ]
    },
    {
      "name": "deleteLp",
      "accounts": [
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeUserStats",
      "accounts": [
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "i64"
        }
      ]
    },
    {
      "name": "multiSigDeposit",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "i64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "i64"
        }
      ]
    },
    {
      "name": "placePerpOrder",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OrderParams"
          }
        }
      ]
    },
    {
      "name": "cancelOrder",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "cancelIsolatedOrder",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "closePosition",
      "docs": [
        "Close a position in a Whirlpool. Burns the position token in the owner's wallet.",
        "",
        "### Authority",
        "- \"position_authority\" - The authority that owns the position token.",
        "",
        "#### Special Errors",
        "- `ClosePositionNotEmpty` - The provided position account is not empty."
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "addPerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "i64"
        },
        {
          "name": "marginIndex",
          "type": "u16"
        },
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "lowerRate",
          "type": "u64"
        },
        {
          "name": "upperRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removePerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "observationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rmLiquidityPercent",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ]
    },
    {
      "name": "fillPerpOrder",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "beginLiquidate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "endLiquidate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "liquidate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ]
    },
    {
      "name": "liquidateInsurance",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "liquidateAdl",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        }
      ]
    },
    {
      "name": "beginJupSwap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "outMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Instructions Sysvar for instruction introspection"
          ]
        }
      ],
      "args": [
        {
          "name": "inMarketIndex",
          "type": "u16"
        },
        {
          "name": "outMarketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "isExactIn",
          "type": "bool"
        }
      ]
    },
    {
      "name": "endJupSwap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "outMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Instructions Sysvar for instruction introspection"
          ]
        }
      ],
      "args": [
        {
          "name": "inMarketIndex",
          "type": "u16"
        },
        {
          "name": "outMarketIndex",
          "type": "u16"
        }
      ]
    },
    {
      "name": "updatePerpMarket",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numberOfActiveLpAccounts",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFeesAndRewards",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectFees",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectProtocolFees",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolsConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectProtocolFeesAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenDestinationB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "observe",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "observation",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "secondsAgos",
          "type": {
            "vec": "u32"
          }
        }
      ],
      "returns": {
        "vec": "u128"
      }
    },
    {
      "name": "getAmmTwap",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "observation",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "secondsAgo",
          "type": "u32"
        }
      ],
      "returns": "u128"
    },
    {
      "name": "loadObservationState",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "calculateSwap",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "aToB",
          "type": "bool"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ],
      "returns": {
        "defined": "SwapResult"
      }
    },
    {
      "name": "calculatePositionValue",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "PositionValue"
      }
    },
    {
      "name": "calculateMarginValue",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "MarginValue"
      }
    },
    {
      "name": "calculateLpValue",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lp",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": "i64"
    },
    {
      "name": "calculateTraderPnl",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": "i64"
    },
    {
      "name": "calculateTickIndex",
      "accounts": [],
      "args": [
        {
          "name": "maturity",
          "type": "u64"
        },
        {
          "name": "impliedRate",
          "type": "u64"
        },
        {
          "name": "tickSpacing",
          "type": "i32"
        },
        {
          "name": "isLower",
          "type": "bool"
        }
      ],
      "returns": "i32"
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "initializeMarginMarket",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marginMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "insuranceFundVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "name",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "initializePerpMarket",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolsConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeTier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "observationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "oracle",
          "type": "publicKey"
        },
        {
          "name": "tickSpacing",
          "type": "u16"
        },
        {
          "name": "sqrtPrice",
          "type": "u128"
        },
        {
          "name": "orderStepSize",
          "type": "u64"
        },
        {
          "name": "minOrderSize",
          "type": "u64"
        },
        {
          "name": "startTs",
          "type": "i64"
        },
        {
          "name": "expireTs",
          "type": "i64"
        },
        {
          "name": "activeRatioCoef",
          "type": "u64"
        },
        {
          "name": "activeRatioCap",
          "type": "u64"
        },
        {
          "name": "lpMint",
          "type": "publicKey"
        },
        {
          "name": "lpOracle",
          "type": "publicKey"
        },
        {
          "name": "name",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "updatePerpMarketStatus",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": {
            "defined": "MarketStatus"
          }
        }
      ]
    },
    {
      "name": "epochUpdateRemove",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "epochStartTimestamp",
          "type": "i64"
        },
        {
          "name": "ov",
          "type": "i64"
        },
        {
          "name": "totalLpValue",
          "type": "u64"
        }
      ]
    },
    {
      "name": "epochUpdateAdd",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        }
      ]
    },
    {
      "name": "epochUpdateBegin",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "impliedRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "epochUpdateChangePrice",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "epochStartTimestamp",
          "type": "i64"
        }
      ]
    },
    {
      "name": "epochUpdateEnd",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "decreaseLiquidity",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMinA",
          "type": "u64"
        },
        {
          "name": "tokenMinB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeOracle",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracleMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "decimals",
          "type": "u32"
        }
      ]
    },
    {
      "name": "addKeeper",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "keepers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newKeeper",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeKeeper",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "keepers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "removeKeeper",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateOracle",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketRate",
          "type": "u64"
        },
        {
          "name": "rate",
          "type": "u64"
        },
        {
          "name": "lastRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setState",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "collateralRatioInitial",
          "type": "i64"
        },
        {
          "name": "collateralRatioMaintenance",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeConfig",
      "docs": [
        "Initializes a WhirlpoolsConfig account that hosts info & authorities",
        "required to govern a set of Whirlpools.",
        "",
        "### Parameters",
        "- `fee_authority` - Authority authorized to initialize fee-tiers and set customs fees.",
        "- `collect_protocol_fees_authority` - Authority authorized to collect protocol fees.",
        "- `reward_emissions_super_authority` - Authority authorized to set reward authorities in pools."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeAuthority",
          "type": "publicKey"
        },
        {
          "name": "collectProtocolFeesAuthority",
          "type": "publicKey"
        },
        {
          "name": "rewardEmissionsSuperAuthority",
          "type": "publicKey"
        },
        {
          "name": "defaultProtocolFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "initializeTickArray",
      "docs": [
        "Initializes a tick_array account to represent a tick-range in a Whirlpool.",
        "",
        "### Parameters",
        "- `start_tick_index` - The starting tick index for this tick-array.",
        "Has to be a multiple of TickArray size & the tick spacing of this pool.",
        "",
        "#### Special Errors",
        "- `InvalidStartTick` - if the provided start tick is out of bounds or is not a multiple of",
        "TICK_ARRAY_SIZE * tick spacing."
      ],
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tickArray",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTickIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "initializeFeeTier",
      "docs": [
        "Initializes a fee_tier account usable by Whirlpools in a WhirlpoolConfig space.",
        "",
        "### Authority",
        "- \"fee_authority\" - Set authority in the WhirlpoolConfig",
        "",
        "### Parameters",
        "- `tick_spacing` - The tick-spacing that this fee-tier suggests the default_fee_rate for.",
        "- `default_fee_rate` - The default fee rate that a pool will use if the pool uses this",
        "fee tier during initialization.",
        "",
        "#### Special Errors",
        "- `FeeRateMaxExceeded` - If the provided default_fee_rate exceeds MAX_FEE_RATE."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeTier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickSpacing",
          "type": "u16"
        },
        {
          "name": "defaultFeeRate",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "whirlpoolsConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "collectProtocolFeesAuthority",
            "type": "publicKey"
          },
          {
            "name": "rewardEmissionsSuperAuthority",
            "type": "publicKey"
          },
          {
            "name": "defaultProtocolFeeRate",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                30
              ]
            }
          }
        ]
      }
    },
    {
      "name": "feeTier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "publicKey"
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "defaultFeeRate",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tickArray",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTickIndex",
            "type": "i32"
          },
          {
            "name": "ticks",
            "type": {
              "array": [
                {
                  "defined": "Tick"
                },
                88
              ]
            }
          },
          {
            "name": "whirlpool",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "observationState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "docs": [
              "Whether the ObservationState is initialized"
            ],
            "type": "bool"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "observations",
            "docs": [
              "observation array"
            ],
            "type": {
              "array": [
                {
                  "defined": "Observation"
                },
                1000
              ]
            }
          },
          {
            "name": "padding",
            "docs": [
              "padding for feature update"
            ],
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "keepers",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "keepers",
            "type": {
              "array": [
                "publicKey",
                20
              ]
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    },
    {
      "name": "lp",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The owner/authority of the account"
            ],
            "type": "publicKey"
          },
          {
            "name": "ammPosition",
            "docs": [
              "The user's liquidity"
            ],
            "type": {
              "defined": "Position"
            }
          },
          {
            "name": "reserveQuoteAmount",
            "docs": [
              "The user's perp positions"
            ],
            "type": "i64"
          },
          {
            "name": "reserveBaseAmount",
            "type": "i64"
          },
          {
            "name": "lastActiveSlot",
            "docs": [
              "The last slot a user was active. Used to determine if a user is idle"
            ],
            "type": "u64"
          },
          {
            "name": "subAccountId",
            "docs": [
              "The sub account id for this user"
            ],
            "type": "u16"
          },
          {
            "name": "idle",
            "docs": [
              "User is idle if they haven't interacted with the protocol in 1 week and they have no orders, perp positions or borrows",
              "Off-chain keeper bots can ignore users that are idle"
            ],
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                21
              ]
            }
          }
        ]
      }
    },
    {
      "name": "marginMarket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "The address of the margin market. It is a pda of the market index"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "docs": [
              "The oracle used to price the margin"
            ],
            "type": "publicKey"
          },
          {
            "name": "mint",
            "docs": [
              "The token mint of the margin"
            ],
            "type": "publicKey"
          },
          {
            "name": "vault",
            "docs": [
              "The vault used to store the market's deposits"
            ],
            "type": "publicKey"
          },
          {
            "name": "name",
            "docs": [
              "The encoded display name for the market e.g. SOL"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "depositBalance",
            "docs": [
              "The sum of the scaled balances for deposits across users and pool balances",
              "To convert to the deposit token amount, multiply by the cumulative deposit interest",
              "precision: SPOT_BALANCE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "nextDepositRecordId",
            "docs": [
              "Every deposit has a deposit record id. This is the next id to use"
            ],
            "type": "u64"
          },
          {
            "name": "flashLoanAmount",
            "docs": [
              "For swaps, the amount of token loaned out in the begin_swap ix",
              "precision: token mint precision"
            ],
            "type": "u64"
          },
          {
            "name": "flashLoanInitialTokenAmount",
            "docs": [
              "For swaps, the amount in the users token account in the begin_swap ix",
              "Used to calculate how much of the token left the system in end_swap ix",
              "precision: token mint precision"
            ],
            "type": "u64"
          },
          {
            "name": "decimals",
            "docs": [
              "The market's token mint's decimals. To from decimals to a precision, 10^decimals"
            ],
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "status",
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                33
              ]
            }
          }
        ]
      }
    },
    {
      "name": "oracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "lastRate",
            "type": "u64"
          },
          {
            "name": "rate",
            "type": "u64"
          },
          {
            "name": "marketRate",
            "type": "u64"
          },
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "decimals",
            "type": "u32"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "perpMarket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "The perp market's address. It is a pda of the market index"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "docs": [
              "the quote asset oracle"
            ],
            "type": "publicKey"
          },
          {
            "name": "name",
            "docs": [
              "Encoded display name for the perp market e.g. MSOL-2406"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "startTs",
            "docs": [
              "start time"
            ],
            "type": "i64"
          },
          {
            "name": "expireTs",
            "docs": [
              "expiration time"
            ],
            "type": "i64"
          },
          {
            "name": "maxOpenInterest",
            "docs": [
              "the max open interest"
            ],
            "type": "u64"
          },
          {
            "name": "openInterest",
            "docs": [
              "current open interest"
            ],
            "type": "u64"
          },
          {
            "name": "orderStepSize",
            "type": "u64"
          },
          {
            "name": "minOrderSize",
            "type": "u64"
          },
          {
            "name": "pool",
            "type": {
              "defined": "Whirlpool"
            }
          },
          {
            "name": "numberOfUsers",
            "docs": [
              "number of users in a position (pnl) or pnl (quote)"
            ],
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "status",
            "docs": [
              "Whether a market is active, reduce only, expired, etc",
              "Affects whether users can open/close positions"
            ],
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "activeRatioCoef",
            "type": "u64"
          },
          {
            "name": "activeRatioCap",
            "type": "u64"
          },
          {
            "name": "lpMint",
            "docs": [
              "the liquidity asset mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "lpOracle",
            "docs": [
              "the liquidity asset oracle"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalQuoteAssetAmount",
            "docs": [
              "the quote asset amount minted by lps"
            ],
            "type": "i64"
          },
          {
            "name": "totalMarginAmount",
            "docs": [
              "the total deposited amount of the lp mint;"
            ],
            "type": "i64"
          },
          {
            "name": "impliedRate",
            "type": "u64"
          },
          {
            "name": "keeperFee",
            "type": "u64"
          },
          {
            "name": "numberOfActiveLpAccounts",
            "type": "u64"
          },
          {
            "name": "lpAccountsProcessed",
            "type": "u64"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                21
              ]
            }
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "signer",
            "type": "publicKey"
          },
          {
            "name": "numberOfAuthorities",
            "type": "u64"
          },
          {
            "name": "numberOfSubAccounts",
            "type": "u64"
          },
          {
            "name": "numberOfActiveLpAccounts",
            "type": "u64"
          },
          {
            "name": "collateralRatioInitial",
            "type": "i64"
          },
          {
            "name": "collateralRatioMaintenance",
            "type": "i64"
          },
          {
            "name": "insuranceAmount",
            "type": "i64"
          },
          {
            "name": "numberOfPerpMarkets",
            "type": "u16"
          },
          {
            "name": "numberOfMarginMarkets",
            "type": "u16"
          },
          {
            "name": "signerNonce",
            "type": "u8"
          },
          {
            "name": "exchangeStatus",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The owner/authority of the account"
            ],
            "type": "publicKey"
          },
          {
            "name": "marginPositions",
            "docs": [
              "The user's collateral"
            ],
            "type": {
              "array": [
                {
                  "defined": "MarginPosition"
                },
                2
              ]
            }
          },
          {
            "name": "orders",
            "docs": [
              "The user's liquidity"
            ],
            "type": {
              "array": [
                {
                  "defined": "Order"
                },
                32
              ]
            }
          },
          {
            "name": "perpPositions",
            "docs": [
              "The user's perp positions"
            ],
            "type": {
              "array": [
                {
                  "defined": "PerpPosition"
                },
                8
              ]
            }
          },
          {
            "name": "lastActiveSlot",
            "docs": [
              "The last slot a user was active. Used to determine if a user is idle"
            ],
            "type": "u64"
          },
          {
            "name": "lastOrderId",
            "type": "u32"
          },
          {
            "name": "subAccountId",
            "docs": [
              "The sub account id for this user"
            ],
            "type": "u16"
          },
          {
            "name": "idle",
            "docs": [
              "User is idle if they haven't interacted with the protocol in 1 week and they have no orders, perp positions or borrows",
              "Off-chain keeper bots can ignore users that are idle"
            ],
            "type": "bool"
          },
          {
            "name": "isLiquidating",
            "docs": [
              "Whether or not the subaccount has been liquidated"
            ],
            "type": "bool"
          },
          {
            "name": "isIsolated",
            "docs": [
              "isolated / cross margin flag"
            ],
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                19
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The authority for all of a users sub accounts"
            ],
            "type": "publicKey"
          },
          {
            "name": "referrer",
            "docs": [
              "The address that referred this user"
            ],
            "type": "publicKey"
          },
          {
            "name": "numberOfSubAccounts",
            "docs": [
              "The current number of sub accounts"
            ],
            "type": "u16"
          },
          {
            "name": "numberOfSubAccountsCreated",
            "docs": [
              "The number of sub accounts created. Can be greater than the number of sub accounts if user",
              "has deleted sub accountsget_margin_position_index"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                52
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SwapResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountBaseSwap",
            "type": "u64"
          },
          {
            "name": "amountQuoteSwap",
            "type": "u64"
          },
          {
            "name": "sqrtPriceX64",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "PositionValue",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionAssetValue",
            "type": "i64"
          },
          {
            "name": "positionLiabilityValue",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MarginValue",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marginAssetValue",
            "type": "i64"
          },
          {
            "name": "marginLiabilityValue",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Whirlpool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "publicKey"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "sqrtPrice",
            "type": "u128"
          },
          {
            "name": "protocolFeeOwedA",
            "type": "u64"
          },
          {
            "name": "protocolFeeOwedB",
            "type": "u64"
          },
          {
            "name": "tokenMintA",
            "type": "publicKey"
          },
          {
            "name": "tokenVaultA",
            "type": "publicKey"
          },
          {
            "name": "feeGrowthGlobalA",
            "type": "u128"
          },
          {
            "name": "tokenMintB",
            "type": "publicKey"
          },
          {
            "name": "tokenVaultB",
            "type": "publicKey"
          },
          {
            "name": "feeGrowthGlobalB",
            "type": "u128"
          },
          {
            "name": "rewardLastUpdatedTimestamp",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": "WhirlpoolRewardInfo"
                },
                3
              ]
            }
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "tickCurrentIndex",
            "type": "i32"
          },
          {
            "name": "observationIndex",
            "docs": [
              "the most-recently updated index of the observations array"
            ],
            "type": "u16"
          },
          {
            "name": "observationUpdateDuration",
            "type": "u16"
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "tickSpacingSeed",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "protocolFeeRate",
            "type": "u16"
          },
          {
            "name": "whirlpoolBump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          }
        ]
      }
    },
    {
      "name": "WhirlpoolRewardInfo",
      "docs": [
        "Stores the state relevant for tracking liquidity mining rewards at the `Whirlpool` level.",
        "These values are used in conjunction with `PositionRewardInfo`, `Tick.reward_growths_outside`,",
        "and `Whirlpool.reward_last_updated_timestamp` to determine how many rewards are earned by open",
        "positions."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Reward token mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "vault",
            "docs": [
              "Reward vault token account."
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority account that has permission to initialize the reward and set emissions."
            ],
            "type": "publicKey"
          },
          {
            "name": "emissionsPerSecondX64",
            "docs": [
              "Q64.64 number that indicates how many tokens per second are earned per unit of liquidity."
            ],
            "type": "u128"
          },
          {
            "name": "growthGlobalX64",
            "docs": [
              "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
              "emissions were turned on."
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "Tick",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "liquidityNet",
            "type": "i128"
          },
          {
            "name": "liquidityGross",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideA",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideB",
            "type": "u128"
          },
          {
            "name": "rewardGrowthsOutside",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "tickLowerIndex",
            "type": "i32"
          },
          {
            "name": "tickUpperIndex",
            "type": "i32"
          },
          {
            "name": "lowerRate",
            "type": "u64"
          },
          {
            "name": "upperRate",
            "type": "u64"
          },
          {
            "name": "feeGrowthCheckpointA",
            "type": "u128"
          },
          {
            "name": "feeOwedA",
            "type": "u64"
          },
          {
            "name": "feeGrowthCheckpointB",
            "type": "u128"
          },
          {
            "name": "feeOwedB",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": "PositionRewardInfo"
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "PositionRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "growthInsideCheckpoint",
            "type": "u128"
          },
          {
            "name": "amountOwed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Observation",
      "docs": [
        "The element of observations in ObservationState"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "blockTimestamp",
            "docs": [
              "The block timestamp of the observation"
            ],
            "type": "u32"
          },
          {
            "name": "sqrtPriceX64",
            "docs": [
              "the price of the observation timestamp, Q64.64"
            ],
            "type": "u128"
          },
          {
            "name": "cumulativeTimePriceX64",
            "docs": [
              "the cumulative of price during the duration time, Q64.64"
            ],
            "type": "u128"
          },
          {
            "name": "padding",
            "docs": [
              "padding for feature update"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "InsuranceFund",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "depositBalance",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "OrderParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseAssetAmount",
            "type": "i64"
          },
          {
            "name": "priceLimit",
            "type": "u128"
          },
          {
            "name": "expireTs",
            "type": "i64"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "isolatedMarginAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slot",
            "docs": [
              "The slot the order was placed"
            ],
            "type": "u64"
          },
          {
            "name": "priceLimit",
            "docs": [
              "The limit price for the order (can be 0 for market orders)",
              "For orders with an auction, this price isn't used until the auction is complete",
              "precision: PRICE_PRECISION"
            ],
            "type": "u128"
          },
          {
            "name": "baseAssetAmount",
            "docs": [
              "The size of the order",
              "precision for perps: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "baseAssetAmountFilled",
            "type": "i64"
          },
          {
            "name": "quoteAssetAmountFilled",
            "type": "i64"
          },
          {
            "name": "expireTs",
            "docs": [
              "The time when the order will expire"
            ],
            "type": "i64"
          },
          {
            "name": "orderIndex",
            "docs": [
              "The id for the order. Each users has their own order id space"
            ],
            "type": "u32"
          },
          {
            "name": "orderId",
            "type": "u32"
          },
          {
            "name": "isolatedMarginAmount",
            "type": "u64"
          },
          {
            "name": "status",
            "docs": [
              "Whether the order is open or unused"
            ],
            "type": {
              "defined": "OrderStatus"
            }
          },
          {
            "name": "orderType",
            "docs": [
              "The type of order"
            ],
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                12
              ]
            }
          }
        ]
      }
    },
    {
      "name": "MarginPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "scaledBalance",
            "docs": [
              "The scaled balance of the position. To get the token amount, multiply by the cumulative deposit/borrow",
              "interest of corresponding market.",
              "precision: SPOT_BALANCE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "balance",
            "docs": [
              "The cumulative deposits/borrows a user has made into a market",
              "precision: token mint precision"
            ],
            "type": "i64"
          },
          {
            "name": "marketIndex",
            "docs": [
              "The market index of the corresponding spot market"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                30
              ]
            }
          }
        ]
      }
    },
    {
      "name": "PerpPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseAssetAmount",
            "docs": [
              "the size of the users perp position",
              "precision: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "quoteAssetAmount",
            "docs": [
              "Used to calculate the users pnl. Upon entry, is equal to base_asset_amount * avg entry price - fees",
              "Updated when the user open/closes position or settles pnl. Includes fees/funding",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "lastRate",
            "docs": [
              "last cumlative rate"
            ],
            "type": "u64"
          },
          {
            "name": "breakEvenPrice",
            "type": "u128"
          },
          {
            "name": "marketIndex",
            "docs": [
              "The market index for the perp market"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "DepositDirection",
      "docs": [
        "deposit/withdraw event"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdraw"
          }
        ]
      }
    },
    {
      "name": "LPDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AddLiquidity"
          },
          {
            "name": "RemoveLiquidity"
          }
        ]
      }
    },
    {
      "name": "MarketStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Active"
          },
          {
            "name": "Paused"
          },
          {
            "name": "ReduceOnly"
          },
          {
            "name": "Settlement"
          },
          {
            "name": "Delisted"
          },
          {
            "name": "Updating"
          }
        ]
      }
    },
    {
      "name": "CollateralRequirementType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initial"
          },
          {
            "name": "Maintenance"
          }
        ]
      }
    },
    {
      "name": "OrderStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Init"
          },
          {
            "name": "Open"
          },
          {
            "name": "Filled"
          },
          {
            "name": "Canceled"
          }
        ]
      }
    },
    {
      "name": "OrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Market"
          },
          {
            "name": "Limit"
          }
        ]
      }
    },
    {
      "name": "PositionDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Long"
          },
          {
            "name": "Short"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "InitializeConfigEvent",
      "fields": [
        {
          "name": "feeAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "collectProtocolFeesAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "rewardEmissionsSuperAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "defaultProtocolFeeRate",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "InitializeFeeTierEvent",
      "fields": [
        {
          "name": "feeTier",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickSpacing",
          "type": "u16",
          "index": false
        },
        {
          "name": "defaultFeeRate",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "ClosePositionEvent",
      "fields": [
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "receiver",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "InitializeTickArrayEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "startTickIndex",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "IncreaseLiquidityEvent",
      "fields": [
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayLower",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayUpper",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidityAmount",
          "type": "u128",
          "index": false
        },
        {
          "name": "tokenA",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "DecreaseLiquidityEvent",
      "fields": [
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayLower",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayUpper",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidityAmount",
          "type": "u128",
          "index": false
        },
        {
          "name": "tokenA",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "SwapEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amountA",
          "type": "u64",
          "index": false
        },
        {
          "name": "amountB",
          "type": "u64",
          "index": false
        },
        {
          "name": "aToB",
          "type": "bool",
          "index": false
        },
        {
          "name": "sqrtPriceX64",
          "type": "u128",
          "index": false
        },
        {
          "name": "tickCurrentIndex",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "CollectFeesRecord",
      "fields": [
        {
          "name": "perpMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeA",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CollectProtocolFeesRecord",
      "fields": [
        {
          "name": "perpMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeA",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "InitializeMarginMarketRecord",
      "fields": [
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "marginMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marginMarketMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marginMarketVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "insuranceFundVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "oracle",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "InitializePerpMarketRecord",
      "fields": [
        {
          "name": "oracle",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "name",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "orderStepSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "minOrderSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "startTs",
          "type": "i64",
          "index": false
        },
        {
          "name": "expireTs",
          "type": "i64",
          "index": false
        },
        {
          "name": "activeRatioCoef",
          "type": "u64",
          "index": false
        },
        {
          "name": "activeRatioCap",
          "type": "u64",
          "index": false
        },
        {
          "name": "lpMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lpOracle",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "defaultFeeRate",
          "type": "u16",
          "index": false
        },
        {
          "name": "tickSpacing",
          "type": "u16",
          "index": false
        },
        {
          "name": "initialSqrtPrice",
          "type": "u128",
          "index": false
        },
        {
          "name": "perpMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quoteAssetMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseAssetMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quoteAssetVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseAssetVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "observationState",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "NewUserRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        },
        {
          "name": "isIsolated",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "NewUserOrdersRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "NewLpRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "lpAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DeleteUserRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DeleteLpRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "lpAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DeleteUserOrdersRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DepositRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "direction",
          "type": {
            "defined": "DepositDirection"
          },
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "depositRecordId",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "i64",
          "index": false
        },
        {
          "name": "totalBalance",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "OrderRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "order",
          "type": {
            "defined": "Order"
          },
          "index": false
        }
      ]
    },
    {
      "name": "FillOrderRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u32",
          "index": false
        },
        {
          "name": "filler",
          "type": {
            "option": "publicKey"
          },
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "baseAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "baseAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "tradePrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "i64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "realizedPnl",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateBeginRecord",
      "fields": [
        {
          "name": "keeper",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "impliedRate",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateChangePriceRecord",
      "fields": [
        {
          "name": "sqrtPriceNew",
          "type": "u128",
          "index": false
        },
        {
          "name": "epochStartTimestamp",
          "type": "i64",
          "index": false
        },
        {
          "name": "ttm",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateRemoveRecord",
      "fields": [
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidityNew",
          "type": "u128",
          "index": false
        },
        {
          "name": "tickLowerIndexNew",
          "type": "i32",
          "index": false
        },
        {
          "name": "tickUpperIndexNew",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateAddRecord",
      "fields": [
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "deltaA",
          "type": "u64",
          "index": false
        },
        {
          "name": "deltaB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateEndRecord",
      "fields": [
        {
          "name": "totalQuoteAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "keeperFee",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LiquidationRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "filler",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "baseAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "baseAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "tradePrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "i64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "realizedPnl",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "CancelOrderRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateOracleRecord",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "marketRate",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LPRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "direction",
          "type": {
            "defined": "LPDirection"
          },
          "index": false
        },
        {
          "name": "marginIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "deltaBaseAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "deltaQuoteAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "tickLower",
          "type": "i32",
          "index": false
        },
        {
          "name": "tickUpper",
          "type": "i32",
          "index": false
        },
        {
          "name": "rateLower",
          "type": "u64",
          "index": false
        },
        {
          "name": "rateUpper",
          "type": "u64",
          "index": false
        },
        {
          "name": "marginAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "mintedQuoteAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "liquidityAmount",
          "type": "u128",
          "index": false
        },
        {
          "name": "totalQuoteAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "totalMarginAmount",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "InitializePositionEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lowerRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "upperRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "tickLowerIndex",
          "type": "i32",
          "index": false
        },
        {
          "name": "tickUpperIndex",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "JupSwapRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amountOut",
          "type": "u64",
          "index": false
        },
        {
          "name": "amountIn",
          "type": "u64",
          "index": false
        },
        {
          "name": "outMarketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "inMarketIndex",
          "type": "u16",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMarginMarketAuthority",
      "msg": "Invalid Margin Market Authority"
    },
    {
      "code": 6001,
      "name": "InvalidInsuranceFundAuthority",
      "msg": "Clearing house not insurance fund authority"
    },
    {
      "code": 6002,
      "name": "InsufficientDeposit",
      "msg": "Insufficient deposit"
    },
    {
      "code": 6003,
      "name": "InsufficientCollateral",
      "msg": "Insufficient collateral"
    },
    {
      "code": 6004,
      "name": "InsufficientCollateralInVault",
      "msg": "Insufficient collateral in vault"
    },
    {
      "code": 6005,
      "name": "SufficientCollateral",
      "msg": "Sufficient collateral"
    },
    {
      "code": 6006,
      "name": "MaxNumberOfPositions",
      "msg": "Max number of positions taken"
    },
    {
      "code": 6007,
      "name": "AdminControlsPricesDisabled",
      "msg": "Admin Controls Prices Disabled"
    },
    {
      "code": 6008,
      "name": "MarketDelisted",
      "msg": "Market Delisted"
    },
    {
      "code": 6009,
      "name": "MarketIndexAlreadyInitialized",
      "msg": "Market Index Already Initialized"
    },
    {
      "code": 6010,
      "name": "UserAccountAndUserPositionsAccountMismatch",
      "msg": "User Account And User Positions Account Mismatch"
    },
    {
      "code": 6011,
      "name": "UserHasNoPositionInMarket",
      "msg": "User Has No Position In Market"
    },
    {
      "code": 6012,
      "name": "UserHasPositionInMarket",
      "msg": "User Has Position In Market"
    },
    {
      "code": 6013,
      "name": "UserHasNoLpPositionInMarket",
      "msg": "User Has No Lp Position In Market"
    },
    {
      "code": 6014,
      "name": "InvalidInitialPeg",
      "msg": "Invalid Initial Peg"
    },
    {
      "code": 6015,
      "name": "InvalidRepegRedundant",
      "msg": "AMM repeg already configured with amt given"
    },
    {
      "code": 6016,
      "name": "InvalidRepegDirection",
      "msg": "AMM repeg incorrect repeg direction"
    },
    {
      "code": 6017,
      "name": "InvalidRepegProfitability",
      "msg": "AMM repeg out of bounds pnl"
    },
    {
      "code": 6018,
      "name": "SlippageOutsideLimit",
      "msg": "Slippage Outside Limit Price"
    },
    {
      "code": 6019,
      "name": "OrderSizeTooSmall",
      "msg": "Order Size Too Small"
    },
    {
      "code": 6020,
      "name": "InvalidUpdateK",
      "msg": "Price change too large when updating K"
    },
    {
      "code": 6021,
      "name": "AdminWithdrawTooLarge",
      "msg": "Admin tried to withdraw amount larger than fees collected"
    },
    {
      "code": 6022,
      "name": "MathError",
      "msg": "Math Error"
    },
    {
      "code": 6023,
      "name": "BnConversionError",
      "msg": "Conversion to u128/u64 failed with an overflow or underflow"
    },
    {
      "code": 6024,
      "name": "ClockUnavailable",
      "msg": "Clock unavailable"
    },
    {
      "code": 6025,
      "name": "UnableToLoadOracle",
      "msg": "Unable To Load Oracles"
    },
    {
      "code": 6026,
      "name": "PriceBandsBreached",
      "msg": "Price Bands Breached"
    },
    {
      "code": 6027,
      "name": "ExchangePaused",
      "msg": "Exchange is paused"
    },
    {
      "code": 6028,
      "name": "PerpMarketPaused",
      "msg": "Perp market is paused"
    },
    {
      "code": 6029,
      "name": "PerpMarketNotPaused",
      "msg": "Perp market not paused"
    },
    {
      "code": 6030,
      "name": "MarginMarketPaused",
      "msg": "Margin market is paused"
    },
    {
      "code": 6031,
      "name": "InvalidWhitelistToken",
      "msg": "Invalid whitelist token"
    },
    {
      "code": 6032,
      "name": "WhitelistTokenNotFound",
      "msg": "Whitelist token not found"
    },
    {
      "code": 6033,
      "name": "InvalidDiscountToken",
      "msg": "Invalid discount token"
    },
    {
      "code": 6034,
      "name": "DiscountTokenNotFound",
      "msg": "Discount token not found"
    },
    {
      "code": 6035,
      "name": "ReferrerNotFound",
      "msg": "Referrer not found"
    },
    {
      "code": 6036,
      "name": "ReferrerStatsNotFound",
      "msg": "ReferrerNotFound"
    },
    {
      "code": 6037,
      "name": "ReferrerMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6038,
      "name": "ReferrerStatsMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6039,
      "name": "ReferrerAndReferrerStatsAuthorityUnequal",
      "msg": "ReferrerAndReferrerStatsAuthorityUnequal"
    },
    {
      "code": 6040,
      "name": "InvalidReferrer",
      "msg": "InvalidReferrer"
    },
    {
      "code": 6041,
      "name": "InvalidOracle",
      "msg": "InvalidOracle"
    },
    {
      "code": 6042,
      "name": "OracleNotFound",
      "msg": "OracleNotFound"
    },
    {
      "code": 6043,
      "name": "LiquidationsBlockedByOracle",
      "msg": "Liquidations Blocked By Oracle"
    },
    {
      "code": 6044,
      "name": "MaxDeposit",
      "msg": "Can not deposit more than max deposit"
    },
    {
      "code": 6045,
      "name": "CantDeleteUserWithCollateral",
      "msg": "Can not delete user that still has collateral"
    },
    {
      "code": 6046,
      "name": "InvalidFundingProfitability",
      "msg": "AMM funding out of bounds pnl"
    },
    {
      "code": 6047,
      "name": "CastingFailure",
      "msg": "Casting Failure"
    },
    {
      "code": 6048,
      "name": "InvalidOrder",
      "msg": "InvalidOrder"
    },
    {
      "code": 6049,
      "name": "InvalidOrderMaxTs",
      "msg": "InvalidOrderMaxTs"
    },
    {
      "code": 6050,
      "name": "InvalidOrderMarketType",
      "msg": "InvalidOrderMarketType"
    },
    {
      "code": 6051,
      "name": "InvalidOrderForInitialMarginReq",
      "msg": "InvalidOrderForInitialMarginReq"
    },
    {
      "code": 6052,
      "name": "InvalidOrderNotRiskReducing",
      "msg": "InvalidOrderNotRiskReducing"
    },
    {
      "code": 6053,
      "name": "InvalidOrderSizeTooSmall",
      "msg": "InvalidOrderSizeTooSmall"
    },
    {
      "code": 6054,
      "name": "InvalidOrderNotStepSizeMultiple",
      "msg": "InvalidOrderNotStepSizeMultiple"
    },
    {
      "code": 6055,
      "name": "InvalidOrderBaseQuoteAsset",
      "msg": "InvalidOrderBaseQuoteAsset"
    },
    {
      "code": 6056,
      "name": "InvalidOrderIOC",
      "msg": "InvalidOrderIOC"
    },
    {
      "code": 6057,
      "name": "InvalidOrderPostOnly",
      "msg": "InvalidOrderPostOnly"
    },
    {
      "code": 6058,
      "name": "InvalidOrderIOCPostOnly",
      "msg": "InvalidOrderIOCPostOnly"
    },
    {
      "code": 6059,
      "name": "InvalidOrderTrigger",
      "msg": "InvalidOrderTrigger"
    },
    {
      "code": 6060,
      "name": "InvalidOrderAuction",
      "msg": "InvalidOrderAuction"
    },
    {
      "code": 6061,
      "name": "InvalidOrderOracleOffset",
      "msg": "InvalidOrderOracleOffset"
    },
    {
      "code": 6062,
      "name": "InvalidOrderMinOrderSize",
      "msg": "InvalidOrderMinOrderSize"
    },
    {
      "code": 6063,
      "name": "PlacePostOnlyLimitFailure",
      "msg": "Failed to Place Post-Only Limit Order"
    },
    {
      "code": 6064,
      "name": "UserHasNoOrder",
      "msg": "User has no order"
    },
    {
      "code": 6065,
      "name": "OrderAmountTooSmall",
      "msg": "Order Amount Too Small"
    },
    {
      "code": 6066,
      "name": "MaxNumberOfOrders",
      "msg": "Max number of orders taken"
    },
    {
      "code": 6067,
      "name": "OrderDoesNotExist",
      "msg": "Order does not exist"
    },
    {
      "code": 6068,
      "name": "OrderNotOpen",
      "msg": "Order not open"
    },
    {
      "code": 6069,
      "name": "FillOrderDidNotUpdateState",
      "msg": "FillOrderDidNotUpdateState"
    },
    {
      "code": 6070,
      "name": "ReduceOnlyOrderIncreasedRisk",
      "msg": "Reduce only order increased risk"
    },
    {
      "code": 6071,
      "name": "UnableToLoadAccountLoader",
      "msg": "Unable to load AccountLoader"
    },
    {
      "code": 6072,
      "name": "TradeSizeTooLarge",
      "msg": "Trade Size Too Large"
    },
    {
      "code": 6073,
      "name": "UserCantReferThemselves",
      "msg": "User cant refer themselves"
    },
    {
      "code": 6074,
      "name": "DidNotReceiveExpectedReferrer",
      "msg": "Did not receive expected referrer"
    },
    {
      "code": 6075,
      "name": "CouldNotDeserializeReferrer",
      "msg": "Could not deserialize referrer"
    },
    {
      "code": 6076,
      "name": "CouldNotDeserializeReferrerStats",
      "msg": "Could not deserialize referrer stats"
    },
    {
      "code": 6077,
      "name": "UserOrderIdAlreadyInUse",
      "msg": "User Order Id Already In Use"
    },
    {
      "code": 6078,
      "name": "NoPositionsLiquidatable",
      "msg": "No positions liquidatable"
    },
    {
      "code": 6079,
      "name": "InvalidMarginRatio",
      "msg": "Invalid Margin Ratio"
    },
    {
      "code": 6080,
      "name": "CantCancelPostOnlyOrder",
      "msg": "Cant Cancel Post Only Order"
    },
    {
      "code": 6081,
      "name": "InvalidOracleOffset",
      "msg": "InvalidOracleOffset"
    },
    {
      "code": 6082,
      "name": "CantExpireOrders",
      "msg": "CantExpireOrders"
    },
    {
      "code": 6083,
      "name": "CouldNotLoadMarketData",
      "msg": "CouldNotLoadMarketData"
    },
    {
      "code": 6084,
      "name": "PerpMarketNotFound",
      "msg": "PerpMarketNotFound"
    },
    {
      "code": 6085,
      "name": "InvalidMarketAccount",
      "msg": "InvalidMarketAccount"
    },
    {
      "code": 6086,
      "name": "UnableToLoadPerpMarketAccount",
      "msg": "UnableToLoadMarketAccount"
    },
    {
      "code": 6087,
      "name": "MarketWrongMutability",
      "msg": "MarketWrongMutability"
    },
    {
      "code": 6088,
      "name": "UnableToCastUnixTime",
      "msg": "UnableToCastUnixTime"
    },
    {
      "code": 6089,
      "name": "CouldNotFindMarginPosition",
      "msg": "CouldNotFindMarginPosition"
    },
    {
      "code": 6090,
      "name": "NoMarginPositionAvailable",
      "msg": "NoMarginPositionAvailable"
    },
    {
      "code": 6091,
      "name": "NoLiquidityPositionAvailable",
      "msg": "NoLiquidityPositionAvailable"
    },
    {
      "code": 6092,
      "name": "InvalidMarginMarketInitialization",
      "msg": "InvalidMarginMarketInitialization"
    },
    {
      "code": 6093,
      "name": "CouldNotLoadMarginMarketData",
      "msg": "CouldNotLoadMarginMarketData"
    },
    {
      "code": 6094,
      "name": "MarginMarketNotFound",
      "msg": "MarginMarketNotFound"
    },
    {
      "code": 6095,
      "name": "InvalidMarginMarketAccount",
      "msg": "InvalidMarginMarketAccount"
    },
    {
      "code": 6096,
      "name": "UnableToLoadMarginMarketAccount",
      "msg": "UnableToLoadMarginMarketAccount"
    },
    {
      "code": 6097,
      "name": "MarginMarketWrongMutability",
      "msg": "MarginMarketWrongMutability"
    },
    {
      "code": 6098,
      "name": "MarginMarketInterestNotUpToDate",
      "msg": "MarginInterestNotUpToDate"
    },
    {
      "code": 6099,
      "name": "MarginMarketInsufficientDeposits",
      "msg": "MarginMarketInsufficientDeposits"
    },
    {
      "code": 6100,
      "name": "UserMustSettleTheirOwnPositiveUnsettledPNL",
      "msg": "UserMustSettleTheirOwnPositiveUnsettledPNL"
    },
    {
      "code": 6101,
      "name": "CantUpdatePoolBalanceType",
      "msg": "CantUpdatePoolBalanceType"
    },
    {
      "code": 6102,
      "name": "InsufficientCollateralForSettlingPNL",
      "msg": "InsufficientCollateralForSettlingPNL"
    },
    {
      "code": 6103,
      "name": "AMMNotUpdatedInSameSlot",
      "msg": "AMMNotUpdatedInSameSlot"
    },
    {
      "code": 6104,
      "name": "AuctionNotComplete",
      "msg": "AuctionNotComplete"
    },
    {
      "code": 6105,
      "name": "MakerNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6106,
      "name": "MakerStatsNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6107,
      "name": "MakerMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6108,
      "name": "MakerStatsMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6109,
      "name": "MakerOrderNotFound",
      "msg": "MakerOrderNotFound"
    },
    {
      "code": 6110,
      "name": "CouldNotDeserializeMaker",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6111,
      "name": "CouldNotDeserializeMakerStats",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6112,
      "name": "AuctionPriceDoesNotSatisfyMaker",
      "msg": "AuctionPriceDoesNotSatisfyMaker"
    },
    {
      "code": 6113,
      "name": "MakerCantFulfillOwnOrder",
      "msg": "MakerCantFulfillOwnOrder"
    },
    {
      "code": 6114,
      "name": "MakerOrderMustBePostOnly",
      "msg": "MakerOrderMustBePostOnly"
    },
    {
      "code": 6115,
      "name": "CantMatchTwoPostOnlys",
      "msg": "CantMatchTwoPostOnlys"
    },
    {
      "code": 6116,
      "name": "OrderBreachesOraclePriceLimits",
      "msg": "OrderBreachesOraclePriceLimits"
    },
    {
      "code": 6117,
      "name": "OrderMustBeTriggeredFirst",
      "msg": "OrderMustBeTriggeredFirst"
    },
    {
      "code": 6118,
      "name": "OrderNotTriggerable",
      "msg": "OrderNotTriggerable"
    },
    {
      "code": 6119,
      "name": "OrderDidNotSatisfyTriggerCondition",
      "msg": "OrderDidNotSatisfyTriggerCondition"
    },
    {
      "code": 6120,
      "name": "PositionAlreadyBeingLiquidated",
      "msg": "PositionAlreadyBeingLiquidated"
    },
    {
      "code": 6121,
      "name": "PositionDoesntHaveOpenPositionOrOrders",
      "msg": "PositionDoesntHaveOpenPositionOrOrders"
    },
    {
      "code": 6122,
      "name": "AllOrdersAreAlreadyLiquidations",
      "msg": "AllOrdersAreAlreadyLiquidations"
    },
    {
      "code": 6123,
      "name": "CantCancelLiquidationOrder",
      "msg": "CantCancelLiquidationOrder"
    },
    {
      "code": 6124,
      "name": "UserIsBeingLiquidated",
      "msg": "UserIsBeingLiquidated"
    },
    {
      "code": 6125,
      "name": "UserNotBeingLiquidated",
      "msg": "UserNotBeingLiquidated"
    },
    {
      "code": 6126,
      "name": "LiquidationsOngoing",
      "msg": "LiquidationsOngoing"
    },
    {
      "code": 6127,
      "name": "WrongMarginBalanceType",
      "msg": "WrongMarginBalanceType"
    },
    {
      "code": 6128,
      "name": "UserCantLiquidateThemself",
      "msg": "UserCantLiquidateThemself"
    },
    {
      "code": 6129,
      "name": "InvalidPerpPositionToLiquidate",
      "msg": "InvalidPerpPositionToLiquidate"
    },
    {
      "code": 6130,
      "name": "InvalidBaseAssetAmountForLiquidatePerp",
      "msg": "InvalidBaseAssetAmountForLiquidatePerp"
    },
    {
      "code": 6131,
      "name": "InvalidPositionLastFundingRate",
      "msg": "InvalidPositionLastFundingRate"
    },
    {
      "code": 6132,
      "name": "InvalidPositionDelta",
      "msg": "InvalidPositionDelta"
    },
    {
      "code": 6133,
      "name": "UserBankrupt",
      "msg": "UserBankrupt"
    },
    {
      "code": 6134,
      "name": "UserNotBankrupt",
      "msg": "UserNotBankrupt"
    },
    {
      "code": 6135,
      "name": "UserHasInvalidBorrow",
      "msg": "UserHasInvalidBorrow"
    },
    {
      "code": 6136,
      "name": "DailyWithdrawLimit",
      "msg": "DailyWithdrawLimit"
    },
    {
      "code": 6137,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6138,
      "name": "InsufficientLPTokens",
      "msg": "Insufficient LP tokens"
    },
    {
      "code": 6139,
      "name": "CantLPWithPerpPosition",
      "msg": "Cant LP with a market position"
    },
    {
      "code": 6140,
      "name": "UnableToBurnLPTokens",
      "msg": "Unable to burn LP tokens"
    },
    {
      "code": 6141,
      "name": "TryingToRemoveLiquidityTooFast",
      "msg": "Trying to remove liqudity too fast after adding it"
    },
    {
      "code": 6142,
      "name": "InvalidMarginMarketVault",
      "msg": "Invalid Margin Market Vault"
    },
    {
      "code": 6143,
      "name": "InvalidMarginMarketState",
      "msg": "Invalid Margin Market State"
    },
    {
      "code": 6144,
      "name": "InvalidSerumProgram",
      "msg": "InvalidSerumProgram"
    },
    {
      "code": 6145,
      "name": "InvalidSerumMarket",
      "msg": "InvalidSerumMarket"
    },
    {
      "code": 6146,
      "name": "InvalidSerumBids",
      "msg": "InvalidSerumBids"
    },
    {
      "code": 6147,
      "name": "InvalidSerumAsks",
      "msg": "InvalidSerumAsks"
    },
    {
      "code": 6148,
      "name": "InvalidSerumOpenOrders",
      "msg": "InvalidSerumOpenOrders"
    },
    {
      "code": 6149,
      "name": "FailedSerumCPI",
      "msg": "FailedSerumCPI"
    },
    {
      "code": 6150,
      "name": "FailedToFillOnExternalMarket",
      "msg": "FailedToFillOnExternalMarket"
    },
    {
      "code": 6151,
      "name": "InvalidFulfillmentConfig",
      "msg": "InvalidFulfillmentConfig"
    },
    {
      "code": 6152,
      "name": "InvalidFeeStructure",
      "msg": "InvalidFeeStructure"
    },
    {
      "code": 6153,
      "name": "InsufficientIFShares",
      "msg": "Insufficient IF shares"
    },
    {
      "code": 6154,
      "name": "MarketActionPaused",
      "msg": "the Market has paused this action"
    },
    {
      "code": 6155,
      "name": "MarketPlaceOrderPaused",
      "msg": "the Market status doesnt allow placing orders"
    },
    {
      "code": 6156,
      "name": "MarketFillOrderPaused",
      "msg": "the Market status doesnt allow filling orders"
    },
    {
      "code": 6157,
      "name": "MarketWithdrawPaused",
      "msg": "the Market status doesnt allow withdraws"
    },
    {
      "code": 6158,
      "name": "UserCantBeDeleted",
      "msg": "User Cant Be Deleted"
    },
    {
      "code": 6159,
      "name": "ReduceOnlyWithdrawIncreasedRisk",
      "msg": "Reduce Only Withdraw Increased Risk"
    },
    {
      "code": 6160,
      "name": "MaxOpenInterest",
      "msg": "Max Open Interest"
    },
    {
      "code": 6161,
      "name": "CantResolvePerpBankruptcy",
      "msg": "Cant Resolve Perp Bankruptcy"
    },
    {
      "code": 6162,
      "name": "LiquidationDoesntSatisfyLimitPrice",
      "msg": "Liquidation Doesnt Satisfy Limit Price"
    },
    {
      "code": 6163,
      "name": "MarginTradingDisabled",
      "msg": "Margin Trading Disabled"
    },
    {
      "code": 6164,
      "name": "InvalidMarketStatusToSettlePnl",
      "msg": "Invalid Market Status to Settle Perp Pnl"
    },
    {
      "code": 6165,
      "name": "PerpMarketNotInSettlement",
      "msg": "PerpMarketNotInSettlement"
    },
    {
      "code": 6166,
      "name": "PerpMarketNotInReduceOnly",
      "msg": "PerpMarketNotInReduceOnly"
    },
    {
      "code": 6167,
      "name": "PerpMarketSettlementBufferNotReached",
      "msg": "PerpMarketSettlementBufferNotReached"
    },
    {
      "code": 6168,
      "name": "PerpMarketSettlementUserHasOpenOrders",
      "msg": "PerpMarketSettlementUserHasOpenOrders"
    },
    {
      "code": 6169,
      "name": "PerpMarketSettlementUserHasActiveLP",
      "msg": "PerpMarketSettlementUserHasActiveLP"
    },
    {
      "code": 6170,
      "name": "UnableToSettleExpiredUserPosition",
      "msg": "UnableToSettleExpiredUserPosition"
    },
    {
      "code": 6171,
      "name": "UnequalMarketIndexForMarginTransfer",
      "msg": "UnequalMarketIndexForMarginTransfer"
    },
    {
      "code": 6172,
      "name": "InvalidPerpPositionDetected",
      "msg": "InvalidPerpPositionDetected"
    },
    {
      "code": 6173,
      "name": "InvalidMarginPositionDetected",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6174,
      "name": "InvalidAmmDetected",
      "msg": "InvalidAmmDetected"
    },
    {
      "code": 6175,
      "name": "InvalidAmmForFillDetected",
      "msg": "InvalidAmmForFillDetected"
    },
    {
      "code": 6176,
      "name": "InvalidAmmLimitPriceOverride",
      "msg": "InvalidAmmLimitPriceOverride"
    },
    {
      "code": 6177,
      "name": "InvalidOrderFillPrice",
      "msg": "InvalidOrderFillPrice"
    },
    {
      "code": 6178,
      "name": "MarginMarketBalanceInvariantViolated",
      "msg": "MarginMarketBalanceInvariantViolated"
    },
    {
      "code": 6179,
      "name": "MarginMarketVaultInvariantViolated",
      "msg": "MarginMarketVaultInvariantViolated"
    },
    {
      "code": 6180,
      "name": "InvalidPDA",
      "msg": "InvalidPDA"
    },
    {
      "code": 6181,
      "name": "InvalidPDASigner",
      "msg": "InvalidPDASigner"
    },
    {
      "code": 6182,
      "name": "RevenueSettingsCannotSettleToIF",
      "msg": "RevenueSettingsCannotSettleToIF"
    },
    {
      "code": 6183,
      "name": "NoRevenueToSettleToIF",
      "msg": "NoRevenueToSettleToIF"
    },
    {
      "code": 6184,
      "name": "NoAmmPerpPnlDeficit",
      "msg": "NoAmmPerpPnlDeficit"
    },
    {
      "code": 6185,
      "name": "SufficientPerpPnlPool",
      "msg": "SufficientPerpPnlPool"
    },
    {
      "code": 6186,
      "name": "InsufficientPerpPnlPool",
      "msg": "InsufficientPerpPnlPool"
    },
    {
      "code": 6187,
      "name": "PerpPnlDeficitBelowThreshold",
      "msg": "PerpPnlDeficitBelowThreshold"
    },
    {
      "code": 6188,
      "name": "MaxRevenueWithdrawPerPeriodReached",
      "msg": "MaxRevenueWithdrawPerPeriodReached"
    },
    {
      "code": 6189,
      "name": "MaxIFWithdrawReached",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6190,
      "name": "NoIFWithdrawAvailable",
      "msg": "NoIFWithdrawAvailable"
    },
    {
      "code": 6191,
      "name": "InvalidIFUnstake",
      "msg": "InvalidIFUnstake"
    },
    {
      "code": 6192,
      "name": "InvalidIFUnstakeSize",
      "msg": "InvalidIFUnstakeSize"
    },
    {
      "code": 6193,
      "name": "InvalidIFUnstakeCancel",
      "msg": "InvalidIFUnstakeCancel"
    },
    {
      "code": 6194,
      "name": "InvalidIFForNewStakes",
      "msg": "InvalidIFForNewStakes"
    },
    {
      "code": 6195,
      "name": "InvalidIFRebase",
      "msg": "InvalidIFRebase"
    },
    {
      "code": 6196,
      "name": "InvalidInsuranceUnstakeSize",
      "msg": "InvalidInsuranceUnstakeSize"
    },
    {
      "code": 6197,
      "name": "InvalidOrderLimitPrice",
      "msg": "InvalidOrderLimitPrice"
    },
    {
      "code": 6198,
      "name": "InvalidIFDetected",
      "msg": "InvalidIFDetected"
    },
    {
      "code": 6199,
      "name": "InvalidAmmMaxSpreadDetected",
      "msg": "InvalidAmmMaxSpreadDetected"
    },
    {
      "code": 6200,
      "name": "InvalidConcentrationCoef",
      "msg": "InvalidConcentrationCoef"
    },
    {
      "code": 6201,
      "name": "InvalidSrmVault",
      "msg": "InvalidSrmVault"
    },
    {
      "code": 6202,
      "name": "InvalidVaultOwner",
      "msg": "InvalidVaultOwner"
    },
    {
      "code": 6203,
      "name": "InvalidMarketStatusForFills",
      "msg": "InvalidMarketStatusForFills"
    },
    {
      "code": 6204,
      "name": "IFWithdrawRequestInProgress",
      "msg": "IFWithdrawRequestInProgress"
    },
    {
      "code": 6205,
      "name": "NoIFWithdrawRequestInProgress",
      "msg": "NoIFWithdrawRequestInProgress"
    },
    {
      "code": 6206,
      "name": "IFWithdrawRequestTooSmall",
      "msg": "IFWithdrawRequestTooSmall"
    },
    {
      "code": 6207,
      "name": "IncorrectMarginMarketAccountPassed",
      "msg": "IncorrectMarginMarketAccountPassed"
    },
    {
      "code": 6208,
      "name": "BlockchainClockInconsistency",
      "msg": "BlockchainClockInconsistency"
    },
    {
      "code": 6209,
      "name": "InvalidIFSharesDetected",
      "msg": "InvalidIFSharesDetected"
    },
    {
      "code": 6210,
      "name": "NewLPSizeTooSmall",
      "msg": "NewLPSizeTooSmall"
    },
    {
      "code": 6211,
      "name": "MarketStatusInvalidForNewLP",
      "msg": "MarketStatusInvalidForNewLP"
    },
    {
      "code": 6212,
      "name": "InvalidMarkTwapUpdateDetected",
      "msg": "InvalidMarkTwapUpdateDetected"
    },
    {
      "code": 6213,
      "name": "MarketSettlementAttemptOnActiveMarket",
      "msg": "MarketSettlementAttemptOnActiveMarket"
    },
    {
      "code": 6214,
      "name": "MarketSettlementRequiresSettledLP",
      "msg": "MarketSettlementRequiresSettledLP"
    },
    {
      "code": 6215,
      "name": "MarketSettlementAttemptTooEarly",
      "msg": "MarketSettlementAttemptTooEarly"
    },
    {
      "code": 6216,
      "name": "MarketSettlementTargetPriceInvalid",
      "msg": "MarketSettlementTargetPriceInvalid"
    },
    {
      "code": 6217,
      "name": "UnsupportedMarginMarket",
      "msg": "UnsupportedMarginMarket"
    },
    {
      "code": 6218,
      "name": "MarginOrdersDisabled",
      "msg": "MarginOrdersDisabled"
    },
    {
      "code": 6219,
      "name": "MarketBeingInitialized",
      "msg": "Market Being Initialized"
    },
    {
      "code": 6220,
      "name": "InvalidUserSubAccountId",
      "msg": "Invalid Sub Account Id"
    },
    {
      "code": 6221,
      "name": "InvalidTriggerOrderCondition",
      "msg": "Invalid Trigger Order Condition"
    },
    {
      "code": 6222,
      "name": "InvalidMarginPosition",
      "msg": "Invalid Margin Position"
    },
    {
      "code": 6223,
      "name": "CantTransferBetweenSameUserAccount",
      "msg": "Cant transfer between same user account"
    },
    {
      "code": 6224,
      "name": "InvalidPerpPosition",
      "msg": "Invalid Perp Position"
    },
    {
      "code": 6225,
      "name": "UnableToGetLimitPrice",
      "msg": "Unable To Get Limit Price"
    },
    {
      "code": 6226,
      "name": "InvalidLiquidation",
      "msg": "Invalid Liquidation"
    },
    {
      "code": 6227,
      "name": "MarginFulfillmentConfigDisabled",
      "msg": "Margin Fulfillment Config Disabled"
    },
    {
      "code": 6228,
      "name": "InvalidMaker",
      "msg": "Invalid Maker"
    },
    {
      "code": 6229,
      "name": "FailedUnwrap",
      "msg": "Failed Unwrap"
    },
    {
      "code": 6230,
      "name": "MaxNumberOfUsers",
      "msg": "Max Number Of Users"
    },
    {
      "code": 6231,
      "name": "InvalidOracleForSettlePnl",
      "msg": "InvalidOracleForSettlePnl"
    },
    {
      "code": 6232,
      "name": "MarginOrdersOpen",
      "msg": "MarginOrdersOpen"
    },
    {
      "code": 6233,
      "name": "TierViolationLiquidatingPerpPnl",
      "msg": "TierViolationLiquidatingPerpPnl"
    },
    {
      "code": 6234,
      "name": "CouldNotLoadUserData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6235,
      "name": "UserWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6236,
      "name": "InvalidUserAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6237,
      "name": "CouldNotLoadUserStatsData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6238,
      "name": "UserStatsWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6239,
      "name": "InvalidUserStatsAccount",
      "msg": "InvalidUserStatsAccount"
    },
    {
      "code": 6240,
      "name": "UserNotFound",
      "msg": "UserNotFound"
    },
    {
      "code": 6241,
      "name": "UnableToLoadUserAccount",
      "msg": "UnableToLoadUserAccount"
    },
    {
      "code": 6242,
      "name": "InvalidJupSwap",
      "msg": "InvalidJupSwap"
    },
    {
      "code": 6243,
      "name": "UnableToGetTwapPrice",
      "msg": "Unable to get twap price"
    },
    {
      "code": 6244,
      "name": "InvalidAdlLiquidation",
      "msg": "Invalid adl liquidation"
    },
    {
      "code": 6245,
      "name": "UnauthorizedUserOrKeeper",
      "msg": "Unauthorized user or keeper"
    },
    {
      "code": 6246,
      "name": "UserNotIsolated",
      "msg": "User is not isolated"
    },
    {
      "code": 6247,
      "name": "InvalidLiquidityRange",
      "msg": "liquidity range is not allowed"
    },
    {
      "code": 6248,
      "name": "AccountLiquidated",
      "msg": "Account liquidated"
    },
    {
      "code": 6249,
      "name": "InvalidOracleAccount",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6250,
      "name": "UnableToLoadOracleAccount",
      "msg": "Unable to load oracle account"
    },
    {
      "code": 6251,
      "name": "CouldNotLoadOracleData",
      "msg": "could not load oracle data"
    },
    {
      "code": 6252,
      "name": "OracleWrongMutability",
      "msg": "wrong oracle mutablility"
    },
    {
      "code": 6253,
      "name": "KeeperAlreadyExists",
      "msg": "The keeper already exists in the list."
    },
    {
      "code": 6254,
      "name": "KeepersListFull",
      "msg": "The keepers list is full."
    },
    {
      "code": 6255,
      "name": "KeeperNotFound",
      "msg": "The keeper was not found in the list."
    },
    {
      "code": 6256,
      "name": "MaxOpenInterestExceeded",
      "msg": "Max open interest exceeded"
    },
    {
      "code": 6257,
      "name": "InvalidOrderStepSize",
      "msg": "Invalid order step size"
    },
    {
      "code": 6258,
      "name": "OrderExpired",
      "msg": "Order expired"
    },
    {
      "code": 6259,
      "name": "OnlyTrader",
      "msg": "Only trader"
    },
    {
      "code": 6260,
      "name": "OnlyLP",
      "msg": "Only LP"
    },
    {
      "code": 6261,
      "name": "InvalidWithdraw",
      "msg": "Invalid Withdraw"
    },
    {
      "code": 6262,
      "name": "InvalidLiquidate",
      "msg": "Invalid Liquidate"
    },
    {
      "code": 6263,
      "name": "MeetMaintenanceCollateralRequirement",
      "msg": "Meet maintenance collateral requirement"
    },
    {
      "code": 6264,
      "name": "FailToMeetMaintenanceCollateralRequirement",
      "msg": "Fail to meet maintenance collateral requirement"
    },
    {
      "code": 6265,
      "name": "FailToMeetInitialCollateralRequirement",
      "msg": "Fail to meet initial collateral requirement"
    },
    {
      "code": 6266,
      "name": "InvalidEnum",
      "msg": "Enum value could not be converted"
    },
    {
      "code": 6267,
      "name": "InvalidStartTick",
      "msg": "Invalid start tick index provided."
    },
    {
      "code": 6268,
      "name": "TickArrayExistInPool",
      "msg": "Tick-array already exists in this whirlpool"
    },
    {
      "code": 6269,
      "name": "TickArrayIndexOutofBounds",
      "msg": "Attempt to search for a tick-array failed"
    },
    {
      "code": 6270,
      "name": "InvalidTickSpacing",
      "msg": "Tick-spacing is not supported"
    },
    {
      "code": 6271,
      "name": "ClosePositionNotEmpty",
      "msg": "Position is not empty It cannot be closed"
    },
    {
      "code": 6272,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6273,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6274,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6275,
      "name": "TickNotFound",
      "msg": "Tick not found within tick array"
    },
    {
      "code": 6276,
      "name": "InvalidTickIndex",
      "msg": "Provided tick index is either out of bounds or uninitializable"
    },
    {
      "code": 6277,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6278,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6279,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6280,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6281,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6282,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6283,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6284,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6285,
      "name": "MissingOrInvalidDelegate",
      "msg": "Position token account has a missing or invalid delegate"
    },
    {
      "code": 6286,
      "name": "InvalidPositionTokenAmount",
      "msg": "Position token amount must be 1"
    },
    {
      "code": 6287,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6288,
      "name": "InvalidTimestamp",
      "msg": "Timestamp should be greater than the last updated timestamp"
    },
    {
      "code": 6289,
      "name": "InvalidTickArraySequence",
      "msg": "Invalid tick array sequence provided for instruction."
    },
    {
      "code": 6290,
      "name": "InvalidTokenMintOrder",
      "msg": "Token Mint in wrong order"
    },
    {
      "code": 6291,
      "name": "RewardNotInitialized",
      "msg": "Reward not initialized"
    },
    {
      "code": 6292,
      "name": "InvalidRewardIndex",
      "msg": "Invalid reward index"
    },
    {
      "code": 6293,
      "name": "RewardVaultAmountInsufficient",
      "msg": "Reward vault requires amount to support emissions for at least one day"
    },
    {
      "code": 6294,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6295,
      "name": "ProtocolFeeRateMaxExceeded",
      "msg": "Exceeded max protocol fee rate"
    },
    {
      "code": 6296,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6297,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6298,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6299,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6300,
      "name": "InvalidSqrtPriceLimitDirection",
      "msg": "Provided SqrtPriceLimit not in the same direction as the swap"
    },
    {
      "code": 6301,
      "name": "ZeroTradableAmount",
      "msg": "There are no tradable amount to swap."
    },
    {
      "code": 6302,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    },
    {
      "code": 6303,
      "name": "AmountInAboveMaximum",
      "msg": "Amount in above maximum threshold"
    },
    {
      "code": 6304,
      "name": "TickArraySequenceInvalidIndex",
      "msg": "Invalid index for tick array sequence"
    },
    {
      "code": 6305,
      "name": "AmountCalcOverflow",
      "msg": "Amount calculated overflows"
    },
    {
      "code": 6306,
      "name": "AmountRemainingOverflow",
      "msg": "Amount remaining overflows"
    },
    {
      "code": 6307,
      "name": "InvalidIntermediaryMint",
      "msg": "Invalid intermediary mint"
    },
    {
      "code": 6308,
      "name": "DuplicateTwoHopPool",
      "msg": "Duplicate two hop pool"
    },
    {
      "code": 6309,
      "name": "InvalidBundleIndex",
      "msg": "Bundle index is out of bounds"
    },
    {
      "code": 6310,
      "name": "BundledPositionAlreadyOpened",
      "msg": "Position has already been opened"
    },
    {
      "code": 6311,
      "name": "BundledPositionAlreadyClosed",
      "msg": "Position has already been closed"
    },
    {
      "code": 6312,
      "name": "UnableToLoadObservationStateAccount",
      "msg": "Unable To Observation state"
    },
    {
      "code": 6313,
      "name": "ObservationStateNotFound",
      "msg": "Observation state not found"
    },
    {
      "code": 6314,
      "name": "InvalidImpliedRate",
      "msg": "InvalidImpliedRate"
    },
    {
      "code": 6315,
      "name": "InvalidRmLiquidityPercent",
      "msg": "InvalidRmLiquidityPercent"
    },
    {
      "code": 6316,
      "name": "InvalidLpAccountsProcessed",
      "msg": "InvalidLpAccountsProcessed"
    },
    {
      "code": 6317,
      "name": "LpIsInactive",
      "msg": "LpIsInactive"
    }
  ]
};

export const IDL: RatexContracts = {
  "version": "0.1.0",
  "name": "ratex_contracts",
  "instructions": [
    {
      "name": "initializeUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "subAccountId",
          "type": "u16"
        },
        {
          "name": "isIsolated",
          "type": "bool"
        }
      ]
    },
    {
      "name": "deleteUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeLp",
      "accounts": [
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "subAccountId",
          "type": "u16"
        }
      ]
    },
    {
      "name": "deleteLp",
      "accounts": [
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeUserStats",
      "accounts": [
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "i64"
        }
      ]
    },
    {
      "name": "multiSigDeposit",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "i64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "i64"
        }
      ]
    },
    {
      "name": "placePerpOrder",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OrderParams"
          }
        }
      ]
    },
    {
      "name": "cancelOrder",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "cancelIsolatedOrder",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "closePosition",
      "docs": [
        "Close a position in a Whirlpool. Burns the position token in the owner's wallet.",
        "",
        "### Authority",
        "- \"position_authority\" - The authority that owns the position token.",
        "",
        "#### Special Errors",
        "- `ClosePositionNotEmpty` - The provided position account is not empty."
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "addPerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "i64"
        },
        {
          "name": "marginIndex",
          "type": "u16"
        },
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "lowerRate",
          "type": "u64"
        },
        {
          "name": "upperRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "removePerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "observationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rmLiquidityPercent",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ]
    },
    {
      "name": "fillPerpOrder",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "beginLiquidate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "endLiquidate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "liquidate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ]
    },
    {
      "name": "liquidateInsurance",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "liquidateAdl",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        }
      ]
    },
    {
      "name": "beginJupSwap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "outMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Instructions Sysvar for instruction introspection"
          ]
        }
      ],
      "args": [
        {
          "name": "inMarketIndex",
          "type": "u16"
        },
        {
          "name": "outMarketIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "isExactIn",
          "type": "bool"
        }
      ]
    },
    {
      "name": "endJupSwap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "outMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inMarginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Instructions Sysvar for instruction introspection"
          ]
        }
      ],
      "args": [
        {
          "name": "inMarketIndex",
          "type": "u16"
        },
        {
          "name": "outMarketIndex",
          "type": "u16"
        }
      ]
    },
    {
      "name": "updatePerpMarket",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numberOfActiveLpAccounts",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFeesAndRewards",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectFees",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "lp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "collectProtocolFees",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolsConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectProtocolFeesAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenDestinationB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "observe",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "observation",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "secondsAgos",
          "type": {
            "vec": "u32"
          }
        }
      ],
      "returns": {
        "vec": "u128"
      }
    },
    {
      "name": "getAmmTwap",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "observation",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "secondsAgo",
          "type": "u32"
        }
      ],
      "returns": "u128"
    },
    {
      "name": "loadObservationState",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "calculateSwap",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tickArray0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArray2",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "aToB",
          "type": "bool"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        }
      ],
      "returns": {
        "defined": "SwapResult"
      }
    },
    {
      "name": "calculatePositionValue",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "PositionValue"
      }
    },
    {
      "name": "calculateMarginValue",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "MarginValue"
      }
    },
    {
      "name": "calculateLpValue",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lp",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": "i64"
    },
    {
      "name": "calculateTraderPnl",
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": "i64"
    },
    {
      "name": "calculateTickIndex",
      "accounts": [],
      "args": [
        {
          "name": "maturity",
          "type": "u64"
        },
        {
          "name": "impliedRate",
          "type": "u64"
        },
        {
          "name": "tickSpacing",
          "type": "i32"
        },
        {
          "name": "isLower",
          "type": "bool"
        }
      ],
      "returns": "i32"
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "initializeMarginMarket",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marginMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "insuranceFundVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        }
      ],
      "args": [
        {
          "name": "name",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "initializePerpMarket",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolsConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeTier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "observationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "oracle",
          "type": "publicKey"
        },
        {
          "name": "tickSpacing",
          "type": "u16"
        },
        {
          "name": "sqrtPrice",
          "type": "u128"
        },
        {
          "name": "orderStepSize",
          "type": "u64"
        },
        {
          "name": "minOrderSize",
          "type": "u64"
        },
        {
          "name": "startTs",
          "type": "i64"
        },
        {
          "name": "expireTs",
          "type": "i64"
        },
        {
          "name": "activeRatioCoef",
          "type": "u64"
        },
        {
          "name": "activeRatioCap",
          "type": "u64"
        },
        {
          "name": "lpMint",
          "type": "publicKey"
        },
        {
          "name": "lpOracle",
          "type": "publicKey"
        },
        {
          "name": "name",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "updatePerpMarketStatus",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": {
            "defined": "MarketStatus"
          }
        }
      ]
    },
    {
      "name": "epochUpdateRemove",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "epochStartTimestamp",
          "type": "i64"
        },
        {
          "name": "ov",
          "type": "i64"
        },
        {
          "name": "totalLpValue",
          "type": "u64"
        }
      ]
    },
    {
      "name": "epochUpdateAdd",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "keepers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketIndex",
          "type": "u16"
        }
      ]
    },
    {
      "name": "epochUpdateBegin",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "impliedRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "epochUpdateChangePrice",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "epochStartTimestamp",
          "type": "i64"
        }
      ]
    },
    {
      "name": "epochUpdateEnd",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "perpMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marginMarketVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marginMarketMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "decreaseLiquidity",
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "driftSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenOwnerAccountB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVaultB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayLower",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tickArrayUpper",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "tokenMinA",
          "type": "u64"
        },
        {
          "name": "tokenMinB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeOracle",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracleMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "decimals",
          "type": "u32"
        }
      ]
    },
    {
      "name": "addKeeper",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "keepers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newKeeper",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "removeKeeper",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "keepers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "removeKeeper",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateOracle",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oracle",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketRate",
          "type": "u64"
        },
        {
          "name": "rate",
          "type": "u64"
        },
        {
          "name": "lastRate",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setState",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "collateralRatioInitial",
          "type": "i64"
        },
        {
          "name": "collateralRatioMaintenance",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeConfig",
      "docs": [
        "Initializes a WhirlpoolsConfig account that hosts info & authorities",
        "required to govern a set of Whirlpools.",
        "",
        "### Parameters",
        "- `fee_authority` - Authority authorized to initialize fee-tiers and set customs fees.",
        "- `collect_protocol_fees_authority` - Authority authorized to collect protocol fees.",
        "- `reward_emissions_super_authority` - Authority authorized to set reward authorities in pools."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeAuthority",
          "type": "publicKey"
        },
        {
          "name": "collectProtocolFeesAuthority",
          "type": "publicKey"
        },
        {
          "name": "rewardEmissionsSuperAuthority",
          "type": "publicKey"
        },
        {
          "name": "defaultProtocolFeeRate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "initializeTickArray",
      "docs": [
        "Initializes a tick_array account to represent a tick-range in a Whirlpool.",
        "",
        "### Parameters",
        "- `start_tick_index` - The starting tick index for this tick-array.",
        "Has to be a multiple of TickArray size & the tick spacing of this pool.",
        "",
        "#### Special Errors",
        "- `InvalidStartTick` - if the provided start tick is out of bounds or is not a multiple of",
        "TICK_ARRAY_SIZE * tick spacing."
      ],
      "accounts": [
        {
          "name": "perpMarket",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tickArray",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTickIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "initializeFeeTier",
      "docs": [
        "Initializes a fee_tier account usable by Whirlpools in a WhirlpoolConfig space.",
        "",
        "### Authority",
        "- \"fee_authority\" - Set authority in the WhirlpoolConfig",
        "",
        "### Parameters",
        "- `tick_spacing` - The tick-spacing that this fee-tier suggests the default_fee_rate for.",
        "- `default_fee_rate` - The default fee rate that a pool will use if the pool uses this",
        "fee tier during initialization.",
        "",
        "#### Special Errors",
        "- `FeeRateMaxExceeded` - If the provided default_fee_rate exceeds MAX_FEE_RATE."
      ],
      "accounts": [
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeTier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tickSpacing",
          "type": "u16"
        },
        {
          "name": "defaultFeeRate",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "whirlpoolsConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "collectProtocolFeesAuthority",
            "type": "publicKey"
          },
          {
            "name": "rewardEmissionsSuperAuthority",
            "type": "publicKey"
          },
          {
            "name": "defaultProtocolFeeRate",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                30
              ]
            }
          }
        ]
      }
    },
    {
      "name": "feeTier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "publicKey"
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "defaultFeeRate",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tickArray",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTickIndex",
            "type": "i32"
          },
          {
            "name": "ticks",
            "type": {
              "array": [
                {
                  "defined": "Tick"
                },
                88
              ]
            }
          },
          {
            "name": "whirlpool",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "observationState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "docs": [
              "Whether the ObservationState is initialized"
            ],
            "type": "bool"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "observations",
            "docs": [
              "observation array"
            ],
            "type": {
              "array": [
                {
                  "defined": "Observation"
                },
                1000
              ]
            }
          },
          {
            "name": "padding",
            "docs": [
              "padding for feature update"
            ],
            "type": {
              "array": [
                "u128",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "keepers",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "keepers",
            "type": {
              "array": [
                "publicKey",
                20
              ]
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    },
    {
      "name": "lp",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The owner/authority of the account"
            ],
            "type": "publicKey"
          },
          {
            "name": "ammPosition",
            "docs": [
              "The user's liquidity"
            ],
            "type": {
              "defined": "Position"
            }
          },
          {
            "name": "reserveQuoteAmount",
            "docs": [
              "The user's perp positions"
            ],
            "type": "i64"
          },
          {
            "name": "reserveBaseAmount",
            "type": "i64"
          },
          {
            "name": "lastActiveSlot",
            "docs": [
              "The last slot a user was active. Used to determine if a user is idle"
            ],
            "type": "u64"
          },
          {
            "name": "subAccountId",
            "docs": [
              "The sub account id for this user"
            ],
            "type": "u16"
          },
          {
            "name": "idle",
            "docs": [
              "User is idle if they haven't interacted with the protocol in 1 week and they have no orders, perp positions or borrows",
              "Off-chain keeper bots can ignore users that are idle"
            ],
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                21
              ]
            }
          }
        ]
      }
    },
    {
      "name": "marginMarket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "The address of the margin market. It is a pda of the market index"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "docs": [
              "The oracle used to price the margin"
            ],
            "type": "publicKey"
          },
          {
            "name": "mint",
            "docs": [
              "The token mint of the margin"
            ],
            "type": "publicKey"
          },
          {
            "name": "vault",
            "docs": [
              "The vault used to store the market's deposits"
            ],
            "type": "publicKey"
          },
          {
            "name": "name",
            "docs": [
              "The encoded display name for the market e.g. SOL"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "depositBalance",
            "docs": [
              "The sum of the scaled balances for deposits across users and pool balances",
              "To convert to the deposit token amount, multiply by the cumulative deposit interest",
              "precision: SPOT_BALANCE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "nextDepositRecordId",
            "docs": [
              "Every deposit has a deposit record id. This is the next id to use"
            ],
            "type": "u64"
          },
          {
            "name": "flashLoanAmount",
            "docs": [
              "For swaps, the amount of token loaned out in the begin_swap ix",
              "precision: token mint precision"
            ],
            "type": "u64"
          },
          {
            "name": "flashLoanInitialTokenAmount",
            "docs": [
              "For swaps, the amount in the users token account in the begin_swap ix",
              "Used to calculate how much of the token left the system in end_swap ix",
              "precision: token mint precision"
            ],
            "type": "u64"
          },
          {
            "name": "decimals",
            "docs": [
              "The market's token mint's decimals. To from decimals to a precision, 10^decimals"
            ],
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "status",
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                33
              ]
            }
          }
        ]
      }
    },
    {
      "name": "oracle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "lastRate",
            "type": "u64"
          },
          {
            "name": "rate",
            "type": "u64"
          },
          {
            "name": "marketRate",
            "type": "u64"
          },
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "decimals",
            "type": "u32"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "perpMarket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "The perp market's address. It is a pda of the market index"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "docs": [
              "the quote asset oracle"
            ],
            "type": "publicKey"
          },
          {
            "name": "name",
            "docs": [
              "Encoded display name for the perp market e.g. MSOL-2406"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "startTs",
            "docs": [
              "start time"
            ],
            "type": "i64"
          },
          {
            "name": "expireTs",
            "docs": [
              "expiration time"
            ],
            "type": "i64"
          },
          {
            "name": "maxOpenInterest",
            "docs": [
              "the max open interest"
            ],
            "type": "u64"
          },
          {
            "name": "openInterest",
            "docs": [
              "current open interest"
            ],
            "type": "u64"
          },
          {
            "name": "orderStepSize",
            "type": "u64"
          },
          {
            "name": "minOrderSize",
            "type": "u64"
          },
          {
            "name": "pool",
            "type": {
              "defined": "Whirlpool"
            }
          },
          {
            "name": "numberOfUsers",
            "docs": [
              "number of users in a position (pnl) or pnl (quote)"
            ],
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "status",
            "docs": [
              "Whether a market is active, reduce only, expired, etc",
              "Affects whether users can open/close positions"
            ],
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "activeRatioCoef",
            "type": "u64"
          },
          {
            "name": "activeRatioCap",
            "type": "u64"
          },
          {
            "name": "lpMint",
            "docs": [
              "the liquidity asset mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "lpOracle",
            "docs": [
              "the liquidity asset oracle"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalQuoteAssetAmount",
            "docs": [
              "the quote asset amount minted by lps"
            ],
            "type": "i64"
          },
          {
            "name": "totalMarginAmount",
            "docs": [
              "the total deposited amount of the lp mint;"
            ],
            "type": "i64"
          },
          {
            "name": "impliedRate",
            "type": "u64"
          },
          {
            "name": "keeperFee",
            "type": "u64"
          },
          {
            "name": "numberOfActiveLpAccounts",
            "type": "u64"
          },
          {
            "name": "lpAccountsProcessed",
            "type": "u64"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                21
              ]
            }
          }
        ]
      }
    },
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "signer",
            "type": "publicKey"
          },
          {
            "name": "numberOfAuthorities",
            "type": "u64"
          },
          {
            "name": "numberOfSubAccounts",
            "type": "u64"
          },
          {
            "name": "numberOfActiveLpAccounts",
            "type": "u64"
          },
          {
            "name": "collateralRatioInitial",
            "type": "i64"
          },
          {
            "name": "collateralRatioMaintenance",
            "type": "i64"
          },
          {
            "name": "insuranceAmount",
            "type": "i64"
          },
          {
            "name": "numberOfPerpMarkets",
            "type": "u16"
          },
          {
            "name": "numberOfMarginMarkets",
            "type": "u16"
          },
          {
            "name": "signerNonce",
            "type": "u8"
          },
          {
            "name": "exchangeStatus",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The owner/authority of the account"
            ],
            "type": "publicKey"
          },
          {
            "name": "marginPositions",
            "docs": [
              "The user's collateral"
            ],
            "type": {
              "array": [
                {
                  "defined": "MarginPosition"
                },
                2
              ]
            }
          },
          {
            "name": "orders",
            "docs": [
              "The user's liquidity"
            ],
            "type": {
              "array": [
                {
                  "defined": "Order"
                },
                32
              ]
            }
          },
          {
            "name": "perpPositions",
            "docs": [
              "The user's perp positions"
            ],
            "type": {
              "array": [
                {
                  "defined": "PerpPosition"
                },
                8
              ]
            }
          },
          {
            "name": "lastActiveSlot",
            "docs": [
              "The last slot a user was active. Used to determine if a user is idle"
            ],
            "type": "u64"
          },
          {
            "name": "lastOrderId",
            "type": "u32"
          },
          {
            "name": "subAccountId",
            "docs": [
              "The sub account id for this user"
            ],
            "type": "u16"
          },
          {
            "name": "idle",
            "docs": [
              "User is idle if they haven't interacted with the protocol in 1 week and they have no orders, perp positions or borrows",
              "Off-chain keeper bots can ignore users that are idle"
            ],
            "type": "bool"
          },
          {
            "name": "isLiquidating",
            "docs": [
              "Whether or not the subaccount has been liquidated"
            ],
            "type": "bool"
          },
          {
            "name": "isIsolated",
            "docs": [
              "isolated / cross margin flag"
            ],
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                19
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The authority for all of a users sub accounts"
            ],
            "type": "publicKey"
          },
          {
            "name": "referrer",
            "docs": [
              "The address that referred this user"
            ],
            "type": "publicKey"
          },
          {
            "name": "numberOfSubAccounts",
            "docs": [
              "The current number of sub accounts"
            ],
            "type": "u16"
          },
          {
            "name": "numberOfSubAccountsCreated",
            "docs": [
              "The number of sub accounts created. Can be greater than the number of sub accounts if user",
              "has deleted sub accountsget_margin_position_index"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                52
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SwapResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amountBaseSwap",
            "type": "u64"
          },
          {
            "name": "amountQuoteSwap",
            "type": "u64"
          },
          {
            "name": "sqrtPriceX64",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "PositionValue",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "positionAssetValue",
            "type": "i64"
          },
          {
            "name": "positionLiabilityValue",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MarginValue",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marginAssetValue",
            "type": "i64"
          },
          {
            "name": "marginLiabilityValue",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Whirlpool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "publicKey"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "sqrtPrice",
            "type": "u128"
          },
          {
            "name": "protocolFeeOwedA",
            "type": "u64"
          },
          {
            "name": "protocolFeeOwedB",
            "type": "u64"
          },
          {
            "name": "tokenMintA",
            "type": "publicKey"
          },
          {
            "name": "tokenVaultA",
            "type": "publicKey"
          },
          {
            "name": "feeGrowthGlobalA",
            "type": "u128"
          },
          {
            "name": "tokenMintB",
            "type": "publicKey"
          },
          {
            "name": "tokenVaultB",
            "type": "publicKey"
          },
          {
            "name": "feeGrowthGlobalB",
            "type": "u128"
          },
          {
            "name": "rewardLastUpdatedTimestamp",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": "WhirlpoolRewardInfo"
                },
                3
              ]
            }
          },
          {
            "name": "oracle",
            "type": "publicKey"
          },
          {
            "name": "tickCurrentIndex",
            "type": "i32"
          },
          {
            "name": "observationIndex",
            "docs": [
              "the most-recently updated index of the observations array"
            ],
            "type": "u16"
          },
          {
            "name": "observationUpdateDuration",
            "type": "u16"
          },
          {
            "name": "tickSpacing",
            "type": "u16"
          },
          {
            "name": "tickSpacingSeed",
            "type": {
              "array": [
                "u8",
                2
              ]
            }
          },
          {
            "name": "feeRate",
            "type": "u16"
          },
          {
            "name": "protocolFeeRate",
            "type": "u16"
          },
          {
            "name": "whirlpoolBump",
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          }
        ]
      }
    },
    {
      "name": "WhirlpoolRewardInfo",
      "docs": [
        "Stores the state relevant for tracking liquidity mining rewards at the `Whirlpool` level.",
        "These values are used in conjunction with `PositionRewardInfo`, `Tick.reward_growths_outside`,",
        "and `Whirlpool.reward_last_updated_timestamp` to determine how many rewards are earned by open",
        "positions."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "docs": [
              "Reward token mint."
            ],
            "type": "publicKey"
          },
          {
            "name": "vault",
            "docs": [
              "Reward vault token account."
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "Authority account that has permission to initialize the reward and set emissions."
            ],
            "type": "publicKey"
          },
          {
            "name": "emissionsPerSecondX64",
            "docs": [
              "Q64.64 number that indicates how many tokens per second are earned per unit of liquidity."
            ],
            "type": "u128"
          },
          {
            "name": "growthGlobalX64",
            "docs": [
              "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
              "emissions were turned on."
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "Tick",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "liquidityNet",
            "type": "i128"
          },
          {
            "name": "liquidityGross",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideA",
            "type": "u128"
          },
          {
            "name": "feeGrowthOutsideB",
            "type": "u128"
          },
          {
            "name": "rewardGrowthsOutside",
            "type": {
              "array": [
                "u128",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "tickLowerIndex",
            "type": "i32"
          },
          {
            "name": "tickUpperIndex",
            "type": "i32"
          },
          {
            "name": "lowerRate",
            "type": "u64"
          },
          {
            "name": "upperRate",
            "type": "u64"
          },
          {
            "name": "feeGrowthCheckpointA",
            "type": "u128"
          },
          {
            "name": "feeOwedA",
            "type": "u64"
          },
          {
            "name": "feeGrowthCheckpointB",
            "type": "u128"
          },
          {
            "name": "feeOwedB",
            "type": "u64"
          },
          {
            "name": "rewardInfos",
            "type": {
              "array": [
                {
                  "defined": "PositionRewardInfo"
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "PositionRewardInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "growthInsideCheckpoint",
            "type": "u128"
          },
          {
            "name": "amountOwed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Observation",
      "docs": [
        "The element of observations in ObservationState"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "blockTimestamp",
            "docs": [
              "The block timestamp of the observation"
            ],
            "type": "u32"
          },
          {
            "name": "sqrtPriceX64",
            "docs": [
              "the price of the observation timestamp, Q64.64"
            ],
            "type": "u128"
          },
          {
            "name": "cumulativeTimePriceX64",
            "docs": [
              "the cumulative of price during the duration time, Q64.64"
            ],
            "type": "u128"
          },
          {
            "name": "padding",
            "docs": [
              "padding for feature update"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "InsuranceFund",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "depositBalance",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "OrderParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseAssetAmount",
            "type": "i64"
          },
          {
            "name": "priceLimit",
            "type": "u128"
          },
          {
            "name": "expireTs",
            "type": "i64"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "isolatedMarginAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Order",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slot",
            "docs": [
              "The slot the order was placed"
            ],
            "type": "u64"
          },
          {
            "name": "priceLimit",
            "docs": [
              "The limit price for the order (can be 0 for market orders)",
              "For orders with an auction, this price isn't used until the auction is complete",
              "precision: PRICE_PRECISION"
            ],
            "type": "u128"
          },
          {
            "name": "baseAssetAmount",
            "docs": [
              "The size of the order",
              "precision for perps: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "baseAssetAmountFilled",
            "type": "i64"
          },
          {
            "name": "quoteAssetAmountFilled",
            "type": "i64"
          },
          {
            "name": "expireTs",
            "docs": [
              "The time when the order will expire"
            ],
            "type": "i64"
          },
          {
            "name": "orderIndex",
            "docs": [
              "The id for the order. Each users has their own order id space"
            ],
            "type": "u32"
          },
          {
            "name": "orderId",
            "type": "u32"
          },
          {
            "name": "isolatedMarginAmount",
            "type": "u64"
          },
          {
            "name": "status",
            "docs": [
              "Whether the order is open or unused"
            ],
            "type": {
              "defined": "OrderStatus"
            }
          },
          {
            "name": "orderType",
            "docs": [
              "The type of order"
            ],
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                12
              ]
            }
          }
        ]
      }
    },
    {
      "name": "MarginPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "scaledBalance",
            "docs": [
              "The scaled balance of the position. To get the token amount, multiply by the cumulative deposit/borrow",
              "interest of corresponding market.",
              "precision: SPOT_BALANCE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "balance",
            "docs": [
              "The cumulative deposits/borrows a user has made into a market",
              "precision: token mint precision"
            ],
            "type": "i64"
          },
          {
            "name": "marketIndex",
            "docs": [
              "The market index of the corresponding spot market"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                30
              ]
            }
          }
        ]
      }
    },
    {
      "name": "PerpPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseAssetAmount",
            "docs": [
              "the size of the users perp position",
              "precision: BASE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "quoteAssetAmount",
            "docs": [
              "Used to calculate the users pnl. Upon entry, is equal to base_asset_amount * avg entry price - fees",
              "Updated when the user open/closes position or settles pnl. Includes fees/funding",
              "precision: QUOTE_PRECISION"
            ],
            "type": "i64"
          },
          {
            "name": "lastRate",
            "docs": [
              "last cumlative rate"
            ],
            "type": "u64"
          },
          {
            "name": "breakEvenPrice",
            "type": "u128"
          },
          {
            "name": "marketIndex",
            "docs": [
              "The market index for the perp market"
            ],
            "type": "u16"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                6
              ]
            }
          }
        ]
      }
    },
    {
      "name": "DepositDirection",
      "docs": [
        "deposit/withdraw event"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdraw"
          }
        ]
      }
    },
    {
      "name": "LPDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AddLiquidity"
          },
          {
            "name": "RemoveLiquidity"
          }
        ]
      }
    },
    {
      "name": "MarketStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initialized"
          },
          {
            "name": "Active"
          },
          {
            "name": "Paused"
          },
          {
            "name": "ReduceOnly"
          },
          {
            "name": "Settlement"
          },
          {
            "name": "Delisted"
          },
          {
            "name": "Updating"
          }
        ]
      }
    },
    {
      "name": "CollateralRequirementType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initial"
          },
          {
            "name": "Maintenance"
          }
        ]
      }
    },
    {
      "name": "OrderStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Init"
          },
          {
            "name": "Open"
          },
          {
            "name": "Filled"
          },
          {
            "name": "Canceled"
          }
        ]
      }
    },
    {
      "name": "OrderType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Market"
          },
          {
            "name": "Limit"
          }
        ]
      }
    },
    {
      "name": "PositionDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Long"
          },
          {
            "name": "Short"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "InitializeConfigEvent",
      "fields": [
        {
          "name": "feeAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "collectProtocolFeesAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "rewardEmissionsSuperAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "defaultProtocolFeeRate",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "InitializeFeeTierEvent",
      "fields": [
        {
          "name": "feeTier",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickSpacing",
          "type": "u16",
          "index": false
        },
        {
          "name": "defaultFeeRate",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "ClosePositionEvent",
      "fields": [
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "receiver",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "InitializeTickArrayEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "startTickIndex",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "IncreaseLiquidityEvent",
      "fields": [
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayLower",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayUpper",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidityAmount",
          "type": "u128",
          "index": false
        },
        {
          "name": "tokenA",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "DecreaseLiquidityEvent",
      "fields": [
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayLower",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tickArrayUpper",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidityAmount",
          "type": "u128",
          "index": false
        },
        {
          "name": "tokenA",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "SwapEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amountA",
          "type": "u64",
          "index": false
        },
        {
          "name": "amountB",
          "type": "u64",
          "index": false
        },
        {
          "name": "aToB",
          "type": "bool",
          "index": false
        },
        {
          "name": "sqrtPriceX64",
          "type": "u128",
          "index": false
        },
        {
          "name": "tickCurrentIndex",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "CollectFeesRecord",
      "fields": [
        {
          "name": "perpMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeA",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "CollectProtocolFeesRecord",
      "fields": [
        {
          "name": "perpMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeA",
          "type": "u64",
          "index": false
        },
        {
          "name": "feeB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "InitializeMarginMarketRecord",
      "fields": [
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "marginMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marginMarketMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marginMarketVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "insuranceFundVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "oracle",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "InitializePerpMarketRecord",
      "fields": [
        {
          "name": "oracle",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "name",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "pubkey",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "orderStepSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "minOrderSize",
          "type": "u64",
          "index": false
        },
        {
          "name": "startTs",
          "type": "i64",
          "index": false
        },
        {
          "name": "expireTs",
          "type": "i64",
          "index": false
        },
        {
          "name": "activeRatioCoef",
          "type": "u64",
          "index": false
        },
        {
          "name": "activeRatioCap",
          "type": "u64",
          "index": false
        },
        {
          "name": "lpMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lpOracle",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "defaultFeeRate",
          "type": "u16",
          "index": false
        },
        {
          "name": "tickSpacing",
          "type": "u16",
          "index": false
        },
        {
          "name": "initialSqrtPrice",
          "type": "u128",
          "index": false
        },
        {
          "name": "perpMarket",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quoteAssetMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseAssetMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "quoteAssetVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseAssetVault",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "observationState",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "NewUserRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        },
        {
          "name": "isIsolated",
          "type": "bool",
          "index": false
        }
      ]
    },
    {
      "name": "NewUserOrdersRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "NewLpRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "lpAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DeleteUserRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DeleteLpRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "lpAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DeleteUserOrdersRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAccountId",
          "type": "u16",
          "index": false
        }
      ]
    },
    {
      "name": "DepositRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "direction",
          "type": {
            "defined": "DepositDirection"
          },
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "depositRecordId",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "i64",
          "index": false
        },
        {
          "name": "totalBalance",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "OrderRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "order",
          "type": {
            "defined": "Order"
          },
          "index": false
        }
      ]
    },
    {
      "name": "FillOrderRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u32",
          "index": false
        },
        {
          "name": "filler",
          "type": {
            "option": "publicKey"
          },
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "baseAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "baseAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "tradePrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "i64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "realizedPnl",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateBeginRecord",
      "fields": [
        {
          "name": "keeper",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "impliedRate",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateChangePriceRecord",
      "fields": [
        {
          "name": "sqrtPriceNew",
          "type": "u128",
          "index": false
        },
        {
          "name": "epochStartTimestamp",
          "type": "i64",
          "index": false
        },
        {
          "name": "ttm",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateRemoveRecord",
      "fields": [
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "liquidityNew",
          "type": "u128",
          "index": false
        },
        {
          "name": "tickLowerIndexNew",
          "type": "i32",
          "index": false
        },
        {
          "name": "tickUpperIndexNew",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateAddRecord",
      "fields": [
        {
          "name": "lp",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "deltaA",
          "type": "u64",
          "index": false
        },
        {
          "name": "deltaB",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "EpochUpdateEndRecord",
      "fields": [
        {
          "name": "totalQuoteAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "keeperFee",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LiquidationRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "filler",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "baseAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountFilled",
          "type": "i64",
          "index": false
        },
        {
          "name": "baseAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "quoteAmountHeld",
          "type": "i64",
          "index": false
        },
        {
          "name": "tradePrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "i64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "realizedPnl",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "CancelOrderRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "orderId",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateOracleRecord",
      "fields": [
        {
          "name": "mint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "rate",
          "type": "u64",
          "index": false
        },
        {
          "name": "marketRate",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "LPRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "userAuthority",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "direction",
          "type": {
            "defined": "LPDirection"
          },
          "index": false
        },
        {
          "name": "marginIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "marketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "deltaBaseAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "deltaQuoteAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "tickLower",
          "type": "i32",
          "index": false
        },
        {
          "name": "tickUpper",
          "type": "i32",
          "index": false
        },
        {
          "name": "rateLower",
          "type": "u64",
          "index": false
        },
        {
          "name": "rateUpper",
          "type": "u64",
          "index": false
        },
        {
          "name": "marginAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "mintedQuoteAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "liquidityAmount",
          "type": "u128",
          "index": false
        },
        {
          "name": "totalQuoteAssetAmount",
          "type": "i64",
          "index": false
        },
        {
          "name": "totalMarginAmount",
          "type": "i64",
          "index": false
        }
      ]
    },
    {
      "name": "InitializePositionEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "owner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lowerRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "upperRate",
          "type": "u64",
          "index": false
        },
        {
          "name": "tickLowerIndex",
          "type": "i32",
          "index": false
        },
        {
          "name": "tickUpperIndex",
          "type": "i32",
          "index": false
        }
      ]
    },
    {
      "name": "JupSwapRecord",
      "fields": [
        {
          "name": "ts",
          "type": "i64",
          "index": false
        },
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amountOut",
          "type": "u64",
          "index": false
        },
        {
          "name": "amountIn",
          "type": "u64",
          "index": false
        },
        {
          "name": "outMarketIndex",
          "type": "u16",
          "index": false
        },
        {
          "name": "inMarketIndex",
          "type": "u16",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMarginMarketAuthority",
      "msg": "Invalid Margin Market Authority"
    },
    {
      "code": 6001,
      "name": "InvalidInsuranceFundAuthority",
      "msg": "Clearing house not insurance fund authority"
    },
    {
      "code": 6002,
      "name": "InsufficientDeposit",
      "msg": "Insufficient deposit"
    },
    {
      "code": 6003,
      "name": "InsufficientCollateral",
      "msg": "Insufficient collateral"
    },
    {
      "code": 6004,
      "name": "InsufficientCollateralInVault",
      "msg": "Insufficient collateral in vault"
    },
    {
      "code": 6005,
      "name": "SufficientCollateral",
      "msg": "Sufficient collateral"
    },
    {
      "code": 6006,
      "name": "MaxNumberOfPositions",
      "msg": "Max number of positions taken"
    },
    {
      "code": 6007,
      "name": "AdminControlsPricesDisabled",
      "msg": "Admin Controls Prices Disabled"
    },
    {
      "code": 6008,
      "name": "MarketDelisted",
      "msg": "Market Delisted"
    },
    {
      "code": 6009,
      "name": "MarketIndexAlreadyInitialized",
      "msg": "Market Index Already Initialized"
    },
    {
      "code": 6010,
      "name": "UserAccountAndUserPositionsAccountMismatch",
      "msg": "User Account And User Positions Account Mismatch"
    },
    {
      "code": 6011,
      "name": "UserHasNoPositionInMarket",
      "msg": "User Has No Position In Market"
    },
    {
      "code": 6012,
      "name": "UserHasPositionInMarket",
      "msg": "User Has Position In Market"
    },
    {
      "code": 6013,
      "name": "UserHasNoLpPositionInMarket",
      "msg": "User Has No Lp Position In Market"
    },
    {
      "code": 6014,
      "name": "InvalidInitialPeg",
      "msg": "Invalid Initial Peg"
    },
    {
      "code": 6015,
      "name": "InvalidRepegRedundant",
      "msg": "AMM repeg already configured with amt given"
    },
    {
      "code": 6016,
      "name": "InvalidRepegDirection",
      "msg": "AMM repeg incorrect repeg direction"
    },
    {
      "code": 6017,
      "name": "InvalidRepegProfitability",
      "msg": "AMM repeg out of bounds pnl"
    },
    {
      "code": 6018,
      "name": "SlippageOutsideLimit",
      "msg": "Slippage Outside Limit Price"
    },
    {
      "code": 6019,
      "name": "OrderSizeTooSmall",
      "msg": "Order Size Too Small"
    },
    {
      "code": 6020,
      "name": "InvalidUpdateK",
      "msg": "Price change too large when updating K"
    },
    {
      "code": 6021,
      "name": "AdminWithdrawTooLarge",
      "msg": "Admin tried to withdraw amount larger than fees collected"
    },
    {
      "code": 6022,
      "name": "MathError",
      "msg": "Math Error"
    },
    {
      "code": 6023,
      "name": "BnConversionError",
      "msg": "Conversion to u128/u64 failed with an overflow or underflow"
    },
    {
      "code": 6024,
      "name": "ClockUnavailable",
      "msg": "Clock unavailable"
    },
    {
      "code": 6025,
      "name": "UnableToLoadOracle",
      "msg": "Unable To Load Oracles"
    },
    {
      "code": 6026,
      "name": "PriceBandsBreached",
      "msg": "Price Bands Breached"
    },
    {
      "code": 6027,
      "name": "ExchangePaused",
      "msg": "Exchange is paused"
    },
    {
      "code": 6028,
      "name": "PerpMarketPaused",
      "msg": "Perp market is paused"
    },
    {
      "code": 6029,
      "name": "PerpMarketNotPaused",
      "msg": "Perp market not paused"
    },
    {
      "code": 6030,
      "name": "MarginMarketPaused",
      "msg": "Margin market is paused"
    },
    {
      "code": 6031,
      "name": "InvalidWhitelistToken",
      "msg": "Invalid whitelist token"
    },
    {
      "code": 6032,
      "name": "WhitelistTokenNotFound",
      "msg": "Whitelist token not found"
    },
    {
      "code": 6033,
      "name": "InvalidDiscountToken",
      "msg": "Invalid discount token"
    },
    {
      "code": 6034,
      "name": "DiscountTokenNotFound",
      "msg": "Discount token not found"
    },
    {
      "code": 6035,
      "name": "ReferrerNotFound",
      "msg": "Referrer not found"
    },
    {
      "code": 6036,
      "name": "ReferrerStatsNotFound",
      "msg": "ReferrerNotFound"
    },
    {
      "code": 6037,
      "name": "ReferrerMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6038,
      "name": "ReferrerStatsMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6039,
      "name": "ReferrerAndReferrerStatsAuthorityUnequal",
      "msg": "ReferrerAndReferrerStatsAuthorityUnequal"
    },
    {
      "code": 6040,
      "name": "InvalidReferrer",
      "msg": "InvalidReferrer"
    },
    {
      "code": 6041,
      "name": "InvalidOracle",
      "msg": "InvalidOracle"
    },
    {
      "code": 6042,
      "name": "OracleNotFound",
      "msg": "OracleNotFound"
    },
    {
      "code": 6043,
      "name": "LiquidationsBlockedByOracle",
      "msg": "Liquidations Blocked By Oracle"
    },
    {
      "code": 6044,
      "name": "MaxDeposit",
      "msg": "Can not deposit more than max deposit"
    },
    {
      "code": 6045,
      "name": "CantDeleteUserWithCollateral",
      "msg": "Can not delete user that still has collateral"
    },
    {
      "code": 6046,
      "name": "InvalidFundingProfitability",
      "msg": "AMM funding out of bounds pnl"
    },
    {
      "code": 6047,
      "name": "CastingFailure",
      "msg": "Casting Failure"
    },
    {
      "code": 6048,
      "name": "InvalidOrder",
      "msg": "InvalidOrder"
    },
    {
      "code": 6049,
      "name": "InvalidOrderMaxTs",
      "msg": "InvalidOrderMaxTs"
    },
    {
      "code": 6050,
      "name": "InvalidOrderMarketType",
      "msg": "InvalidOrderMarketType"
    },
    {
      "code": 6051,
      "name": "InvalidOrderForInitialMarginReq",
      "msg": "InvalidOrderForInitialMarginReq"
    },
    {
      "code": 6052,
      "name": "InvalidOrderNotRiskReducing",
      "msg": "InvalidOrderNotRiskReducing"
    },
    {
      "code": 6053,
      "name": "InvalidOrderSizeTooSmall",
      "msg": "InvalidOrderSizeTooSmall"
    },
    {
      "code": 6054,
      "name": "InvalidOrderNotStepSizeMultiple",
      "msg": "InvalidOrderNotStepSizeMultiple"
    },
    {
      "code": 6055,
      "name": "InvalidOrderBaseQuoteAsset",
      "msg": "InvalidOrderBaseQuoteAsset"
    },
    {
      "code": 6056,
      "name": "InvalidOrderIOC",
      "msg": "InvalidOrderIOC"
    },
    {
      "code": 6057,
      "name": "InvalidOrderPostOnly",
      "msg": "InvalidOrderPostOnly"
    },
    {
      "code": 6058,
      "name": "InvalidOrderIOCPostOnly",
      "msg": "InvalidOrderIOCPostOnly"
    },
    {
      "code": 6059,
      "name": "InvalidOrderTrigger",
      "msg": "InvalidOrderTrigger"
    },
    {
      "code": 6060,
      "name": "InvalidOrderAuction",
      "msg": "InvalidOrderAuction"
    },
    {
      "code": 6061,
      "name": "InvalidOrderOracleOffset",
      "msg": "InvalidOrderOracleOffset"
    },
    {
      "code": 6062,
      "name": "InvalidOrderMinOrderSize",
      "msg": "InvalidOrderMinOrderSize"
    },
    {
      "code": 6063,
      "name": "PlacePostOnlyLimitFailure",
      "msg": "Failed to Place Post-Only Limit Order"
    },
    {
      "code": 6064,
      "name": "UserHasNoOrder",
      "msg": "User has no order"
    },
    {
      "code": 6065,
      "name": "OrderAmountTooSmall",
      "msg": "Order Amount Too Small"
    },
    {
      "code": 6066,
      "name": "MaxNumberOfOrders",
      "msg": "Max number of orders taken"
    },
    {
      "code": 6067,
      "name": "OrderDoesNotExist",
      "msg": "Order does not exist"
    },
    {
      "code": 6068,
      "name": "OrderNotOpen",
      "msg": "Order not open"
    },
    {
      "code": 6069,
      "name": "FillOrderDidNotUpdateState",
      "msg": "FillOrderDidNotUpdateState"
    },
    {
      "code": 6070,
      "name": "ReduceOnlyOrderIncreasedRisk",
      "msg": "Reduce only order increased risk"
    },
    {
      "code": 6071,
      "name": "UnableToLoadAccountLoader",
      "msg": "Unable to load AccountLoader"
    },
    {
      "code": 6072,
      "name": "TradeSizeTooLarge",
      "msg": "Trade Size Too Large"
    },
    {
      "code": 6073,
      "name": "UserCantReferThemselves",
      "msg": "User cant refer themselves"
    },
    {
      "code": 6074,
      "name": "DidNotReceiveExpectedReferrer",
      "msg": "Did not receive expected referrer"
    },
    {
      "code": 6075,
      "name": "CouldNotDeserializeReferrer",
      "msg": "Could not deserialize referrer"
    },
    {
      "code": 6076,
      "name": "CouldNotDeserializeReferrerStats",
      "msg": "Could not deserialize referrer stats"
    },
    {
      "code": 6077,
      "name": "UserOrderIdAlreadyInUse",
      "msg": "User Order Id Already In Use"
    },
    {
      "code": 6078,
      "name": "NoPositionsLiquidatable",
      "msg": "No positions liquidatable"
    },
    {
      "code": 6079,
      "name": "InvalidMarginRatio",
      "msg": "Invalid Margin Ratio"
    },
    {
      "code": 6080,
      "name": "CantCancelPostOnlyOrder",
      "msg": "Cant Cancel Post Only Order"
    },
    {
      "code": 6081,
      "name": "InvalidOracleOffset",
      "msg": "InvalidOracleOffset"
    },
    {
      "code": 6082,
      "name": "CantExpireOrders",
      "msg": "CantExpireOrders"
    },
    {
      "code": 6083,
      "name": "CouldNotLoadMarketData",
      "msg": "CouldNotLoadMarketData"
    },
    {
      "code": 6084,
      "name": "PerpMarketNotFound",
      "msg": "PerpMarketNotFound"
    },
    {
      "code": 6085,
      "name": "InvalidMarketAccount",
      "msg": "InvalidMarketAccount"
    },
    {
      "code": 6086,
      "name": "UnableToLoadPerpMarketAccount",
      "msg": "UnableToLoadMarketAccount"
    },
    {
      "code": 6087,
      "name": "MarketWrongMutability",
      "msg": "MarketWrongMutability"
    },
    {
      "code": 6088,
      "name": "UnableToCastUnixTime",
      "msg": "UnableToCastUnixTime"
    },
    {
      "code": 6089,
      "name": "CouldNotFindMarginPosition",
      "msg": "CouldNotFindMarginPosition"
    },
    {
      "code": 6090,
      "name": "NoMarginPositionAvailable",
      "msg": "NoMarginPositionAvailable"
    },
    {
      "code": 6091,
      "name": "NoLiquidityPositionAvailable",
      "msg": "NoLiquidityPositionAvailable"
    },
    {
      "code": 6092,
      "name": "InvalidMarginMarketInitialization",
      "msg": "InvalidMarginMarketInitialization"
    },
    {
      "code": 6093,
      "name": "CouldNotLoadMarginMarketData",
      "msg": "CouldNotLoadMarginMarketData"
    },
    {
      "code": 6094,
      "name": "MarginMarketNotFound",
      "msg": "MarginMarketNotFound"
    },
    {
      "code": 6095,
      "name": "InvalidMarginMarketAccount",
      "msg": "InvalidMarginMarketAccount"
    },
    {
      "code": 6096,
      "name": "UnableToLoadMarginMarketAccount",
      "msg": "UnableToLoadMarginMarketAccount"
    },
    {
      "code": 6097,
      "name": "MarginMarketWrongMutability",
      "msg": "MarginMarketWrongMutability"
    },
    {
      "code": 6098,
      "name": "MarginMarketInterestNotUpToDate",
      "msg": "MarginInterestNotUpToDate"
    },
    {
      "code": 6099,
      "name": "MarginMarketInsufficientDeposits",
      "msg": "MarginMarketInsufficientDeposits"
    },
    {
      "code": 6100,
      "name": "UserMustSettleTheirOwnPositiveUnsettledPNL",
      "msg": "UserMustSettleTheirOwnPositiveUnsettledPNL"
    },
    {
      "code": 6101,
      "name": "CantUpdatePoolBalanceType",
      "msg": "CantUpdatePoolBalanceType"
    },
    {
      "code": 6102,
      "name": "InsufficientCollateralForSettlingPNL",
      "msg": "InsufficientCollateralForSettlingPNL"
    },
    {
      "code": 6103,
      "name": "AMMNotUpdatedInSameSlot",
      "msg": "AMMNotUpdatedInSameSlot"
    },
    {
      "code": 6104,
      "name": "AuctionNotComplete",
      "msg": "AuctionNotComplete"
    },
    {
      "code": 6105,
      "name": "MakerNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6106,
      "name": "MakerStatsNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6107,
      "name": "MakerMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6108,
      "name": "MakerStatsMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6109,
      "name": "MakerOrderNotFound",
      "msg": "MakerOrderNotFound"
    },
    {
      "code": 6110,
      "name": "CouldNotDeserializeMaker",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6111,
      "name": "CouldNotDeserializeMakerStats",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6112,
      "name": "AuctionPriceDoesNotSatisfyMaker",
      "msg": "AuctionPriceDoesNotSatisfyMaker"
    },
    {
      "code": 6113,
      "name": "MakerCantFulfillOwnOrder",
      "msg": "MakerCantFulfillOwnOrder"
    },
    {
      "code": 6114,
      "name": "MakerOrderMustBePostOnly",
      "msg": "MakerOrderMustBePostOnly"
    },
    {
      "code": 6115,
      "name": "CantMatchTwoPostOnlys",
      "msg": "CantMatchTwoPostOnlys"
    },
    {
      "code": 6116,
      "name": "OrderBreachesOraclePriceLimits",
      "msg": "OrderBreachesOraclePriceLimits"
    },
    {
      "code": 6117,
      "name": "OrderMustBeTriggeredFirst",
      "msg": "OrderMustBeTriggeredFirst"
    },
    {
      "code": 6118,
      "name": "OrderNotTriggerable",
      "msg": "OrderNotTriggerable"
    },
    {
      "code": 6119,
      "name": "OrderDidNotSatisfyTriggerCondition",
      "msg": "OrderDidNotSatisfyTriggerCondition"
    },
    {
      "code": 6120,
      "name": "PositionAlreadyBeingLiquidated",
      "msg": "PositionAlreadyBeingLiquidated"
    },
    {
      "code": 6121,
      "name": "PositionDoesntHaveOpenPositionOrOrders",
      "msg": "PositionDoesntHaveOpenPositionOrOrders"
    },
    {
      "code": 6122,
      "name": "AllOrdersAreAlreadyLiquidations",
      "msg": "AllOrdersAreAlreadyLiquidations"
    },
    {
      "code": 6123,
      "name": "CantCancelLiquidationOrder",
      "msg": "CantCancelLiquidationOrder"
    },
    {
      "code": 6124,
      "name": "UserIsBeingLiquidated",
      "msg": "UserIsBeingLiquidated"
    },
    {
      "code": 6125,
      "name": "UserNotBeingLiquidated",
      "msg": "UserNotBeingLiquidated"
    },
    {
      "code": 6126,
      "name": "LiquidationsOngoing",
      "msg": "LiquidationsOngoing"
    },
    {
      "code": 6127,
      "name": "WrongMarginBalanceType",
      "msg": "WrongMarginBalanceType"
    },
    {
      "code": 6128,
      "name": "UserCantLiquidateThemself",
      "msg": "UserCantLiquidateThemself"
    },
    {
      "code": 6129,
      "name": "InvalidPerpPositionToLiquidate",
      "msg": "InvalidPerpPositionToLiquidate"
    },
    {
      "code": 6130,
      "name": "InvalidBaseAssetAmountForLiquidatePerp",
      "msg": "InvalidBaseAssetAmountForLiquidatePerp"
    },
    {
      "code": 6131,
      "name": "InvalidPositionLastFundingRate",
      "msg": "InvalidPositionLastFundingRate"
    },
    {
      "code": 6132,
      "name": "InvalidPositionDelta",
      "msg": "InvalidPositionDelta"
    },
    {
      "code": 6133,
      "name": "UserBankrupt",
      "msg": "UserBankrupt"
    },
    {
      "code": 6134,
      "name": "UserNotBankrupt",
      "msg": "UserNotBankrupt"
    },
    {
      "code": 6135,
      "name": "UserHasInvalidBorrow",
      "msg": "UserHasInvalidBorrow"
    },
    {
      "code": 6136,
      "name": "DailyWithdrawLimit",
      "msg": "DailyWithdrawLimit"
    },
    {
      "code": 6137,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6138,
      "name": "InsufficientLPTokens",
      "msg": "Insufficient LP tokens"
    },
    {
      "code": 6139,
      "name": "CantLPWithPerpPosition",
      "msg": "Cant LP with a market position"
    },
    {
      "code": 6140,
      "name": "UnableToBurnLPTokens",
      "msg": "Unable to burn LP tokens"
    },
    {
      "code": 6141,
      "name": "TryingToRemoveLiquidityTooFast",
      "msg": "Trying to remove liqudity too fast after adding it"
    },
    {
      "code": 6142,
      "name": "InvalidMarginMarketVault",
      "msg": "Invalid Margin Market Vault"
    },
    {
      "code": 6143,
      "name": "InvalidMarginMarketState",
      "msg": "Invalid Margin Market State"
    },
    {
      "code": 6144,
      "name": "InvalidSerumProgram",
      "msg": "InvalidSerumProgram"
    },
    {
      "code": 6145,
      "name": "InvalidSerumMarket",
      "msg": "InvalidSerumMarket"
    },
    {
      "code": 6146,
      "name": "InvalidSerumBids",
      "msg": "InvalidSerumBids"
    },
    {
      "code": 6147,
      "name": "InvalidSerumAsks",
      "msg": "InvalidSerumAsks"
    },
    {
      "code": 6148,
      "name": "InvalidSerumOpenOrders",
      "msg": "InvalidSerumOpenOrders"
    },
    {
      "code": 6149,
      "name": "FailedSerumCPI",
      "msg": "FailedSerumCPI"
    },
    {
      "code": 6150,
      "name": "FailedToFillOnExternalMarket",
      "msg": "FailedToFillOnExternalMarket"
    },
    {
      "code": 6151,
      "name": "InvalidFulfillmentConfig",
      "msg": "InvalidFulfillmentConfig"
    },
    {
      "code": 6152,
      "name": "InvalidFeeStructure",
      "msg": "InvalidFeeStructure"
    },
    {
      "code": 6153,
      "name": "InsufficientIFShares",
      "msg": "Insufficient IF shares"
    },
    {
      "code": 6154,
      "name": "MarketActionPaused",
      "msg": "the Market has paused this action"
    },
    {
      "code": 6155,
      "name": "MarketPlaceOrderPaused",
      "msg": "the Market status doesnt allow placing orders"
    },
    {
      "code": 6156,
      "name": "MarketFillOrderPaused",
      "msg": "the Market status doesnt allow filling orders"
    },
    {
      "code": 6157,
      "name": "MarketWithdrawPaused",
      "msg": "the Market status doesnt allow withdraws"
    },
    {
      "code": 6158,
      "name": "UserCantBeDeleted",
      "msg": "User Cant Be Deleted"
    },
    {
      "code": 6159,
      "name": "ReduceOnlyWithdrawIncreasedRisk",
      "msg": "Reduce Only Withdraw Increased Risk"
    },
    {
      "code": 6160,
      "name": "MaxOpenInterest",
      "msg": "Max Open Interest"
    },
    {
      "code": 6161,
      "name": "CantResolvePerpBankruptcy",
      "msg": "Cant Resolve Perp Bankruptcy"
    },
    {
      "code": 6162,
      "name": "LiquidationDoesntSatisfyLimitPrice",
      "msg": "Liquidation Doesnt Satisfy Limit Price"
    },
    {
      "code": 6163,
      "name": "MarginTradingDisabled",
      "msg": "Margin Trading Disabled"
    },
    {
      "code": 6164,
      "name": "InvalidMarketStatusToSettlePnl",
      "msg": "Invalid Market Status to Settle Perp Pnl"
    },
    {
      "code": 6165,
      "name": "PerpMarketNotInSettlement",
      "msg": "PerpMarketNotInSettlement"
    },
    {
      "code": 6166,
      "name": "PerpMarketNotInReduceOnly",
      "msg": "PerpMarketNotInReduceOnly"
    },
    {
      "code": 6167,
      "name": "PerpMarketSettlementBufferNotReached",
      "msg": "PerpMarketSettlementBufferNotReached"
    },
    {
      "code": 6168,
      "name": "PerpMarketSettlementUserHasOpenOrders",
      "msg": "PerpMarketSettlementUserHasOpenOrders"
    },
    {
      "code": 6169,
      "name": "PerpMarketSettlementUserHasActiveLP",
      "msg": "PerpMarketSettlementUserHasActiveLP"
    },
    {
      "code": 6170,
      "name": "UnableToSettleExpiredUserPosition",
      "msg": "UnableToSettleExpiredUserPosition"
    },
    {
      "code": 6171,
      "name": "UnequalMarketIndexForMarginTransfer",
      "msg": "UnequalMarketIndexForMarginTransfer"
    },
    {
      "code": 6172,
      "name": "InvalidPerpPositionDetected",
      "msg": "InvalidPerpPositionDetected"
    },
    {
      "code": 6173,
      "name": "InvalidMarginPositionDetected",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6174,
      "name": "InvalidAmmDetected",
      "msg": "InvalidAmmDetected"
    },
    {
      "code": 6175,
      "name": "InvalidAmmForFillDetected",
      "msg": "InvalidAmmForFillDetected"
    },
    {
      "code": 6176,
      "name": "InvalidAmmLimitPriceOverride",
      "msg": "InvalidAmmLimitPriceOverride"
    },
    {
      "code": 6177,
      "name": "InvalidOrderFillPrice",
      "msg": "InvalidOrderFillPrice"
    },
    {
      "code": 6178,
      "name": "MarginMarketBalanceInvariantViolated",
      "msg": "MarginMarketBalanceInvariantViolated"
    },
    {
      "code": 6179,
      "name": "MarginMarketVaultInvariantViolated",
      "msg": "MarginMarketVaultInvariantViolated"
    },
    {
      "code": 6180,
      "name": "InvalidPDA",
      "msg": "InvalidPDA"
    },
    {
      "code": 6181,
      "name": "InvalidPDASigner",
      "msg": "InvalidPDASigner"
    },
    {
      "code": 6182,
      "name": "RevenueSettingsCannotSettleToIF",
      "msg": "RevenueSettingsCannotSettleToIF"
    },
    {
      "code": 6183,
      "name": "NoRevenueToSettleToIF",
      "msg": "NoRevenueToSettleToIF"
    },
    {
      "code": 6184,
      "name": "NoAmmPerpPnlDeficit",
      "msg": "NoAmmPerpPnlDeficit"
    },
    {
      "code": 6185,
      "name": "SufficientPerpPnlPool",
      "msg": "SufficientPerpPnlPool"
    },
    {
      "code": 6186,
      "name": "InsufficientPerpPnlPool",
      "msg": "InsufficientPerpPnlPool"
    },
    {
      "code": 6187,
      "name": "PerpPnlDeficitBelowThreshold",
      "msg": "PerpPnlDeficitBelowThreshold"
    },
    {
      "code": 6188,
      "name": "MaxRevenueWithdrawPerPeriodReached",
      "msg": "MaxRevenueWithdrawPerPeriodReached"
    },
    {
      "code": 6189,
      "name": "MaxIFWithdrawReached",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6190,
      "name": "NoIFWithdrawAvailable",
      "msg": "NoIFWithdrawAvailable"
    },
    {
      "code": 6191,
      "name": "InvalidIFUnstake",
      "msg": "InvalidIFUnstake"
    },
    {
      "code": 6192,
      "name": "InvalidIFUnstakeSize",
      "msg": "InvalidIFUnstakeSize"
    },
    {
      "code": 6193,
      "name": "InvalidIFUnstakeCancel",
      "msg": "InvalidIFUnstakeCancel"
    },
    {
      "code": 6194,
      "name": "InvalidIFForNewStakes",
      "msg": "InvalidIFForNewStakes"
    },
    {
      "code": 6195,
      "name": "InvalidIFRebase",
      "msg": "InvalidIFRebase"
    },
    {
      "code": 6196,
      "name": "InvalidInsuranceUnstakeSize",
      "msg": "InvalidInsuranceUnstakeSize"
    },
    {
      "code": 6197,
      "name": "InvalidOrderLimitPrice",
      "msg": "InvalidOrderLimitPrice"
    },
    {
      "code": 6198,
      "name": "InvalidIFDetected",
      "msg": "InvalidIFDetected"
    },
    {
      "code": 6199,
      "name": "InvalidAmmMaxSpreadDetected",
      "msg": "InvalidAmmMaxSpreadDetected"
    },
    {
      "code": 6200,
      "name": "InvalidConcentrationCoef",
      "msg": "InvalidConcentrationCoef"
    },
    {
      "code": 6201,
      "name": "InvalidSrmVault",
      "msg": "InvalidSrmVault"
    },
    {
      "code": 6202,
      "name": "InvalidVaultOwner",
      "msg": "InvalidVaultOwner"
    },
    {
      "code": 6203,
      "name": "InvalidMarketStatusForFills",
      "msg": "InvalidMarketStatusForFills"
    },
    {
      "code": 6204,
      "name": "IFWithdrawRequestInProgress",
      "msg": "IFWithdrawRequestInProgress"
    },
    {
      "code": 6205,
      "name": "NoIFWithdrawRequestInProgress",
      "msg": "NoIFWithdrawRequestInProgress"
    },
    {
      "code": 6206,
      "name": "IFWithdrawRequestTooSmall",
      "msg": "IFWithdrawRequestTooSmall"
    },
    {
      "code": 6207,
      "name": "IncorrectMarginMarketAccountPassed",
      "msg": "IncorrectMarginMarketAccountPassed"
    },
    {
      "code": 6208,
      "name": "BlockchainClockInconsistency",
      "msg": "BlockchainClockInconsistency"
    },
    {
      "code": 6209,
      "name": "InvalidIFSharesDetected",
      "msg": "InvalidIFSharesDetected"
    },
    {
      "code": 6210,
      "name": "NewLPSizeTooSmall",
      "msg": "NewLPSizeTooSmall"
    },
    {
      "code": 6211,
      "name": "MarketStatusInvalidForNewLP",
      "msg": "MarketStatusInvalidForNewLP"
    },
    {
      "code": 6212,
      "name": "InvalidMarkTwapUpdateDetected",
      "msg": "InvalidMarkTwapUpdateDetected"
    },
    {
      "code": 6213,
      "name": "MarketSettlementAttemptOnActiveMarket",
      "msg": "MarketSettlementAttemptOnActiveMarket"
    },
    {
      "code": 6214,
      "name": "MarketSettlementRequiresSettledLP",
      "msg": "MarketSettlementRequiresSettledLP"
    },
    {
      "code": 6215,
      "name": "MarketSettlementAttemptTooEarly",
      "msg": "MarketSettlementAttemptTooEarly"
    },
    {
      "code": 6216,
      "name": "MarketSettlementTargetPriceInvalid",
      "msg": "MarketSettlementTargetPriceInvalid"
    },
    {
      "code": 6217,
      "name": "UnsupportedMarginMarket",
      "msg": "UnsupportedMarginMarket"
    },
    {
      "code": 6218,
      "name": "MarginOrdersDisabled",
      "msg": "MarginOrdersDisabled"
    },
    {
      "code": 6219,
      "name": "MarketBeingInitialized",
      "msg": "Market Being Initialized"
    },
    {
      "code": 6220,
      "name": "InvalidUserSubAccountId",
      "msg": "Invalid Sub Account Id"
    },
    {
      "code": 6221,
      "name": "InvalidTriggerOrderCondition",
      "msg": "Invalid Trigger Order Condition"
    },
    {
      "code": 6222,
      "name": "InvalidMarginPosition",
      "msg": "Invalid Margin Position"
    },
    {
      "code": 6223,
      "name": "CantTransferBetweenSameUserAccount",
      "msg": "Cant transfer between same user account"
    },
    {
      "code": 6224,
      "name": "InvalidPerpPosition",
      "msg": "Invalid Perp Position"
    },
    {
      "code": 6225,
      "name": "UnableToGetLimitPrice",
      "msg": "Unable To Get Limit Price"
    },
    {
      "code": 6226,
      "name": "InvalidLiquidation",
      "msg": "Invalid Liquidation"
    },
    {
      "code": 6227,
      "name": "MarginFulfillmentConfigDisabled",
      "msg": "Margin Fulfillment Config Disabled"
    },
    {
      "code": 6228,
      "name": "InvalidMaker",
      "msg": "Invalid Maker"
    },
    {
      "code": 6229,
      "name": "FailedUnwrap",
      "msg": "Failed Unwrap"
    },
    {
      "code": 6230,
      "name": "MaxNumberOfUsers",
      "msg": "Max Number Of Users"
    },
    {
      "code": 6231,
      "name": "InvalidOracleForSettlePnl",
      "msg": "InvalidOracleForSettlePnl"
    },
    {
      "code": 6232,
      "name": "MarginOrdersOpen",
      "msg": "MarginOrdersOpen"
    },
    {
      "code": 6233,
      "name": "TierViolationLiquidatingPerpPnl",
      "msg": "TierViolationLiquidatingPerpPnl"
    },
    {
      "code": 6234,
      "name": "CouldNotLoadUserData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6235,
      "name": "UserWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6236,
      "name": "InvalidUserAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6237,
      "name": "CouldNotLoadUserStatsData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6238,
      "name": "UserStatsWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6239,
      "name": "InvalidUserStatsAccount",
      "msg": "InvalidUserStatsAccount"
    },
    {
      "code": 6240,
      "name": "UserNotFound",
      "msg": "UserNotFound"
    },
    {
      "code": 6241,
      "name": "UnableToLoadUserAccount",
      "msg": "UnableToLoadUserAccount"
    },
    {
      "code": 6242,
      "name": "InvalidJupSwap",
      "msg": "InvalidJupSwap"
    },
    {
      "code": 6243,
      "name": "UnableToGetTwapPrice",
      "msg": "Unable to get twap price"
    },
    {
      "code": 6244,
      "name": "InvalidAdlLiquidation",
      "msg": "Invalid adl liquidation"
    },
    {
      "code": 6245,
      "name": "UnauthorizedUserOrKeeper",
      "msg": "Unauthorized user or keeper"
    },
    {
      "code": 6246,
      "name": "UserNotIsolated",
      "msg": "User is not isolated"
    },
    {
      "code": 6247,
      "name": "InvalidLiquidityRange",
      "msg": "liquidity range is not allowed"
    },
    {
      "code": 6248,
      "name": "AccountLiquidated",
      "msg": "Account liquidated"
    },
    {
      "code": 6249,
      "name": "InvalidOracleAccount",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6250,
      "name": "UnableToLoadOracleAccount",
      "msg": "Unable to load oracle account"
    },
    {
      "code": 6251,
      "name": "CouldNotLoadOracleData",
      "msg": "could not load oracle data"
    },
    {
      "code": 6252,
      "name": "OracleWrongMutability",
      "msg": "wrong oracle mutablility"
    },
    {
      "code": 6253,
      "name": "KeeperAlreadyExists",
      "msg": "The keeper already exists in the list."
    },
    {
      "code": 6254,
      "name": "KeepersListFull",
      "msg": "The keepers list is full."
    },
    {
      "code": 6255,
      "name": "KeeperNotFound",
      "msg": "The keeper was not found in the list."
    },
    {
      "code": 6256,
      "name": "MaxOpenInterestExceeded",
      "msg": "Max open interest exceeded"
    },
    {
      "code": 6257,
      "name": "InvalidOrderStepSize",
      "msg": "Invalid order step size"
    },
    {
      "code": 6258,
      "name": "OrderExpired",
      "msg": "Order expired"
    },
    {
      "code": 6259,
      "name": "OnlyTrader",
      "msg": "Only trader"
    },
    {
      "code": 6260,
      "name": "OnlyLP",
      "msg": "Only LP"
    },
    {
      "code": 6261,
      "name": "InvalidWithdraw",
      "msg": "Invalid Withdraw"
    },
    {
      "code": 6262,
      "name": "InvalidLiquidate",
      "msg": "Invalid Liquidate"
    },
    {
      "code": 6263,
      "name": "MeetMaintenanceCollateralRequirement",
      "msg": "Meet maintenance collateral requirement"
    },
    {
      "code": 6264,
      "name": "FailToMeetMaintenanceCollateralRequirement",
      "msg": "Fail to meet maintenance collateral requirement"
    },
    {
      "code": 6265,
      "name": "FailToMeetInitialCollateralRequirement",
      "msg": "Fail to meet initial collateral requirement"
    },
    {
      "code": 6266,
      "name": "InvalidEnum",
      "msg": "Enum value could not be converted"
    },
    {
      "code": 6267,
      "name": "InvalidStartTick",
      "msg": "Invalid start tick index provided."
    },
    {
      "code": 6268,
      "name": "TickArrayExistInPool",
      "msg": "Tick-array already exists in this whirlpool"
    },
    {
      "code": 6269,
      "name": "TickArrayIndexOutofBounds",
      "msg": "Attempt to search for a tick-array failed"
    },
    {
      "code": 6270,
      "name": "InvalidTickSpacing",
      "msg": "Tick-spacing is not supported"
    },
    {
      "code": 6271,
      "name": "ClosePositionNotEmpty",
      "msg": "Position is not empty It cannot be closed"
    },
    {
      "code": 6272,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6273,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6274,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6275,
      "name": "TickNotFound",
      "msg": "Tick not found within tick array"
    },
    {
      "code": 6276,
      "name": "InvalidTickIndex",
      "msg": "Provided tick index is either out of bounds or uninitializable"
    },
    {
      "code": 6277,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6278,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6279,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6280,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6281,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6282,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6283,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6284,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6285,
      "name": "MissingOrInvalidDelegate",
      "msg": "Position token account has a missing or invalid delegate"
    },
    {
      "code": 6286,
      "name": "InvalidPositionTokenAmount",
      "msg": "Position token amount must be 1"
    },
    {
      "code": 6287,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6288,
      "name": "InvalidTimestamp",
      "msg": "Timestamp should be greater than the last updated timestamp"
    },
    {
      "code": 6289,
      "name": "InvalidTickArraySequence",
      "msg": "Invalid tick array sequence provided for instruction."
    },
    {
      "code": 6290,
      "name": "InvalidTokenMintOrder",
      "msg": "Token Mint in wrong order"
    },
    {
      "code": 6291,
      "name": "RewardNotInitialized",
      "msg": "Reward not initialized"
    },
    {
      "code": 6292,
      "name": "InvalidRewardIndex",
      "msg": "Invalid reward index"
    },
    {
      "code": 6293,
      "name": "RewardVaultAmountInsufficient",
      "msg": "Reward vault requires amount to support emissions for at least one day"
    },
    {
      "code": 6294,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6295,
      "name": "ProtocolFeeRateMaxExceeded",
      "msg": "Exceeded max protocol fee rate"
    },
    {
      "code": 6296,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6297,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6298,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6299,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6300,
      "name": "InvalidSqrtPriceLimitDirection",
      "msg": "Provided SqrtPriceLimit not in the same direction as the swap"
    },
    {
      "code": 6301,
      "name": "ZeroTradableAmount",
      "msg": "There are no tradable amount to swap."
    },
    {
      "code": 6302,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    },
    {
      "code": 6303,
      "name": "AmountInAboveMaximum",
      "msg": "Amount in above maximum threshold"
    },
    {
      "code": 6304,
      "name": "TickArraySequenceInvalidIndex",
      "msg": "Invalid index for tick array sequence"
    },
    {
      "code": 6305,
      "name": "AmountCalcOverflow",
      "msg": "Amount calculated overflows"
    },
    {
      "code": 6306,
      "name": "AmountRemainingOverflow",
      "msg": "Amount remaining overflows"
    },
    {
      "code": 6307,
      "name": "InvalidIntermediaryMint",
      "msg": "Invalid intermediary mint"
    },
    {
      "code": 6308,
      "name": "DuplicateTwoHopPool",
      "msg": "Duplicate two hop pool"
    },
    {
      "code": 6309,
      "name": "InvalidBundleIndex",
      "msg": "Bundle index is out of bounds"
    },
    {
      "code": 6310,
      "name": "BundledPositionAlreadyOpened",
      "msg": "Position has already been opened"
    },
    {
      "code": 6311,
      "name": "BundledPositionAlreadyClosed",
      "msg": "Position has already been closed"
    },
    {
      "code": 6312,
      "name": "UnableToLoadObservationStateAccount",
      "msg": "Unable To Observation state"
    },
    {
      "code": 6313,
      "name": "ObservationStateNotFound",
      "msg": "Observation state not found"
    },
    {
      "code": 6314,
      "name": "InvalidImpliedRate",
      "msg": "InvalidImpliedRate"
    },
    {
      "code": 6315,
      "name": "InvalidRmLiquidityPercent",
      "msg": "InvalidRmLiquidityPercent"
    },
    {
      "code": 6316,
      "name": "InvalidLpAccountsProcessed",
      "msg": "InvalidLpAccountsProcessed"
    },
    {
      "code": 6317,
      "name": "LpIsInactive",
      "msg": "LpIsInactive"
    }
  ]
};

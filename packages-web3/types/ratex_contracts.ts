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
          "name": "marginIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "reduceOnly",
          "type": "bool"
        },
        {
          "name": "depositRecordId",
          "type": "u32"
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
          "name": "marginIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "reduceOnly",
          "type": "bool"
        },
        {
          "name": "depositRecordId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "placePerpOrder",
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
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        },
        {
          "name": "params",
          "type": {
            "defined": "OrderParams"
          }
        }
      ]
    },
    {
      "name": "fillPerpOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        },
        {
          "name": "baseAmountFilled",
          "type": "i64"
        },
        {
          "name": "quoteAmountFilled",
          "type": "i64"
        },
        {
          "name": "baseAmountHeld",
          "type": "i64"
        },
        {
          "name": "quoteAmountHeld",
          "type": "i64"
        },
        {
          "name": "tradePrice",
          "type": "u64"
        },
        {
          "name": "fee",
          "type": "i64"
        }
      ]
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
          "isSigner": false
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
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activeStatus",
          "type": "bool"
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
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "marginRatioInitial",
          "type": "u32"
        },
        {
          "name": "marginRatioMaintenance",
          "type": "u32"
        },
        {
          "name": "activeStatus",
          "type": "bool"
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "decimals",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateOracle",
      "accounts": [
        {
          "name": "oracle",
          "isMut": true,
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
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "marginMarket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "The address of the margin vault. It is a pda of the market index"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "docs": [
              "The oracle used to price the markets deposits/borrows"
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
            "type": "u128"
          },
          {
            "name": "exchangeRate",
            "docs": [
              "The cumulative interest earned by depositors",
              "Used to calculate the deposit token amount from the deposit balance",
              "precision: SPOT_CUMULATIVE_INTEREST_PRECISION"
            ],
            "type": "u128"
          },
          {
            "name": "nextDepositRecordId",
            "docs": [
              "Every deposit has a deposit record id. This is the next id to use"
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
                48
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
            "type": "u8"
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
            "name": "amm",
            "docs": [
              "The automated market maker"
            ],
            "type": "publicKey"
          },
          {
            "name": "name",
            "docs": [
              "Encoded display name for the perp market e.g. SOL-PERP"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "marginRatioInitial",
            "docs": [
              "The margin ratio which determines how much collateral is required to open a position",
              "e.g. margin ratio of .1 means a user must have $100 of total collateral to open a $1000 position",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
          },
          {
            "name": "marginRatioMaintenance",
            "docs": [
              "The margin ratio which determines when a user will be liquidated",
              "e.g. margin ratio of .05 means a user must have $50 of total collateral to maintain a $1000 position",
              "else they will be liquidated",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
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
              "current open interes"
            ],
            "type": "u64"
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
            "name": "padding",
            "type": {
              "array": [
                "u8",
                46
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
            "name": "numberOfMarkets",
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
                10
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
            "name": "lastAddPerpLpSharesTs",
            "docs": [
              "The user's perp positions",
              "The last time the user added perp lp positions"
            ],
            "type": "i64"
          },
          {
            "name": "totalDeposits",
            "docs": [
              "The total values of deposits the user has made",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalWithdraws",
            "docs": [
              "The total values of withdrawals the user has made",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalSocialLoss",
            "docs": [
              "The total socialized loss the users has incurred upon the protocol",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "settledPerpPnl",
            "docs": [
              "Fees (taker fees, maker rebate, referrer reward, filler reward) and pnl for perps",
              "precision: QUOTE_PRECISION"
            ],
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
            "name": "isIsolated",
            "docs": [
              "number of open orders"
            ],
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "docs": [
              "Whether or not the subaccount has been liquidated"
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
    }
  ],
  "types": [
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
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "direction",
            "type": {
              "defined": "PositionDirection"
            }
          },
          {
            "name": "baseAssetAmount",
            "type": "u64"
          },
          {
            "name": "priceLimit",
            "type": "u64"
          },
          {
            "name": "marketIndex",
            "type": "u16"
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
            "type": "u64"
          },
          {
            "name": "baseAssetAmount",
            "docs": [
              "The size of the order",
              "precision for perps: BASE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "maxTs",
            "docs": [
              "The time when the order will expire"
            ],
            "type": "i64"
          },
          {
            "name": "orderId",
            "docs": [
              "The id for the order. Each users has their own order id space"
            ],
            "type": "u32"
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
            "name": "existingPositionDirection",
            "docs": [
              "What the users position was when the order was placed"
            ],
            "type": {
              "defined": "PositionDirection"
            }
          },
          {
            "name": "direction",
            "docs": [
              "Whether the user is going long or short. LONG = bid, SHORT = ask"
            ],
            "type": {
              "defined": "PositionDirection"
            }
          },
          {
            "name": "reduceOnly",
            "docs": [
              "Whether the order is allowed to only reduce position size"
            ],
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                20
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
            "name": "marketIndex",
            "docs": [
              "The market index for the perp market"
            ],
            "type": "u16"
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
            "name": "WithdrawPaused"
          },
          {
            "name": "ReduceOnly"
          },
          {
            "name": "Settlement"
          },
          {
            "name": "Delisted"
          }
        ]
      }
    },
    {
      "name": "MarginRequirementType",
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
          "name": "referrer",
          "type": "publicKey",
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
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBalance",
          "type": "u64",
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
          "name": "liquidator",
          "type": {
            "option": "publicKey"
          },
          "index": false
        },
        {
          "name": "marginRequirement",
          "type": "u128",
          "index": false
        },
        {
          "name": "totalCollateral",
          "type": "i128",
          "index": false
        },
        {
          "name": "liquidationId",
          "type": "u16",
          "index": false
        },
        {
          "name": "bankrupt",
          "type": "bool",
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
          "name": "tradePrice",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMarginMarketAuthority",
      "msg": "Invalid Spot Market Authority"
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
      "name": "SufficientCollateral",
      "msg": "Sufficient collateral"
    },
    {
      "code": 6005,
      "name": "MaxNumberOfPositions",
      "msg": "Max number of positions taken"
    },
    {
      "code": 6006,
      "name": "AdminControlsPricesDisabled",
      "msg": "Admin Controls Prices Disabled"
    },
    {
      "code": 6007,
      "name": "MarketDelisted",
      "msg": "Market Delisted"
    },
    {
      "code": 6008,
      "name": "MarketIndexAlreadyInitialized",
      "msg": "Market Index Already Initialized"
    },
    {
      "code": 6009,
      "name": "UserAccountAndUserPositionsAccountMismatch",
      "msg": "User Account And User Positions Account Mismatch"
    },
    {
      "code": 6010,
      "name": "UserHasNoPositionInMarket",
      "msg": "User Has No Position In Market"
    },
    {
      "code": 6011,
      "name": "InvalidInitialPeg",
      "msg": "Invalid Initial Peg"
    },
    {
      "code": 6012,
      "name": "InvalidRepegRedundant",
      "msg": "AMM repeg already configured with amt given"
    },
    {
      "code": 6013,
      "name": "InvalidRepegDirection",
      "msg": "AMM repeg incorrect repeg direction"
    },
    {
      "code": 6014,
      "name": "InvalidRepegProfitability",
      "msg": "AMM repeg out of bounds pnl"
    },
    {
      "code": 6015,
      "name": "SlippageOutsideLimit",
      "msg": "Slippage Outside Limit Price"
    },
    {
      "code": 6016,
      "name": "OrderSizeTooSmall",
      "msg": "Order Size Too Small"
    },
    {
      "code": 6017,
      "name": "InvalidUpdateK",
      "msg": "Price change too large when updating K"
    },
    {
      "code": 6018,
      "name": "AdminWithdrawTooLarge",
      "msg": "Admin tried to withdraw amount larger than fees collected"
    },
    {
      "code": 6019,
      "name": "MathError",
      "msg": "Math Error"
    },
    {
      "code": 6020,
      "name": "BnConversionError",
      "msg": "Conversion to u128/u64 failed with an overflow or underflow"
    },
    {
      "code": 6021,
      "name": "ClockUnavailable",
      "msg": "Clock unavailable"
    },
    {
      "code": 6022,
      "name": "UnableToLoadOracle",
      "msg": "Unable To Load Oracles"
    },
    {
      "code": 6023,
      "name": "PriceBandsBreached",
      "msg": "Price Bands Breached"
    },
    {
      "code": 6024,
      "name": "ExchangePaused",
      "msg": "Exchange is paused"
    },
    {
      "code": 6025,
      "name": "InvalidWhitelistToken",
      "msg": "Invalid whitelist token"
    },
    {
      "code": 6026,
      "name": "WhitelistTokenNotFound",
      "msg": "Whitelist token not found"
    },
    {
      "code": 6027,
      "name": "InvalidDiscountToken",
      "msg": "Invalid discount token"
    },
    {
      "code": 6028,
      "name": "DiscountTokenNotFound",
      "msg": "Discount token not found"
    },
    {
      "code": 6029,
      "name": "ReferrerNotFound",
      "msg": "Referrer not found"
    },
    {
      "code": 6030,
      "name": "ReferrerStatsNotFound",
      "msg": "ReferrerNotFound"
    },
    {
      "code": 6031,
      "name": "ReferrerMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6032,
      "name": "ReferrerStatsMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6033,
      "name": "ReferrerAndReferrerStatsAuthorityUnequal",
      "msg": "ReferrerAndReferrerStatsAuthorityUnequal"
    },
    {
      "code": 6034,
      "name": "InvalidReferrer",
      "msg": "InvalidReferrer"
    },
    {
      "code": 6035,
      "name": "InvalidOracle",
      "msg": "InvalidOracle"
    },
    {
      "code": 6036,
      "name": "OracleNotFound",
      "msg": "OracleNotFound"
    },
    {
      "code": 6037,
      "name": "LiquidationsBlockedByOracle",
      "msg": "Liquidations Blocked By Oracle"
    },
    {
      "code": 6038,
      "name": "MaxDeposit",
      "msg": "Can not deposit more than max deposit"
    },
    {
      "code": 6039,
      "name": "CantDeleteUserWithCollateral",
      "msg": "Can not delete user that still has collateral"
    },
    {
      "code": 6040,
      "name": "InvalidFundingProfitability",
      "msg": "AMM funding out of bounds pnl"
    },
    {
      "code": 6041,
      "name": "CastingFailure",
      "msg": "Casting Failure"
    },
    {
      "code": 6042,
      "name": "InvalidOrder",
      "msg": "InvalidOrder"
    },
    {
      "code": 6043,
      "name": "InvalidOrderMaxTs",
      "msg": "InvalidOrderMaxTs"
    },
    {
      "code": 6044,
      "name": "InvalidOrderMarketType",
      "msg": "InvalidOrderMarketType"
    },
    {
      "code": 6045,
      "name": "InvalidOrderForInitialMarginReq",
      "msg": "InvalidOrderForInitialMarginReq"
    },
    {
      "code": 6046,
      "name": "InvalidOrderNotRiskReducing",
      "msg": "InvalidOrderNotRiskReducing"
    },
    {
      "code": 6047,
      "name": "InvalidOrderSizeTooSmall",
      "msg": "InvalidOrderSizeTooSmall"
    },
    {
      "code": 6048,
      "name": "InvalidOrderNotStepSizeMultiple",
      "msg": "InvalidOrderNotStepSizeMultiple"
    },
    {
      "code": 6049,
      "name": "InvalidOrderBaseQuoteAsset",
      "msg": "InvalidOrderBaseQuoteAsset"
    },
    {
      "code": 6050,
      "name": "InvalidOrderIOC",
      "msg": "InvalidOrderIOC"
    },
    {
      "code": 6051,
      "name": "InvalidOrderPostOnly",
      "msg": "InvalidOrderPostOnly"
    },
    {
      "code": 6052,
      "name": "InvalidOrderIOCPostOnly",
      "msg": "InvalidOrderIOCPostOnly"
    },
    {
      "code": 6053,
      "name": "InvalidOrderTrigger",
      "msg": "InvalidOrderTrigger"
    },
    {
      "code": 6054,
      "name": "InvalidOrderAuction",
      "msg": "InvalidOrderAuction"
    },
    {
      "code": 6055,
      "name": "InvalidOrderOracleOffset",
      "msg": "InvalidOrderOracleOffset"
    },
    {
      "code": 6056,
      "name": "InvalidOrderMinOrderSize",
      "msg": "InvalidOrderMinOrderSize"
    },
    {
      "code": 6057,
      "name": "PlacePostOnlyLimitFailure",
      "msg": "Failed to Place Post-Only Limit Order"
    },
    {
      "code": 6058,
      "name": "UserHasNoOrder",
      "msg": "User has no order"
    },
    {
      "code": 6059,
      "name": "OrderAmountTooSmall",
      "msg": "Order Amount Too Small"
    },
    {
      "code": 6060,
      "name": "MaxNumberOfOrders",
      "msg": "Max number of orders taken"
    },
    {
      "code": 6061,
      "name": "OrderDoesNotExist",
      "msg": "Order does not exist"
    },
    {
      "code": 6062,
      "name": "OrderNotOpen",
      "msg": "Order not open"
    },
    {
      "code": 6063,
      "name": "FillOrderDidNotUpdateState",
      "msg": "FillOrderDidNotUpdateState"
    },
    {
      "code": 6064,
      "name": "ReduceOnlyOrderIncreasedRisk",
      "msg": "Reduce only order increased risk"
    },
    {
      "code": 6065,
      "name": "UnableToLoadAccountLoader",
      "msg": "Unable to load AccountLoader"
    },
    {
      "code": 6066,
      "name": "TradeSizeTooLarge",
      "msg": "Trade Size Too Large"
    },
    {
      "code": 6067,
      "name": "UserCantReferThemselves",
      "msg": "User cant refer themselves"
    },
    {
      "code": 6068,
      "name": "DidNotReceiveExpectedReferrer",
      "msg": "Did not receive expected referrer"
    },
    {
      "code": 6069,
      "name": "CouldNotDeserializeReferrer",
      "msg": "Could not deserialize referrer"
    },
    {
      "code": 6070,
      "name": "CouldNotDeserializeReferrerStats",
      "msg": "Could not deserialize referrer stats"
    },
    {
      "code": 6071,
      "name": "UserOrderIdAlreadyInUse",
      "msg": "User Order Id Already In Use"
    },
    {
      "code": 6072,
      "name": "NoPositionsLiquidatable",
      "msg": "No positions liquidatable"
    },
    {
      "code": 6073,
      "name": "InvalidMarginRatio",
      "msg": "Invalid Margin Ratio"
    },
    {
      "code": 6074,
      "name": "CantCancelPostOnlyOrder",
      "msg": "Cant Cancel Post Only Order"
    },
    {
      "code": 6075,
      "name": "InvalidOracleOffset",
      "msg": "InvalidOracleOffset"
    },
    {
      "code": 6076,
      "name": "CantExpireOrders",
      "msg": "CantExpireOrders"
    },
    {
      "code": 6077,
      "name": "CouldNotLoadMarketData",
      "msg": "CouldNotLoadMarketData"
    },
    {
      "code": 6078,
      "name": "PerpMarketNotFound",
      "msg": "PerpMarketNotFound"
    },
    {
      "code": 6079,
      "name": "InvalidMarketAccount",
      "msg": "InvalidMarketAccount"
    },
    {
      "code": 6080,
      "name": "UnableToLoadPerpMarketAccount",
      "msg": "UnableToLoadMarketAccount"
    },
    {
      "code": 6081,
      "name": "MarketWrongMutability",
      "msg": "MarketWrongMutability"
    },
    {
      "code": 6082,
      "name": "UnableToCastUnixTime",
      "msg": "UnableToCastUnixTime"
    },
    {
      "code": 6083,
      "name": "CouldNotFindSpotPosition",
      "msg": "CouldNotFindSpotPosition"
    },
    {
      "code": 6084,
      "name": "NoSpotPositionAvailable",
      "msg": "NoSpotPositionAvailable"
    },
    {
      "code": 6085,
      "name": "InvalidMarginMarketInitialization",
      "msg": "InvalidMarginMarketInitialization"
    },
    {
      "code": 6086,
      "name": "CouldNotLoadMarginMarketData",
      "msg": "CouldNotLoadMarginMarketData"
    },
    {
      "code": 6087,
      "name": "MarginMarketNotFound",
      "msg": "MarginMarketNotFound"
    },
    {
      "code": 6088,
      "name": "InvalidMarginMarketAccount",
      "msg": "InvalidMarginMarketAccount"
    },
    {
      "code": 6089,
      "name": "UnableToLoadMarginMarketAccount",
      "msg": "UnableToLoadMarginMarketAccount"
    },
    {
      "code": 6090,
      "name": "MarginMarketWrongMutability",
      "msg": "MarginMarketWrongMutability"
    },
    {
      "code": 6091,
      "name": "MarginMarketInterestNotUpToDate",
      "msg": "SpotInterestNotUpToDate"
    },
    {
      "code": 6092,
      "name": "MarginMarketInsufficientDeposits",
      "msg": "MarginMarketInsufficientDeposits"
    },
    {
      "code": 6093,
      "name": "UserMustSettleTheirOwnPositiveUnsettledPNL",
      "msg": "UserMustSettleTheirOwnPositiveUnsettledPNL"
    },
    {
      "code": 6094,
      "name": "CantUpdatePoolBalanceType",
      "msg": "CantUpdatePoolBalanceType"
    },
    {
      "code": 6095,
      "name": "InsufficientCollateralForSettlingPNL",
      "msg": "InsufficientCollateralForSettlingPNL"
    },
    {
      "code": 6096,
      "name": "AMMNotUpdatedInSameSlot",
      "msg": "AMMNotUpdatedInSameSlot"
    },
    {
      "code": 6097,
      "name": "AuctionNotComplete",
      "msg": "AuctionNotComplete"
    },
    {
      "code": 6098,
      "name": "MakerNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6099,
      "name": "MakerStatsNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6100,
      "name": "MakerMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6101,
      "name": "MakerStatsMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6102,
      "name": "MakerOrderNotFound",
      "msg": "MakerOrderNotFound"
    },
    {
      "code": 6103,
      "name": "CouldNotDeserializeMaker",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6104,
      "name": "CouldNotDeserializeMakerStats",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6105,
      "name": "AuctionPriceDoesNotSatisfyMaker",
      "msg": "AuctionPriceDoesNotSatisfyMaker"
    },
    {
      "code": 6106,
      "name": "MakerCantFulfillOwnOrder",
      "msg": "MakerCantFulfillOwnOrder"
    },
    {
      "code": 6107,
      "name": "MakerOrderMustBePostOnly",
      "msg": "MakerOrderMustBePostOnly"
    },
    {
      "code": 6108,
      "name": "CantMatchTwoPostOnlys",
      "msg": "CantMatchTwoPostOnlys"
    },
    {
      "code": 6109,
      "name": "OrderBreachesOraclePriceLimits",
      "msg": "OrderBreachesOraclePriceLimits"
    },
    {
      "code": 6110,
      "name": "OrderMustBeTriggeredFirst",
      "msg": "OrderMustBeTriggeredFirst"
    },
    {
      "code": 6111,
      "name": "OrderNotTriggerable",
      "msg": "OrderNotTriggerable"
    },
    {
      "code": 6112,
      "name": "OrderDidNotSatisfyTriggerCondition",
      "msg": "OrderDidNotSatisfyTriggerCondition"
    },
    {
      "code": 6113,
      "name": "PositionAlreadyBeingLiquidated",
      "msg": "PositionAlreadyBeingLiquidated"
    },
    {
      "code": 6114,
      "name": "PositionDoesntHaveOpenPositionOrOrders",
      "msg": "PositionDoesntHaveOpenPositionOrOrders"
    },
    {
      "code": 6115,
      "name": "AllOrdersAreAlreadyLiquidations",
      "msg": "AllOrdersAreAlreadyLiquidations"
    },
    {
      "code": 6116,
      "name": "CantCancelLiquidationOrder",
      "msg": "CantCancelLiquidationOrder"
    },
    {
      "code": 6117,
      "name": "UserIsBeingLiquidated",
      "msg": "UserIsBeingLiquidated"
    },
    {
      "code": 6118,
      "name": "LiquidationsOngoing",
      "msg": "LiquidationsOngoing"
    },
    {
      "code": 6119,
      "name": "WrongSpotBalanceType",
      "msg": "WrongSpotBalanceType"
    },
    {
      "code": 6120,
      "name": "UserCantLiquidateThemself",
      "msg": "UserCantLiquidateThemself"
    },
    {
      "code": 6121,
      "name": "InvalidPerpPositionToLiquidate",
      "msg": "InvalidPerpPositionToLiquidate"
    },
    {
      "code": 6122,
      "name": "InvalidBaseAssetAmountForLiquidatePerp",
      "msg": "InvalidBaseAssetAmountForLiquidatePerp"
    },
    {
      "code": 6123,
      "name": "InvalidPositionLastFundingRate",
      "msg": "InvalidPositionLastFundingRate"
    },
    {
      "code": 6124,
      "name": "InvalidPositionDelta",
      "msg": "InvalidPositionDelta"
    },
    {
      "code": 6125,
      "name": "UserBankrupt",
      "msg": "UserBankrupt"
    },
    {
      "code": 6126,
      "name": "UserNotBankrupt",
      "msg": "UserNotBankrupt"
    },
    {
      "code": 6127,
      "name": "UserHasInvalidBorrow",
      "msg": "UserHasInvalidBorrow"
    },
    {
      "code": 6128,
      "name": "DailyWithdrawLimit",
      "msg": "DailyWithdrawLimit"
    },
    {
      "code": 6129,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6130,
      "name": "InsufficientLPTokens",
      "msg": "Insufficient LP tokens"
    },
    {
      "code": 6131,
      "name": "CantLPWithPerpPosition",
      "msg": "Cant LP with a market position"
    },
    {
      "code": 6132,
      "name": "UnableToBurnLPTokens",
      "msg": "Unable to burn LP tokens"
    },
    {
      "code": 6133,
      "name": "TryingToRemoveLiquidityTooFast",
      "msg": "Trying to remove liqudity too fast after adding it"
    },
    {
      "code": 6134,
      "name": "InvalidMarginMarketVault",
      "msg": "Invalid Spot Market Vault"
    },
    {
      "code": 6135,
      "name": "InvalidMarginMarketState",
      "msg": "Invalid Spot Market State"
    },
    {
      "code": 6136,
      "name": "InvalidSerumProgram",
      "msg": "InvalidSerumProgram"
    },
    {
      "code": 6137,
      "name": "InvalidSerumMarket",
      "msg": "InvalidSerumMarket"
    },
    {
      "code": 6138,
      "name": "InvalidSerumBids",
      "msg": "InvalidSerumBids"
    },
    {
      "code": 6139,
      "name": "InvalidSerumAsks",
      "msg": "InvalidSerumAsks"
    },
    {
      "code": 6140,
      "name": "InvalidSerumOpenOrders",
      "msg": "InvalidSerumOpenOrders"
    },
    {
      "code": 6141,
      "name": "FailedSerumCPI",
      "msg": "FailedSerumCPI"
    },
    {
      "code": 6142,
      "name": "FailedToFillOnExternalMarket",
      "msg": "FailedToFillOnExternalMarket"
    },
    {
      "code": 6143,
      "name": "InvalidFulfillmentConfig",
      "msg": "InvalidFulfillmentConfig"
    },
    {
      "code": 6144,
      "name": "InvalidFeeStructure",
      "msg": "InvalidFeeStructure"
    },
    {
      "code": 6145,
      "name": "InsufficientIFShares",
      "msg": "Insufficient IF shares"
    },
    {
      "code": 6146,
      "name": "MarketActionPaused",
      "msg": "the Market has paused this action"
    },
    {
      "code": 6147,
      "name": "MarketPlaceOrderPaused",
      "msg": "the Market status doesnt allow placing orders"
    },
    {
      "code": 6148,
      "name": "MarketFillOrderPaused",
      "msg": "the Market status doesnt allow filling orders"
    },
    {
      "code": 6149,
      "name": "MarketWithdrawPaused",
      "msg": "the Market status doesnt allow withdraws"
    },
    {
      "code": 6150,
      "name": "ProtectedAssetTierViolation",
      "msg": "Action violates the Protected Asset Tier rules"
    },
    {
      "code": 6151,
      "name": "IsolatedAssetTierViolation",
      "msg": "Action violates the Isolated Asset Tier rules"
    },
    {
      "code": 6152,
      "name": "UserCantBeDeleted",
      "msg": "User Cant Be Deleted"
    },
    {
      "code": 6153,
      "name": "ReduceOnlyWithdrawIncreasedRisk",
      "msg": "Reduce Only Withdraw Increased Risk"
    },
    {
      "code": 6154,
      "name": "MaxOpenInterest",
      "msg": "Max Open Interest"
    },
    {
      "code": 6155,
      "name": "CantResolvePerpBankruptcy",
      "msg": "Cant Resolve Perp Bankruptcy"
    },
    {
      "code": 6156,
      "name": "LiquidationDoesntSatisfyLimitPrice",
      "msg": "Liquidation Doesnt Satisfy Limit Price"
    },
    {
      "code": 6157,
      "name": "MarginTradingDisabled",
      "msg": "Margin Trading Disabled"
    },
    {
      "code": 6158,
      "name": "InvalidMarketStatusToSettlePnl",
      "msg": "Invalid Market Status to Settle Perp Pnl"
    },
    {
      "code": 6159,
      "name": "PerpMarketNotInSettlement",
      "msg": "PerpMarketNotInSettlement"
    },
    {
      "code": 6160,
      "name": "PerpMarketNotInReduceOnly",
      "msg": "PerpMarketNotInReduceOnly"
    },
    {
      "code": 6161,
      "name": "PerpMarketSettlementBufferNotReached",
      "msg": "PerpMarketSettlementBufferNotReached"
    },
    {
      "code": 6162,
      "name": "PerpMarketSettlementUserHasOpenOrders",
      "msg": "PerpMarketSettlementUserHasOpenOrders"
    },
    {
      "code": 6163,
      "name": "PerpMarketSettlementUserHasActiveLP",
      "msg": "PerpMarketSettlementUserHasActiveLP"
    },
    {
      "code": 6164,
      "name": "UnableToSettleExpiredUserPosition",
      "msg": "UnableToSettleExpiredUserPosition"
    },
    {
      "code": 6165,
      "name": "UnequalMarketIndexForSpotTransfer",
      "msg": "UnequalMarketIndexForSpotTransfer"
    },
    {
      "code": 6166,
      "name": "InvalidPerpPositionDetected",
      "msg": "InvalidPerpPositionDetected"
    },
    {
      "code": 6167,
      "name": "InvalidSpotPositionDetected",
      "msg": "InvalidSpotPositionDetected"
    },
    {
      "code": 6168,
      "name": "InvalidAmmDetected",
      "msg": "InvalidAmmDetected"
    },
    {
      "code": 6169,
      "name": "InvalidAmmForFillDetected",
      "msg": "InvalidAmmForFillDetected"
    },
    {
      "code": 6170,
      "name": "InvalidAmmLimitPriceOverride",
      "msg": "InvalidAmmLimitPriceOverride"
    },
    {
      "code": 6171,
      "name": "InvalidOrderFillPrice",
      "msg": "InvalidOrderFillPrice"
    },
    {
      "code": 6172,
      "name": "MarginMarketBalanceInvariantViolated",
      "msg": "MarginMarketBalanceInvariantViolated"
    },
    {
      "code": 6173,
      "name": "MarginMarketVaultInvariantViolated",
      "msg": "MarginMarketVaultInvariantViolated"
    },
    {
      "code": 6174,
      "name": "InvalidPDA",
      "msg": "InvalidPDA"
    },
    {
      "code": 6175,
      "name": "InvalidPDASigner",
      "msg": "InvalidPDASigner"
    },
    {
      "code": 6176,
      "name": "RevenueSettingsCannotSettleToIF",
      "msg": "RevenueSettingsCannotSettleToIF"
    },
    {
      "code": 6177,
      "name": "NoRevenueToSettleToIF",
      "msg": "NoRevenueToSettleToIF"
    },
    {
      "code": 6178,
      "name": "NoAmmPerpPnlDeficit",
      "msg": "NoAmmPerpPnlDeficit"
    },
    {
      "code": 6179,
      "name": "SufficientPerpPnlPool",
      "msg": "SufficientPerpPnlPool"
    },
    {
      "code": 6180,
      "name": "InsufficientPerpPnlPool",
      "msg": "InsufficientPerpPnlPool"
    },
    {
      "code": 6181,
      "name": "PerpPnlDeficitBelowThreshold",
      "msg": "PerpPnlDeficitBelowThreshold"
    },
    {
      "code": 6182,
      "name": "MaxRevenueWithdrawPerPeriodReached",
      "msg": "MaxRevenueWithdrawPerPeriodReached"
    },
    {
      "code": 6183,
      "name": "MaxIFWithdrawReached",
      "msg": "InvalidSpotPositionDetected"
    },
    {
      "code": 6184,
      "name": "NoIFWithdrawAvailable",
      "msg": "NoIFWithdrawAvailable"
    },
    {
      "code": 6185,
      "name": "InvalidIFUnstake",
      "msg": "InvalidIFUnstake"
    },
    {
      "code": 6186,
      "name": "InvalidIFUnstakeSize",
      "msg": "InvalidIFUnstakeSize"
    },
    {
      "code": 6187,
      "name": "InvalidIFUnstakeCancel",
      "msg": "InvalidIFUnstakeCancel"
    },
    {
      "code": 6188,
      "name": "InvalidIFForNewStakes",
      "msg": "InvalidIFForNewStakes"
    },
    {
      "code": 6189,
      "name": "InvalidIFRebase",
      "msg": "InvalidIFRebase"
    },
    {
      "code": 6190,
      "name": "InvalidInsuranceUnstakeSize",
      "msg": "InvalidInsuranceUnstakeSize"
    },
    {
      "code": 6191,
      "name": "InvalidOrderLimitPrice",
      "msg": "InvalidOrderLimitPrice"
    },
    {
      "code": 6192,
      "name": "InvalidIFDetected",
      "msg": "InvalidIFDetected"
    },
    {
      "code": 6193,
      "name": "InvalidAmmMaxSpreadDetected",
      "msg": "InvalidAmmMaxSpreadDetected"
    },
    {
      "code": 6194,
      "name": "InvalidConcentrationCoef",
      "msg": "InvalidConcentrationCoef"
    },
    {
      "code": 6195,
      "name": "InvalidSrmVault",
      "msg": "InvalidSrmVault"
    },
    {
      "code": 6196,
      "name": "InvalidVaultOwner",
      "msg": "InvalidVaultOwner"
    },
    {
      "code": 6197,
      "name": "InvalidMarketStatusForFills",
      "msg": "InvalidMarketStatusForFills"
    },
    {
      "code": 6198,
      "name": "IFWithdrawRequestInProgress",
      "msg": "IFWithdrawRequestInProgress"
    },
    {
      "code": 6199,
      "name": "NoIFWithdrawRequestInProgress",
      "msg": "NoIFWithdrawRequestInProgress"
    },
    {
      "code": 6200,
      "name": "IFWithdrawRequestTooSmall",
      "msg": "IFWithdrawRequestTooSmall"
    },
    {
      "code": 6201,
      "name": "IncorrectMarginMarketAccountPassed",
      "msg": "IncorrectMarginMarketAccountPassed"
    },
    {
      "code": 6202,
      "name": "BlockchainClockInconsistency",
      "msg": "BlockchainClockInconsistency"
    },
    {
      "code": 6203,
      "name": "InvalidIFSharesDetected",
      "msg": "InvalidIFSharesDetected"
    },
    {
      "code": 6204,
      "name": "NewLPSizeTooSmall",
      "msg": "NewLPSizeTooSmall"
    },
    {
      "code": 6205,
      "name": "MarketStatusInvalidForNewLP",
      "msg": "MarketStatusInvalidForNewLP"
    },
    {
      "code": 6206,
      "name": "InvalidMarkTwapUpdateDetected",
      "msg": "InvalidMarkTwapUpdateDetected"
    },
    {
      "code": 6207,
      "name": "MarketSettlementAttemptOnActiveMarket",
      "msg": "MarketSettlementAttemptOnActiveMarket"
    },
    {
      "code": 6208,
      "name": "MarketSettlementRequiresSettledLP",
      "msg": "MarketSettlementRequiresSettledLP"
    },
    {
      "code": 6209,
      "name": "MarketSettlementAttemptTooEarly",
      "msg": "MarketSettlementAttemptTooEarly"
    },
    {
      "code": 6210,
      "name": "MarketSettlementTargetPriceInvalid",
      "msg": "MarketSettlementTargetPriceInvalid"
    },
    {
      "code": 6211,
      "name": "UnsupportedMarginMarket",
      "msg": "UnsupportedMarginMarket"
    },
    {
      "code": 6212,
      "name": "SpotOrdersDisabled",
      "msg": "SpotOrdersDisabled"
    },
    {
      "code": 6213,
      "name": "MarketBeingInitialized",
      "msg": "Market Being Initialized"
    },
    {
      "code": 6214,
      "name": "InvalidUserSubAccountId",
      "msg": "Invalid Sub Account Id"
    },
    {
      "code": 6215,
      "name": "InvalidTriggerOrderCondition",
      "msg": "Invalid Trigger Order Condition"
    },
    {
      "code": 6216,
      "name": "InvalidSpotPosition",
      "msg": "Invalid Spot Position"
    },
    {
      "code": 6217,
      "name": "CantTransferBetweenSameUserAccount",
      "msg": "Cant transfer between same user account"
    },
    {
      "code": 6218,
      "name": "InvalidPerpPosition",
      "msg": "Invalid Perp Position"
    },
    {
      "code": 6219,
      "name": "UnableToGetLimitPrice",
      "msg": "Unable To Get Limit Price"
    },
    {
      "code": 6220,
      "name": "InvalidLiquidation",
      "msg": "Invalid Liquidation"
    },
    {
      "code": 6221,
      "name": "SpotFulfillmentConfigDisabled",
      "msg": "Spot Fulfillment Config Disabled"
    },
    {
      "code": 6222,
      "name": "InvalidMaker",
      "msg": "Invalid Maker"
    },
    {
      "code": 6223,
      "name": "FailedUnwrap",
      "msg": "Failed Unwrap"
    },
    {
      "code": 6224,
      "name": "MaxNumberOfUsers",
      "msg": "Max Number Of Users"
    },
    {
      "code": 6225,
      "name": "InvalidOracleForSettlePnl",
      "msg": "InvalidOracleForSettlePnl"
    },
    {
      "code": 6226,
      "name": "MarginOrdersOpen",
      "msg": "MarginOrdersOpen"
    },
    {
      "code": 6227,
      "name": "TierViolationLiquidatingPerpPnl",
      "msg": "TierViolationLiquidatingPerpPnl"
    },
    {
      "code": 6228,
      "name": "CouldNotLoadUserData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6229,
      "name": "UserWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6230,
      "name": "InvalidUserAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6231,
      "name": "CouldNotLoadUserStatsData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6232,
      "name": "UserStatsWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6233,
      "name": "InvalidUserStatsAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6234,
      "name": "UserNotFound",
      "msg": "UserNotFound"
    },
    {
      "code": 6235,
      "name": "UnableToLoadUserAccount",
      "msg": "UnableToLoadUserAccount"
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
          "name": "marginIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "reduceOnly",
          "type": "bool"
        },
        {
          "name": "depositRecordId",
          "type": "u32"
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
          "name": "marginIndex",
          "type": "u16"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "reduceOnly",
          "type": "bool"
        },
        {
          "name": "depositRecordId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "placePerpOrder",
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
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        },
        {
          "name": "params",
          "type": {
            "defined": "OrderParams"
          }
        }
      ]
    },
    {
      "name": "fillPerpOrder",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "orderId",
          "type": "u32"
        },
        {
          "name": "baseAmountFilled",
          "type": "i64"
        },
        {
          "name": "quoteAmountFilled",
          "type": "i64"
        },
        {
          "name": "baseAmountHeld",
          "type": "i64"
        },
        {
          "name": "quoteAmountHeld",
          "type": "i64"
        },
        {
          "name": "tradePrice",
          "type": "u64"
        },
        {
          "name": "fee",
          "type": "i64"
        }
      ]
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
          "isSigner": false
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
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "activeStatus",
          "type": "bool"
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
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "marginRatioInitial",
          "type": "u32"
        },
        {
          "name": "marginRatioMaintenance",
          "type": "u32"
        },
        {
          "name": "activeStatus",
          "type": "bool"
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "decimals",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateOracle",
      "accounts": [
        {
          "name": "oracle",
          "isMut": true,
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
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "marginMarket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "docs": [
              "The address of the margin vault. It is a pda of the market index"
            ],
            "type": "publicKey"
          },
          {
            "name": "oracle",
            "docs": [
              "The oracle used to price the markets deposits/borrows"
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
            "type": "u128"
          },
          {
            "name": "exchangeRate",
            "docs": [
              "The cumulative interest earned by depositors",
              "Used to calculate the deposit token amount from the deposit balance",
              "precision: SPOT_CUMULATIVE_INTEREST_PRECISION"
            ],
            "type": "u128"
          },
          {
            "name": "nextDepositRecordId",
            "docs": [
              "Every deposit has a deposit record id. This is the next id to use"
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
                48
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
            "type": "u8"
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
            "name": "amm",
            "docs": [
              "The automated market maker"
            ],
            "type": "publicKey"
          },
          {
            "name": "name",
            "docs": [
              "Encoded display name for the perp market e.g. SOL-PERP"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "marginRatioInitial",
            "docs": [
              "The margin ratio which determines how much collateral is required to open a position",
              "e.g. margin ratio of .1 means a user must have $100 of total collateral to open a $1000 position",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
          },
          {
            "name": "marginRatioMaintenance",
            "docs": [
              "The margin ratio which determines when a user will be liquidated",
              "e.g. margin ratio of .05 means a user must have $50 of total collateral to maintain a $1000 position",
              "else they will be liquidated",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
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
              "current open interes"
            ],
            "type": "u64"
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
            "name": "padding",
            "type": {
              "array": [
                "u8",
                46
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
            "name": "numberOfMarkets",
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
                10
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
            "name": "lastAddPerpLpSharesTs",
            "docs": [
              "The user's perp positions",
              "The last time the user added perp lp positions"
            ],
            "type": "i64"
          },
          {
            "name": "totalDeposits",
            "docs": [
              "The total values of deposits the user has made",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalWithdraws",
            "docs": [
              "The total values of withdrawals the user has made",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "totalSocialLoss",
            "docs": [
              "The total socialized loss the users has incurred upon the protocol",
              "precision: QUOTE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "settledPerpPnl",
            "docs": [
              "Fees (taker fees, maker rebate, referrer reward, filler reward) and pnl for perps",
              "precision: QUOTE_PRECISION"
            ],
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
            "name": "isIsolated",
            "docs": [
              "number of open orders"
            ],
            "type": "bool"
          },
          {
            "name": "isLiquidated",
            "docs": [
              "Whether or not the subaccount has been liquidated"
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
    }
  ],
  "types": [
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
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "direction",
            "type": {
              "defined": "PositionDirection"
            }
          },
          {
            "name": "baseAssetAmount",
            "type": "u64"
          },
          {
            "name": "priceLimit",
            "type": "u64"
          },
          {
            "name": "marketIndex",
            "type": "u16"
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
            "type": "u64"
          },
          {
            "name": "baseAssetAmount",
            "docs": [
              "The size of the order",
              "precision for perps: BASE_PRECISION"
            ],
            "type": "u64"
          },
          {
            "name": "maxTs",
            "docs": [
              "The time when the order will expire"
            ],
            "type": "i64"
          },
          {
            "name": "orderId",
            "docs": [
              "The id for the order. Each users has their own order id space"
            ],
            "type": "u32"
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
            "name": "existingPositionDirection",
            "docs": [
              "What the users position was when the order was placed"
            ],
            "type": {
              "defined": "PositionDirection"
            }
          },
          {
            "name": "direction",
            "docs": [
              "Whether the user is going long or short. LONG = bid, SHORT = ask"
            ],
            "type": {
              "defined": "PositionDirection"
            }
          },
          {
            "name": "reduceOnly",
            "docs": [
              "Whether the order is allowed to only reduce position size"
            ],
            "type": "bool"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                20
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
            "name": "marketIndex",
            "docs": [
              "The market index for the perp market"
            ],
            "type": "u16"
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
            "name": "WithdrawPaused"
          },
          {
            "name": "ReduceOnly"
          },
          {
            "name": "Settlement"
          },
          {
            "name": "Delisted"
          }
        ]
      }
    },
    {
      "name": "MarginRequirementType",
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
          "name": "referrer",
          "type": "publicKey",
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
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBalance",
          "type": "u64",
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
          "name": "liquidator",
          "type": {
            "option": "publicKey"
          },
          "index": false
        },
        {
          "name": "marginRequirement",
          "type": "u128",
          "index": false
        },
        {
          "name": "totalCollateral",
          "type": "i128",
          "index": false
        },
        {
          "name": "liquidationId",
          "type": "u16",
          "index": false
        },
        {
          "name": "bankrupt",
          "type": "bool",
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
          "name": "tradePrice",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMarginMarketAuthority",
      "msg": "Invalid Spot Market Authority"
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
      "name": "SufficientCollateral",
      "msg": "Sufficient collateral"
    },
    {
      "code": 6005,
      "name": "MaxNumberOfPositions",
      "msg": "Max number of positions taken"
    },
    {
      "code": 6006,
      "name": "AdminControlsPricesDisabled",
      "msg": "Admin Controls Prices Disabled"
    },
    {
      "code": 6007,
      "name": "MarketDelisted",
      "msg": "Market Delisted"
    },
    {
      "code": 6008,
      "name": "MarketIndexAlreadyInitialized",
      "msg": "Market Index Already Initialized"
    },
    {
      "code": 6009,
      "name": "UserAccountAndUserPositionsAccountMismatch",
      "msg": "User Account And User Positions Account Mismatch"
    },
    {
      "code": 6010,
      "name": "UserHasNoPositionInMarket",
      "msg": "User Has No Position In Market"
    },
    {
      "code": 6011,
      "name": "InvalidInitialPeg",
      "msg": "Invalid Initial Peg"
    },
    {
      "code": 6012,
      "name": "InvalidRepegRedundant",
      "msg": "AMM repeg already configured with amt given"
    },
    {
      "code": 6013,
      "name": "InvalidRepegDirection",
      "msg": "AMM repeg incorrect repeg direction"
    },
    {
      "code": 6014,
      "name": "InvalidRepegProfitability",
      "msg": "AMM repeg out of bounds pnl"
    },
    {
      "code": 6015,
      "name": "SlippageOutsideLimit",
      "msg": "Slippage Outside Limit Price"
    },
    {
      "code": 6016,
      "name": "OrderSizeTooSmall",
      "msg": "Order Size Too Small"
    },
    {
      "code": 6017,
      "name": "InvalidUpdateK",
      "msg": "Price change too large when updating K"
    },
    {
      "code": 6018,
      "name": "AdminWithdrawTooLarge",
      "msg": "Admin tried to withdraw amount larger than fees collected"
    },
    {
      "code": 6019,
      "name": "MathError",
      "msg": "Math Error"
    },
    {
      "code": 6020,
      "name": "BnConversionError",
      "msg": "Conversion to u128/u64 failed with an overflow or underflow"
    },
    {
      "code": 6021,
      "name": "ClockUnavailable",
      "msg": "Clock unavailable"
    },
    {
      "code": 6022,
      "name": "UnableToLoadOracle",
      "msg": "Unable To Load Oracles"
    },
    {
      "code": 6023,
      "name": "PriceBandsBreached",
      "msg": "Price Bands Breached"
    },
    {
      "code": 6024,
      "name": "ExchangePaused",
      "msg": "Exchange is paused"
    },
    {
      "code": 6025,
      "name": "InvalidWhitelistToken",
      "msg": "Invalid whitelist token"
    },
    {
      "code": 6026,
      "name": "WhitelistTokenNotFound",
      "msg": "Whitelist token not found"
    },
    {
      "code": 6027,
      "name": "InvalidDiscountToken",
      "msg": "Invalid discount token"
    },
    {
      "code": 6028,
      "name": "DiscountTokenNotFound",
      "msg": "Discount token not found"
    },
    {
      "code": 6029,
      "name": "ReferrerNotFound",
      "msg": "Referrer not found"
    },
    {
      "code": 6030,
      "name": "ReferrerStatsNotFound",
      "msg": "ReferrerNotFound"
    },
    {
      "code": 6031,
      "name": "ReferrerMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6032,
      "name": "ReferrerStatsMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6033,
      "name": "ReferrerAndReferrerStatsAuthorityUnequal",
      "msg": "ReferrerAndReferrerStatsAuthorityUnequal"
    },
    {
      "code": 6034,
      "name": "InvalidReferrer",
      "msg": "InvalidReferrer"
    },
    {
      "code": 6035,
      "name": "InvalidOracle",
      "msg": "InvalidOracle"
    },
    {
      "code": 6036,
      "name": "OracleNotFound",
      "msg": "OracleNotFound"
    },
    {
      "code": 6037,
      "name": "LiquidationsBlockedByOracle",
      "msg": "Liquidations Blocked By Oracle"
    },
    {
      "code": 6038,
      "name": "MaxDeposit",
      "msg": "Can not deposit more than max deposit"
    },
    {
      "code": 6039,
      "name": "CantDeleteUserWithCollateral",
      "msg": "Can not delete user that still has collateral"
    },
    {
      "code": 6040,
      "name": "InvalidFundingProfitability",
      "msg": "AMM funding out of bounds pnl"
    },
    {
      "code": 6041,
      "name": "CastingFailure",
      "msg": "Casting Failure"
    },
    {
      "code": 6042,
      "name": "InvalidOrder",
      "msg": "InvalidOrder"
    },
    {
      "code": 6043,
      "name": "InvalidOrderMaxTs",
      "msg": "InvalidOrderMaxTs"
    },
    {
      "code": 6044,
      "name": "InvalidOrderMarketType",
      "msg": "InvalidOrderMarketType"
    },
    {
      "code": 6045,
      "name": "InvalidOrderForInitialMarginReq",
      "msg": "InvalidOrderForInitialMarginReq"
    },
    {
      "code": 6046,
      "name": "InvalidOrderNotRiskReducing",
      "msg": "InvalidOrderNotRiskReducing"
    },
    {
      "code": 6047,
      "name": "InvalidOrderSizeTooSmall",
      "msg": "InvalidOrderSizeTooSmall"
    },
    {
      "code": 6048,
      "name": "InvalidOrderNotStepSizeMultiple",
      "msg": "InvalidOrderNotStepSizeMultiple"
    },
    {
      "code": 6049,
      "name": "InvalidOrderBaseQuoteAsset",
      "msg": "InvalidOrderBaseQuoteAsset"
    },
    {
      "code": 6050,
      "name": "InvalidOrderIOC",
      "msg": "InvalidOrderIOC"
    },
    {
      "code": 6051,
      "name": "InvalidOrderPostOnly",
      "msg": "InvalidOrderPostOnly"
    },
    {
      "code": 6052,
      "name": "InvalidOrderIOCPostOnly",
      "msg": "InvalidOrderIOCPostOnly"
    },
    {
      "code": 6053,
      "name": "InvalidOrderTrigger",
      "msg": "InvalidOrderTrigger"
    },
    {
      "code": 6054,
      "name": "InvalidOrderAuction",
      "msg": "InvalidOrderAuction"
    },
    {
      "code": 6055,
      "name": "InvalidOrderOracleOffset",
      "msg": "InvalidOrderOracleOffset"
    },
    {
      "code": 6056,
      "name": "InvalidOrderMinOrderSize",
      "msg": "InvalidOrderMinOrderSize"
    },
    {
      "code": 6057,
      "name": "PlacePostOnlyLimitFailure",
      "msg": "Failed to Place Post-Only Limit Order"
    },
    {
      "code": 6058,
      "name": "UserHasNoOrder",
      "msg": "User has no order"
    },
    {
      "code": 6059,
      "name": "OrderAmountTooSmall",
      "msg": "Order Amount Too Small"
    },
    {
      "code": 6060,
      "name": "MaxNumberOfOrders",
      "msg": "Max number of orders taken"
    },
    {
      "code": 6061,
      "name": "OrderDoesNotExist",
      "msg": "Order does not exist"
    },
    {
      "code": 6062,
      "name": "OrderNotOpen",
      "msg": "Order not open"
    },
    {
      "code": 6063,
      "name": "FillOrderDidNotUpdateState",
      "msg": "FillOrderDidNotUpdateState"
    },
    {
      "code": 6064,
      "name": "ReduceOnlyOrderIncreasedRisk",
      "msg": "Reduce only order increased risk"
    },
    {
      "code": 6065,
      "name": "UnableToLoadAccountLoader",
      "msg": "Unable to load AccountLoader"
    },
    {
      "code": 6066,
      "name": "TradeSizeTooLarge",
      "msg": "Trade Size Too Large"
    },
    {
      "code": 6067,
      "name": "UserCantReferThemselves",
      "msg": "User cant refer themselves"
    },
    {
      "code": 6068,
      "name": "DidNotReceiveExpectedReferrer",
      "msg": "Did not receive expected referrer"
    },
    {
      "code": 6069,
      "name": "CouldNotDeserializeReferrer",
      "msg": "Could not deserialize referrer"
    },
    {
      "code": 6070,
      "name": "CouldNotDeserializeReferrerStats",
      "msg": "Could not deserialize referrer stats"
    },
    {
      "code": 6071,
      "name": "UserOrderIdAlreadyInUse",
      "msg": "User Order Id Already In Use"
    },
    {
      "code": 6072,
      "name": "NoPositionsLiquidatable",
      "msg": "No positions liquidatable"
    },
    {
      "code": 6073,
      "name": "InvalidMarginRatio",
      "msg": "Invalid Margin Ratio"
    },
    {
      "code": 6074,
      "name": "CantCancelPostOnlyOrder",
      "msg": "Cant Cancel Post Only Order"
    },
    {
      "code": 6075,
      "name": "InvalidOracleOffset",
      "msg": "InvalidOracleOffset"
    },
    {
      "code": 6076,
      "name": "CantExpireOrders",
      "msg": "CantExpireOrders"
    },
    {
      "code": 6077,
      "name": "CouldNotLoadMarketData",
      "msg": "CouldNotLoadMarketData"
    },
    {
      "code": 6078,
      "name": "PerpMarketNotFound",
      "msg": "PerpMarketNotFound"
    },
    {
      "code": 6079,
      "name": "InvalidMarketAccount",
      "msg": "InvalidMarketAccount"
    },
    {
      "code": 6080,
      "name": "UnableToLoadPerpMarketAccount",
      "msg": "UnableToLoadMarketAccount"
    },
    {
      "code": 6081,
      "name": "MarketWrongMutability",
      "msg": "MarketWrongMutability"
    },
    {
      "code": 6082,
      "name": "UnableToCastUnixTime",
      "msg": "UnableToCastUnixTime"
    },
    {
      "code": 6083,
      "name": "CouldNotFindSpotPosition",
      "msg": "CouldNotFindSpotPosition"
    },
    {
      "code": 6084,
      "name": "NoSpotPositionAvailable",
      "msg": "NoSpotPositionAvailable"
    },
    {
      "code": 6085,
      "name": "InvalidMarginMarketInitialization",
      "msg": "InvalidMarginMarketInitialization"
    },
    {
      "code": 6086,
      "name": "CouldNotLoadMarginMarketData",
      "msg": "CouldNotLoadMarginMarketData"
    },
    {
      "code": 6087,
      "name": "MarginMarketNotFound",
      "msg": "MarginMarketNotFound"
    },
    {
      "code": 6088,
      "name": "InvalidMarginMarketAccount",
      "msg": "InvalidMarginMarketAccount"
    },
    {
      "code": 6089,
      "name": "UnableToLoadMarginMarketAccount",
      "msg": "UnableToLoadMarginMarketAccount"
    },
    {
      "code": 6090,
      "name": "MarginMarketWrongMutability",
      "msg": "MarginMarketWrongMutability"
    },
    {
      "code": 6091,
      "name": "MarginMarketInterestNotUpToDate",
      "msg": "SpotInterestNotUpToDate"
    },
    {
      "code": 6092,
      "name": "MarginMarketInsufficientDeposits",
      "msg": "MarginMarketInsufficientDeposits"
    },
    {
      "code": 6093,
      "name": "UserMustSettleTheirOwnPositiveUnsettledPNL",
      "msg": "UserMustSettleTheirOwnPositiveUnsettledPNL"
    },
    {
      "code": 6094,
      "name": "CantUpdatePoolBalanceType",
      "msg": "CantUpdatePoolBalanceType"
    },
    {
      "code": 6095,
      "name": "InsufficientCollateralForSettlingPNL",
      "msg": "InsufficientCollateralForSettlingPNL"
    },
    {
      "code": 6096,
      "name": "AMMNotUpdatedInSameSlot",
      "msg": "AMMNotUpdatedInSameSlot"
    },
    {
      "code": 6097,
      "name": "AuctionNotComplete",
      "msg": "AuctionNotComplete"
    },
    {
      "code": 6098,
      "name": "MakerNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6099,
      "name": "MakerStatsNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6100,
      "name": "MakerMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6101,
      "name": "MakerStatsMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6102,
      "name": "MakerOrderNotFound",
      "msg": "MakerOrderNotFound"
    },
    {
      "code": 6103,
      "name": "CouldNotDeserializeMaker",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6104,
      "name": "CouldNotDeserializeMakerStats",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6105,
      "name": "AuctionPriceDoesNotSatisfyMaker",
      "msg": "AuctionPriceDoesNotSatisfyMaker"
    },
    {
      "code": 6106,
      "name": "MakerCantFulfillOwnOrder",
      "msg": "MakerCantFulfillOwnOrder"
    },
    {
      "code": 6107,
      "name": "MakerOrderMustBePostOnly",
      "msg": "MakerOrderMustBePostOnly"
    },
    {
      "code": 6108,
      "name": "CantMatchTwoPostOnlys",
      "msg": "CantMatchTwoPostOnlys"
    },
    {
      "code": 6109,
      "name": "OrderBreachesOraclePriceLimits",
      "msg": "OrderBreachesOraclePriceLimits"
    },
    {
      "code": 6110,
      "name": "OrderMustBeTriggeredFirst",
      "msg": "OrderMustBeTriggeredFirst"
    },
    {
      "code": 6111,
      "name": "OrderNotTriggerable",
      "msg": "OrderNotTriggerable"
    },
    {
      "code": 6112,
      "name": "OrderDidNotSatisfyTriggerCondition",
      "msg": "OrderDidNotSatisfyTriggerCondition"
    },
    {
      "code": 6113,
      "name": "PositionAlreadyBeingLiquidated",
      "msg": "PositionAlreadyBeingLiquidated"
    },
    {
      "code": 6114,
      "name": "PositionDoesntHaveOpenPositionOrOrders",
      "msg": "PositionDoesntHaveOpenPositionOrOrders"
    },
    {
      "code": 6115,
      "name": "AllOrdersAreAlreadyLiquidations",
      "msg": "AllOrdersAreAlreadyLiquidations"
    },
    {
      "code": 6116,
      "name": "CantCancelLiquidationOrder",
      "msg": "CantCancelLiquidationOrder"
    },
    {
      "code": 6117,
      "name": "UserIsBeingLiquidated",
      "msg": "UserIsBeingLiquidated"
    },
    {
      "code": 6118,
      "name": "LiquidationsOngoing",
      "msg": "LiquidationsOngoing"
    },
    {
      "code": 6119,
      "name": "WrongSpotBalanceType",
      "msg": "WrongSpotBalanceType"
    },
    {
      "code": 6120,
      "name": "UserCantLiquidateThemself",
      "msg": "UserCantLiquidateThemself"
    },
    {
      "code": 6121,
      "name": "InvalidPerpPositionToLiquidate",
      "msg": "InvalidPerpPositionToLiquidate"
    },
    {
      "code": 6122,
      "name": "InvalidBaseAssetAmountForLiquidatePerp",
      "msg": "InvalidBaseAssetAmountForLiquidatePerp"
    },
    {
      "code": 6123,
      "name": "InvalidPositionLastFundingRate",
      "msg": "InvalidPositionLastFundingRate"
    },
    {
      "code": 6124,
      "name": "InvalidPositionDelta",
      "msg": "InvalidPositionDelta"
    },
    {
      "code": 6125,
      "name": "UserBankrupt",
      "msg": "UserBankrupt"
    },
    {
      "code": 6126,
      "name": "UserNotBankrupt",
      "msg": "UserNotBankrupt"
    },
    {
      "code": 6127,
      "name": "UserHasInvalidBorrow",
      "msg": "UserHasInvalidBorrow"
    },
    {
      "code": 6128,
      "name": "DailyWithdrawLimit",
      "msg": "DailyWithdrawLimit"
    },
    {
      "code": 6129,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6130,
      "name": "InsufficientLPTokens",
      "msg": "Insufficient LP tokens"
    },
    {
      "code": 6131,
      "name": "CantLPWithPerpPosition",
      "msg": "Cant LP with a market position"
    },
    {
      "code": 6132,
      "name": "UnableToBurnLPTokens",
      "msg": "Unable to burn LP tokens"
    },
    {
      "code": 6133,
      "name": "TryingToRemoveLiquidityTooFast",
      "msg": "Trying to remove liqudity too fast after adding it"
    },
    {
      "code": 6134,
      "name": "InvalidMarginMarketVault",
      "msg": "Invalid Spot Market Vault"
    },
    {
      "code": 6135,
      "name": "InvalidMarginMarketState",
      "msg": "Invalid Spot Market State"
    },
    {
      "code": 6136,
      "name": "InvalidSerumProgram",
      "msg": "InvalidSerumProgram"
    },
    {
      "code": 6137,
      "name": "InvalidSerumMarket",
      "msg": "InvalidSerumMarket"
    },
    {
      "code": 6138,
      "name": "InvalidSerumBids",
      "msg": "InvalidSerumBids"
    },
    {
      "code": 6139,
      "name": "InvalidSerumAsks",
      "msg": "InvalidSerumAsks"
    },
    {
      "code": 6140,
      "name": "InvalidSerumOpenOrders",
      "msg": "InvalidSerumOpenOrders"
    },
    {
      "code": 6141,
      "name": "FailedSerumCPI",
      "msg": "FailedSerumCPI"
    },
    {
      "code": 6142,
      "name": "FailedToFillOnExternalMarket",
      "msg": "FailedToFillOnExternalMarket"
    },
    {
      "code": 6143,
      "name": "InvalidFulfillmentConfig",
      "msg": "InvalidFulfillmentConfig"
    },
    {
      "code": 6144,
      "name": "InvalidFeeStructure",
      "msg": "InvalidFeeStructure"
    },
    {
      "code": 6145,
      "name": "InsufficientIFShares",
      "msg": "Insufficient IF shares"
    },
    {
      "code": 6146,
      "name": "MarketActionPaused",
      "msg": "the Market has paused this action"
    },
    {
      "code": 6147,
      "name": "MarketPlaceOrderPaused",
      "msg": "the Market status doesnt allow placing orders"
    },
    {
      "code": 6148,
      "name": "MarketFillOrderPaused",
      "msg": "the Market status doesnt allow filling orders"
    },
    {
      "code": 6149,
      "name": "MarketWithdrawPaused",
      "msg": "the Market status doesnt allow withdraws"
    },
    {
      "code": 6150,
      "name": "ProtectedAssetTierViolation",
      "msg": "Action violates the Protected Asset Tier rules"
    },
    {
      "code": 6151,
      "name": "IsolatedAssetTierViolation",
      "msg": "Action violates the Isolated Asset Tier rules"
    },
    {
      "code": 6152,
      "name": "UserCantBeDeleted",
      "msg": "User Cant Be Deleted"
    },
    {
      "code": 6153,
      "name": "ReduceOnlyWithdrawIncreasedRisk",
      "msg": "Reduce Only Withdraw Increased Risk"
    },
    {
      "code": 6154,
      "name": "MaxOpenInterest",
      "msg": "Max Open Interest"
    },
    {
      "code": 6155,
      "name": "CantResolvePerpBankruptcy",
      "msg": "Cant Resolve Perp Bankruptcy"
    },
    {
      "code": 6156,
      "name": "LiquidationDoesntSatisfyLimitPrice",
      "msg": "Liquidation Doesnt Satisfy Limit Price"
    },
    {
      "code": 6157,
      "name": "MarginTradingDisabled",
      "msg": "Margin Trading Disabled"
    },
    {
      "code": 6158,
      "name": "InvalidMarketStatusToSettlePnl",
      "msg": "Invalid Market Status to Settle Perp Pnl"
    },
    {
      "code": 6159,
      "name": "PerpMarketNotInSettlement",
      "msg": "PerpMarketNotInSettlement"
    },
    {
      "code": 6160,
      "name": "PerpMarketNotInReduceOnly",
      "msg": "PerpMarketNotInReduceOnly"
    },
    {
      "code": 6161,
      "name": "PerpMarketSettlementBufferNotReached",
      "msg": "PerpMarketSettlementBufferNotReached"
    },
    {
      "code": 6162,
      "name": "PerpMarketSettlementUserHasOpenOrders",
      "msg": "PerpMarketSettlementUserHasOpenOrders"
    },
    {
      "code": 6163,
      "name": "PerpMarketSettlementUserHasActiveLP",
      "msg": "PerpMarketSettlementUserHasActiveLP"
    },
    {
      "code": 6164,
      "name": "UnableToSettleExpiredUserPosition",
      "msg": "UnableToSettleExpiredUserPosition"
    },
    {
      "code": 6165,
      "name": "UnequalMarketIndexForSpotTransfer",
      "msg": "UnequalMarketIndexForSpotTransfer"
    },
    {
      "code": 6166,
      "name": "InvalidPerpPositionDetected",
      "msg": "InvalidPerpPositionDetected"
    },
    {
      "code": 6167,
      "name": "InvalidSpotPositionDetected",
      "msg": "InvalidSpotPositionDetected"
    },
    {
      "code": 6168,
      "name": "InvalidAmmDetected",
      "msg": "InvalidAmmDetected"
    },
    {
      "code": 6169,
      "name": "InvalidAmmForFillDetected",
      "msg": "InvalidAmmForFillDetected"
    },
    {
      "code": 6170,
      "name": "InvalidAmmLimitPriceOverride",
      "msg": "InvalidAmmLimitPriceOverride"
    },
    {
      "code": 6171,
      "name": "InvalidOrderFillPrice",
      "msg": "InvalidOrderFillPrice"
    },
    {
      "code": 6172,
      "name": "MarginMarketBalanceInvariantViolated",
      "msg": "MarginMarketBalanceInvariantViolated"
    },
    {
      "code": 6173,
      "name": "MarginMarketVaultInvariantViolated",
      "msg": "MarginMarketVaultInvariantViolated"
    },
    {
      "code": 6174,
      "name": "InvalidPDA",
      "msg": "InvalidPDA"
    },
    {
      "code": 6175,
      "name": "InvalidPDASigner",
      "msg": "InvalidPDASigner"
    },
    {
      "code": 6176,
      "name": "RevenueSettingsCannotSettleToIF",
      "msg": "RevenueSettingsCannotSettleToIF"
    },
    {
      "code": 6177,
      "name": "NoRevenueToSettleToIF",
      "msg": "NoRevenueToSettleToIF"
    },
    {
      "code": 6178,
      "name": "NoAmmPerpPnlDeficit",
      "msg": "NoAmmPerpPnlDeficit"
    },
    {
      "code": 6179,
      "name": "SufficientPerpPnlPool",
      "msg": "SufficientPerpPnlPool"
    },
    {
      "code": 6180,
      "name": "InsufficientPerpPnlPool",
      "msg": "InsufficientPerpPnlPool"
    },
    {
      "code": 6181,
      "name": "PerpPnlDeficitBelowThreshold",
      "msg": "PerpPnlDeficitBelowThreshold"
    },
    {
      "code": 6182,
      "name": "MaxRevenueWithdrawPerPeriodReached",
      "msg": "MaxRevenueWithdrawPerPeriodReached"
    },
    {
      "code": 6183,
      "name": "MaxIFWithdrawReached",
      "msg": "InvalidSpotPositionDetected"
    },
    {
      "code": 6184,
      "name": "NoIFWithdrawAvailable",
      "msg": "NoIFWithdrawAvailable"
    },
    {
      "code": 6185,
      "name": "InvalidIFUnstake",
      "msg": "InvalidIFUnstake"
    },
    {
      "code": 6186,
      "name": "InvalidIFUnstakeSize",
      "msg": "InvalidIFUnstakeSize"
    },
    {
      "code": 6187,
      "name": "InvalidIFUnstakeCancel",
      "msg": "InvalidIFUnstakeCancel"
    },
    {
      "code": 6188,
      "name": "InvalidIFForNewStakes",
      "msg": "InvalidIFForNewStakes"
    },
    {
      "code": 6189,
      "name": "InvalidIFRebase",
      "msg": "InvalidIFRebase"
    },
    {
      "code": 6190,
      "name": "InvalidInsuranceUnstakeSize",
      "msg": "InvalidInsuranceUnstakeSize"
    },
    {
      "code": 6191,
      "name": "InvalidOrderLimitPrice",
      "msg": "InvalidOrderLimitPrice"
    },
    {
      "code": 6192,
      "name": "InvalidIFDetected",
      "msg": "InvalidIFDetected"
    },
    {
      "code": 6193,
      "name": "InvalidAmmMaxSpreadDetected",
      "msg": "InvalidAmmMaxSpreadDetected"
    },
    {
      "code": 6194,
      "name": "InvalidConcentrationCoef",
      "msg": "InvalidConcentrationCoef"
    },
    {
      "code": 6195,
      "name": "InvalidSrmVault",
      "msg": "InvalidSrmVault"
    },
    {
      "code": 6196,
      "name": "InvalidVaultOwner",
      "msg": "InvalidVaultOwner"
    },
    {
      "code": 6197,
      "name": "InvalidMarketStatusForFills",
      "msg": "InvalidMarketStatusForFills"
    },
    {
      "code": 6198,
      "name": "IFWithdrawRequestInProgress",
      "msg": "IFWithdrawRequestInProgress"
    },
    {
      "code": 6199,
      "name": "NoIFWithdrawRequestInProgress",
      "msg": "NoIFWithdrawRequestInProgress"
    },
    {
      "code": 6200,
      "name": "IFWithdrawRequestTooSmall",
      "msg": "IFWithdrawRequestTooSmall"
    },
    {
      "code": 6201,
      "name": "IncorrectMarginMarketAccountPassed",
      "msg": "IncorrectMarginMarketAccountPassed"
    },
    {
      "code": 6202,
      "name": "BlockchainClockInconsistency",
      "msg": "BlockchainClockInconsistency"
    },
    {
      "code": 6203,
      "name": "InvalidIFSharesDetected",
      "msg": "InvalidIFSharesDetected"
    },
    {
      "code": 6204,
      "name": "NewLPSizeTooSmall",
      "msg": "NewLPSizeTooSmall"
    },
    {
      "code": 6205,
      "name": "MarketStatusInvalidForNewLP",
      "msg": "MarketStatusInvalidForNewLP"
    },
    {
      "code": 6206,
      "name": "InvalidMarkTwapUpdateDetected",
      "msg": "InvalidMarkTwapUpdateDetected"
    },
    {
      "code": 6207,
      "name": "MarketSettlementAttemptOnActiveMarket",
      "msg": "MarketSettlementAttemptOnActiveMarket"
    },
    {
      "code": 6208,
      "name": "MarketSettlementRequiresSettledLP",
      "msg": "MarketSettlementRequiresSettledLP"
    },
    {
      "code": 6209,
      "name": "MarketSettlementAttemptTooEarly",
      "msg": "MarketSettlementAttemptTooEarly"
    },
    {
      "code": 6210,
      "name": "MarketSettlementTargetPriceInvalid",
      "msg": "MarketSettlementTargetPriceInvalid"
    },
    {
      "code": 6211,
      "name": "UnsupportedMarginMarket",
      "msg": "UnsupportedMarginMarket"
    },
    {
      "code": 6212,
      "name": "SpotOrdersDisabled",
      "msg": "SpotOrdersDisabled"
    },
    {
      "code": 6213,
      "name": "MarketBeingInitialized",
      "msg": "Market Being Initialized"
    },
    {
      "code": 6214,
      "name": "InvalidUserSubAccountId",
      "msg": "Invalid Sub Account Id"
    },
    {
      "code": 6215,
      "name": "InvalidTriggerOrderCondition",
      "msg": "Invalid Trigger Order Condition"
    },
    {
      "code": 6216,
      "name": "InvalidSpotPosition",
      "msg": "Invalid Spot Position"
    },
    {
      "code": 6217,
      "name": "CantTransferBetweenSameUserAccount",
      "msg": "Cant transfer between same user account"
    },
    {
      "code": 6218,
      "name": "InvalidPerpPosition",
      "msg": "Invalid Perp Position"
    },
    {
      "code": 6219,
      "name": "UnableToGetLimitPrice",
      "msg": "Unable To Get Limit Price"
    },
    {
      "code": 6220,
      "name": "InvalidLiquidation",
      "msg": "Invalid Liquidation"
    },
    {
      "code": 6221,
      "name": "SpotFulfillmentConfigDisabled",
      "msg": "Spot Fulfillment Config Disabled"
    },
    {
      "code": 6222,
      "name": "InvalidMaker",
      "msg": "Invalid Maker"
    },
    {
      "code": 6223,
      "name": "FailedUnwrap",
      "msg": "Failed Unwrap"
    },
    {
      "code": 6224,
      "name": "MaxNumberOfUsers",
      "msg": "Max Number Of Users"
    },
    {
      "code": 6225,
      "name": "InvalidOracleForSettlePnl",
      "msg": "InvalidOracleForSettlePnl"
    },
    {
      "code": 6226,
      "name": "MarginOrdersOpen",
      "msg": "MarginOrdersOpen"
    },
    {
      "code": 6227,
      "name": "TierViolationLiquidatingPerpPnl",
      "msg": "TierViolationLiquidatingPerpPnl"
    },
    {
      "code": 6228,
      "name": "CouldNotLoadUserData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6229,
      "name": "UserWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6230,
      "name": "InvalidUserAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6231,
      "name": "CouldNotLoadUserStatsData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6232,
      "name": "UserStatsWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6233,
      "name": "InvalidUserStatsAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6234,
      "name": "UserNotFound",
      "msg": "UserNotFound"
    },
    {
      "code": 6235,
      "name": "UnableToLoadUserAccount",
      "msg": "UnableToLoadUserAccount"
    }
  ]
};

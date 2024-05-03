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
        },
        {
          "name": "isTrader",
          "type": "bool"
        }
      ]
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
          "name": "marginIndex",
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
          "name": "marginIndex",
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
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
      "name": "addPerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          "isMut": false,
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
          "name": "user",
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
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "removePerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          "isMut": false,
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
          "name": "user",
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
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
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
        },
        {
          "name": "observation",
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
      "name": "swap",
      "docs": [
        "Perform a swap in this Whirlpool",
        "",
        "### Authority",
        "- \"token_authority\" - The authority to withdraw tokens from the input token account.",
        "",
        "### Parameters",
        "- `amount` - The amount of input or output token to swap from (depending on amount_specified_is_input).",
        "- `other_amount_threshold` - The maximum/minimum of input/output token to swap into (depending on amount_specified_is_input).",
        "- `sqrt_price_limit` - The maximum/minimum price the swap will swap to.",
        "- `amount_specified_is_input` - Specifies the token the parameter `amount`represents. If true, the amount represents the input token of the swap.",
        "- `a_to_b` - The direction of the swap. True if swapping from A to B. False if swapping from B to A.",
        "",
        "#### Special Errors",
        "- `ZeroTradableAmount` - User provided parameter `amount` is 0.",
        "- `InvalidSqrtPriceLimitDirection` - User provided parameter `sqrt_price_limit` does not match the direction of the trade.",
        "- `SqrtPriceOutOfBounds` - User provided parameter `sqrt_price_limit` is over Whirlppool's max/min bounds for sqrt-price.",
        "- `InvalidTickArraySequence` - User provided tick-arrays are not in sequential order required to proceed in this trade direction.",
        "- `TickArraySequenceInvalidIndex` - The swap loop attempted to access an invalid array index during the query of the next initialized tick.",
        "- `TickArrayIndexOutofBounds` - The swap loop attempted to access an invalid array index during tick crossing.",
        "- `LiquidityOverflow` - Liquidity value overflowed 128bits during tick crossing.",
        "- `InvalidTickSpacing` - The swap pool was initialized with tick-spacing of 0."
      ],
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": true
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
        },
        {
          "name": "oracle",
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
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "observe",
      "accounts": [
        {
          "name": "whirlpool",
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
          "name": "quoteAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
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
          "name": "orderStepSize",
          "type": "u64"
        },
        {
          "name": "minOrderSize",
          "type": "u64"
        },
        {
          "name": "expireTs",
          "type": "i64"
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
      "name": "initializePool",
      "docs": [
        "Initializes a Whirlpool account.",
        "Fee rate is set to the default values on the config and supplied fee_tier.",
        "",
        "### Parameters",
        "- `bumps` - The bump value when deriving the PDA of the Whirlpool address.",
        "- `tick_spacing` - The desired tick spacing for this pool.",
        "- `initial_sqrt_price` - The desired initial sqrt-price for this pool",
        "",
        "#### Special Errors",
        "`InvalidTokenMintOrder` - The order of mints have to be ordered by",
        "`SqrtPriceOutOfBounds` - provided initial_sqrt_price is not between 2^-64 to 2^64",
        ""
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig",
          "isMut": false,
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
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
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
          "name": "feeTier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
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
          "name": "rent",
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
          "name": "initialSqrtPrice",
          "type": "u128"
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
          "name": "whirlpool",
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
      "name": "increaseLiquidity",
      "docs": [
        "Add liquidity to a position in the Whirlpool. This call also updates the position's accrued fees and rewards.",
        "",
        "### Authority",
        "- `position_authority` - authority that owns the token corresponding to this desired position.",
        "",
        "### Parameters",
        "- `liquidity_amount` - The total amount of Liquidity the user is willing to deposit.",
        "- `token_max_a` - The maximum amount of tokenA the user is willing to deposit.",
        "- `token_max_b` - The maximum amount of tokenB the user is willing to deposit.",
        "",
        "#### Special Errors",
        "- `LiquidityZero` - Provided liquidity amount is zero.",
        "- `LiquidityTooHigh` - Provided liquidity exceeds u128::max.",
        "- `TokenMaxExceeded` - The required token to perform this operation exceeds the user defined amount."
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          "name": "tokenMaxA",
          "type": "u64"
        },
        {
          "name": "tokenMaxB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "decreaseLiquidity",
      "docs": [
        "Withdraw liquidity from a position in the Whirlpool. This call also updates the position's accrued fees and rewards.",
        "",
        "### Authority",
        "- `position_authority` - authority that owns the token corresponding to this desired position.",
        "",
        "### Parameters",
        "- `liquidity_amount` - The total amount of Liquidity the user desires to withdraw.",
        "- `token_min_a` - The minimum amount of tokenA the user is willing to withdraw.",
        "- `token_min_b` - The minimum amount of tokenB the user is willing to withdraw.",
        "",
        "#### Special Errors",
        "- `LiquidityZero` - Provided liquidity amount is zero.",
        "- `LiquidityTooHigh` - Provided liquidity exceeds u128::max.",
        "- `TokenMinSubceeded` - The required token to perform this operation subceeds the user defined amount."
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          }
        ]
      }
    },
    {
      "name": "whirlpool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "publicKey"
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
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "sqrtPrice",
            "type": "u128"
          },
          {
            "name": "tickCurrentIndex",
            "type": "i32"
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
            "name": "observationIndex",
            "docs": [
              "the most-recently updated index of the observations array"
            ],
            "type": "u16"
          },
          {
            "name": "observationUpdateDuration",
            "type": "u16"
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
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "positionMint",
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
            "name": "poolId",
            "type": "publicKey"
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
            "type": "u32"
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
              "oracle"
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
            "name": "collateralRatioInitial",
            "docs": [
              "The margin ratio which determines how much collateral is required to open a position",
              "e.g. margin ratio of .1 means a user must have $100 of total collateral to open a $1000 position",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
          },
          {
            "name": "collateralRatioMaintenance",
            "docs": [
              "The margin ratio which determines when a user will be liquidated",
              "e.g. margin ratio of .05 means a user must have $50 of total collateral to maintain a $1000 position",
              "else they will be liquidated",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
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
              "current open interes"
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
            "name": "whirlpool",
            "type": "publicKey"
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
            "name": "bump",
            "type": "u8"
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
            "name": "isIsolated",
            "docs": [
              "isolated / cross margin flag"
            ],
            "type": "bool"
          },
          {
            "name": "isTrader",
            "docs": [
              "lp / trader flag"
            ],
            "type": "bool"
          },
          {
            "name": "subAccountId",
            "docs": [
              "The sub account id for this user"
            ],
            "type": "u16"
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
                8
              ]
            }
          },
          {
            "name": "liquidityPositions",
            "docs": [
              "The user's liquidity"
            ],
            "type": {
              "array": [
                {
                  "defined": "LiquidityPosition"
                },
                8
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
            "name": "orders",
            "docs": [
              "The user's orders"
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
            "name": "lastActiveSlot",
            "docs": [
              "The last slot a user was active. Used to determine if a user is idle"
            ],
            "type": "u64"
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
                50
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
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
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "userOrderId",
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
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
            "name": "marketIndex",
            "type": "u16"
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
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "LiquidityPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "liquidityAmount",
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
            "name": "marketIndex",
            "type": "u16"
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
      "name": "InitializePoolEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "bump",
          "type": "u8",
          "index": false
        },
        {
          "name": "whirlpoolsConfig",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMintA",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMintB",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenVaultA",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenVaultB",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "oracle",
          "type": "publicKey",
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
          "name": "tickCurrentIndex",
          "type": "i32",
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
          "name": "positionMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "owner",
          "type": "publicKey",
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
        },
        {
          "name": "isTrader",
          "type": "bool",
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
          "name": "liquidityAmount",
          "type": "u128",
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
      "name": "UserHasNoLpPositionInMarket",
      "msg": "User Has No Lp Position In Market"
    },
    {
      "code": 6012,
      "name": "InvalidInitialPeg",
      "msg": "Invalid Initial Peg"
    },
    {
      "code": 6013,
      "name": "InvalidRepegRedundant",
      "msg": "AMM repeg already configured with amt given"
    },
    {
      "code": 6014,
      "name": "InvalidRepegDirection",
      "msg": "AMM repeg incorrect repeg direction"
    },
    {
      "code": 6015,
      "name": "InvalidRepegProfitability",
      "msg": "AMM repeg out of bounds pnl"
    },
    {
      "code": 6016,
      "name": "SlippageOutsideLimit",
      "msg": "Slippage Outside Limit Price"
    },
    {
      "code": 6017,
      "name": "OrderSizeTooSmall",
      "msg": "Order Size Too Small"
    },
    {
      "code": 6018,
      "name": "InvalidUpdateK",
      "msg": "Price change too large when updating K"
    },
    {
      "code": 6019,
      "name": "AdminWithdrawTooLarge",
      "msg": "Admin tried to withdraw amount larger than fees collected"
    },
    {
      "code": 6020,
      "name": "MathError",
      "msg": "Math Error"
    },
    {
      "code": 6021,
      "name": "BnConversionError",
      "msg": "Conversion to u128/u64 failed with an overflow or underflow"
    },
    {
      "code": 6022,
      "name": "ClockUnavailable",
      "msg": "Clock unavailable"
    },
    {
      "code": 6023,
      "name": "UnableToLoadOracle",
      "msg": "Unable To Load Oracles"
    },
    {
      "code": 6024,
      "name": "PriceBandsBreached",
      "msg": "Price Bands Breached"
    },
    {
      "code": 6025,
      "name": "ExchangePaused",
      "msg": "Exchange is paused"
    },
    {
      "code": 6026,
      "name": "InvalidWhitelistToken",
      "msg": "Invalid whitelist token"
    },
    {
      "code": 6027,
      "name": "WhitelistTokenNotFound",
      "msg": "Whitelist token not found"
    },
    {
      "code": 6028,
      "name": "InvalidDiscountToken",
      "msg": "Invalid discount token"
    },
    {
      "code": 6029,
      "name": "DiscountTokenNotFound",
      "msg": "Discount token not found"
    },
    {
      "code": 6030,
      "name": "ReferrerNotFound",
      "msg": "Referrer not found"
    },
    {
      "code": 6031,
      "name": "ReferrerStatsNotFound",
      "msg": "ReferrerNotFound"
    },
    {
      "code": 6032,
      "name": "ReferrerMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6033,
      "name": "ReferrerStatsMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6034,
      "name": "ReferrerAndReferrerStatsAuthorityUnequal",
      "msg": "ReferrerAndReferrerStatsAuthorityUnequal"
    },
    {
      "code": 6035,
      "name": "InvalidReferrer",
      "msg": "InvalidReferrer"
    },
    {
      "code": 6036,
      "name": "InvalidOracle",
      "msg": "InvalidOracle"
    },
    {
      "code": 6037,
      "name": "OracleNotFound",
      "msg": "OracleNotFound"
    },
    {
      "code": 6038,
      "name": "LiquidationsBlockedByOracle",
      "msg": "Liquidations Blocked By Oracle"
    },
    {
      "code": 6039,
      "name": "MaxDeposit",
      "msg": "Can not deposit more than max deposit"
    },
    {
      "code": 6040,
      "name": "CantDeleteUserWithCollateral",
      "msg": "Can not delete user that still has collateral"
    },
    {
      "code": 6041,
      "name": "InvalidFundingProfitability",
      "msg": "AMM funding out of bounds pnl"
    },
    {
      "code": 6042,
      "name": "CastingFailure",
      "msg": "Casting Failure"
    },
    {
      "code": 6043,
      "name": "InvalidOrder",
      "msg": "InvalidOrder"
    },
    {
      "code": 6044,
      "name": "InvalidOrderMaxTs",
      "msg": "InvalidOrderMaxTs"
    },
    {
      "code": 6045,
      "name": "InvalidOrderMarketType",
      "msg": "InvalidOrderMarketType"
    },
    {
      "code": 6046,
      "name": "InvalidOrderForInitialMarginReq",
      "msg": "InvalidOrderForInitialMarginReq"
    },
    {
      "code": 6047,
      "name": "InvalidOrderNotRiskReducing",
      "msg": "InvalidOrderNotRiskReducing"
    },
    {
      "code": 6048,
      "name": "InvalidOrderSizeTooSmall",
      "msg": "InvalidOrderSizeTooSmall"
    },
    {
      "code": 6049,
      "name": "InvalidOrderNotStepSizeMultiple",
      "msg": "InvalidOrderNotStepSizeMultiple"
    },
    {
      "code": 6050,
      "name": "InvalidOrderBaseQuoteAsset",
      "msg": "InvalidOrderBaseQuoteAsset"
    },
    {
      "code": 6051,
      "name": "InvalidOrderIOC",
      "msg": "InvalidOrderIOC"
    },
    {
      "code": 6052,
      "name": "InvalidOrderPostOnly",
      "msg": "InvalidOrderPostOnly"
    },
    {
      "code": 6053,
      "name": "InvalidOrderIOCPostOnly",
      "msg": "InvalidOrderIOCPostOnly"
    },
    {
      "code": 6054,
      "name": "InvalidOrderTrigger",
      "msg": "InvalidOrderTrigger"
    },
    {
      "code": 6055,
      "name": "InvalidOrderAuction",
      "msg": "InvalidOrderAuction"
    },
    {
      "code": 6056,
      "name": "InvalidOrderOracleOffset",
      "msg": "InvalidOrderOracleOffset"
    },
    {
      "code": 6057,
      "name": "InvalidOrderMinOrderSize",
      "msg": "InvalidOrderMinOrderSize"
    },
    {
      "code": 6058,
      "name": "PlacePostOnlyLimitFailure",
      "msg": "Failed to Place Post-Only Limit Order"
    },
    {
      "code": 6059,
      "name": "UserHasNoOrder",
      "msg": "User has no order"
    },
    {
      "code": 6060,
      "name": "OrderAmountTooSmall",
      "msg": "Order Amount Too Small"
    },
    {
      "code": 6061,
      "name": "MaxNumberOfOrders",
      "msg": "Max number of orders taken"
    },
    {
      "code": 6062,
      "name": "OrderDoesNotExist",
      "msg": "Order does not exist"
    },
    {
      "code": 6063,
      "name": "OrderNotOpen",
      "msg": "Order not open"
    },
    {
      "code": 6064,
      "name": "FillOrderDidNotUpdateState",
      "msg": "FillOrderDidNotUpdateState"
    },
    {
      "code": 6065,
      "name": "ReduceOnlyOrderIncreasedRisk",
      "msg": "Reduce only order increased risk"
    },
    {
      "code": 6066,
      "name": "UnableToLoadAccountLoader",
      "msg": "Unable to load AccountLoader"
    },
    {
      "code": 6067,
      "name": "TradeSizeTooLarge",
      "msg": "Trade Size Too Large"
    },
    {
      "code": 6068,
      "name": "UserCantReferThemselves",
      "msg": "User cant refer themselves"
    },
    {
      "code": 6069,
      "name": "DidNotReceiveExpectedReferrer",
      "msg": "Did not receive expected referrer"
    },
    {
      "code": 6070,
      "name": "CouldNotDeserializeReferrer",
      "msg": "Could not deserialize referrer"
    },
    {
      "code": 6071,
      "name": "CouldNotDeserializeReferrerStats",
      "msg": "Could not deserialize referrer stats"
    },
    {
      "code": 6072,
      "name": "UserOrderIdAlreadyInUse",
      "msg": "User Order Id Already In Use"
    },
    {
      "code": 6073,
      "name": "NoPositionsLiquidatable",
      "msg": "No positions liquidatable"
    },
    {
      "code": 6074,
      "name": "InvalidMarginRatio",
      "msg": "Invalid Margin Ratio"
    },
    {
      "code": 6075,
      "name": "CantCancelPostOnlyOrder",
      "msg": "Cant Cancel Post Only Order"
    },
    {
      "code": 6076,
      "name": "InvalidOracleOffset",
      "msg": "InvalidOracleOffset"
    },
    {
      "code": 6077,
      "name": "CantExpireOrders",
      "msg": "CantExpireOrders"
    },
    {
      "code": 6078,
      "name": "CouldNotLoadMarketData",
      "msg": "CouldNotLoadMarketData"
    },
    {
      "code": 6079,
      "name": "PerpMarketNotFound",
      "msg": "PerpMarketNotFound"
    },
    {
      "code": 6080,
      "name": "InvalidMarketAccount",
      "msg": "InvalidMarketAccount"
    },
    {
      "code": 6081,
      "name": "UnableToLoadPerpMarketAccount",
      "msg": "UnableToLoadMarketAccount"
    },
    {
      "code": 6082,
      "name": "MarketWrongMutability",
      "msg": "MarketWrongMutability"
    },
    {
      "code": 6083,
      "name": "UnableToCastUnixTime",
      "msg": "UnableToCastUnixTime"
    },
    {
      "code": 6084,
      "name": "CouldNotFindMarginPosition",
      "msg": "CouldNotFindMarginPosition"
    },
    {
      "code": 6085,
      "name": "NoMarginPositionAvailable",
      "msg": "NoMarginPositionAvailable"
    },
    {
      "code": 6086,
      "name": "NoLiquidityPositionAvailable",
      "msg": "NoLiquidityPositionAvailable"
    },
    {
      "code": 6087,
      "name": "InvalidMarginMarketInitialization",
      "msg": "InvalidMarginMarketInitialization"
    },
    {
      "code": 6088,
      "name": "CouldNotLoadMarginMarketData",
      "msg": "CouldNotLoadMarginMarketData"
    },
    {
      "code": 6089,
      "name": "MarginMarketNotFound",
      "msg": "MarginMarketNotFound"
    },
    {
      "code": 6090,
      "name": "InvalidMarginMarketAccount",
      "msg": "InvalidMarginMarketAccount"
    },
    {
      "code": 6091,
      "name": "UnableToLoadMarginMarketAccount",
      "msg": "UnableToLoadMarginMarketAccount"
    },
    {
      "code": 6092,
      "name": "MarginMarketWrongMutability",
      "msg": "MarginMarketWrongMutability"
    },
    {
      "code": 6093,
      "name": "MarginMarketInterestNotUpToDate",
      "msg": "MarginInterestNotUpToDate"
    },
    {
      "code": 6094,
      "name": "MarginMarketInsufficientDeposits",
      "msg": "MarginMarketInsufficientDeposits"
    },
    {
      "code": 6095,
      "name": "UserMustSettleTheirOwnPositiveUnsettledPNL",
      "msg": "UserMustSettleTheirOwnPositiveUnsettledPNL"
    },
    {
      "code": 6096,
      "name": "CantUpdatePoolBalanceType",
      "msg": "CantUpdatePoolBalanceType"
    },
    {
      "code": 6097,
      "name": "InsufficientCollateralForSettlingPNL",
      "msg": "InsufficientCollateralForSettlingPNL"
    },
    {
      "code": 6098,
      "name": "AMMNotUpdatedInSameSlot",
      "msg": "AMMNotUpdatedInSameSlot"
    },
    {
      "code": 6099,
      "name": "AuctionNotComplete",
      "msg": "AuctionNotComplete"
    },
    {
      "code": 6100,
      "name": "MakerNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6101,
      "name": "MakerStatsNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6102,
      "name": "MakerMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6103,
      "name": "MakerStatsMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6104,
      "name": "MakerOrderNotFound",
      "msg": "MakerOrderNotFound"
    },
    {
      "code": 6105,
      "name": "CouldNotDeserializeMaker",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6106,
      "name": "CouldNotDeserializeMakerStats",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6107,
      "name": "AuctionPriceDoesNotSatisfyMaker",
      "msg": "AuctionPriceDoesNotSatisfyMaker"
    },
    {
      "code": 6108,
      "name": "MakerCantFulfillOwnOrder",
      "msg": "MakerCantFulfillOwnOrder"
    },
    {
      "code": 6109,
      "name": "MakerOrderMustBePostOnly",
      "msg": "MakerOrderMustBePostOnly"
    },
    {
      "code": 6110,
      "name": "CantMatchTwoPostOnlys",
      "msg": "CantMatchTwoPostOnlys"
    },
    {
      "code": 6111,
      "name": "OrderBreachesOraclePriceLimits",
      "msg": "OrderBreachesOraclePriceLimits"
    },
    {
      "code": 6112,
      "name": "OrderMustBeTriggeredFirst",
      "msg": "OrderMustBeTriggeredFirst"
    },
    {
      "code": 6113,
      "name": "OrderNotTriggerable",
      "msg": "OrderNotTriggerable"
    },
    {
      "code": 6114,
      "name": "OrderDidNotSatisfyTriggerCondition",
      "msg": "OrderDidNotSatisfyTriggerCondition"
    },
    {
      "code": 6115,
      "name": "PositionAlreadyBeingLiquidated",
      "msg": "PositionAlreadyBeingLiquidated"
    },
    {
      "code": 6116,
      "name": "PositionDoesntHaveOpenPositionOrOrders",
      "msg": "PositionDoesntHaveOpenPositionOrOrders"
    },
    {
      "code": 6117,
      "name": "AllOrdersAreAlreadyLiquidations",
      "msg": "AllOrdersAreAlreadyLiquidations"
    },
    {
      "code": 6118,
      "name": "CantCancelLiquidationOrder",
      "msg": "CantCancelLiquidationOrder"
    },
    {
      "code": 6119,
      "name": "UserIsBeingLiquidated",
      "msg": "UserIsBeingLiquidated"
    },
    {
      "code": 6120,
      "name": "LiquidationsOngoing",
      "msg": "LiquidationsOngoing"
    },
    {
      "code": 6121,
      "name": "WrongMarginBalanceType",
      "msg": "WrongMarginBalanceType"
    },
    {
      "code": 6122,
      "name": "UserCantLiquidateThemself",
      "msg": "UserCantLiquidateThemself"
    },
    {
      "code": 6123,
      "name": "InvalidPerpPositionToLiquidate",
      "msg": "InvalidPerpPositionToLiquidate"
    },
    {
      "code": 6124,
      "name": "InvalidBaseAssetAmountForLiquidatePerp",
      "msg": "InvalidBaseAssetAmountForLiquidatePerp"
    },
    {
      "code": 6125,
      "name": "InvalidPositionLastFundingRate",
      "msg": "InvalidPositionLastFundingRate"
    },
    {
      "code": 6126,
      "name": "InvalidPositionDelta",
      "msg": "InvalidPositionDelta"
    },
    {
      "code": 6127,
      "name": "UserBankrupt",
      "msg": "UserBankrupt"
    },
    {
      "code": 6128,
      "name": "UserNotBankrupt",
      "msg": "UserNotBankrupt"
    },
    {
      "code": 6129,
      "name": "UserHasInvalidBorrow",
      "msg": "UserHasInvalidBorrow"
    },
    {
      "code": 6130,
      "name": "DailyWithdrawLimit",
      "msg": "DailyWithdrawLimit"
    },
    {
      "code": 6131,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6132,
      "name": "InsufficientLPTokens",
      "msg": "Insufficient LP tokens"
    },
    {
      "code": 6133,
      "name": "CantLPWithPerpPosition",
      "msg": "Cant LP with a market position"
    },
    {
      "code": 6134,
      "name": "UnableToBurnLPTokens",
      "msg": "Unable to burn LP tokens"
    },
    {
      "code": 6135,
      "name": "TryingToRemoveLiquidityTooFast",
      "msg": "Trying to remove liqudity too fast after adding it"
    },
    {
      "code": 6136,
      "name": "InvalidMarginMarketVault",
      "msg": "Invalid Margin Market Vault"
    },
    {
      "code": 6137,
      "name": "InvalidMarginMarketState",
      "msg": "Invalid Margin Market State"
    },
    {
      "code": 6138,
      "name": "InvalidSerumProgram",
      "msg": "InvalidSerumProgram"
    },
    {
      "code": 6139,
      "name": "InvalidSerumMarket",
      "msg": "InvalidSerumMarket"
    },
    {
      "code": 6140,
      "name": "InvalidSerumBids",
      "msg": "InvalidSerumBids"
    },
    {
      "code": 6141,
      "name": "InvalidSerumAsks",
      "msg": "InvalidSerumAsks"
    },
    {
      "code": 6142,
      "name": "InvalidSerumOpenOrders",
      "msg": "InvalidSerumOpenOrders"
    },
    {
      "code": 6143,
      "name": "FailedSerumCPI",
      "msg": "FailedSerumCPI"
    },
    {
      "code": 6144,
      "name": "FailedToFillOnExternalMarket",
      "msg": "FailedToFillOnExternalMarket"
    },
    {
      "code": 6145,
      "name": "InvalidFulfillmentConfig",
      "msg": "InvalidFulfillmentConfig"
    },
    {
      "code": 6146,
      "name": "InvalidFeeStructure",
      "msg": "InvalidFeeStructure"
    },
    {
      "code": 6147,
      "name": "InsufficientIFShares",
      "msg": "Insufficient IF shares"
    },
    {
      "code": 6148,
      "name": "MarketActionPaused",
      "msg": "the Market has paused this action"
    },
    {
      "code": 6149,
      "name": "MarketPlaceOrderPaused",
      "msg": "the Market status doesnt allow placing orders"
    },
    {
      "code": 6150,
      "name": "MarketFillOrderPaused",
      "msg": "the Market status doesnt allow filling orders"
    },
    {
      "code": 6151,
      "name": "MarketWithdrawPaused",
      "msg": "the Market status doesnt allow withdraws"
    },
    {
      "code": 6152,
      "name": "ProtectedAssetTierViolation",
      "msg": "Action violates the Protected Asset Tier rules"
    },
    {
      "code": 6153,
      "name": "IsolatedAssetTierViolation",
      "msg": "Action violates the Isolated Asset Tier rules"
    },
    {
      "code": 6154,
      "name": "UserCantBeDeleted",
      "msg": "User Cant Be Deleted"
    },
    {
      "code": 6155,
      "name": "ReduceOnlyWithdrawIncreasedRisk",
      "msg": "Reduce Only Withdraw Increased Risk"
    },
    {
      "code": 6156,
      "name": "MaxOpenInterest",
      "msg": "Max Open Interest"
    },
    {
      "code": 6157,
      "name": "CantResolvePerpBankruptcy",
      "msg": "Cant Resolve Perp Bankruptcy"
    },
    {
      "code": 6158,
      "name": "LiquidationDoesntSatisfyLimitPrice",
      "msg": "Liquidation Doesnt Satisfy Limit Price"
    },
    {
      "code": 6159,
      "name": "MarginTradingDisabled",
      "msg": "Margin Trading Disabled"
    },
    {
      "code": 6160,
      "name": "InvalidMarketStatusToSettlePnl",
      "msg": "Invalid Market Status to Settle Perp Pnl"
    },
    {
      "code": 6161,
      "name": "PerpMarketNotInSettlement",
      "msg": "PerpMarketNotInSettlement"
    },
    {
      "code": 6162,
      "name": "PerpMarketNotInReduceOnly",
      "msg": "PerpMarketNotInReduceOnly"
    },
    {
      "code": 6163,
      "name": "PerpMarketSettlementBufferNotReached",
      "msg": "PerpMarketSettlementBufferNotReached"
    },
    {
      "code": 6164,
      "name": "PerpMarketSettlementUserHasOpenOrders",
      "msg": "PerpMarketSettlementUserHasOpenOrders"
    },
    {
      "code": 6165,
      "name": "PerpMarketSettlementUserHasActiveLP",
      "msg": "PerpMarketSettlementUserHasActiveLP"
    },
    {
      "code": 6166,
      "name": "UnableToSettleExpiredUserPosition",
      "msg": "UnableToSettleExpiredUserPosition"
    },
    {
      "code": 6167,
      "name": "UnequalMarketIndexForMarginTransfer",
      "msg": "UnequalMarketIndexForMarginTransfer"
    },
    {
      "code": 6168,
      "name": "InvalidPerpPositionDetected",
      "msg": "InvalidPerpPositionDetected"
    },
    {
      "code": 6169,
      "name": "InvalidMarginPositionDetected",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6170,
      "name": "InvalidAmmDetected",
      "msg": "InvalidAmmDetected"
    },
    {
      "code": 6171,
      "name": "InvalidAmmForFillDetected",
      "msg": "InvalidAmmForFillDetected"
    },
    {
      "code": 6172,
      "name": "InvalidAmmLimitPriceOverride",
      "msg": "InvalidAmmLimitPriceOverride"
    },
    {
      "code": 6173,
      "name": "InvalidOrderFillPrice",
      "msg": "InvalidOrderFillPrice"
    },
    {
      "code": 6174,
      "name": "MarginMarketBalanceInvariantViolated",
      "msg": "MarginMarketBalanceInvariantViolated"
    },
    {
      "code": 6175,
      "name": "MarginMarketVaultInvariantViolated",
      "msg": "MarginMarketVaultInvariantViolated"
    },
    {
      "code": 6176,
      "name": "InvalidPDA",
      "msg": "InvalidPDA"
    },
    {
      "code": 6177,
      "name": "InvalidPDASigner",
      "msg": "InvalidPDASigner"
    },
    {
      "code": 6178,
      "name": "RevenueSettingsCannotSettleToIF",
      "msg": "RevenueSettingsCannotSettleToIF"
    },
    {
      "code": 6179,
      "name": "NoRevenueToSettleToIF",
      "msg": "NoRevenueToSettleToIF"
    },
    {
      "code": 6180,
      "name": "NoAmmPerpPnlDeficit",
      "msg": "NoAmmPerpPnlDeficit"
    },
    {
      "code": 6181,
      "name": "SufficientPerpPnlPool",
      "msg": "SufficientPerpPnlPool"
    },
    {
      "code": 6182,
      "name": "InsufficientPerpPnlPool",
      "msg": "InsufficientPerpPnlPool"
    },
    {
      "code": 6183,
      "name": "PerpPnlDeficitBelowThreshold",
      "msg": "PerpPnlDeficitBelowThreshold"
    },
    {
      "code": 6184,
      "name": "MaxRevenueWithdrawPerPeriodReached",
      "msg": "MaxRevenueWithdrawPerPeriodReached"
    },
    {
      "code": 6185,
      "name": "MaxIFWithdrawReached",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6186,
      "name": "NoIFWithdrawAvailable",
      "msg": "NoIFWithdrawAvailable"
    },
    {
      "code": 6187,
      "name": "InvalidIFUnstake",
      "msg": "InvalidIFUnstake"
    },
    {
      "code": 6188,
      "name": "InvalidIFUnstakeSize",
      "msg": "InvalidIFUnstakeSize"
    },
    {
      "code": 6189,
      "name": "InvalidIFUnstakeCancel",
      "msg": "InvalidIFUnstakeCancel"
    },
    {
      "code": 6190,
      "name": "InvalidIFForNewStakes",
      "msg": "InvalidIFForNewStakes"
    },
    {
      "code": 6191,
      "name": "InvalidIFRebase",
      "msg": "InvalidIFRebase"
    },
    {
      "code": 6192,
      "name": "InvalidInsuranceUnstakeSize",
      "msg": "InvalidInsuranceUnstakeSize"
    },
    {
      "code": 6193,
      "name": "InvalidOrderLimitPrice",
      "msg": "InvalidOrderLimitPrice"
    },
    {
      "code": 6194,
      "name": "InvalidIFDetected",
      "msg": "InvalidIFDetected"
    },
    {
      "code": 6195,
      "name": "InvalidAmmMaxSpreadDetected",
      "msg": "InvalidAmmMaxSpreadDetected"
    },
    {
      "code": 6196,
      "name": "InvalidConcentrationCoef",
      "msg": "InvalidConcentrationCoef"
    },
    {
      "code": 6197,
      "name": "InvalidSrmVault",
      "msg": "InvalidSrmVault"
    },
    {
      "code": 6198,
      "name": "InvalidVaultOwner",
      "msg": "InvalidVaultOwner"
    },
    {
      "code": 6199,
      "name": "InvalidMarketStatusForFills",
      "msg": "InvalidMarketStatusForFills"
    },
    {
      "code": 6200,
      "name": "IFWithdrawRequestInProgress",
      "msg": "IFWithdrawRequestInProgress"
    },
    {
      "code": 6201,
      "name": "NoIFWithdrawRequestInProgress",
      "msg": "NoIFWithdrawRequestInProgress"
    },
    {
      "code": 6202,
      "name": "IFWithdrawRequestTooSmall",
      "msg": "IFWithdrawRequestTooSmall"
    },
    {
      "code": 6203,
      "name": "IncorrectMarginMarketAccountPassed",
      "msg": "IncorrectMarginMarketAccountPassed"
    },
    {
      "code": 6204,
      "name": "BlockchainClockInconsistency",
      "msg": "BlockchainClockInconsistency"
    },
    {
      "code": 6205,
      "name": "InvalidIFSharesDetected",
      "msg": "InvalidIFSharesDetected"
    },
    {
      "code": 6206,
      "name": "NewLPSizeTooSmall",
      "msg": "NewLPSizeTooSmall"
    },
    {
      "code": 6207,
      "name": "MarketStatusInvalidForNewLP",
      "msg": "MarketStatusInvalidForNewLP"
    },
    {
      "code": 6208,
      "name": "InvalidMarkTwapUpdateDetected",
      "msg": "InvalidMarkTwapUpdateDetected"
    },
    {
      "code": 6209,
      "name": "MarketSettlementAttemptOnActiveMarket",
      "msg": "MarketSettlementAttemptOnActiveMarket"
    },
    {
      "code": 6210,
      "name": "MarketSettlementRequiresSettledLP",
      "msg": "MarketSettlementRequiresSettledLP"
    },
    {
      "code": 6211,
      "name": "MarketSettlementAttemptTooEarly",
      "msg": "MarketSettlementAttemptTooEarly"
    },
    {
      "code": 6212,
      "name": "MarketSettlementTargetPriceInvalid",
      "msg": "MarketSettlementTargetPriceInvalid"
    },
    {
      "code": 6213,
      "name": "UnsupportedMarginMarket",
      "msg": "UnsupportedMarginMarket"
    },
    {
      "code": 6214,
      "name": "MarginOrdersDisabled",
      "msg": "MarginOrdersDisabled"
    },
    {
      "code": 6215,
      "name": "MarketBeingInitialized",
      "msg": "Market Being Initialized"
    },
    {
      "code": 6216,
      "name": "InvalidUserSubAccountId",
      "msg": "Invalid Sub Account Id"
    },
    {
      "code": 6217,
      "name": "InvalidTriggerOrderCondition",
      "msg": "Invalid Trigger Order Condition"
    },
    {
      "code": 6218,
      "name": "InvalidMarginPosition",
      "msg": "Invalid Margin Position"
    },
    {
      "code": 6219,
      "name": "CantTransferBetweenSameUserAccount",
      "msg": "Cant transfer between same user account"
    },
    {
      "code": 6220,
      "name": "InvalidPerpPosition",
      "msg": "Invalid Perp Position"
    },
    {
      "code": 6221,
      "name": "UnableToGetLimitPrice",
      "msg": "Unable To Get Limit Price"
    },
    {
      "code": 6222,
      "name": "InvalidLiquidation",
      "msg": "Invalid Liquidation"
    },
    {
      "code": 6223,
      "name": "MarginFulfillmentConfigDisabled",
      "msg": "Margin Fulfillment Config Disabled"
    },
    {
      "code": 6224,
      "name": "InvalidMaker",
      "msg": "Invalid Maker"
    },
    {
      "code": 6225,
      "name": "FailedUnwrap",
      "msg": "Failed Unwrap"
    },
    {
      "code": 6226,
      "name": "MaxNumberOfUsers",
      "msg": "Max Number Of Users"
    },
    {
      "code": 6227,
      "name": "InvalidOracleForSettlePnl",
      "msg": "InvalidOracleForSettlePnl"
    },
    {
      "code": 6228,
      "name": "MarginOrdersOpen",
      "msg": "MarginOrdersOpen"
    },
    {
      "code": 6229,
      "name": "TierViolationLiquidatingPerpPnl",
      "msg": "TierViolationLiquidatingPerpPnl"
    },
    {
      "code": 6230,
      "name": "CouldNotLoadUserData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6231,
      "name": "UserWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6232,
      "name": "InvalidUserAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6233,
      "name": "CouldNotLoadUserStatsData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6234,
      "name": "UserStatsWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6235,
      "name": "InvalidUserStatsAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6236,
      "name": "UserNotFound",
      "msg": "UserNotFound"
    },
    {
      "code": 6237,
      "name": "UnableToLoadUserAccount",
      "msg": "UnableToLoadUserAccount"
    },
    {
      "code": 6238,
      "name": "AccountLiquidated",
      "msg": "Account liquidated"
    },
    {
      "code": 6239,
      "name": "InvalidOracleAccount",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6240,
      "name": "UnableToLoadOracleAccount",
      "msg": "Unable to load oracle account"
    },
    {
      "code": 6241,
      "name": "CouldNotLoadOracleData",
      "msg": "could not load oracle data"
    },
    {
      "code": 6242,
      "name": "OracleWrongMutability",
      "msg": "wrong oracle mutablility"
    },
    {
      "code": 6243,
      "name": "KeeperAlreadyExists",
      "msg": "The keeper already exists in the list."
    },
    {
      "code": 6244,
      "name": "KeepersListFull",
      "msg": "The keepers list is full."
    },
    {
      "code": 6245,
      "name": "KeeperNotFound",
      "msg": "The keeper was not found in the list."
    },
    {
      "code": 6246,
      "name": "MaxOpenInterestExceeded",
      "msg": "Max open interest exceeded"
    },
    {
      "code": 6247,
      "name": "InvalidOrderStepSize",
      "msg": "Invalid order step size"
    },
    {
      "code": 6248,
      "name": "OrderExpired",
      "msg": "Order expired"
    },
    {
      "code": 6249,
      "name": "OnlyTrader",
      "msg": "Only trader"
    },
    {
      "code": 6250,
      "name": "OnlyLP",
      "msg": "Only LP"
    },
    {
      "code": 6251,
      "name": "InvalidWithdraw",
      "msg": "Invalid Withdraw"
    },
    {
      "code": 6252,
      "name": "InvalidEnum",
      "msg": "Enum value could not be converted"
    },
    {
      "code": 6253,
      "name": "InvalidStartTick",
      "msg": "Invalid start tick index provided."
    },
    {
      "code": 6254,
      "name": "TickArrayExistInPool",
      "msg": "Tick-array already exists in this whirlpool"
    },
    {
      "code": 6255,
      "name": "TickArrayIndexOutofBounds",
      "msg": "Attempt to search for a tick-array failed"
    },
    {
      "code": 6256,
      "name": "InvalidTickSpacing",
      "msg": "Tick-spacing is not supported"
    },
    {
      "code": 6257,
      "name": "ClosePositionNotEmpty",
      "msg": "Position is not empty It cannot be closed"
    },
    {
      "code": 6258,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6259,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6260,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6261,
      "name": "TickNotFound",
      "msg": "Tick not found within tick array"
    },
    {
      "code": 6262,
      "name": "InvalidTickIndex",
      "msg": "Provided tick index is either out of bounds or uninitializable"
    },
    {
      "code": 6263,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6264,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6265,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6266,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6267,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6268,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6269,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6270,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6271,
      "name": "MissingOrInvalidDelegate",
      "msg": "Position token account has a missing or invalid delegate"
    },
    {
      "code": 6272,
      "name": "InvalidPositionTokenAmount",
      "msg": "Position token amount must be 1"
    },
    {
      "code": 6273,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6274,
      "name": "InvalidTimestamp",
      "msg": "Timestamp should be greater than the last updated timestamp"
    },
    {
      "code": 6275,
      "name": "InvalidTickArraySequence",
      "msg": "Invalid tick array sequence provided for instruction."
    },
    {
      "code": 6276,
      "name": "InvalidTokenMintOrder",
      "msg": "Token Mint in wrong order"
    },
    {
      "code": 6277,
      "name": "RewardNotInitialized",
      "msg": "Reward not initialized"
    },
    {
      "code": 6278,
      "name": "InvalidRewardIndex",
      "msg": "Invalid reward index"
    },
    {
      "code": 6279,
      "name": "RewardVaultAmountInsufficient",
      "msg": "Reward vault requires amount to support emissions for at least one day"
    },
    {
      "code": 6280,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6281,
      "name": "ProtocolFeeRateMaxExceeded",
      "msg": "Exceeded max protocol fee rate"
    },
    {
      "code": 6282,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6283,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6284,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6285,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6286,
      "name": "InvalidSqrtPriceLimitDirection",
      "msg": "Provided SqrtPriceLimit not in the same direction as the swap."
    },
    {
      "code": 6287,
      "name": "ZeroTradableAmount",
      "msg": "There are no tradable amount to swap."
    },
    {
      "code": 6288,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    },
    {
      "code": 6289,
      "name": "AmountInAboveMaximum",
      "msg": "Amount in above maximum threshold"
    },
    {
      "code": 6290,
      "name": "TickArraySequenceInvalidIndex",
      "msg": "Invalid index for tick array sequence"
    },
    {
      "code": 6291,
      "name": "AmountCalcOverflow",
      "msg": "Amount calculated overflows"
    },
    {
      "code": 6292,
      "name": "AmountRemainingOverflow",
      "msg": "Amount remaining overflows"
    },
    {
      "code": 6293,
      "name": "InvalidIntermediaryMint",
      "msg": "Invalid intermediary mint"
    },
    {
      "code": 6294,
      "name": "DuplicateTwoHopPool",
      "msg": "Duplicate two hop pool"
    },
    {
      "code": 6295,
      "name": "InvalidBundleIndex",
      "msg": "Bundle index is out of bounds"
    },
    {
      "code": 6296,
      "name": "BundledPositionAlreadyOpened",
      "msg": "Position has already been opened"
    },
    {
      "code": 6297,
      "name": "BundledPositionAlreadyClosed",
      "msg": "Position has already been closed"
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
        },
        {
          "name": "isTrader",
          "type": "bool"
        }
      ]
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
          "name": "marginIndex",
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
          "name": "marginIndex",
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
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
      "name": "addPerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          "isMut": false,
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
          "name": "user",
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
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
        }
      ]
    },
    {
      "name": "removePerpLpShares",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          "isMut": false,
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
          "name": "user",
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
          "name": "liquidityAmount",
          "type": "u128"
        },
        {
          "name": "marketIndex",
          "type": "u16"
        },
        {
          "name": "tickLowerIndex",
          "type": "i32"
        },
        {
          "name": "tickUpperIndex",
          "type": "i32"
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
        },
        {
          "name": "observation",
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
      "name": "swap",
      "docs": [
        "Perform a swap in this Whirlpool",
        "",
        "### Authority",
        "- \"token_authority\" - The authority to withdraw tokens from the input token account.",
        "",
        "### Parameters",
        "- `amount` - The amount of input or output token to swap from (depending on amount_specified_is_input).",
        "- `other_amount_threshold` - The maximum/minimum of input/output token to swap into (depending on amount_specified_is_input).",
        "- `sqrt_price_limit` - The maximum/minimum price the swap will swap to.",
        "- `amount_specified_is_input` - Specifies the token the parameter `amount`represents. If true, the amount represents the input token of the swap.",
        "- `a_to_b` - The direction of the swap. True if swapping from A to B. False if swapping from B to A.",
        "",
        "#### Special Errors",
        "- `ZeroTradableAmount` - User provided parameter `amount` is 0.",
        "- `InvalidSqrtPriceLimitDirection` - User provided parameter `sqrt_price_limit` does not match the direction of the trade.",
        "- `SqrtPriceOutOfBounds` - User provided parameter `sqrt_price_limit` is over Whirlppool's max/min bounds for sqrt-price.",
        "- `InvalidTickArraySequence` - User provided tick-arrays are not in sequential order required to proceed in this trade direction.",
        "- `TickArraySequenceInvalidIndex` - The swap loop attempted to access an invalid array index during the query of the next initialized tick.",
        "- `TickArrayIndexOutofBounds` - The swap loop attempted to access an invalid array index during tick crossing.",
        "- `LiquidityOverflow` - Liquidity value overflowed 128bits during tick crossing.",
        "- `InvalidTickSpacing` - The swap pool was initialized with tick-spacing of 0."
      ],
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": true
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
        },
        {
          "name": "oracle",
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
          "name": "otherAmountThreshold",
          "type": "u64"
        },
        {
          "name": "sqrtPriceLimit",
          "type": "u128"
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": "bool"
        },
        {
          "name": "aToB",
          "type": "bool"
        }
      ]
    },
    {
      "name": "observe",
      "accounts": [
        {
          "name": "whirlpool",
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
          "name": "quoteAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseAssetVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whirlpool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
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
          "name": "orderStepSize",
          "type": "u64"
        },
        {
          "name": "minOrderSize",
          "type": "u64"
        },
        {
          "name": "expireTs",
          "type": "i64"
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
      "name": "initializePool",
      "docs": [
        "Initializes a Whirlpool account.",
        "Fee rate is set to the default values on the config and supplied fee_tier.",
        "",
        "### Parameters",
        "- `bumps` - The bump value when deriving the PDA of the Whirlpool address.",
        "- `tick_spacing` - The desired tick spacing for this pool.",
        "- `initial_sqrt_price` - The desired initial sqrt-price for this pool",
        "",
        "#### Special Errors",
        "`InvalidTokenMintOrder` - The order of mints have to be ordered by",
        "`SqrtPriceOutOfBounds` - provided initial_sqrt_price is not between 2^-64 to 2^64",
        ""
      ],
      "accounts": [
        {
          "name": "whirlpoolsConfig",
          "isMut": false,
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
          "name": "funder",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "whirlpool",
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
          "name": "feeTier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oracle",
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
          "name": "rent",
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
          "name": "initialSqrtPrice",
          "type": "u128"
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
          "name": "whirlpool",
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
      "name": "increaseLiquidity",
      "docs": [
        "Add liquidity to a position in the Whirlpool. This call also updates the position's accrued fees and rewards.",
        "",
        "### Authority",
        "- `position_authority` - authority that owns the token corresponding to this desired position.",
        "",
        "### Parameters",
        "- `liquidity_amount` - The total amount of Liquidity the user is willing to deposit.",
        "- `token_max_a` - The maximum amount of tokenA the user is willing to deposit.",
        "- `token_max_b` - The maximum amount of tokenB the user is willing to deposit.",
        "",
        "#### Special Errors",
        "- `LiquidityZero` - Provided liquidity amount is zero.",
        "- `LiquidityTooHigh` - Provided liquidity exceeds u128::max.",
        "- `TokenMaxExceeded` - The required token to perform this operation exceeds the user defined amount."
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          "name": "tokenMaxA",
          "type": "u64"
        },
        {
          "name": "tokenMaxB",
          "type": "u64"
        }
      ]
    },
    {
      "name": "decreaseLiquidity",
      "docs": [
        "Withdraw liquidity from a position in the Whirlpool. This call also updates the position's accrued fees and rewards.",
        "",
        "### Authority",
        "- `position_authority` - authority that owns the token corresponding to this desired position.",
        "",
        "### Parameters",
        "- `liquidity_amount` - The total amount of Liquidity the user desires to withdraw.",
        "- `token_min_a` - The minimum amount of tokenA the user is willing to withdraw.",
        "- `token_min_b` - The minimum amount of tokenB the user is willing to withdraw.",
        "",
        "#### Special Errors",
        "- `LiquidityZero` - Provided liquidity amount is zero.",
        "- `LiquidityTooHigh` - Provided liquidity exceeds u128::max.",
        "- `TokenMinSubceeded` - The required token to perform this operation subceeds the user defined amount."
      ],
      "accounts": [
        {
          "name": "whirlpool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "positionAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "positionTokenAccount",
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
          }
        ]
      }
    },
    {
      "name": "whirlpool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpoolsConfig",
            "type": "publicKey"
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
            "name": "liquidity",
            "type": "u128"
          },
          {
            "name": "sqrtPrice",
            "type": "u128"
          },
          {
            "name": "tickCurrentIndex",
            "type": "i32"
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
            "name": "observationIndex",
            "docs": [
              "the most-recently updated index of the observations array"
            ],
            "type": "u16"
          },
          {
            "name": "observationUpdateDuration",
            "type": "u16"
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
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "whirlpool",
            "type": "publicKey"
          },
          {
            "name": "positionMint",
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
            "name": "poolId",
            "type": "publicKey"
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
            "type": "u32"
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
              "oracle"
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
            "name": "collateralRatioInitial",
            "docs": [
              "The margin ratio which determines how much collateral is required to open a position",
              "e.g. margin ratio of .1 means a user must have $100 of total collateral to open a $1000 position",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
          },
          {
            "name": "collateralRatioMaintenance",
            "docs": [
              "The margin ratio which determines when a user will be liquidated",
              "e.g. margin ratio of .05 means a user must have $50 of total collateral to maintain a $1000 position",
              "else they will be liquidated",
              "precision: MARGIN_PRECISION"
            ],
            "type": "u32"
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
              "current open interes"
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
            "name": "whirlpool",
            "type": "publicKey"
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
            "name": "bump",
            "type": "u8"
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
            "name": "isIsolated",
            "docs": [
              "isolated / cross margin flag"
            ],
            "type": "bool"
          },
          {
            "name": "isTrader",
            "docs": [
              "lp / trader flag"
            ],
            "type": "bool"
          },
          {
            "name": "subAccountId",
            "docs": [
              "The sub account id for this user"
            ],
            "type": "u16"
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
                8
              ]
            }
          },
          {
            "name": "liquidityPositions",
            "docs": [
              "The user's liquidity"
            ],
            "type": {
              "array": [
                {
                  "defined": "LiquidityPosition"
                },
                8
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
            "name": "orders",
            "docs": [
              "The user's orders"
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
            "name": "lastActiveSlot",
            "docs": [
              "The last slot a user was active. Used to determine if a user is idle"
            ],
            "type": "u64"
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
                50
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
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
            "name": "orderType",
            "type": {
              "defined": "OrderType"
            }
          },
          {
            "name": "userOrderId",
            "type": "u32"
          },
          {
            "name": "marketIndex",
            "type": "u16"
          },
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
            "name": "marketIndex",
            "type": "u16"
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
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "LiquidityPosition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "liquidityAmount",
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
            "name": "marketIndex",
            "type": "u16"
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
      "name": "InitializePoolEvent",
      "fields": [
        {
          "name": "whirlpool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "bump",
          "type": "u8",
          "index": false
        },
        {
          "name": "whirlpoolsConfig",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMintA",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMintB",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenVaultA",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenVaultB",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "oracle",
          "type": "publicKey",
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
          "name": "tickCurrentIndex",
          "type": "i32",
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
          "name": "positionMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "position",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "owner",
          "type": "publicKey",
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
        },
        {
          "name": "isTrader",
          "type": "bool",
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
          "name": "liquidityAmount",
          "type": "u128",
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
      "name": "UserHasNoLpPositionInMarket",
      "msg": "User Has No Lp Position In Market"
    },
    {
      "code": 6012,
      "name": "InvalidInitialPeg",
      "msg": "Invalid Initial Peg"
    },
    {
      "code": 6013,
      "name": "InvalidRepegRedundant",
      "msg": "AMM repeg already configured with amt given"
    },
    {
      "code": 6014,
      "name": "InvalidRepegDirection",
      "msg": "AMM repeg incorrect repeg direction"
    },
    {
      "code": 6015,
      "name": "InvalidRepegProfitability",
      "msg": "AMM repeg out of bounds pnl"
    },
    {
      "code": 6016,
      "name": "SlippageOutsideLimit",
      "msg": "Slippage Outside Limit Price"
    },
    {
      "code": 6017,
      "name": "OrderSizeTooSmall",
      "msg": "Order Size Too Small"
    },
    {
      "code": 6018,
      "name": "InvalidUpdateK",
      "msg": "Price change too large when updating K"
    },
    {
      "code": 6019,
      "name": "AdminWithdrawTooLarge",
      "msg": "Admin tried to withdraw amount larger than fees collected"
    },
    {
      "code": 6020,
      "name": "MathError",
      "msg": "Math Error"
    },
    {
      "code": 6021,
      "name": "BnConversionError",
      "msg": "Conversion to u128/u64 failed with an overflow or underflow"
    },
    {
      "code": 6022,
      "name": "ClockUnavailable",
      "msg": "Clock unavailable"
    },
    {
      "code": 6023,
      "name": "UnableToLoadOracle",
      "msg": "Unable To Load Oracles"
    },
    {
      "code": 6024,
      "name": "PriceBandsBreached",
      "msg": "Price Bands Breached"
    },
    {
      "code": 6025,
      "name": "ExchangePaused",
      "msg": "Exchange is paused"
    },
    {
      "code": 6026,
      "name": "InvalidWhitelistToken",
      "msg": "Invalid whitelist token"
    },
    {
      "code": 6027,
      "name": "WhitelistTokenNotFound",
      "msg": "Whitelist token not found"
    },
    {
      "code": 6028,
      "name": "InvalidDiscountToken",
      "msg": "Invalid discount token"
    },
    {
      "code": 6029,
      "name": "DiscountTokenNotFound",
      "msg": "Discount token not found"
    },
    {
      "code": 6030,
      "name": "ReferrerNotFound",
      "msg": "Referrer not found"
    },
    {
      "code": 6031,
      "name": "ReferrerStatsNotFound",
      "msg": "ReferrerNotFound"
    },
    {
      "code": 6032,
      "name": "ReferrerMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6033,
      "name": "ReferrerStatsMustBeWritable",
      "msg": "ReferrerMustBeWritable"
    },
    {
      "code": 6034,
      "name": "ReferrerAndReferrerStatsAuthorityUnequal",
      "msg": "ReferrerAndReferrerStatsAuthorityUnequal"
    },
    {
      "code": 6035,
      "name": "InvalidReferrer",
      "msg": "InvalidReferrer"
    },
    {
      "code": 6036,
      "name": "InvalidOracle",
      "msg": "InvalidOracle"
    },
    {
      "code": 6037,
      "name": "OracleNotFound",
      "msg": "OracleNotFound"
    },
    {
      "code": 6038,
      "name": "LiquidationsBlockedByOracle",
      "msg": "Liquidations Blocked By Oracle"
    },
    {
      "code": 6039,
      "name": "MaxDeposit",
      "msg": "Can not deposit more than max deposit"
    },
    {
      "code": 6040,
      "name": "CantDeleteUserWithCollateral",
      "msg": "Can not delete user that still has collateral"
    },
    {
      "code": 6041,
      "name": "InvalidFundingProfitability",
      "msg": "AMM funding out of bounds pnl"
    },
    {
      "code": 6042,
      "name": "CastingFailure",
      "msg": "Casting Failure"
    },
    {
      "code": 6043,
      "name": "InvalidOrder",
      "msg": "InvalidOrder"
    },
    {
      "code": 6044,
      "name": "InvalidOrderMaxTs",
      "msg": "InvalidOrderMaxTs"
    },
    {
      "code": 6045,
      "name": "InvalidOrderMarketType",
      "msg": "InvalidOrderMarketType"
    },
    {
      "code": 6046,
      "name": "InvalidOrderForInitialMarginReq",
      "msg": "InvalidOrderForInitialMarginReq"
    },
    {
      "code": 6047,
      "name": "InvalidOrderNotRiskReducing",
      "msg": "InvalidOrderNotRiskReducing"
    },
    {
      "code": 6048,
      "name": "InvalidOrderSizeTooSmall",
      "msg": "InvalidOrderSizeTooSmall"
    },
    {
      "code": 6049,
      "name": "InvalidOrderNotStepSizeMultiple",
      "msg": "InvalidOrderNotStepSizeMultiple"
    },
    {
      "code": 6050,
      "name": "InvalidOrderBaseQuoteAsset",
      "msg": "InvalidOrderBaseQuoteAsset"
    },
    {
      "code": 6051,
      "name": "InvalidOrderIOC",
      "msg": "InvalidOrderIOC"
    },
    {
      "code": 6052,
      "name": "InvalidOrderPostOnly",
      "msg": "InvalidOrderPostOnly"
    },
    {
      "code": 6053,
      "name": "InvalidOrderIOCPostOnly",
      "msg": "InvalidOrderIOCPostOnly"
    },
    {
      "code": 6054,
      "name": "InvalidOrderTrigger",
      "msg": "InvalidOrderTrigger"
    },
    {
      "code": 6055,
      "name": "InvalidOrderAuction",
      "msg": "InvalidOrderAuction"
    },
    {
      "code": 6056,
      "name": "InvalidOrderOracleOffset",
      "msg": "InvalidOrderOracleOffset"
    },
    {
      "code": 6057,
      "name": "InvalidOrderMinOrderSize",
      "msg": "InvalidOrderMinOrderSize"
    },
    {
      "code": 6058,
      "name": "PlacePostOnlyLimitFailure",
      "msg": "Failed to Place Post-Only Limit Order"
    },
    {
      "code": 6059,
      "name": "UserHasNoOrder",
      "msg": "User has no order"
    },
    {
      "code": 6060,
      "name": "OrderAmountTooSmall",
      "msg": "Order Amount Too Small"
    },
    {
      "code": 6061,
      "name": "MaxNumberOfOrders",
      "msg": "Max number of orders taken"
    },
    {
      "code": 6062,
      "name": "OrderDoesNotExist",
      "msg": "Order does not exist"
    },
    {
      "code": 6063,
      "name": "OrderNotOpen",
      "msg": "Order not open"
    },
    {
      "code": 6064,
      "name": "FillOrderDidNotUpdateState",
      "msg": "FillOrderDidNotUpdateState"
    },
    {
      "code": 6065,
      "name": "ReduceOnlyOrderIncreasedRisk",
      "msg": "Reduce only order increased risk"
    },
    {
      "code": 6066,
      "name": "UnableToLoadAccountLoader",
      "msg": "Unable to load AccountLoader"
    },
    {
      "code": 6067,
      "name": "TradeSizeTooLarge",
      "msg": "Trade Size Too Large"
    },
    {
      "code": 6068,
      "name": "UserCantReferThemselves",
      "msg": "User cant refer themselves"
    },
    {
      "code": 6069,
      "name": "DidNotReceiveExpectedReferrer",
      "msg": "Did not receive expected referrer"
    },
    {
      "code": 6070,
      "name": "CouldNotDeserializeReferrer",
      "msg": "Could not deserialize referrer"
    },
    {
      "code": 6071,
      "name": "CouldNotDeserializeReferrerStats",
      "msg": "Could not deserialize referrer stats"
    },
    {
      "code": 6072,
      "name": "UserOrderIdAlreadyInUse",
      "msg": "User Order Id Already In Use"
    },
    {
      "code": 6073,
      "name": "NoPositionsLiquidatable",
      "msg": "No positions liquidatable"
    },
    {
      "code": 6074,
      "name": "InvalidMarginRatio",
      "msg": "Invalid Margin Ratio"
    },
    {
      "code": 6075,
      "name": "CantCancelPostOnlyOrder",
      "msg": "Cant Cancel Post Only Order"
    },
    {
      "code": 6076,
      "name": "InvalidOracleOffset",
      "msg": "InvalidOracleOffset"
    },
    {
      "code": 6077,
      "name": "CantExpireOrders",
      "msg": "CantExpireOrders"
    },
    {
      "code": 6078,
      "name": "CouldNotLoadMarketData",
      "msg": "CouldNotLoadMarketData"
    },
    {
      "code": 6079,
      "name": "PerpMarketNotFound",
      "msg": "PerpMarketNotFound"
    },
    {
      "code": 6080,
      "name": "InvalidMarketAccount",
      "msg": "InvalidMarketAccount"
    },
    {
      "code": 6081,
      "name": "UnableToLoadPerpMarketAccount",
      "msg": "UnableToLoadMarketAccount"
    },
    {
      "code": 6082,
      "name": "MarketWrongMutability",
      "msg": "MarketWrongMutability"
    },
    {
      "code": 6083,
      "name": "UnableToCastUnixTime",
      "msg": "UnableToCastUnixTime"
    },
    {
      "code": 6084,
      "name": "CouldNotFindMarginPosition",
      "msg": "CouldNotFindMarginPosition"
    },
    {
      "code": 6085,
      "name": "NoMarginPositionAvailable",
      "msg": "NoMarginPositionAvailable"
    },
    {
      "code": 6086,
      "name": "NoLiquidityPositionAvailable",
      "msg": "NoLiquidityPositionAvailable"
    },
    {
      "code": 6087,
      "name": "InvalidMarginMarketInitialization",
      "msg": "InvalidMarginMarketInitialization"
    },
    {
      "code": 6088,
      "name": "CouldNotLoadMarginMarketData",
      "msg": "CouldNotLoadMarginMarketData"
    },
    {
      "code": 6089,
      "name": "MarginMarketNotFound",
      "msg": "MarginMarketNotFound"
    },
    {
      "code": 6090,
      "name": "InvalidMarginMarketAccount",
      "msg": "InvalidMarginMarketAccount"
    },
    {
      "code": 6091,
      "name": "UnableToLoadMarginMarketAccount",
      "msg": "UnableToLoadMarginMarketAccount"
    },
    {
      "code": 6092,
      "name": "MarginMarketWrongMutability",
      "msg": "MarginMarketWrongMutability"
    },
    {
      "code": 6093,
      "name": "MarginMarketInterestNotUpToDate",
      "msg": "MarginInterestNotUpToDate"
    },
    {
      "code": 6094,
      "name": "MarginMarketInsufficientDeposits",
      "msg": "MarginMarketInsufficientDeposits"
    },
    {
      "code": 6095,
      "name": "UserMustSettleTheirOwnPositiveUnsettledPNL",
      "msg": "UserMustSettleTheirOwnPositiveUnsettledPNL"
    },
    {
      "code": 6096,
      "name": "CantUpdatePoolBalanceType",
      "msg": "CantUpdatePoolBalanceType"
    },
    {
      "code": 6097,
      "name": "InsufficientCollateralForSettlingPNL",
      "msg": "InsufficientCollateralForSettlingPNL"
    },
    {
      "code": 6098,
      "name": "AMMNotUpdatedInSameSlot",
      "msg": "AMMNotUpdatedInSameSlot"
    },
    {
      "code": 6099,
      "name": "AuctionNotComplete",
      "msg": "AuctionNotComplete"
    },
    {
      "code": 6100,
      "name": "MakerNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6101,
      "name": "MakerStatsNotFound",
      "msg": "MakerNotFound"
    },
    {
      "code": 6102,
      "name": "MakerMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6103,
      "name": "MakerStatsMustBeWritable",
      "msg": "MakerMustBeWritable"
    },
    {
      "code": 6104,
      "name": "MakerOrderNotFound",
      "msg": "MakerOrderNotFound"
    },
    {
      "code": 6105,
      "name": "CouldNotDeserializeMaker",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6106,
      "name": "CouldNotDeserializeMakerStats",
      "msg": "CouldNotDeserializeMaker"
    },
    {
      "code": 6107,
      "name": "AuctionPriceDoesNotSatisfyMaker",
      "msg": "AuctionPriceDoesNotSatisfyMaker"
    },
    {
      "code": 6108,
      "name": "MakerCantFulfillOwnOrder",
      "msg": "MakerCantFulfillOwnOrder"
    },
    {
      "code": 6109,
      "name": "MakerOrderMustBePostOnly",
      "msg": "MakerOrderMustBePostOnly"
    },
    {
      "code": 6110,
      "name": "CantMatchTwoPostOnlys",
      "msg": "CantMatchTwoPostOnlys"
    },
    {
      "code": 6111,
      "name": "OrderBreachesOraclePriceLimits",
      "msg": "OrderBreachesOraclePriceLimits"
    },
    {
      "code": 6112,
      "name": "OrderMustBeTriggeredFirst",
      "msg": "OrderMustBeTriggeredFirst"
    },
    {
      "code": 6113,
      "name": "OrderNotTriggerable",
      "msg": "OrderNotTriggerable"
    },
    {
      "code": 6114,
      "name": "OrderDidNotSatisfyTriggerCondition",
      "msg": "OrderDidNotSatisfyTriggerCondition"
    },
    {
      "code": 6115,
      "name": "PositionAlreadyBeingLiquidated",
      "msg": "PositionAlreadyBeingLiquidated"
    },
    {
      "code": 6116,
      "name": "PositionDoesntHaveOpenPositionOrOrders",
      "msg": "PositionDoesntHaveOpenPositionOrOrders"
    },
    {
      "code": 6117,
      "name": "AllOrdersAreAlreadyLiquidations",
      "msg": "AllOrdersAreAlreadyLiquidations"
    },
    {
      "code": 6118,
      "name": "CantCancelLiquidationOrder",
      "msg": "CantCancelLiquidationOrder"
    },
    {
      "code": 6119,
      "name": "UserIsBeingLiquidated",
      "msg": "UserIsBeingLiquidated"
    },
    {
      "code": 6120,
      "name": "LiquidationsOngoing",
      "msg": "LiquidationsOngoing"
    },
    {
      "code": 6121,
      "name": "WrongMarginBalanceType",
      "msg": "WrongMarginBalanceType"
    },
    {
      "code": 6122,
      "name": "UserCantLiquidateThemself",
      "msg": "UserCantLiquidateThemself"
    },
    {
      "code": 6123,
      "name": "InvalidPerpPositionToLiquidate",
      "msg": "InvalidPerpPositionToLiquidate"
    },
    {
      "code": 6124,
      "name": "InvalidBaseAssetAmountForLiquidatePerp",
      "msg": "InvalidBaseAssetAmountForLiquidatePerp"
    },
    {
      "code": 6125,
      "name": "InvalidPositionLastFundingRate",
      "msg": "InvalidPositionLastFundingRate"
    },
    {
      "code": 6126,
      "name": "InvalidPositionDelta",
      "msg": "InvalidPositionDelta"
    },
    {
      "code": 6127,
      "name": "UserBankrupt",
      "msg": "UserBankrupt"
    },
    {
      "code": 6128,
      "name": "UserNotBankrupt",
      "msg": "UserNotBankrupt"
    },
    {
      "code": 6129,
      "name": "UserHasInvalidBorrow",
      "msg": "UserHasInvalidBorrow"
    },
    {
      "code": 6130,
      "name": "DailyWithdrawLimit",
      "msg": "DailyWithdrawLimit"
    },
    {
      "code": 6131,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6132,
      "name": "InsufficientLPTokens",
      "msg": "Insufficient LP tokens"
    },
    {
      "code": 6133,
      "name": "CantLPWithPerpPosition",
      "msg": "Cant LP with a market position"
    },
    {
      "code": 6134,
      "name": "UnableToBurnLPTokens",
      "msg": "Unable to burn LP tokens"
    },
    {
      "code": 6135,
      "name": "TryingToRemoveLiquidityTooFast",
      "msg": "Trying to remove liqudity too fast after adding it"
    },
    {
      "code": 6136,
      "name": "InvalidMarginMarketVault",
      "msg": "Invalid Margin Market Vault"
    },
    {
      "code": 6137,
      "name": "InvalidMarginMarketState",
      "msg": "Invalid Margin Market State"
    },
    {
      "code": 6138,
      "name": "InvalidSerumProgram",
      "msg": "InvalidSerumProgram"
    },
    {
      "code": 6139,
      "name": "InvalidSerumMarket",
      "msg": "InvalidSerumMarket"
    },
    {
      "code": 6140,
      "name": "InvalidSerumBids",
      "msg": "InvalidSerumBids"
    },
    {
      "code": 6141,
      "name": "InvalidSerumAsks",
      "msg": "InvalidSerumAsks"
    },
    {
      "code": 6142,
      "name": "InvalidSerumOpenOrders",
      "msg": "InvalidSerumOpenOrders"
    },
    {
      "code": 6143,
      "name": "FailedSerumCPI",
      "msg": "FailedSerumCPI"
    },
    {
      "code": 6144,
      "name": "FailedToFillOnExternalMarket",
      "msg": "FailedToFillOnExternalMarket"
    },
    {
      "code": 6145,
      "name": "InvalidFulfillmentConfig",
      "msg": "InvalidFulfillmentConfig"
    },
    {
      "code": 6146,
      "name": "InvalidFeeStructure",
      "msg": "InvalidFeeStructure"
    },
    {
      "code": 6147,
      "name": "InsufficientIFShares",
      "msg": "Insufficient IF shares"
    },
    {
      "code": 6148,
      "name": "MarketActionPaused",
      "msg": "the Market has paused this action"
    },
    {
      "code": 6149,
      "name": "MarketPlaceOrderPaused",
      "msg": "the Market status doesnt allow placing orders"
    },
    {
      "code": 6150,
      "name": "MarketFillOrderPaused",
      "msg": "the Market status doesnt allow filling orders"
    },
    {
      "code": 6151,
      "name": "MarketWithdrawPaused",
      "msg": "the Market status doesnt allow withdraws"
    },
    {
      "code": 6152,
      "name": "ProtectedAssetTierViolation",
      "msg": "Action violates the Protected Asset Tier rules"
    },
    {
      "code": 6153,
      "name": "IsolatedAssetTierViolation",
      "msg": "Action violates the Isolated Asset Tier rules"
    },
    {
      "code": 6154,
      "name": "UserCantBeDeleted",
      "msg": "User Cant Be Deleted"
    },
    {
      "code": 6155,
      "name": "ReduceOnlyWithdrawIncreasedRisk",
      "msg": "Reduce Only Withdraw Increased Risk"
    },
    {
      "code": 6156,
      "name": "MaxOpenInterest",
      "msg": "Max Open Interest"
    },
    {
      "code": 6157,
      "name": "CantResolvePerpBankruptcy",
      "msg": "Cant Resolve Perp Bankruptcy"
    },
    {
      "code": 6158,
      "name": "LiquidationDoesntSatisfyLimitPrice",
      "msg": "Liquidation Doesnt Satisfy Limit Price"
    },
    {
      "code": 6159,
      "name": "MarginTradingDisabled",
      "msg": "Margin Trading Disabled"
    },
    {
      "code": 6160,
      "name": "InvalidMarketStatusToSettlePnl",
      "msg": "Invalid Market Status to Settle Perp Pnl"
    },
    {
      "code": 6161,
      "name": "PerpMarketNotInSettlement",
      "msg": "PerpMarketNotInSettlement"
    },
    {
      "code": 6162,
      "name": "PerpMarketNotInReduceOnly",
      "msg": "PerpMarketNotInReduceOnly"
    },
    {
      "code": 6163,
      "name": "PerpMarketSettlementBufferNotReached",
      "msg": "PerpMarketSettlementBufferNotReached"
    },
    {
      "code": 6164,
      "name": "PerpMarketSettlementUserHasOpenOrders",
      "msg": "PerpMarketSettlementUserHasOpenOrders"
    },
    {
      "code": 6165,
      "name": "PerpMarketSettlementUserHasActiveLP",
      "msg": "PerpMarketSettlementUserHasActiveLP"
    },
    {
      "code": 6166,
      "name": "UnableToSettleExpiredUserPosition",
      "msg": "UnableToSettleExpiredUserPosition"
    },
    {
      "code": 6167,
      "name": "UnequalMarketIndexForMarginTransfer",
      "msg": "UnequalMarketIndexForMarginTransfer"
    },
    {
      "code": 6168,
      "name": "InvalidPerpPositionDetected",
      "msg": "InvalidPerpPositionDetected"
    },
    {
      "code": 6169,
      "name": "InvalidMarginPositionDetected",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6170,
      "name": "InvalidAmmDetected",
      "msg": "InvalidAmmDetected"
    },
    {
      "code": 6171,
      "name": "InvalidAmmForFillDetected",
      "msg": "InvalidAmmForFillDetected"
    },
    {
      "code": 6172,
      "name": "InvalidAmmLimitPriceOverride",
      "msg": "InvalidAmmLimitPriceOverride"
    },
    {
      "code": 6173,
      "name": "InvalidOrderFillPrice",
      "msg": "InvalidOrderFillPrice"
    },
    {
      "code": 6174,
      "name": "MarginMarketBalanceInvariantViolated",
      "msg": "MarginMarketBalanceInvariantViolated"
    },
    {
      "code": 6175,
      "name": "MarginMarketVaultInvariantViolated",
      "msg": "MarginMarketVaultInvariantViolated"
    },
    {
      "code": 6176,
      "name": "InvalidPDA",
      "msg": "InvalidPDA"
    },
    {
      "code": 6177,
      "name": "InvalidPDASigner",
      "msg": "InvalidPDASigner"
    },
    {
      "code": 6178,
      "name": "RevenueSettingsCannotSettleToIF",
      "msg": "RevenueSettingsCannotSettleToIF"
    },
    {
      "code": 6179,
      "name": "NoRevenueToSettleToIF",
      "msg": "NoRevenueToSettleToIF"
    },
    {
      "code": 6180,
      "name": "NoAmmPerpPnlDeficit",
      "msg": "NoAmmPerpPnlDeficit"
    },
    {
      "code": 6181,
      "name": "SufficientPerpPnlPool",
      "msg": "SufficientPerpPnlPool"
    },
    {
      "code": 6182,
      "name": "InsufficientPerpPnlPool",
      "msg": "InsufficientPerpPnlPool"
    },
    {
      "code": 6183,
      "name": "PerpPnlDeficitBelowThreshold",
      "msg": "PerpPnlDeficitBelowThreshold"
    },
    {
      "code": 6184,
      "name": "MaxRevenueWithdrawPerPeriodReached",
      "msg": "MaxRevenueWithdrawPerPeriodReached"
    },
    {
      "code": 6185,
      "name": "MaxIFWithdrawReached",
      "msg": "InvalidMarginPositionDetected"
    },
    {
      "code": 6186,
      "name": "NoIFWithdrawAvailable",
      "msg": "NoIFWithdrawAvailable"
    },
    {
      "code": 6187,
      "name": "InvalidIFUnstake",
      "msg": "InvalidIFUnstake"
    },
    {
      "code": 6188,
      "name": "InvalidIFUnstakeSize",
      "msg": "InvalidIFUnstakeSize"
    },
    {
      "code": 6189,
      "name": "InvalidIFUnstakeCancel",
      "msg": "InvalidIFUnstakeCancel"
    },
    {
      "code": 6190,
      "name": "InvalidIFForNewStakes",
      "msg": "InvalidIFForNewStakes"
    },
    {
      "code": 6191,
      "name": "InvalidIFRebase",
      "msg": "InvalidIFRebase"
    },
    {
      "code": 6192,
      "name": "InvalidInsuranceUnstakeSize",
      "msg": "InvalidInsuranceUnstakeSize"
    },
    {
      "code": 6193,
      "name": "InvalidOrderLimitPrice",
      "msg": "InvalidOrderLimitPrice"
    },
    {
      "code": 6194,
      "name": "InvalidIFDetected",
      "msg": "InvalidIFDetected"
    },
    {
      "code": 6195,
      "name": "InvalidAmmMaxSpreadDetected",
      "msg": "InvalidAmmMaxSpreadDetected"
    },
    {
      "code": 6196,
      "name": "InvalidConcentrationCoef",
      "msg": "InvalidConcentrationCoef"
    },
    {
      "code": 6197,
      "name": "InvalidSrmVault",
      "msg": "InvalidSrmVault"
    },
    {
      "code": 6198,
      "name": "InvalidVaultOwner",
      "msg": "InvalidVaultOwner"
    },
    {
      "code": 6199,
      "name": "InvalidMarketStatusForFills",
      "msg": "InvalidMarketStatusForFills"
    },
    {
      "code": 6200,
      "name": "IFWithdrawRequestInProgress",
      "msg": "IFWithdrawRequestInProgress"
    },
    {
      "code": 6201,
      "name": "NoIFWithdrawRequestInProgress",
      "msg": "NoIFWithdrawRequestInProgress"
    },
    {
      "code": 6202,
      "name": "IFWithdrawRequestTooSmall",
      "msg": "IFWithdrawRequestTooSmall"
    },
    {
      "code": 6203,
      "name": "IncorrectMarginMarketAccountPassed",
      "msg": "IncorrectMarginMarketAccountPassed"
    },
    {
      "code": 6204,
      "name": "BlockchainClockInconsistency",
      "msg": "BlockchainClockInconsistency"
    },
    {
      "code": 6205,
      "name": "InvalidIFSharesDetected",
      "msg": "InvalidIFSharesDetected"
    },
    {
      "code": 6206,
      "name": "NewLPSizeTooSmall",
      "msg": "NewLPSizeTooSmall"
    },
    {
      "code": 6207,
      "name": "MarketStatusInvalidForNewLP",
      "msg": "MarketStatusInvalidForNewLP"
    },
    {
      "code": 6208,
      "name": "InvalidMarkTwapUpdateDetected",
      "msg": "InvalidMarkTwapUpdateDetected"
    },
    {
      "code": 6209,
      "name": "MarketSettlementAttemptOnActiveMarket",
      "msg": "MarketSettlementAttemptOnActiveMarket"
    },
    {
      "code": 6210,
      "name": "MarketSettlementRequiresSettledLP",
      "msg": "MarketSettlementRequiresSettledLP"
    },
    {
      "code": 6211,
      "name": "MarketSettlementAttemptTooEarly",
      "msg": "MarketSettlementAttemptTooEarly"
    },
    {
      "code": 6212,
      "name": "MarketSettlementTargetPriceInvalid",
      "msg": "MarketSettlementTargetPriceInvalid"
    },
    {
      "code": 6213,
      "name": "UnsupportedMarginMarket",
      "msg": "UnsupportedMarginMarket"
    },
    {
      "code": 6214,
      "name": "MarginOrdersDisabled",
      "msg": "MarginOrdersDisabled"
    },
    {
      "code": 6215,
      "name": "MarketBeingInitialized",
      "msg": "Market Being Initialized"
    },
    {
      "code": 6216,
      "name": "InvalidUserSubAccountId",
      "msg": "Invalid Sub Account Id"
    },
    {
      "code": 6217,
      "name": "InvalidTriggerOrderCondition",
      "msg": "Invalid Trigger Order Condition"
    },
    {
      "code": 6218,
      "name": "InvalidMarginPosition",
      "msg": "Invalid Margin Position"
    },
    {
      "code": 6219,
      "name": "CantTransferBetweenSameUserAccount",
      "msg": "Cant transfer between same user account"
    },
    {
      "code": 6220,
      "name": "InvalidPerpPosition",
      "msg": "Invalid Perp Position"
    },
    {
      "code": 6221,
      "name": "UnableToGetLimitPrice",
      "msg": "Unable To Get Limit Price"
    },
    {
      "code": 6222,
      "name": "InvalidLiquidation",
      "msg": "Invalid Liquidation"
    },
    {
      "code": 6223,
      "name": "MarginFulfillmentConfigDisabled",
      "msg": "Margin Fulfillment Config Disabled"
    },
    {
      "code": 6224,
      "name": "InvalidMaker",
      "msg": "Invalid Maker"
    },
    {
      "code": 6225,
      "name": "FailedUnwrap",
      "msg": "Failed Unwrap"
    },
    {
      "code": 6226,
      "name": "MaxNumberOfUsers",
      "msg": "Max Number Of Users"
    },
    {
      "code": 6227,
      "name": "InvalidOracleForSettlePnl",
      "msg": "InvalidOracleForSettlePnl"
    },
    {
      "code": 6228,
      "name": "MarginOrdersOpen",
      "msg": "MarginOrdersOpen"
    },
    {
      "code": 6229,
      "name": "TierViolationLiquidatingPerpPnl",
      "msg": "TierViolationLiquidatingPerpPnl"
    },
    {
      "code": 6230,
      "name": "CouldNotLoadUserData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6231,
      "name": "UserWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6232,
      "name": "InvalidUserAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6233,
      "name": "CouldNotLoadUserStatsData",
      "msg": "CouldNotLoadUserData"
    },
    {
      "code": 6234,
      "name": "UserStatsWrongMutability",
      "msg": "UserWrongMutability"
    },
    {
      "code": 6235,
      "name": "InvalidUserStatsAccount",
      "msg": "InvalidUserAccount"
    },
    {
      "code": 6236,
      "name": "UserNotFound",
      "msg": "UserNotFound"
    },
    {
      "code": 6237,
      "name": "UnableToLoadUserAccount",
      "msg": "UnableToLoadUserAccount"
    },
    {
      "code": 6238,
      "name": "AccountLiquidated",
      "msg": "Account liquidated"
    },
    {
      "code": 6239,
      "name": "InvalidOracleAccount",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6240,
      "name": "UnableToLoadOracleAccount",
      "msg": "Unable to load oracle account"
    },
    {
      "code": 6241,
      "name": "CouldNotLoadOracleData",
      "msg": "could not load oracle data"
    },
    {
      "code": 6242,
      "name": "OracleWrongMutability",
      "msg": "wrong oracle mutablility"
    },
    {
      "code": 6243,
      "name": "KeeperAlreadyExists",
      "msg": "The keeper already exists in the list."
    },
    {
      "code": 6244,
      "name": "KeepersListFull",
      "msg": "The keepers list is full."
    },
    {
      "code": 6245,
      "name": "KeeperNotFound",
      "msg": "The keeper was not found in the list."
    },
    {
      "code": 6246,
      "name": "MaxOpenInterestExceeded",
      "msg": "Max open interest exceeded"
    },
    {
      "code": 6247,
      "name": "InvalidOrderStepSize",
      "msg": "Invalid order step size"
    },
    {
      "code": 6248,
      "name": "OrderExpired",
      "msg": "Order expired"
    },
    {
      "code": 6249,
      "name": "OnlyTrader",
      "msg": "Only trader"
    },
    {
      "code": 6250,
      "name": "OnlyLP",
      "msg": "Only LP"
    },
    {
      "code": 6251,
      "name": "InvalidWithdraw",
      "msg": "Invalid Withdraw"
    },
    {
      "code": 6252,
      "name": "InvalidEnum",
      "msg": "Enum value could not be converted"
    },
    {
      "code": 6253,
      "name": "InvalidStartTick",
      "msg": "Invalid start tick index provided."
    },
    {
      "code": 6254,
      "name": "TickArrayExistInPool",
      "msg": "Tick-array already exists in this whirlpool"
    },
    {
      "code": 6255,
      "name": "TickArrayIndexOutofBounds",
      "msg": "Attempt to search for a tick-array failed"
    },
    {
      "code": 6256,
      "name": "InvalidTickSpacing",
      "msg": "Tick-spacing is not supported"
    },
    {
      "code": 6257,
      "name": "ClosePositionNotEmpty",
      "msg": "Position is not empty It cannot be closed"
    },
    {
      "code": 6258,
      "name": "DivideByZero",
      "msg": "Unable to divide by zero"
    },
    {
      "code": 6259,
      "name": "NumberCastError",
      "msg": "Unable to cast number into BigInt"
    },
    {
      "code": 6260,
      "name": "NumberDownCastError",
      "msg": "Unable to down cast number"
    },
    {
      "code": 6261,
      "name": "TickNotFound",
      "msg": "Tick not found within tick array"
    },
    {
      "code": 6262,
      "name": "InvalidTickIndex",
      "msg": "Provided tick index is either out of bounds or uninitializable"
    },
    {
      "code": 6263,
      "name": "SqrtPriceOutOfBounds",
      "msg": "Provided sqrt price out of bounds"
    },
    {
      "code": 6264,
      "name": "LiquidityZero",
      "msg": "Liquidity amount must be greater than zero"
    },
    {
      "code": 6265,
      "name": "LiquidityTooHigh",
      "msg": "Liquidity amount must be less than i64::MAX"
    },
    {
      "code": 6266,
      "name": "LiquidityOverflow",
      "msg": "Liquidity overflow"
    },
    {
      "code": 6267,
      "name": "LiquidityUnderflow",
      "msg": "Liquidity underflow"
    },
    {
      "code": 6268,
      "name": "LiquidityNetError",
      "msg": "Tick liquidity net underflowed or overflowed"
    },
    {
      "code": 6269,
      "name": "TokenMaxExceeded",
      "msg": "Exceeded token max"
    },
    {
      "code": 6270,
      "name": "TokenMinSubceeded",
      "msg": "Did not meet token min"
    },
    {
      "code": 6271,
      "name": "MissingOrInvalidDelegate",
      "msg": "Position token account has a missing or invalid delegate"
    },
    {
      "code": 6272,
      "name": "InvalidPositionTokenAmount",
      "msg": "Position token amount must be 1"
    },
    {
      "code": 6273,
      "name": "InvalidTimestampConversion",
      "msg": "Timestamp should be convertible from i64 to u64"
    },
    {
      "code": 6274,
      "name": "InvalidTimestamp",
      "msg": "Timestamp should be greater than the last updated timestamp"
    },
    {
      "code": 6275,
      "name": "InvalidTickArraySequence",
      "msg": "Invalid tick array sequence provided for instruction."
    },
    {
      "code": 6276,
      "name": "InvalidTokenMintOrder",
      "msg": "Token Mint in wrong order"
    },
    {
      "code": 6277,
      "name": "RewardNotInitialized",
      "msg": "Reward not initialized"
    },
    {
      "code": 6278,
      "name": "InvalidRewardIndex",
      "msg": "Invalid reward index"
    },
    {
      "code": 6279,
      "name": "RewardVaultAmountInsufficient",
      "msg": "Reward vault requires amount to support emissions for at least one day"
    },
    {
      "code": 6280,
      "name": "FeeRateMaxExceeded",
      "msg": "Exceeded max fee rate"
    },
    {
      "code": 6281,
      "name": "ProtocolFeeRateMaxExceeded",
      "msg": "Exceeded max protocol fee rate"
    },
    {
      "code": 6282,
      "name": "MultiplicationShiftRightOverflow",
      "msg": "Multiplication with shift right overflow"
    },
    {
      "code": 6283,
      "name": "MulDivOverflow",
      "msg": "Muldiv overflow"
    },
    {
      "code": 6284,
      "name": "MulDivInvalidInput",
      "msg": "Invalid div_u256 input"
    },
    {
      "code": 6285,
      "name": "MultiplicationOverflow",
      "msg": "Multiplication overflow"
    },
    {
      "code": 6286,
      "name": "InvalidSqrtPriceLimitDirection",
      "msg": "Provided SqrtPriceLimit not in the same direction as the swap."
    },
    {
      "code": 6287,
      "name": "ZeroTradableAmount",
      "msg": "There are no tradable amount to swap."
    },
    {
      "code": 6288,
      "name": "AmountOutBelowMinimum",
      "msg": "Amount out below minimum threshold"
    },
    {
      "code": 6289,
      "name": "AmountInAboveMaximum",
      "msg": "Amount in above maximum threshold"
    },
    {
      "code": 6290,
      "name": "TickArraySequenceInvalidIndex",
      "msg": "Invalid index for tick array sequence"
    },
    {
      "code": 6291,
      "name": "AmountCalcOverflow",
      "msg": "Amount calculated overflows"
    },
    {
      "code": 6292,
      "name": "AmountRemainingOverflow",
      "msg": "Amount remaining overflows"
    },
    {
      "code": 6293,
      "name": "InvalidIntermediaryMint",
      "msg": "Invalid intermediary mint"
    },
    {
      "code": 6294,
      "name": "DuplicateTwoHopPool",
      "msg": "Duplicate two hop pool"
    },
    {
      "code": 6295,
      "name": "InvalidBundleIndex",
      "msg": "Bundle index is out of bounds"
    },
    {
      "code": 6296,
      "name": "BundledPositionAlreadyOpened",
      "msg": "Position has already been opened"
    },
    {
      "code": 6297,
      "name": "BundledPositionAlreadyClosed",
      "msg": "Position has already been closed"
    }
  ]
};
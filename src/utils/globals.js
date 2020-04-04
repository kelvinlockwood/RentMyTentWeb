// Frameworks
import * as _ from 'lodash';

export const GLOBALS = {};

GLOBALS.CODENAME = 'RentMyTent';
GLOBALS.CODENAME_ABBR = 'RMT';
GLOBALS.CODE_VERSION = 'v0.0.1';
GLOBALS.BASE_URL = 'https://rent-my-tent.eth.link';
GLOBALS.APP_ROOT = '/app';
GLOBALS.CODE_VERSION_MAJOR = _.join(_.split(GLOBALS.CODE_VERSION.replace('v',''), '.', 1), '.');
GLOBALS.CODE_VERSION_MINOR = _.join(_.split(GLOBALS.CODE_VERSION.replace('v',''), '.', 2), '.');

GLOBALS.STARTING_BLOCK = '6000000';

GLOBALS.ETH_UNIT      = 1e18;
GLOBALS.ETH_PRECISION = 18;

GLOBALS.TOKEN_DATA = {
    NAME     : GLOBALS.CODENAME,
    DECIMALS : GLOBALS.ETH_PRECISION,
    SYMBOL   : 'TENT',
    BG_COLOR : 'FFF',
};

GLOBALS.INFURA_ID = process.env.GATSBY_ETH_INFURA_ID;
GLOBALS.RPC_URL = process.env.GATSBY_ETH_JSONRPC_URL;
GLOBALS.CHAIN_ID = process.env.GATSBY_ETH_CHAIN_ID;
GLOBALS.DFUSE_API_KEY = process.env.GATSBY_DFUSE_API_KEY;

GLOBALS.REGISTER_TENT = '1000000000000000';

GLOBALS.MIN_BLOCK_CONFIRMATIONS = 3;

GLOBALS.SIDEMENU_WIDTH = 274;
GLOBALS.SIDEMENU_ETH_PRECISION = 7;

GLOBALS.BOOLEAN_TRUE_HEX  = '0x0000000000000000000000000000000000000000000000000000000000000001';
GLOBALS.BOOLEAN_FALSE_HEX = '0x0000000000000000000000000000000000000000000000000000000000000000';

GLOBALS.WALLET_TYPE_COINBASE        = 'walletLink';
GLOBALS.WALLET_TYPE_WALLETCONNECT   = 'walletconnect';
GLOBALS.WALLET_TYPE_FORTMATIC       = 'fortmatic';
GLOBALS.WALLET_TYPE_TORUS           = 'torus';
GLOBALS.WALLET_TYPE_PORTIS          = 'portis';
GLOBALS.WALLET_TYPE_AUTHEREUM       = 'authereum';
GLOBALS.WALLET_TYPE_SQUARELINK      = 'squarelink';
GLOBALS.WALLET_TYPE_ARKANE          = 'arkane';
GLOBALS.WALLET_TYPE_METAMASK        = 'metamask';
GLOBALS.WALLET_TYPE_NATIVE          = 'native';